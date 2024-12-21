"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function touchStart() {
  this.touched = true;
  this.justTouched = true;
  this.startTapTimer();
}
function touchEnd(e) {
  if (e.cancelable) e.preventDefault();
  this.touched = false;
  this.justTouched = false;
  if (this.tapTimedOut) {
    this.tapTimedOut = false;
    return;
  }
  clearTimeout(this.tapTimer);
  var touch = e.changedTouches[0];
  var position = {
    x: touch.clientX,
    y: touch.clientY
  };
  this.toggleActive(position);
  this.tapTimedOut = false;
}
function touchMove(e) {
  if (!this.getState().active) return;
  if (e.cancelable) e.preventDefault();
  var touch = e.touches[0];
  var position = {
    x: touch.clientX,
    y: touch.clientY
  };
  this.setPosition(position, this.touched && !this.justTouched);
  this.justTouched = false;
}
function touchCancel() {
  this.deactivate();
}
var _default = exports["default"] = {
  touchStart: touchStart,
  touchEnd: touchEnd,
  touchMove: touchMove,
  touchCancel: touchCancel
};