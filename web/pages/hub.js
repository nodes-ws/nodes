import React from 'react'
import { dark } from 'grommet/themes'

import { Page, Loading, dndContext, Hotkeys, usePageState } from '../lib/utils'
import Spinner from '../lib/core/components/utils/Spinner'
import { NodeView, NodeSEO } from '../lib/core/components/node'
import initNApi from '../lib/core/napi'
import HubBackend from '../lib/backends/hub'
import config from '../lib/config'
import nodes from '../lib/nodes'
const napi = initNApi({ backend: new HubBackend({ url: config.hubApiUrl, nodes }), env: config })
if (typeof window !== 'undefined') window.napi = napi

const HubPage = () => {
  const { node, view, viewer } = usePageState(napi)
  return (
    <Page theme={dark}>
      {node
        ? (
          <>
            <Hotkeys node={node} view={view} napi={napi} viewer={viewer} />
            <NodeSEO node={node} />
            <NodeView node={node} view={view} napi={napi} viewer={viewer} />
          </>
        )
        : <Loading indicator={<Spinner />} />}
    </Page>
  )
}

export default dndContext(HubPage)
