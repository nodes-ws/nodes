export default async ({ __deps__, __imports__ }) => {
  const { Box, TextInput, Button } = __imports__.grommet
  const { React, lodash: _, icons } = __imports__.utils
  const { napi, NodeView, iconSize, viewer } = __deps__

  const view = ({ node }) => {
    // const value = _.get(node, 'sides.web.src', defaultSrc)
    const [messages, setMessages] = React.useState([])
    const [message, setMessage] = React.useState('')

    const getOrCreateChatNode = async () => {
      let chatNode = await napi.findNode({ parentId: node.id, name: '.chat' })
      if (chatNode.status === 'error') {
        chatNode = await napi.createNode(null, { parentId: node.id, name: '.chat' })
      }
      return chatNode
    }

    React.useEffect(() => {
      const getInitialMessages = async () => {
        const chatNode = await getOrCreateChatNode()
        console.log('chat node', chatNode)
        const messageNodes = await napi.getNodeChildren(chatNode)
        console.log('message nodes', messageNodes)
        setMessages(messageNodes.items.map(msgNode => ({ id: msgNode.id, text: msgNode.name })))
      }
      getInitialMessages()
    }, [])

    React.useEffect(() => {
      const callback = async ({ type, node }) => {
        console.log('chat update!', type, node)
        if (type === 'add') {
          setMessages([...messages, { id: messages.length + 1, text: node.name }])
        }
      }
      const subscribe = async () => {
        const chatNode = await getOrCreateChatNode()
        napi.subscribeToNodeChildrenUpdates(chatNode.id, callback)
      }
      const unsubscribe = async () => {
        const chatNode = await getOrCreateChatNode()
        napi.unsubscribeFromNodeChildrenUpdates(chatNode.id, callback)
      }
      subscribe()
      return () => {
        unsubscribe()
      }
    })

    const sendMessage = async () => {
      console.log('in submit', message)
      if (message !== '') {
        const chatNode = await getOrCreateChatNode()
        const newMessageNode = await napi.createNode(null, { parentId: chatNode.id, name: message })
        console.log('new message node', newMessageNode)
        // setMessages([...messages, { id: messages.length + 1, text: message }])
        setMessage('')
      }
    }
    return (
      <Box fill align='center' justify='center'>
        <Box overflow='scroll' fill align='center' background={{ color: 'black', opacity: 'medium' }} pad='small'>
          {messages.map(message => {
            return (
              <Box key={message.id} fill='horizontal' height='xsmall' background={{ color: 'black', opacity: 'medium' }} pad='small'>
                {message.text}
              </Box>
            )
          })}
          <TextInput value={message} onChange={event => setMessage(event.target.value)} />
          <Button label='Send' onClick={() => sendMessage()} />
        </Box>
      </Box>
    )
  }

  const edit = view

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Chat size={iconSize} /></Box>
  const preview = icon

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
