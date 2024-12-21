"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _click = _interopRequireDefault(require("./click"));
var _doubleClick = _interopRequireDefault(require("./doubleClick"));
var _hover = _interopRequireDefault(require("./hover"));
var _mouseDown = _interopRequireDefault(require("./mouseDown"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  click: _click["default"],
  doubleClick: _doubleClick["default"],
  hover: _hover["default"],
  mouseDown: _mouseDown["default"]
};