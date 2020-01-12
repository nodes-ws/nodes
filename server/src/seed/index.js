const logger = require('../logger')
const nodes = require('./nodes')

const adminUser = { name: 'admin', email: process.env.ADMIN_USER_EMAIL || 'admin@example.com', password: process.env.ADMIN_USER_PASSWORD || 'admin' }
const testUser = { name: 'test', email: 'test@example.com', password: 'test' }

const _createUser = (usersService, nodesService) => async user => {
  const authUser = await usersService.create({ email: user.email, password: user.password })
  const userNode = await nodesService.create({
    id: authUser._id,
    status: 'ok',
    parentId: 'users',
    name: user.name,
    sides: {
      user: { name: user.name, email: user.email, providers: { hub: { id: authUser.id } } },
      users: [{ id: authUser._id, role: 'admin' }],
      desktop: {}
    }
  })
  return userNode
}

module.exports = async function (app) {
  // // Wait for MongoDB to connect https://github.com/feathersjs/feathers/issues/805#issuecomment-361100134
  // await app.get('mongoClient')
  // await app.service('users').remove(null, {})
  // await app.service('nodes').remove(null, {})
  // return
  const usersService = app.service('users')
  const nodesService = app.service('nodes')
  const createUser = _createUser(usersService, nodesService)
  const { total: totalNodes } = await nodesService.find({ query: { $limit: 0 } })
  const { total: totalUsers } = await usersService.find({ query: { $limit: 0 } })
  logger.info(`Found ${totalNodes} nodes in db`)

  if (!totalNodes && !totalUsers) {
    logger.info('Installing nodes..')
    const adminNode = await createUser(adminUser)
    await createUser(testUser)
    await Promise.all(nodes.map(node => nodesService.create({ ...node, sides: { ...node.sides, users: [{ id: adminNode.id, role: 'admin' }] } })))
    logger.info(`${nodes.length} nodes installed.`)
  } else {
    logger.info('Checking updates..')
    for (const node of nodes) {
      try {
        await nodesService.get(node.id)
      } catch (e) {
        logger.info(`${node.name} missing, installing..`)
        await nodesService.create(node)
      }
    }
  }
}
