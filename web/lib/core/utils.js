import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// ui
import {
  Grid, Box, Text, Image, Anchor, Menu, ResponsiveContext, Paragraph, Keyboard,
  ThemeContext, TextInput, CheckBox, Button, Stack, InfiniteScroll, Table, Markdown
} from 'grommet'
import {
  Add, Duplicate, Edit, Pin, Next, Trash, More, Code, Copy, MailOption,
  Desktop, StatusCritical, Login, Action, Aggregate, Calculator, Music, Refresh,
  Install, InstallOption, Apps, Directions, Search, LinkBottom, Services, UserSettings,
  Logout, User, Close, Checkmark, Group, Google, WifiNone, Wifi, Link as LinkIcon, Template,
  Share, CirclePlay, DocumentPdf, Image as ImageIcon, Note, Download, Upload, Star, DocumentText, Chat as ChatIcon
} from 'grommet-icons'

import * as Nodehub from './components/node'
import InlineEdit from './components/utils/InlineEdit'
import Avatar from 'react-avatar'
import * as UseGesture from 'react-use-gesture'
import * as Spring from 'react-spring'
import * as ReactDnD from 'react-dnd-cjs'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend-cjs'
import JSONSchemaForm from './components/utils/Form'
import { CodeEditor } from './components/utils/CodeEditor'
import CoolBox from './components/utils/CoolBox'
import hooks from './components/utils/hooks'

// utils
import get from 'lodash/get'
import find from 'lodash/find'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'
import axios from 'axios'
import { withSize, SizeMe } from 'react-sizeme'
import * as lib from './components/utils/lib'
import Router from 'next/router'

const NodehubLogo = dynamic(() => import('./components/utils/NodehubLogo')) // code-splitted & working!
const http = axios
const lodash = { get, find, debounce, throttle, isEqual }
const Grommet = {
  Grid, Box, Text, Image, Anchor, Menu, ResponsiveContext, Keyboard,
  ThemeContext, TextInput, CheckBox, Button, Stack, InfiniteScroll, Table, Markdown, Paragraph
}
const icons = {
  Add, Duplicate, Edit, Pin, Next, Trash, More, Code, Copy, Mail: MailOption,
  Desktop, StatusCritical, Login, Action, Aggregate, Calculator, Music, Refresh,
  Install, InstallOption, Apps, Directions, Search, LinkBottom, Services, UserSettings,
  Logout, User, Close, Checkmark, Group, Google, WifiNone, Wifi, Link: LinkIcon, Template,
  Share, CirclePlay, DocumentPdf, Image: ImageIcon, Note, Download, Upload, Star, DocumentText, Chat: ChatIcon,
}
const DnD = { ...ReactDnD, HTML5Backend, NativeTypes }
const baseDeps = {
  React,
  Router,
  Link,
  icons,
  JSONSchemaForm,
  CodeEditor,
  InlineEdit,
  Avatar,
  CoolBox,
  NodehubLogo,
  lodash,
  withSize,
  SizeMe,
  UseGesture,
  Spring,
  hooks,
  lib,
  DnD,
  http,
  dimport: process.browser ? require('dimport').default : null,
  Peer: process.browser ? require('peerjs').default : null
}

const imports = { utils: baseDeps, grommet: Grommet, nodehub: Nodehub }

// eslint-disable-next-line no-new-func
const createViewFromSrc = (fbody, deps = {}) => (props) => Function(
  '__props__', '__imports__', '__deps__',
  fbody
)(
  props, imports, deps
)

const tools = { http }

// eslint-disable-next-line no-new-func
const execMethodFromSrc = (fbody, deps = {}) => (self, args) => Function('self', '__args__', '__tools__', '__deps__', fbody)(self, args, tools, deps)

export { createViewFromSrc, execMethodFromSrc, imports }
