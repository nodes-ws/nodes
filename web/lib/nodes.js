const PLUGINS_BASE_URL = process.env.PLUGINS_BASE_URL || '/static/plugins'

const system = {
  status: 'ok',
  id: 'nodes-ws',
  name: 'Nodes',
  sides: {
    desktop: {},
    settings: {
      public: true,
      ui: {
        background: {
          image: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)'
        }
      }
    }
  }
}

const genCorePluginNodes = names => names.map((name, i) => ({ status: 'ok', id: `core-${name}`, parentId: 'plugins', name, sides: { plugin: { canAdd: ['plugin'].includes(name), url: `${PLUGINS_BASE_URL}/core/${name}/index.bundled.js` } } }))
const genCommonPluginNodes = names => names.map((name, i) => ({ status: 'ok', id: `common-${name}`, parentId: 'plugins', name, sides: { plugin: { canAdd: true, url: `${PLUGINS_BASE_URL}/common/${name}/index.bundled.js` } } }))
const nodes = [
  system,
  { status: 'ok', parentId: 'nodes-ws', id: 'users', name: 'Users', sides: { desktop: true } },
  { status: 'ok', parentId: 'nodes-ws', id: 'plugins', name: 'Plugins', sides: { desktop: true } },
  ...genCorePluginNodes(['ui', 'json', 'user', 'users', 'settings', 'search', 'side', 'node', 'login', 'error', 'remove', 'desktop', 'plugin', 'import', 'export', 'merge', 'nstore']),
  ...genCommonPluginNodes(['link', 'note', 'markdown', 'web', 'chat'])
]

export default nodes
