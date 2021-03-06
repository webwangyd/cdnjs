/*!
 * Inheritance.js (0.2.0)
 *
 * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) define(factory);
  else if (typeof exports === "object") module.exports = factory();
  else {
    var _module = factory();
    if (typeof _module === "function") {
      var moduleName = ((typeof _module.name !== "undefined") ? _module.name : ( /^function\s+([\w\$]+)\s*\(/ ).exec( _module.toString() )[1])
      root[moduleName] = _module;
      return;
    }
    for (var moduleName in _module) {
      if (_module.hasOwnProperty(moduleName)) {
        root[moduleName] = _module[moduleName];
      }
    }
  }
})(this, function() {
/**
 * TODO: Add description
 *
 * @param {Object}        obj    - The object to mix into.
 *                                 NOTE: `undefined` and `null` are both VALID values for
 *                                 this parameter. If `obj` is `undefined` or `null`, then
 *                                 a new object will be created from the `mixins` given.
 * @param {Array<Object>} mixins - An array of objects whose attributes should be mixed
 *                                 into the given `obj`.
 *                                 NOTE: The order of objects in this array does matter!
 *                                 If there are attributes present in multiple mixin
 *                                 objects, then the mixin with the largest index value
 *                                 overwrite any values set by the lower index valued
 *                                 mixin objects.
 *
 * @returns {Object} The mixed version of `obj`.
 */
function mix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        newObj[attrName] = mixin[attrName];
      }
    }
  }

  return newObj;
}/**
 * TODO: Add description
 *
 * @param {Object}        obj    - The object containing the prototype to mix into.
 *                                 NOTE: `undefined` and `null` are both VALID values for
 *                                 this parameter. If `obj` is `undefined` or `null`, then
 *                                 a new object will be created from the `mixins` given.
 * @param {Array<Object>} mixins - An array of objects whose attributes should be mixed
 *                                 into the prototype of the given `obj`.
 *                                 NOTE: The order of objects in this array does matter!
 *                                 If there are attributes present in multiple mixin
 *                                 objects, then the mixin with the largest index value
 *                                 overwrite any values set by the lower index valued
 *                                 mixin objects.
 *
 * @returns {Object} The mixed version of `obj`.
 *
 * @throws {TypeError} If `obj.prototype` does not exist.
 *
 * @requires mix
 */
function mixPrototype(obj, mixins) {
  obj = (obj || { prototype: {} });

  if (typeof obj.prototype === 'undefined' || obj.prototype === null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mix(obj.prototype, mixins);

  return obj;
}

return {
  mix: mix,
  mixPrototype: mixPrototype
};
});