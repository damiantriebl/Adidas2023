"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = require("socket.io-client");

var URL = "http://0.0.0.0/:4001"; // backend port is 3010

var socket = (0, _socket.io)(URL, {
  autoConnect: true,
  multiplex: false
}); // console.log  metele un consola cada ves q se dispare

socket.onAny(function (eventName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  console.log(eventName, args);
});
var _default = socket;
exports["default"] = _default;