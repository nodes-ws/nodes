function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, TextInput, Button, _imports__$utils, React, _, icons, napi, NodeView, iconSize, viewer, view, edit, icon, preview;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, TextInput = _imports__$grommet.TextInput, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons;
            napi = __deps__.napi, NodeView = __deps__.NodeView, iconSize = __deps__.iconSize, viewer = __deps__.viewer;

            view = function view(_ref3) {
              var node = _ref3.node;

              // const value = _.get(node, 'sides.web.src', defaultSrc)
              var _React$useState = React.useState([]),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  messages = _React$useState2[0],
                  setMessages = _React$useState2[1];

              var _React$useState3 = React.useState(''),
                  _React$useState4 = _slicedToArray(_React$useState3, 2),
                  message = _React$useState4[0],
                  setMessage = _React$useState4[1];

              var getOrCreateChatNode =
              /*#__PURE__*/
              function () {
                var _ref4 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  var chatNode;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return napi.findNode({
                            parentId: node.id,
                            name: '.chat'
                          });

                        case 2:
                          chatNode = _context.sent;

                          if (!(chatNode.status === 'error')) {
                            _context.next = 7;
                            break;
                          }

                          _context.next = 6;
                          return napi.createNode(null, {
                            parentId: node.id,
                            name: '.chat'
                          });

                        case 6:
                          chatNode = _context.sent;

                        case 7:
                          return _context.abrupt("return", chatNode);

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function getOrCreateChatNode() {
                  return _ref4.apply(this, arguments);
                };
              }();

              React.useEffect(function () {
                var getInitialMessages =
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2() {
                    var chatNode, messageNodes;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return getOrCreateChatNode();

                          case 2:
                            chatNode = _context2.sent;
                            console.log('chat node', chatNode);
                            _context2.next = 6;
                            return napi.getNodeChildren(chatNode);

                          case 6:
                            messageNodes = _context2.sent;
                            console.log('message nodes', messageNodes);
                            setMessages(messageNodes.items.map(function (msgNode) {
                              return {
                                id: msgNode.id,
                                text: msgNode.name
                              };
                            }));

                          case 9:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function getInitialMessages() {
                    return _ref5.apply(this, arguments);
                  };
                }();

                getInitialMessages();
              }, []);
              React.useEffect(function () {
                var callback =
                /*#__PURE__*/
                function () {
                  var _ref7 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(_ref6) {
                    var type, node;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            type = _ref6.type, node = _ref6.node;
                            console.log('chat update!', type, node);

                            if (type === 'add') {
                              setMessages([].concat(_toConsumableArray(messages), [{
                                id: messages.length + 1,
                                text: node.name
                              }]));
                            }

                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function callback(_x2) {
                    return _ref7.apply(this, arguments);
                  };
                }();

                var subscribe =
                /*#__PURE__*/
                function () {
                  var _ref8 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee4() {
                    var chatNode;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return getOrCreateChatNode();

                          case 2:
                            chatNode = _context4.sent;
                            napi.subscribeToNodeChildrenUpdates(chatNode.id, callback);

                          case 4:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function subscribe() {
                    return _ref8.apply(this, arguments);
                  };
                }();

                var unsubscribe =
                /*#__PURE__*/
                function () {
                  var _ref9 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee5() {
                    var chatNode;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return getOrCreateChatNode();

                          case 2:
                            chatNode = _context5.sent;
                            napi.unsubscribeFromNodeChildrenUpdates(chatNode.id, callback);

                          case 4:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function unsubscribe() {
                    return _ref9.apply(this, arguments);
                  };
                }();

                subscribe();
                return function () {
                  unsubscribe();
                };
              });

              var sendMessage =
              /*#__PURE__*/
              function () {
                var _ref10 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee6() {
                  var chatNode, newMessageNode;
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          console.log('in submit', message);

                          if (!(message !== '')) {
                            _context6.next = 10;
                            break;
                          }

                          _context6.next = 4;
                          return getOrCreateChatNode();

                        case 4:
                          chatNode = _context6.sent;
                          _context6.next = 7;
                          return napi.createNode(null, {
                            parentId: chatNode.id,
                            name: message
                          });

                        case 7:
                          newMessageNode = _context6.sent;
                          console.log('new message node', newMessageNode); // setMessages([...messages, { id: messages.length + 1, text: message }])

                          setMessage('');

                        case 10:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function sendMessage() {
                  return _ref10.apply(this, arguments);
                };
              }();

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                overflow: "scroll",
                fill: true,
                align: "center",
                background: {
                  color: 'black',
                  opacity: 'medium'
                },
                pad: "small"
              }, messages.map(function (message) {
                return React.createElement(Box, {
                  key: message.id,
                  fill: "horizontal",
                  height: "xsmall",
                  background: {
                    color: 'black',
                    opacity: 'medium'
                  },
                  pad: "small"
                }, message.text);
              }), React.createElement(TextInput, {
                value: message,
                onChange: function onChange(event) {
                  return setMessage(event.target.value);
                }
              }), React.createElement(Button, {
                label: "Send",
                onClick: function onClick() {
                  return sendMessage();
                }
              })));
            };

            edit = view;

            icon = function icon(_ref11) {
              var node = _ref11.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Chat, {
                size: iconSize
              }));
            };

            preview = icon;
            return _context7.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();