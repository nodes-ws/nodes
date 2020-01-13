import React from 'react'
import { dark } from 'grommet/themes'

import { Page } from '../lib/utils'
import { Box, Anchor, Text, Button, ResponsiveContext } from 'grommet'
import { Github, Twitter, Spectrum, FacebookOption, Favorite, Deploy } from 'grommet-icons'

const Nodes = () => (
  <Box fill='horizontal' direction='column' align='center' justify='center'>
    <Anchor style={{ textDecoration: 'none' }} href='/app'><Text style={{
      fontFamily: 'Nonchalance Bold',
      background: 'linear-gradient(to bottom, #0cc5f6 0%, #6b0edb 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }} color='info' weight='bold' size='10vw'>N O D E S</Text></Anchor>
  </Box>
)

const SocialAccounts = () => {
  const screen = React.useContext(ResponsiveContext) || 'small'
  const size = screen === 'small' ? 'medium' : 'large'
  const accounts = [
    { url: 'https://github.com/nodes-ws/nodes', icon: <Github size={size} /> },
    { url: 'https://facebook.com/nodesws', icon: <FacebookOption size={size} /> },
    { url: 'https://twitter.com/nodes_ws', icon: <Twitter size={size} /> },
    { url: 'https://spectrum.chat/nodes', icon: <Spectrum size={size} /> },
    { url: 'https://patreon.com/nodes', icon: <Favorite size={size} color='red' /> }
  ]
  return (
    <Box fill='horizontal' direction='row' align='center' justify='center' gap='small'>
      {accounts.map(account => (
        <Anchor key={account.url} icon={account.icon} href={account.url} target='_blank' rel='noopener' />
      ))}
    </Box>
  )
}

const Description = () => {
  const screen = React.useContext(ResponsiveContext)
  const size = screen === 'small' ? 'medim' : 'xlarge'
  return (
    <Box pad='small' fill='horizontal' align='center' justify='center'>
      <Text textAlign='center' size={size}>
        <i>Reimagined web OS with composable apps.</i>
      </Text>
    </Box>
  )
}

const IndexPage = () => {
  return (
    <Page theme={dark}>
      <Box fill background='background'>
        <Box fill='horizontal' height='xsmall' as='header' align='center' justify='center' />
        <Box as='main' fill>
          <Box fill align='center' justify='center' gap='small'>
            <SocialAccounts />
            <Nodes />
            <Description />
            <Box round='small' align='center' justify='center'><Button color='control' margin='small' href='/app' icon={<Deploy color='control' />} label='l a u n c h' /></Box>
          </Box>
        </Box>
        <Box fill='horizontal' height='xsmall' as='footer'>
          <Box align='center' justify='center' fill='horizontal' direction='row' pad='large'><Text size='small'>Nodes © 2019-2020</Text></Box>
        </Box>
      </Box>
      <style jsx>{`
        @font-face {
          font-family: 'Nonchalance Bold';
          font-style: normal;
          font-weight: normal;
          font-display: auto;
          src: local('Nonchalance Bold'), url('/static/fonts/Nonchalance Bold.woff') format('woff');
        }
      `}</style>
    </Page>
  )
}

export default IndexPage
