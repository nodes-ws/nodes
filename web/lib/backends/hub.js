import BaseBackend from './base'
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import { applyPatch } from 'fast-json-patch'

const notImplementedError = name => {
  throw new Error(`Not implemented: ${name}`)
}

class HubBackend extends BaseBackend {
  constructor ({ url }) {
    super()
    const socket = io(url, { transports: ['websocket'], forceNew: true })
    this.client = feathers()
      .configure(feathers.socketio(socket))
      .configure(feathers.authentication())
    this.nodes = this.client.service('nodes')
    this._listenEvents()
  }
  _listenEvents () {
    this.nodes.on('created', node => {
      this.emit('node:event', { type: 'save', payload: { node } })
      this.emit('node:event', { type: `child-add:${node.parentId}`, payload: { node } })
    })
    this.nodes.on('updated', node => {
      this.emit('node:event', { type: 'save', payload: { node } })
      this.emit('node:event', { type: `child-update:${node.parentId}`, payload: { node } })
      if (node._oldParentId) {
        this.emit('node:event', { type: `child-remove:${node._oldParentId}`, payload: { node } })
        this.emit('node:event', { type: `child-add:${node.parentId}`, payload: { node } })
      }
    })
  }
  async login (email, password) {
    console.log('[HubBackend] login', email, password)
    try {
      let res
      if (!email) {
        // Try to authenticate using an existing token
        res = await this.client.reAuthenticate()
      } else {
        // Otherwise log in with the `local` strategy using the credentials we got
        res = await this.client.authenticate({
          strategy: 'local',
          email,
          password
        })
      }
      console.log('[HubBackend] login success', res)
      let userNode = (await this.find({ [`sides.user.providers.hub.id`]: res.user.id })).items[0]
      if (!userNode) {
        // IDEA: create user node?
        return null
      }
      const user = userNode.sides.user
      return { ...user, providers: Object.keys(user.providers), node: userNode.id }
    } catch (error) {
      console.log('[HubBackend] login error', error)
      return null
    }
  }

  async logout () {
    return this.client.logout()
  }

  async create (node) {
    console.log('[HubBackend] create', node)
    const res = await this.nodes.create(node)
    console.log('[HubBackend] created', res)
    return res
  }

  async retrieve (nodeId) {
    return this.nodes.get(nodeId)
  }

  async update (id, update) {
    console.log('[HubBackend] update', id, update)
    const old = await this.nodes.get(id)
    let updatedNode = applyPatch(old, update, /* validate */ true, /* mutate */ false).newDocument
    if (old.parentId !== updatedNode.parentId) {
      updatedNode._oldParentId = old.parentId
    } else {
      if (updatedNode._oldParentId) {
        const { _oldParentId, ..._node } = updatedNode
        updatedNode = _node
      }
    }
    const node = await this.nodes.update(id, updatedNode)
    console.log('[HubBackend] updated', node)
    return node
  }

  async delete (id) {
    return this.nodes.remove(id)
  }

  async find (query) {
    console.log('[HubBackend] find', query)
    const { limit = 10, lastId, ..._query } = query
    const res = await this.nodes.find({ query: { ..._query, $limit: limit } })
    console.log('[HubBackend] found', res)
    return { items: res.data }
  }

  async search (text) {
    // notImplementedError('search')
    const res = await this.nodes.find({ query: { name: text } })
    console.log('[HubBackend] found', res)
    return { results: res.data }
  }
}

export default HubBackend
