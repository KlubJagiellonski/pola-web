"use strict";

var _react = _interopRequireDefault(require("react"));

var _deviceId = require("./deviceId");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

beforeEach(function () {
  return localStorage.removeItem('DEVICE_ID', 'WEB-FAKE-ID');
});
test('return random ID', function () {
  expect((0, _deviceId.getCurrentDeviceId)()).toHaveLength(32 + 4);
});
test('should save device ID', function () {
  var a = (0, _deviceId.getCurrentDeviceId)();
  var b = (0, _deviceId.getCurrentDeviceId)();
  expect(a).toEqual(b);
  expect(_typeof(localStorage.getItem('DEVICE_ID'))).toEqual('string');
});