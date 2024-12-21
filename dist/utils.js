"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function isReactComponent(element) {
  return typeof element.type === 'function';
}
function decorateChild(child, props) {
  return /*#__PURE__*/(0, _react.cloneElement)(child, props);
}
function shouldDecorateChild(child) {
  return !!child && isReactComponent(child);
}
function decorateChildren(children, props) {
  return _react.Children.map(children, function (child) {
    return shouldDecorateChild(child) ? decorateChild(child, props) : child;
  });
}
function preventDefault(e) {
  e.preventDefault();
}
function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
  var percent = (oldValue - oldMin) / (oldMax - oldMin);
  return percent * (newMax - newMin) + newMin;
}
function limitPosition(minX, maxX, minY, maxY) {
  var itemPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var position = _objectSpread({}, itemPosition);
  if (minX !== undefined && position.x < minX) {
    position.x = minX;
  } else if (maxX !== undefined && position.x > maxX) {
    position.x = maxX;
  }
  if (minY !== undefined && position.y < minY) {
    position.y = minY;
  } else if (maxY !== undefined && position.y > maxY) {
    position.y = maxY;
  }
  return position;
}
function createAdjustedLimits(minX, maxX, minY, maxY) {
  var elemDimensions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var itemDimensions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var limitBySize = arguments.length > 6 ? arguments[6] : undefined;
  var internal = arguments.length > 7 ? arguments[7] : undefined;
  var limits = {
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY
  };
  if (limits.maxX < 0) {
    limits.maxX = elemDimensions.width + limits.maxX;
  }
  if (limits.maxY < 0) {
    limits.maxY = elemDimensions.height + limits.maxY;
  }
  if (!limitBySize) {
    return limits;
  }
  if (internal) {
    limits.minX = 0;
    limits.minY = 0;
    limits.maxX = elemDimensions.width - itemDimensions.width;
    limits.maxY = elemDimensions.height - itemDimensions.height;
    if (itemDimensions.width > elemDimensions.width || itemDimensions.height > elemDimensions.height) {
      limits.maxX = 0;
      limits.maxY = 0;
    }
  } else if (itemDimensions.width || itemDimensions.height) {
    limits.maxX = 0;
    limits.maxY = 0;
    limits.minX = -itemDimensions.width + elemDimensions.width;
    limits.minY = -itemDimensions.height + elemDimensions.height;
    if (itemDimensions.width < elemDimensions.width || itemDimensions.height < elemDimensions.height) {
      limits.minX = 0;
      limits.minY = 0;
    }
  }
  return limits;
}
function calculateItemPosition() {
  var itemPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prevActivePosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var activePosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var multiplier = arguments.length > 3 ? arguments[3] : undefined;
  var newItemPosition = _objectSpread({}, itemPosition);
  var moveX = (activePosition.x - prevActivePosition.x) * multiplier;
  var moveY = (activePosition.y - prevActivePosition.y) * multiplier;
  newItemPosition.x += moveX;
  newItemPosition.y += moveY;
  return newItemPosition;
}
function alignItemOnPosition() {
  var elemDimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var itemDimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var position = arguments.length > 2 ? arguments[2] : undefined;
  var oldMaxX = elemDimensions.width;
  var newMaxX = -(itemDimensions.width || 0) + elemDimensions.width;
  var oldMaxY = elemDimensions.height;
  var newMaxY = -(itemDimensions.height || 0) + elemDimensions.height;
  return {
    x: convertRange(0, oldMaxX, 0, newMaxX, position.x),
    y: convertRange(0, oldMaxY, 0, newMaxY, position.y)
  };
}
function centerItemOnPosition() {
  var elemDimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var itemDimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var position = arguments.length > 2 ? arguments[2] : undefined;
  var itemPosition = alignItemOnPosition(elemDimensions, itemDimensions, position);
  itemPosition.x += elemDimensions.width / 2 - position.x;
  itemPosition.y += elemDimensions.height / 2 - position.y;
  return itemPosition;
}
var _default = exports["default"] = {
  decorateChildren: decorateChildren,
  preventDefault: preventDefault,
  convertRange: convertRange,
  limitPosition: limitPosition,
  createAdjustedLimits: createAdjustedLimits,
  calculateItemPosition: calculateItemPosition,
  alignItemOnPosition: alignItemOnPosition,
  centerItemOnPosition: centerItemOnPosition
};