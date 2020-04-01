var WebCamera = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$2 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = _getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /**
   * Checks if `value` is likely a DOM element.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */
  function isElement(value) {
    return isObjectLike_1(value) && value.nodeType === 1 && !isPlainObject_1(value);
  }

  var isElement_1 = isElement;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /** `Object#toString` result references. */
  var stringTag = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
  }

  var isString_1 = isString;

  /**
   * Checks if `value` is `null` or `undefined`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
   * @example
   *
   * _.isNil(null);
   * // => true
   *
   * _.isNil(void 0);
   * // => true
   *
   * _.isNil(NaN);
   * // => false
   */
  function isNil(value) {
    return value == null;
  }

  var isNil_1 = isNil;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$2.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var Map$1 = _getNative(_root, 'Map');

  var _Map = Map$1;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq_1(object[key], value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  });

  /** Built-in value references. */
  var Uint8Array = _root.Uint8Array;

  var _Uint8Array = Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$6;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike_1(value) && isArrayLike_1(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag$1 = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag$1] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$6.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$7.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return _copyObject(value, keysIn_1(value));
  }

  var toPlainObject_1 = toPlainObject;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key),
        srcValue = _safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      _assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray_1(srcValue),
          isBuff = !isArr && isBuffer_1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray_1(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject_1(objValue)) {
          newValue = _copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = _cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = _cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
        newValue = objValue;
        if (isArguments_1(objValue)) {
          newValue = toPlainObject_1(objValue);
        }
        else if (!isObject_1(objValue) || isFunction_1(objValue)) {
          newValue = _initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    _assignMergeValue(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    _baseFor(source, function(srcValue, key) {
      stack || (stack = new _Stack);
      if (isObject_1(srcValue)) {
        _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        _assignMergeValue(object, key, newValue);
      }
    }, keysIn_1);
  }

  var _baseMerge = baseMerge;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
    return _defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = _shortOut(_baseSetToString);

  var _setToString = setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '');
  }

  var _baseRest = baseRest;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike_1(object) && _isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq_1(object[index], value);
    }
    return false;
  }

  var _isIterateeCall = isIterateeCall;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return _baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  var _createAssigner = createAssigner;

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = _createAssigner(function(object, source, srcIndex) {
    _baseMerge(object, source, srcIndex);
  });

  var merge_1 = merge;

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {
    // No operation performed.
  }

  var noop_1 = noop;

  var uuid = function uuid() {
    return Math.random().toString(36).slice(4) + +new Date();
  };

  var querySelector = function querySelector(selector) {
    var element;

    if (isString_1(selector)) {
      element = document.querySelector(selector);
    } else if (isPlainObject_1(selector)) {
      element = querySelector(selector.el);
    } else if (isElement_1(selector)) {
      element = selector;
    }

    return element;
  };

  var adapter = createCommonjsModule(function (module, exports) {
  (function(f){{module.exports=f();}})(function(){return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

  var _adapter_factory = require('./adapter_factory.js');

  var adapter = (0, _adapter_factory.adapterFactory)({ window: window });
  module.exports = adapter; // this is the difference from adapter_core.

  },{"./adapter_factory.js":2}],2:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.adapterFactory = adapterFactory;

  var _utils = require('./utils');

  var utils = _interopRequireWildcard(_utils);

  var _chrome_shim = require('./chrome/chrome_shim');

  var chromeShim = _interopRequireWildcard(_chrome_shim);

  var _edge_shim = require('./edge/edge_shim');

  var edgeShim = _interopRequireWildcard(_edge_shim);

  var _firefox_shim = require('./firefox/firefox_shim');

  var firefoxShim = _interopRequireWildcard(_firefox_shim);

  var _safari_shim = require('./safari/safari_shim');

  var safariShim = _interopRequireWildcard(_safari_shim);

  var _common_shim = require('./common_shim');

  var commonShim = _interopRequireWildcard(_common_shim);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  // Shimming starts here.
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  function adapterFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        window = _ref.window;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      shimChrome: true,
      shimFirefox: true,
      shimEdge: true,
      shimSafari: true
    };

    // Utils.
    var logging = utils.log;
    var browserDetails = utils.detectBrowser(window);

    var adapter = {
      browserDetails: browserDetails,
      commonShim: commonShim,
      extractVersion: utils.extractVersion,
      disableLog: utils.disableLog,
      disableWarnings: utils.disableWarnings
    };

    // Shim browser if found.
    switch (browserDetails.browser) {
      case 'chrome':
        if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
          logging('Chrome shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming chrome.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = chromeShim;

        chromeShim.shimGetUserMedia(window);
        chromeShim.shimMediaStream(window);
        chromeShim.shimPeerConnection(window);
        chromeShim.shimOnTrack(window);
        chromeShim.shimAddTrackRemoveTrack(window);
        chromeShim.shimGetSendersWithDtmf(window);
        chromeShim.shimGetStats(window);
        chromeShim.shimSenderReceiverGetStats(window);
        chromeShim.fixNegotiationNeeded(window);

        commonShim.shimRTCIceCandidate(window);
        commonShim.shimConnectionState(window);
        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        commonShim.removeAllowExtmapMixed(window);
        break;
      case 'firefox':
        if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
          logging('Firefox shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming firefox.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = firefoxShim;

        firefoxShim.shimGetUserMedia(window);
        firefoxShim.shimPeerConnection(window);
        firefoxShim.shimOnTrack(window);
        firefoxShim.shimRemoveStream(window);
        firefoxShim.shimSenderGetStats(window);
        firefoxShim.shimReceiverGetStats(window);
        firefoxShim.shimRTCDataChannel(window);
        firefoxShim.shimAddTransceiver(window);
        firefoxShim.shimCreateOffer(window);
        firefoxShim.shimCreateAnswer(window);

        commonShim.shimRTCIceCandidate(window);
        commonShim.shimConnectionState(window);
        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        break;
      case 'edge':
        if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
          logging('MS edge shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming edge.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = edgeShim;

        edgeShim.shimGetUserMedia(window);
        edgeShim.shimGetDisplayMedia(window);
        edgeShim.shimPeerConnection(window);
        edgeShim.shimReplaceTrack(window);

        // the edge shim implements the full RTCIceCandidate object.

        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        break;
      case 'safari':
        if (!safariShim || !options.shimSafari) {
          logging('Safari shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming safari.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = safariShim;

        safariShim.shimRTCIceServerUrls(window);
        safariShim.shimCreateOfferLegacy(window);
        safariShim.shimCallbacksAPI(window);
        safariShim.shimLocalStreamsAPI(window);
        safariShim.shimRemoteStreamsAPI(window);
        safariShim.shimTrackEventTransceiver(window);
        safariShim.shimGetUserMedia(window);

        commonShim.shimRTCIceCandidate(window);
        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        commonShim.removeAllowExtmapMixed(window);
        break;
      default:
        logging('Unsupported browser!');
        break;
    }

    return adapter;
  }

  // Browser shims.

  },{"./chrome/chrome_shim":3,"./common_shim":6,"./edge/edge_shim":7,"./firefox/firefox_shim":11,"./safari/safari_shim":14,"./utils":15}],3:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _getusermedia = require('./getusermedia');

  Object.defineProperty(exports, 'shimGetUserMedia', {
    enumerable: true,
    get: function get() {
      return _getusermedia.shimGetUserMedia;
    }
  });

  var _getdisplaymedia = require('./getdisplaymedia');

  Object.defineProperty(exports, 'shimGetDisplayMedia', {
    enumerable: true,
    get: function get() {
      return _getdisplaymedia.shimGetDisplayMedia;
    }
  });
  exports.shimMediaStream = shimMediaStream;
  exports.shimOnTrack = shimOnTrack;
  exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
  exports.shimGetStats = shimGetStats;
  exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
  exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
  exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
  exports.shimPeerConnection = shimPeerConnection;
  exports.fixNegotiationNeeded = fixNegotiationNeeded;

  var _utils = require('../utils.js');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function shimMediaStream(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
  }

  function shimOnTrack(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function get() {
          return this._ontrack;
        },
        set: function set(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
          }
          this.addEventListener('track', this._ontrack = f);
        },

        enumerable: true,
        configurable: true
      });
      var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        var _this = this;

        if (!this._ontrackpoly) {
          this._ontrackpoly = function (e) {
            // onaddstream does not fire when a track is added to an existing
            // stream. But stream.onaddtrack is implemented so we use that.
            e.stream.addEventListener('addtrack', function (te) {
              var receiver = void 0;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = _this.getReceivers().find(function (r) {
                  return r.track && r.track.id === te.track.id;
                });
              } else {
                receiver = { track: te.track };
              }

              var event = new Event('track');
              event.track = te.track;
              event.receiver = receiver;
              event.transceiver = { receiver: receiver };
              event.streams = [e.stream];
              _this.dispatchEvent(event);
            });
            e.stream.getTracks().forEach(function (track) {
              var receiver = void 0;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = _this.getReceivers().find(function (r) {
                  return r.track && r.track.id === track.id;
                });
              } else {
                receiver = { track: track };
              }
              var event = new Event('track');
              event.track = track;
              event.receiver = receiver;
              event.transceiver = { receiver: receiver };
              event.streams = [e.stream];
              _this.dispatchEvent(event);
            });
          };
          this.addEventListener('addstream', this._ontrackpoly);
        }
        return origSetRemoteDescription.apply(this, arguments);
      };
    } else {
      // even if RTCRtpTransceiver is in window, it is only used and
      // emitted in unified-plan. Unfortunately this means we need
      // to unconditionally wrap the event.
      utils.wrapPeerConnectionEvent(window, 'track', function (e) {
        if (!e.transceiver) {
          Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } });
        }
        return e;
      });
    }
  }

  function shimGetSendersWithDtmf(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
      var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
        return {
          track: track,
          get dtmf() {
            if (this._dtmf === undefined) {
              if (track.kind === 'audio') {
                this._dtmf = pc.createDTMFSender(track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          },
          _pc: pc
        };
      };

      // augment addTrack when getSenders is not available.
      if (!window.RTCPeerConnection.prototype.getSenders) {
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          this._senders = this._senders || [];
          return this._senders.slice(); // return a copy of the internal state.
        };
        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
          var sender = origAddTrack.apply(this, arguments);
          if (!sender) {
            sender = shimSenderWithDtmf(this, track);
            this._senders.push(sender);
          }
          return sender;
        };

        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
        window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
          origRemoveTrack.apply(this, arguments);
          var idx = this._senders.indexOf(sender);
          if (idx !== -1) {
            this._senders.splice(idx, 1);
          }
        };
      }
      var origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        var _this2 = this;

        this._senders = this._senders || [];
        origAddStream.apply(this, [stream]);
        stream.getTracks().forEach(function (track) {
          _this2._senders.push(shimSenderWithDtmf(_this2, track));
        });
      };

      var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        var _this3 = this;

        this._senders = this._senders || [];
        origRemoveStream.apply(this, [stream]);

        stream.getTracks().forEach(function (track) {
          var sender = _this3._senders.find(function (s) {
            return s.track === track;
          });
          if (sender) {
            // remove sender
            _this3._senders.splice(_this3._senders.indexOf(sender), 1);
          }
        });
      };
    } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        var _this4 = this;

        var senders = origGetSenders.apply(this, []);
        senders.forEach(function (sender) {
          return sender._pc = _this4;
        });
        return senders;
      };

      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function get() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = this._pc.createDTMFSender(this.track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
  }

  function shimGetStats(window) {
    if (!window.RTCPeerConnection) {
      return;
    }

    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
      var _this5 = this;

      var _arguments = Array.prototype.slice.call(arguments),
          selector = _arguments[0],
          onSucc = _arguments[1],
          onErr = _arguments[2];

      // If selector is a function then we are in the old style stats so just
      // pass back the original getStats format to avoid breaking old users.


      if (arguments.length > 0 && typeof selector === 'function') {
        return origGetStats.apply(this, arguments);
      }

      // When spec-style getStats is supported, return those when called with
      // either no arguments or the selector argument is null.
      if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
        return origGetStats.apply(this, []);
      }

      var fixChromeStats_ = function fixChromeStats_(response) {
        var standardReport = {};
        var reports = response.result();
        reports.forEach(function (report) {
          var standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: {
              localcandidate: 'local-candidate',
              remotecandidate: 'remote-candidate'
            }[report.type] || report.type
          };
          report.names().forEach(function (name) {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });

        return standardReport;
      };

      // shim getStats with maplike support
      var makeMapStats = function makeMapStats(stats) {
        return new Map(Object.keys(stats).map(function (key) {
          return [key, stats[key]];
        }));
      };

      if (arguments.length >= 2) {
        var successCallbackWrapper_ = function successCallbackWrapper_(response) {
          onSucc(makeMapStats(fixChromeStats_(response)));
        };

        return origGetStats.apply(this, [successCallbackWrapper_, selector]);
      }

      // promise-support
      return new Promise(function (resolve, reject) {
        origGetStats.apply(_this5, [function (response) {
          resolve(makeMapStats(fixChromeStats_(response)));
        }, reject]);
      }).then(onSucc, onErr);
    };
  }

  function shimSenderReceiverGetStats(window) {
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
      return;
    }

    // shim sender stats.
    if (!('getStats' in window.RTCRtpSender.prototype)) {
      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      if (origGetSenders) {
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          var _this6 = this;

          var senders = origGetSenders.apply(this, []);
          senders.forEach(function (sender) {
            return sender._pc = _this6;
          });
          return senders;
        };
      }

      var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      if (origAddTrack) {
        window.RTCPeerConnection.prototype.addTrack = function addTrack() {
          var sender = origAddTrack.apply(this, arguments);
          sender._pc = this;
          return sender;
        };
      }
      window.RTCRtpSender.prototype.getStats = function getStats() {
        var sender = this;
        return this._pc.getStats().then(function (result) {
          return (
            /* Note: this will include stats of all senders that
             *   send a track with the same id as sender.track as
             *   it is not possible to identify the RTCRtpSender.
             */
            utils.filterStats(result, sender.track, true)
          );
        });
      };
    }

    // shim receiver stats.
    if (!('getStats' in window.RTCRtpReceiver.prototype)) {
      var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
      if (origGetReceivers) {
        window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
          var _this7 = this;

          var receivers = origGetReceivers.apply(this, []);
          receivers.forEach(function (receiver) {
            return receiver._pc = _this7;
          });
          return receivers;
        };
      }
      utils.wrapPeerConnectionEvent(window, 'track', function (e) {
        e.receiver._pc = e.srcElement;
        return e;
      });
      window.RTCRtpReceiver.prototype.getStats = function getStats() {
        var receiver = this;
        return this._pc.getStats().then(function (result) {
          return utils.filterStats(result, receiver.track, false);
        });
      };
    }

    if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
      return;
    }

    // shim RTCPeerConnection.getStats(track).
    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
      if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
        var track = arguments[0];
        var sender = void 0;
        var receiver = void 0;
        var err = void 0;
        this.getSenders().forEach(function (s) {
          if (s.track === track) {
            if (sender) {
              err = true;
            } else {
              sender = s;
            }
          }
        });
        this.getReceivers().forEach(function (r) {
          if (r.track === track) {
            if (receiver) {
              err = true;
            } else {
              receiver = r;
            }
          }
          return r.track === track;
        });
        if (err || sender && receiver) {
          return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
        } else if (sender) {
          return sender.getStats();
        } else if (receiver) {
          return receiver.getStats();
        }
        return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
      }
      return origGetStats.apply(this, arguments);
    };
  }

  function shimAddTrackRemoveTrackWithNative(window) {
    // shim addTrack/removeTrack with native variants in order to make
    // the interactions with legacy getLocalStreams behave as in other browsers.
    // Keeps a mapping stream.id => [stream, rtpsenders...]
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      var _this8 = this;

      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
        return _this8._shimmedLocalStreams[streamId][0];
      });
    };

    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
      if (!stream) {
        return origAddTrack.apply(this, arguments);
      }
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};

      var sender = origAddTrack.apply(this, arguments);
      if (!this._shimmedLocalStreams[stream.id]) {
        this._shimmedLocalStreams[stream.id] = [stream, sender];
      } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
        this._shimmedLocalStreams[stream.id].push(sender);
      }
      return sender;
    };

    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      var _this9 = this;

      this._shimmedLocalStreams = this._shimmedLocalStreams || {};

      stream.getTracks().forEach(function (track) {
        var alreadyExists = _this9.getSenders().find(function (s) {
          return s.track === track;
        });
        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }
      });
      var existingSenders = this.getSenders();
      origAddStream.apply(this, arguments);
      var newSenders = this.getSenders().filter(function (newSender) {
        return existingSenders.indexOf(newSender) === -1;
      });
      this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
    };

    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      delete this._shimmedLocalStreams[stream.id];
      return origRemoveStream.apply(this, arguments);
    };

    var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
      var _this10 = this;

      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      if (sender) {
        Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
          var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
          if (idx !== -1) {
            _this10._shimmedLocalStreams[streamId].splice(idx, 1);
          }
          if (_this10._shimmedLocalStreams[streamId].length === 1) {
            delete _this10._shimmedLocalStreams[streamId];
          }
        });
      }
      return origRemoveTrack.apply(this, arguments);
    };
  }

  function shimAddTrackRemoveTrack(window) {
    if (!window.RTCPeerConnection) {
      return;
    }
    var browserDetails = utils.detectBrowser(window);
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
      return shimAddTrackRemoveTrackWithNative(window);
    }

    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      var _this11 = this;

      var nativeStreams = origGetLocalStreams.apply(this);
      this._reverseStreams = this._reverseStreams || {};
      return nativeStreams.map(function (stream) {
        return _this11._reverseStreams[stream.id];
      });
    };

    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      var _this12 = this;

      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};

      stream.getTracks().forEach(function (track) {
        var alreadyExists = _this12.getSenders().find(function (s) {
          return s.track === track;
        });
        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }
      });
      // Add identity mapping for consistency with addTrack.
      // Unless this is being used with a stream from addTrack.
      if (!this._reverseStreams[stream.id]) {
        var newStream = new window.MediaStream(stream.getTracks());
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        stream = newStream;
      }
      origAddStream.apply(this, [stream]);
    };

    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};

      origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
      delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
      delete this._streams[stream.id];
    };

    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
      var _this13 = this;

      if (this.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      var streams = [].slice.call(arguments, 1);
      if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
        return t === track;
      })) {
        // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
      }

      var alreadyExists = this.getSenders().find(function (s) {
        return s.track === track;
      });
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }

      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      var oldStream = this._streams[stream.id];
      if (oldStream) {
        // this is using odd Chrome behaviour, use with caution:
        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
        // Note: we rely on the high-level addTrack/dtmf shim to
        // create the sender with a dtmf sender.
        oldStream.addTrack(track);

        // Trigger ONN async.
        Promise.resolve().then(function () {
          _this13.dispatchEvent(new Event('negotiationneeded'));
        });
      } else {
        var newStream = new window.MediaStream([track]);
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        this.addStream(newStream);
      }
      return this.getSenders().find(function (s) {
        return s.track === track;
      });
    };

    // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    function replaceExternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    ['createOffer', 'createAnswer'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      var methodObj = _defineProperty({}, method, function () {
        var _this14 = this;

        var args = arguments;
        var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
        if (isLegacyCall) {
          return nativeMethod.apply(this, [function (description) {
            var desc = replaceInternalStreamId(_this14, description);
            args[0].apply(null, [desc]);
          }, function (err) {
            if (args[1]) {
              args[1].apply(null, err);
            }
          }, arguments[2]]);
        }
        return nativeMethod.apply(this, arguments).then(function (description) {
          return replaceInternalStreamId(_this14, description);
        });
      });
      window.RTCPeerConnection.prototype[method] = methodObj[method];
    });

    var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
      if (!arguments.length || !arguments[0].type) {
        return origSetLocalDescription.apply(this, arguments);
      }
      arguments[0] = replaceExternalStreamId(this, arguments[0]);
      return origSetLocalDescription.apply(this, arguments);
    };

    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

    var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
    Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
      get: function get() {
        var description = origLocalDescription.get.apply(this);
        if (description.type === '') {
          return description;
        }
        return replaceInternalStreamId(this, description);
      }
    });

    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
      var _this15 = this;

      if (this.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      // We can not yet check for sender instanceof RTCRtpSender
      // since we shim RTPSender. So we check if sender._pc is set.
      if (!sender._pc) {
        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
      }
      var isLocal = sender._pc === this;
      if (!isLocal) {
        throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
      }

      // Search for the native stream the senders track belongs to.
      this._streams = this._streams || {};
      var stream = void 0;
      Object.keys(this._streams).forEach(function (streamid) {
        var hasTrack = _this15._streams[streamid].getTracks().find(function (track) {
          return sender.track === track;
        });
        if (hasTrack) {
          stream = _this15._streams[streamid];
        }
      });

      if (stream) {
        if (stream.getTracks().length === 1) {
          // if this is the last track of the stream, remove the stream. This
          // takes care of any shimmed _senders.
          this.removeStream(this._reverseStreams[stream.id]);
        } else {
          // relying on the same odd chrome behaviour as above.
          stream.removeTrack(sender.track);
        }
        this.dispatchEvent(new Event('negotiationneeded'));
      }
    };
  }

  function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
      // very basic support for old versions.
      window.RTCPeerConnection = window.webkitRTCPeerConnection;
    }
    if (!window.RTCPeerConnection) {
      return;
    }

    var addIceCandidateNullSupported = window.RTCPeerConnection.prototype.addIceCandidate.length === 0;

    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    if (browserDetails.version < 53) {
      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        var methodObj = _defineProperty({}, method, function () {
          arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
          return nativeMethod.apply(this, arguments);
        });
        window.RTCPeerConnection.prototype[method] = methodObj[method];
      });
    }

    // support for addIceCandidate(null or undefined)
    var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
      if (!addIceCandidateNullSupported && !arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      // Firefox 68+ emits and processes {candidate: "", ...}, ignore
      // in older versions. Native support planned for Chrome M77.
      if (browserDetails.version < 78 && arguments[0] && arguments[0].candidate === '') {
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };
  }

  function fixNegotiationNeeded(window) {
    utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
      var pc = e.target;
      if (pc.signalingState !== 'stable') {
        return;
      }
      return e;
    });
  }

  },{"../utils.js":15,"./getdisplaymedia":4,"./getusermedia":5}],4:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = shimGetDisplayMedia;
  function shimGetDisplayMedia(window, getSourceId) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    // getSourceId is a function that returns a promise resolving with
    // the sourceId of the screen/window/tab to be shared.
    if (typeof getSourceId !== 'function') {
      console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
      return getSourceId(constraints).then(function (sourceId) {
        var widthSpecified = constraints.video && constraints.video.width;
        var heightSpecified = constraints.video && constraints.video.height;
        var frameRateSpecified = constraints.video && constraints.video.frameRate;
        constraints.video = {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            maxFrameRate: frameRateSpecified || 3
          }
        };
        if (widthSpecified) {
          constraints.video.mandatory.maxWidth = widthSpecified;
        }
        if (heightSpecified) {
          constraints.video.mandatory.maxHeight = heightSpecified;
        }
        return window.navigator.mediaDevices.getUserMedia(constraints);
      });
    };
  }

  },{}],5:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimGetUserMedia = shimGetUserMedia;

  var _utils = require('../utils.js');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  var logging = utils.log;

  function shimGetUserMedia(window) {
    var navigator = window && window.navigator;

    if (!navigator.mediaDevices) {
      return;
    }

    var browserDetails = utils.detectBrowser(window);

    var constraintsToChrome_ = function constraintsToChrome_(c) {
      if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
        return c;
      }
      var cc = {};
      Object.keys(c).forEach(function (key) {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        var r = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
        if (r.exact !== undefined && typeof r.exact === 'number') {
          r.min = r.max = r.exact;
        }
        var oldname_ = function oldname_(prefix, name) {
          if (prefix) {
            return prefix + name.charAt(0).toUpperCase() + name.slice(1);
          }
          return name === 'deviceId' ? 'sourceId' : name;
        };
        if (r.ideal !== undefined) {
          cc.optional = cc.optional || [];
          var oc = {};
          if (typeof r.ideal === 'number') {
            oc[oldname_('min', key)] = r.ideal;
            cc.optional.push(oc);
            oc = {};
            oc[oldname_('max', key)] = r.ideal;
            cc.optional.push(oc);
          } else {
            oc[oldname_('', key)] = r.ideal;
            cc.optional.push(oc);
          }
        }
        if (r.exact !== undefined && typeof r.exact !== 'number') {
          cc.mandatory = cc.mandatory || {};
          cc.mandatory[oldname_('', key)] = r.exact;
        } else {
          ['min', 'max'].forEach(function (mix) {
            if (r[mix] !== undefined) {
              cc.mandatory = cc.mandatory || {};
              cc.mandatory[oldname_(mix, key)] = r[mix];
            }
          });
        }
      });
      if (c.advanced) {
        cc.optional = (cc.optional || []).concat(c.advanced);
      }
      return cc;
    };

    var shimConstraints_ = function shimConstraints_(constraints, func) {
      if (browserDetails.version >= 61) {
        return func(constraints);
      }
      constraints = JSON.parse(JSON.stringify(constraints));
      if (constraints && _typeof(constraints.audio) === 'object') {
        var remap = function remap(obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };
        constraints = JSON.parse(JSON.stringify(constraints));
        remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
        remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
        constraints.audio = constraintsToChrome_(constraints.audio);
      }
      if (constraints && _typeof(constraints.video) === 'object') {
        // Shim facingMode for mobile & surface pro.
        var face = constraints.video.facingMode;
        face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : { ideal: face });
        var getSupportedFacingModeLies = browserDetails.version < 66;

        if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
          delete constraints.video.facingMode;
          var matches = void 0;
          if (face.exact === 'environment' || face.ideal === 'environment') {
            matches = ['back', 'rear'];
          } else if (face.exact === 'user' || face.ideal === 'user') {
            matches = ['front'];
          }
          if (matches) {
            // Look for matches in label, or use last cam for back (typical).
            return navigator.mediaDevices.enumerateDevices().then(function (devices) {
              devices = devices.filter(function (d) {
                return d.kind === 'videoinput';
              });
              var dev = devices.find(function (d) {
                return matches.some(function (match) {
                  return d.label.toLowerCase().includes(match);
                });
              });
              if (!dev && devices.length && matches.includes('back')) {
                dev = devices[devices.length - 1]; // more likely the back cam
              }
              if (dev) {
                constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
              }
              constraints.video = constraintsToChrome_(constraints.video);
              logging('chrome: ' + JSON.stringify(constraints));
              return func(constraints);
            });
          }
        }
        constraints.video = constraintsToChrome_(constraints.video);
      }
      logging('chrome: ' + JSON.stringify(constraints));
      return func(constraints);
    };

    var shimError_ = function shimError_(e) {
      if (browserDetails.version >= 64) {
        return e;
      }
      return {
        name: {
          PermissionDeniedError: 'NotAllowedError',
          PermissionDismissedError: 'NotAllowedError',
          InvalidStateError: 'NotAllowedError',
          DevicesNotFoundError: 'NotFoundError',
          ConstraintNotSatisfiedError: 'OverconstrainedError',
          TrackStartError: 'NotReadableError',
          MediaDeviceFailedDueToShutdown: 'NotAllowedError',
          MediaDeviceKillSwitchOn: 'NotAllowedError',
          TabCaptureError: 'AbortError',
          ScreenCaptureError: 'AbortError',
          DeviceCaptureError: 'AbortError'
        }[e.name] || e.name,
        message: e.message,
        constraint: e.constraint || e.constraintName,
        toString: function toString() {
          return this.name + (this.message && ': ') + this.message;
        }
      };
    };

    var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
      shimConstraints_(constraints, function (c) {
        navigator.webkitGetUserMedia(c, onSuccess, function (e) {
          if (onError) {
            onError(shimError_(e));
          }
        });
      });
    };
    navigator.getUserMedia = getUserMedia_.bind(navigator);

    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    if (navigator.mediaDevices.getUserMedia) {
      var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function (cs) {
        return shimConstraints_(cs, function (c) {
          return origGetUserMedia(c).then(function (stream) {
            if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
              stream.getTracks().forEach(function (track) {
                track.stop();
              });
              throw new DOMException('', 'NotFoundError');
            }
            return stream;
          }, function (e) {
            return Promise.reject(shimError_(e));
          });
        });
      };
    }
  }

  },{"../utils.js":15}],6:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimRTCIceCandidate = shimRTCIceCandidate;
  exports.shimMaxMessageSize = shimMaxMessageSize;
  exports.shimSendThrowTypeError = shimSendThrowTypeError;
  exports.shimConnectionState = shimConnectionState;
  exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

  var _sdp = require('sdp');

  var _sdp2 = _interopRequireDefault(_sdp);

  var _utils = require('./utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function shimRTCIceCandidate(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
      return;
    }

    var NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function RTCIceCandidate(args) {
      // Remove the a= which shouldn't be part of the candidate string.
      if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
        args = JSON.parse(JSON.stringify(args));
        args.candidate = args.candidate.substr(2);
      }

      if (args.candidate && args.candidate.length) {
        // Augment the native candidate with the parsed fields.
        var nativeCandidate = new NativeRTCIceCandidate(args);
        var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
        var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

        // Add a serializer that does not serialize the extra attributes.
        augmentedCandidate.toJSON = function toJSON() {
          return {
            candidate: augmentedCandidate.candidate,
            sdpMid: augmentedCandidate.sdpMid,
            sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
            usernameFragment: augmentedCandidate.usernameFragment
          };
        };
        return augmentedCandidate;
      }
      return new NativeRTCIceCandidate(args);
    };
    window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
      if (e.candidate) {
        Object.defineProperty(e, 'candidate', {
          value: new window.RTCIceCandidate(e.candidate),
          writable: 'false'
        });
      }
      return e;
    });
  }

  function shimMaxMessageSize(window) {
    if (!window.RTCPeerConnection) {
      return;
    }
    var browserDetails = utils.detectBrowser(window);

    if (!('sctp' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
        get: function get() {
          return typeof this._sctp === 'undefined' ? null : this._sctp;
        }
      });
    }

    var sctpInDescription = function sctpInDescription(description) {
      if (!description || !description.sdp) {
        return false;
      }
      var sections = _sdp2.default.splitSections(description.sdp);
      sections.shift();
      return sections.some(function (mediaSection) {
        var mLine = _sdp2.default.parseMLine(mediaSection);
        return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
      });
    };

    var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
      // TODO: Is there a better solution for detecting Firefox?
      var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
      if (match === null || match.length < 2) {
        return -1;
      }
      var version = parseInt(match[1], 10);
      // Test for NaN (yes, this is ugly)
      return version !== version ? -1 : version;
    };

    var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
      // Every implementation we know can send at least 64 KiB.
      // Note: Although Chrome is technically able to send up to 256 KiB, the
      //       data does not reach the other peer reliably.
      //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
      var canSendMaxMessageSize = 65536;
      if (browserDetails.browser === 'firefox') {
        if (browserDetails.version < 57) {
          if (remoteIsFirefox === -1) {
            // FF < 57 will send in 16 KiB chunks using the deprecated PPID
            // fragmentation.
            canSendMaxMessageSize = 16384;
          } else {
            // However, other FF (and RAWRTC) can reassemble PPID-fragmented
            // messages. Thus, supporting ~2 GiB when sending.
            canSendMaxMessageSize = 2147483637;
          }
        } else if (browserDetails.version < 60) {
          // Currently, all FF >= 57 will reset the remote maximum message size
          // to the default value when a data channel is created at a later
          // stage. :(
          // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
          canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
        } else {
          // FF >= 60 supports sending ~2 GiB
          canSendMaxMessageSize = 2147483637;
        }
      }
      return canSendMaxMessageSize;
    };

    var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
      // Note: 65536 bytes is the default value from the SDP spec. Also,
      //       every implementation we know supports receiving 65536 bytes.
      var maxMessageSize = 65536;

      // FF 57 has a slightly incorrect default remote max message size, so
      // we need to adjust it here to avoid a failure when sending.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
      if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
        maxMessageSize = 65535;
      }

      var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');
      if (match.length > 0) {
        maxMessageSize = parseInt(match[0].substr(19), 10);
      } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
        // If the maximum message size is not present in the remote SDP and
        // both local and remote are Firefox, the remote peer can receive
        // ~2 GiB.
        maxMessageSize = 2147483637;
      }
      return maxMessageSize;
    };

    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
      this._sctp = null;
      // Chrome decided to not expose .sctp in plan-b mode.
      // As usual, adapter.js has to do an 'ugly worakaround'
      // to cover up the mess.
      if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
        var _getConfiguration = this.getConfiguration(),
            sdpSemantics = _getConfiguration.sdpSemantics;

        if (sdpSemantics === 'plan-b') {
          Object.defineProperty(this, 'sctp', {
            get: function get() {
              return typeof this._sctp === 'undefined' ? null : this._sctp;
            },

            enumerable: true,
            configurable: true
          });
        }
      }

      if (sctpInDescription(arguments[0])) {
        // Check if the remote is FF.
        var isFirefox = getRemoteFirefoxVersion(arguments[0]);

        // Get the maximum message size the local peer is capable of sending
        var canSendMMS = getCanSendMaxMessageSize(isFirefox);

        // Get the maximum message size of the remote peer.
        var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

        // Determine final maximum message size
        var maxMessageSize = void 0;
        if (canSendMMS === 0 && remoteMMS === 0) {
          maxMessageSize = Number.POSITIVE_INFINITY;
        } else if (canSendMMS === 0 || remoteMMS === 0) {
          maxMessageSize = Math.max(canSendMMS, remoteMMS);
        } else {
          maxMessageSize = Math.min(canSendMMS, remoteMMS);
        }

        // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
        // attribute.
        var sctp = {};
        Object.defineProperty(sctp, 'maxMessageSize', {
          get: function get() {
            return maxMessageSize;
          }
        });
        this._sctp = sctp;
      }

      return origSetRemoteDescription.apply(this, arguments);
    };
  }

  function shimSendThrowTypeError(window) {
    if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
      return;
    }

    // Note: Although Firefox >= 57 has a native implementation, the maximum
    //       message size can be reset for all data channels at a later stage.
    //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

    function wrapDcSend(dc, pc) {
      var origDataChannelSend = dc.send;
      dc.send = function send() {
        var data = arguments[0];
        var length = data.length || data.size || data.byteLength;
        if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
          throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
        }
        return origDataChannelSend.apply(dc, arguments);
      };
    }
    var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
    window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
      var dataChannel = origCreateDataChannel.apply(this, arguments);
      wrapDcSend(dataChannel, this);
      return dataChannel;
    };
    utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
      wrapDcSend(e.channel, e.target);
      return e;
    });
  }

  /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
   * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
   * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
   * since DTLS failures would be hidden. See
   * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
   * for the Firefox tracking bug.
   */
  function shimConnectionState(window) {
    if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
      return;
    }
    var proto = window.RTCPeerConnection.prototype;
    Object.defineProperty(proto, 'connectionState', {
      get: function get() {
        return {
          completed: 'connected',
          checking: 'connecting'
        }[this.iceConnectionState] || this.iceConnectionState;
      },

      enumerable: true,
      configurable: true
    });
    Object.defineProperty(proto, 'onconnectionstatechange', {
      get: function get() {
        return this._onconnectionstatechange || null;
      },
      set: function set(cb) {
        if (this._onconnectionstatechange) {
          this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
          delete this._onconnectionstatechange;
        }
        if (cb) {
          this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
        }
      },

      enumerable: true,
      configurable: true
    });

    ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
      var origMethod = proto[method];
      proto[method] = function () {
        if (!this._connectionstatechangepoly) {
          this._connectionstatechangepoly = function (e) {
            var pc = e.target;
            if (pc._lastConnectionState !== pc.connectionState) {
              pc._lastConnectionState = pc.connectionState;
              var newEvent = new Event('connectionstatechange', e);
              pc.dispatchEvent(newEvent);
            }
            return e;
          };
          this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
        }
        return origMethod.apply(this, arguments);
      };
    });
  }

  function removeAllowExtmapMixed(window) {
    /* remove a=extmap-allow-mixed for Chrome < M71 */
    if (!window.RTCPeerConnection) {
      return;
    }
    var browserDetails = utils.detectBrowser(window);
    if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
      return;
    }
    var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
      if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
        desc.sdp = desc.sdp.split('\n').filter(function (line) {
          return line.trim() !== 'a=extmap-allow-mixed';
        }).join('\n');
      }
      return nativeSRD.apply(this, arguments);
    };
  }

  },{"./utils":15,"sdp":17}],7:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

  var _getusermedia = require('./getusermedia');

  Object.defineProperty(exports, 'shimGetUserMedia', {
    enumerable: true,
    get: function get() {
      return _getusermedia.shimGetUserMedia;
    }
  });

  var _getdisplaymedia = require('./getdisplaymedia');

  Object.defineProperty(exports, 'shimGetDisplayMedia', {
    enumerable: true,
    get: function get() {
      return _getdisplaymedia.shimGetDisplayMedia;
    }
  });
  exports.shimPeerConnection = shimPeerConnection;
  exports.shimReplaceTrack = shimReplaceTrack;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  var _filtericeservers = require('./filtericeservers');

  var _rtcpeerconnectionShim = require('rtcpeerconnection-shim');

  var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    if (window.RTCIceGatherer) {
      if (!window.RTCIceCandidate) {
        window.RTCIceCandidate = function RTCIceCandidate(args) {
          return args;
        };
      }
      if (!window.RTCSessionDescription) {
        window.RTCSessionDescription = function RTCSessionDescription(args) {
          return args;
        };
      }
      // this adds an additional event listener to MediaStrackTrack that signals
      // when a tracks enabled property was changed. Workaround for a bug in
      // addStream, see below. No longer required in 15025+
      if (browserDetails.version < 15025) {
        var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
          set: function set(value) {
            origMSTEnabled.set.call(this, value);
            var ev = new Event('enabled');
            ev.enabled = value;
            this.dispatchEvent(ev);
          }
        });
      }
    }

    // ORTC defines the DTMF sender a bit different.
    // https://github.com/w3c/ortc/issues/714
    if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function get() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = new window.RTCDtmfSender(this);
            } else if (this.track.kind === 'video') {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
    // Edge currently only implements the RTCDtmfSender, not the
    // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
    if (window.RTCDtmfSender && !window.RTCDTMFSender) {
      window.RTCDTMFSender = window.RTCDtmfSender;
    }

    var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
    window.RTCPeerConnection = function RTCPeerConnection(config) {
      if (config && config.iceServers) {
        config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
        utils.log('ICE servers after filtering:', config.iceServers);
      }
      return new RTCPeerConnectionShim(config);
    };
    window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
  }

  function shimReplaceTrack(window) {
    // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
    if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
      window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
    }
  }

  },{"../utils":15,"./filtericeservers":8,"./getdisplaymedia":9,"./getusermedia":10,"rtcpeerconnection-shim":16}],8:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.filterIceServers = filterIceServers;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  // Edge does not like
  // 1) stun: filtered after 14393 unless ?transport=udp is present
  // 2) turn: that does not have all of turn:host:port?transport=udp
  // 3) turn: with ipv6 addresses
  // 4) turn: occurring muliple times
  function filterIceServers(iceServers, edgeVersion) {
    var hasTurn = false;
    iceServers = JSON.parse(JSON.stringify(iceServers));
    return iceServers.filter(function (server) {
      if (server && (server.urls || server.url)) {
        var urls = server.urls || server.url;
        if (server.url && !server.urls) {
          utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
        }
        var isString = typeof urls === 'string';
        if (isString) {
          urls = [urls];
        }
        urls = urls.filter(function (url) {
          // filter STUN unconditionally.
          if (url.indexOf('stun:') === 0) {
            return false;
          }

          var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
          if (validTurn && !hasTurn) {
            hasTurn = true;
            return true;
          }
          return validTurn && !hasTurn;
        });

        delete server.url;
        server.urls = isString ? urls[0] : urls;
        return !!urls.length;
      }
    });
  }

  },{"../utils":15}],9:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = shimGetDisplayMedia;
  function shimGetDisplayMedia(window) {
    if (!('getDisplayMedia' in window.navigator)) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
  }

  },{}],10:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetUserMedia = shimGetUserMedia;
  function shimGetUserMedia(window) {
    var navigator = window && window.navigator;

    var shimError_ = function shimError_(e) {
      return {
        name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
        message: e.message,
        constraint: e.constraint,
        toString: function toString() {
          return this.name;
        }
      };
    };

    // getUserMedia error shim.
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (c) {
      return origGetUserMedia(c).catch(function (e) {
        return Promise.reject(shimError_(e));
      });
    };
  }

  },{}],11:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _getusermedia = require('./getusermedia');

  Object.defineProperty(exports, 'shimGetUserMedia', {
    enumerable: true,
    get: function get() {
      return _getusermedia.shimGetUserMedia;
    }
  });

  var _getdisplaymedia = require('./getdisplaymedia');

  Object.defineProperty(exports, 'shimGetDisplayMedia', {
    enumerable: true,
    get: function get() {
      return _getdisplaymedia.shimGetDisplayMedia;
    }
  });
  exports.shimOnTrack = shimOnTrack;
  exports.shimPeerConnection = shimPeerConnection;
  exports.shimSenderGetStats = shimSenderGetStats;
  exports.shimReceiverGetStats = shimReceiverGetStats;
  exports.shimRemoveStream = shimRemoveStream;
  exports.shimRTCDataChannel = shimRTCDataChannel;
  exports.shimAddTransceiver = shimAddTransceiver;
  exports.shimCreateOffer = shimCreateOffer;
  exports.shimCreateAnswer = shimCreateAnswer;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function shimOnTrack(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function get() {
          return { receiver: this.receiver };
        }
      });
    }
  }

  function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
      return; // probably media.peerconnection.enabled=false in about:config
    }
    if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
      // very basic support for old versions.
      window.RTCPeerConnection = window.mozRTCPeerConnection;
    }

    if (browserDetails.version < 53) {
      // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        var methodObj = _defineProperty({}, method, function () {
          arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
          return nativeMethod.apply(this, arguments);
        });
        window.RTCPeerConnection.prototype[method] = methodObj[method];
      });
    }

    // support for addIceCandidate(null or undefined)
    // as well as ignoring {sdpMid, candidate: ""}
    if (browserDetails.version < 68) {
      var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
      window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
        if (!arguments[0]) {
          if (arguments[1]) {
            arguments[1].apply(null);
          }
          return Promise.resolve();
        }
        // Firefox 68+ emits and processes {candidate: "", ...}, ignore
        // in older versions.
        if (arguments[0] && arguments[0].candidate === '') {
          return Promise.resolve();
        }
        return nativeAddIceCandidate.apply(this, arguments);
      };
    }

    var modernStatsTypes = {
      inboundrtp: 'inbound-rtp',
      outboundrtp: 'outbound-rtp',
      candidatepair: 'candidate-pair',
      localcandidate: 'local-candidate',
      remotecandidate: 'remote-candidate'
    };

    var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
      var _arguments = Array.prototype.slice.call(arguments),
          selector = _arguments[0],
          onSucc = _arguments[1],
          onErr = _arguments[2];

      return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
        if (browserDetails.version < 53 && !onSucc) {
          // Shim only promise getStats with spec-hyphens in type names
          // Leave callback version alone; misc old uses of forEach before Map
          try {
            stats.forEach(function (stat) {
              stat.type = modernStatsTypes[stat.type] || stat.type;
            });
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }
            // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
            stats.forEach(function (stat, i) {
              stats.set(i, Object.assign({}, stat, {
                type: modernStatsTypes[stat.type] || stat.type
              }));
            });
          }
        }
        return stats;
      }).then(onSucc, onErr);
    };
  }

  function shimSenderGetStats(window) {
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
      return;
    }
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
      return;
    }
    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) {
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        var _this = this;

        var senders = origGetSenders.apply(this, []);
        senders.forEach(function (sender) {
          return sender._pc = _this;
        });
        return senders;
      };
    }

    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) {
      window.RTCPeerConnection.prototype.addTrack = function addTrack() {
        var sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
      };
    }
    window.RTCRtpSender.prototype.getStats = function getStats() {
      return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
    };
  }

  function shimReceiverGetStats(window) {
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
      return;
    }
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
      return;
    }
    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) {
      window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        var _this2 = this;

        var receivers = origGetReceivers.apply(this, []);
        receivers.forEach(function (receiver) {
          return receiver._pc = _this2;
        });
        return receivers;
      };
    }
    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
      e.receiver._pc = e.srcElement;
      return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function getStats() {
      return this._pc.getStats(this.track);
    };
  }

  function shimRemoveStream(window) {
    if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
      return;
    }
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      var _this3 = this;

      utils.deprecated('removeStream', 'removeTrack');
      this.getSenders().forEach(function (sender) {
        if (sender.track && stream.getTracks().includes(sender.track)) {
          _this3.removeTrack(sender);
        }
      });
    };
  }

  function shimRTCDataChannel(window) {
    // rename DataChannel to RTCDataChannel (native fix in FF60):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
    if (window.DataChannel && !window.RTCDataChannel) {
      window.RTCDataChannel = window.DataChannel;
    }
  }

  function shimAddTransceiver(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
      return;
    }
    var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
    if (origAddTransceiver) {
      window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
        this.setParametersPromises = [];
        var initParameters = arguments[1];
        var shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;
        if (shouldPerformCheck) {
          // If sendEncodings params are provided, validate grammar
          initParameters.sendEncodings.forEach(function (encodingParam) {
            if ('rid' in encodingParam) {
              var ridRegex = /^[a-z0-9]{0,16}$/i;
              if (!ridRegex.test(encodingParam.rid)) {
                throw new TypeError('Invalid RID value provided.');
              }
            }
            if ('scaleResolutionDownBy' in encodingParam) {
              if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                throw new RangeError('scale_resolution_down_by must be >= 1.0');
              }
            }
            if ('maxFramerate' in encodingParam) {
              if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                throw new RangeError('max_framerate must be >= 0.0');
              }
            }
          });
        }
        var transceiver = origAddTransceiver.apply(this, arguments);
        if (shouldPerformCheck) {
          // Check if the init options were applied. If not we do this in an
          // asynchronous way and save the promise reference in a global object.
          // This is an ugly hack, but at the same time is way more robust than
          // checking the sender parameters before and after the createOffer
          // Also note that after the createoffer we are not 100% sure that
          // the params were asynchronously applied so we might miss the
          // opportunity to recreate offer.
          var sender = transceiver.sender;

          var params = sender.getParameters();
          if (!('encodings' in params)) {
            params.encodings = initParameters.sendEncodings;
            this.setParametersPromises.push(sender.setParameters(params).catch(function () {}));
          }
        }
        return transceiver;
      };
    }
  }

  function shimCreateOffer(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
      return;
    }
    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer() {
      var _this4 = this,
          _arguments2 = arguments;

      if (this.setParametersPromises && this.setParametersPromises.length) {
        return Promise.all(this.setParametersPromises).then(function () {
          return origCreateOffer.apply(_this4, _arguments2);
        }).finally(function () {
          _this4.setParametersPromises = [];
        });
      }
      return origCreateOffer.apply(this, arguments);
    };
  }

  function shimCreateAnswer(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
      return;
    }
    var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
    window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
      var _this5 = this,
          _arguments3 = arguments;

      if (this.setParametersPromises && this.setParametersPromises.length) {
        return Promise.all(this.setParametersPromises).then(function () {
          return origCreateAnswer.apply(_this5, _arguments3);
        }).finally(function () {
          _this5.setParametersPromises = [];
        });
      }
      return origCreateAnswer.apply(this, arguments);
    };
  }

  },{"../utils":15,"./getdisplaymedia":12,"./getusermedia":13}],12:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = shimGetDisplayMedia;
  function shimGetDisplayMedia(window, preferredMediaSource) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
      if (!(constraints && constraints.video)) {
        var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
        err.name = 'NotFoundError';
        // from https://heycam.github.io/webidl/#idl-DOMException-error-names
        err.code = 8;
        return Promise.reject(err);
      }
      if (constraints.video === true) {
        constraints.video = { mediaSource: preferredMediaSource };
      } else {
        constraints.video.mediaSource = preferredMediaSource;
      }
      return window.navigator.mediaDevices.getUserMedia(constraints);
    };
  }

  },{}],13:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimGetUserMedia = shimGetUserMedia;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimGetUserMedia(window) {
    var browserDetails = utils.detectBrowser(window);
    var navigator = window && window.navigator;
    var MediaStreamTrack = window && window.MediaStreamTrack;

    navigator.getUserMedia = function (constraints, onSuccess, onError) {
      // Replace Firefox 44+'s deprecation warning with unprefixed version.
      utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    };

    if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
      var remap = function remap(obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };

      var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function (c) {
        if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
          remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
        }
        return nativeGetUserMedia(c);
      };

      if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
        var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
        MediaStreamTrack.prototype.getSettings = function () {
          var obj = nativeGetSettings.apply(this, arguments);
          remap(obj, 'mozAutoGainControl', 'autoGainControl');
          remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
          return obj;
        };
      }

      if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
        var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
        MediaStreamTrack.prototype.applyConstraints = function (c) {
          if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
            c = JSON.parse(JSON.stringify(c));
            remap(c, 'autoGainControl', 'mozAutoGainControl');
            remap(c, 'noiseSuppression', 'mozNoiseSuppression');
          }
          return nativeApplyConstraints.apply(this, [c]);
        };
      }
    }
  }

  },{"../utils":15}],14:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
  exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
  exports.shimCallbacksAPI = shimCallbacksAPI;
  exports.shimGetUserMedia = shimGetUserMedia;
  exports.shimConstraints = shimConstraints;
  exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
  exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
  exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimLocalStreamsAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        return this._localStreams;
      };
    }
    if (!('addStream' in window.RTCPeerConnection.prototype)) {
      var _addTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        var _this = this;

        if (!this._localStreams) {
          this._localStreams = [];
        }
        if (!this._localStreams.includes(stream)) {
          this._localStreams.push(stream);
        }
        // Try to emulate Chrome's behaviour of adding in audio-video order.
        // Safari orders by track id.
        stream.getAudioTracks().forEach(function (track) {
          return _addTrack.call(_this, track, stream);
        });
        stream.getVideoTracks().forEach(function (track) {
          return _addTrack.call(_this, track, stream);
        });
      };

      window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
        var _this2 = this;

        for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          streams[_key - 1] = arguments[_key];
        }

        if (streams) {
          streams.forEach(function (stream) {
            if (!_this2._localStreams) {
              _this2._localStreams = [stream];
            } else if (!_this2._localStreams.includes(stream)) {
              _this2._localStreams.push(stream);
            }
          });
        }
        return _addTrack.apply(this, arguments);
      };
    }
    if (!('removeStream' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        var _this3 = this;

        if (!this._localStreams) {
          this._localStreams = [];
        }
        var index = this._localStreams.indexOf(stream);
        if (index === -1) {
          return;
        }
        this._localStreams.splice(index, 1);
        var tracks = stream.getTracks();
        this.getSenders().forEach(function (sender) {
          if (tracks.includes(sender.track)) {
            _this3.removeTrack(sender);
          }
        });
      };
    }
  }

  function shimRemoteStreamsAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
        return this._remoteStreams ? this._remoteStreams : [];
      };
    }
    if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
        get: function get() {
          return this._onaddstream;
        },
        set: function set(f) {
          var _this4 = this;

          if (this._onaddstream) {
            this.removeEventListener('addstream', this._onaddstream);
            this.removeEventListener('track', this._onaddstreampoly);
          }
          this.addEventListener('addstream', this._onaddstream = f);
          this.addEventListener('track', this._onaddstreampoly = function (e) {
            e.streams.forEach(function (stream) {
              if (!_this4._remoteStreams) {
                _this4._remoteStreams = [];
              }
              if (_this4._remoteStreams.includes(stream)) {
                return;
              }
              _this4._remoteStreams.push(stream);
              var event = new Event('addstream');
              event.stream = stream;
              _this4.dispatchEvent(event);
            });
          });
        }
      });
      var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        var pc = this;
        if (!this._onaddstreampoly) {
          this.addEventListener('track', this._onaddstreampoly = function (e) {
            e.streams.forEach(function (stream) {
              if (!pc._remoteStreams) {
                pc._remoteStreams = [];
              }
              if (pc._remoteStreams.indexOf(stream) >= 0) {
                return;
              }
              pc._remoteStreams.push(stream);
              var event = new Event('addstream');
              event.stream = stream;
              pc.dispatchEvent(event);
            });
          });
        }
        return origSetRemoteDescription.apply(pc, arguments);
      };
    }
  }

  function shimCallbacksAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    var prototype = window.RTCPeerConnection.prototype;
    var origCreateOffer = prototype.createOffer;
    var origCreateAnswer = prototype.createAnswer;
    var setLocalDescription = prototype.setLocalDescription;
    var setRemoteDescription = prototype.setRemoteDescription;
    var addIceCandidate = prototype.addIceCandidate;

    prototype.createOffer = function createOffer(successCallback, failureCallback) {
      var options = arguments.length >= 2 ? arguments[2] : arguments[0];
      var promise = origCreateOffer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
      var options = arguments.length >= 2 ? arguments[2] : arguments[0];
      var promise = origCreateAnswer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    var withCallback = function withCallback(description, successCallback, failureCallback) {
      var promise = setLocalDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;

    withCallback = function withCallback(description, successCallback, failureCallback) {
      var promise = setRemoteDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;

    withCallback = function withCallback(candidate, successCallback, failureCallback) {
      var promise = addIceCandidate.apply(this, [candidate]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
  }

  function shimGetUserMedia(window) {
    var navigator = window && window.navigator;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // shim not needed in Safari 12.1
      var mediaDevices = navigator.mediaDevices;
      var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
      navigator.mediaDevices.getUserMedia = function (constraints) {
        return _getUserMedia(shimConstraints(constraints));
      };
    }

    if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
        navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
      }.bind(navigator);
    }
  }

  function shimConstraints(constraints) {
    if (constraints && constraints.video !== undefined) {
      return Object.assign({}, constraints, { video: utils.compactObject(constraints.video) });
    }

    return constraints;
  }

  function shimRTCIceServerUrls(window) {
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    var OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
      if (pcConfig && pcConfig.iceServers) {
        var newIceServers = [];
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
          var server = pcConfig.iceServers[i];
          if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
            utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
            server = JSON.parse(JSON.stringify(server));
            server.urls = server.url;
            delete server.url;
            newIceServers.push(server);
          } else {
            newIceServers.push(pcConfig.iceServers[i]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
      return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ('generateCertificate' in window.RTCPeerConnection) {
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get: function get() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }
  }

  function shimTrackEventTransceiver(window) {
    // Add event.transceiver member over deprecated event.receiver
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function get() {
          return { receiver: this.receiver };
        }
      });
    }
  }

  function shimCreateOfferLegacy(window) {
    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
      if (offerOptions) {
        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
          // support bit values
          offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
        }
        var audioTransceiver = this.getTransceivers().find(function (transceiver) {
          return transceiver.receiver.track.kind === 'audio';
        });
        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
          if (audioTransceiver.direction === 'sendrecv') {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection('sendonly');
            } else {
              audioTransceiver.direction = 'sendonly';
            }
          } else if (audioTransceiver.direction === 'recvonly') {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection('inactive');
            } else {
              audioTransceiver.direction = 'inactive';
            }
          }
        } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
          this.addTransceiver('audio');
        }

        if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
          // support bit values
          offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
        }
        var videoTransceiver = this.getTransceivers().find(function (transceiver) {
          return transceiver.receiver.track.kind === 'video';
        });
        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
          if (videoTransceiver.direction === 'sendrecv') {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection('sendonly');
            } else {
              videoTransceiver.direction = 'sendonly';
            }
          } else if (videoTransceiver.direction === 'recvonly') {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection('inactive');
            } else {
              videoTransceiver.direction = 'inactive';
            }
          }
        } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
          this.addTransceiver('video');
        }
      }
      return origCreateOffer.apply(this, arguments);
    };
  }

  },{"../utils":15}],15:[function(require,module,exports){

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.extractVersion = extractVersion;
  exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
  exports.disableLog = disableLog;
  exports.disableWarnings = disableWarnings;
  exports.log = log;
  exports.deprecated = deprecated;
  exports.detectBrowser = detectBrowser;
  exports.compactObject = compactObject;
  exports.walkStats = walkStats;
  exports.filterStats = filterStats;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var logDisabled_ = true;
  var deprecationWarnings_ = true;

  /**
   * Extract browser version out of the provided user agent string.
   *
   * @param {!string} uastring userAgent string.
   * @param {!string} expr Regular expression used as match criteria.
   * @param {!number} pos position in the version string to be returned.
   * @return {!number} browser version.
   */
  function extractVersion(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
  }

  // Wraps the peerconnection event eventNameToWrap in a function
  // which returns the modified event object (or false to prevent
  // the event).
  function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
    if (!window.RTCPeerConnection) {
      return;
    }
    var proto = window.RTCPeerConnection.prototype;
    var nativeAddEventListener = proto.addEventListener;
    proto.addEventListener = function (nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap) {
        return nativeAddEventListener.apply(this, arguments);
      }
      var wrappedCallback = function wrappedCallback(e) {
        var modifiedEvent = wrapper(e);
        if (modifiedEvent) {
          cb(modifiedEvent);
        }
      };
      this._eventMap = this._eventMap || {};
      this._eventMap[cb] = wrappedCallback;
      return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
    };

    var nativeRemoveEventListener = proto.removeEventListener;
    proto.removeEventListener = function (nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      var unwrappedCb = this._eventMap[cb];
      delete this._eventMap[cb];
      return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
    };

    Object.defineProperty(proto, 'on' + eventNameToWrap, {
      get: function get() {
        return this['_on' + eventNameToWrap];
      },
      set: function set(cb) {
        if (this['_on' + eventNameToWrap]) {
          this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
          delete this['_on' + eventNameToWrap];
        }
        if (cb) {
          this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
        }
      },

      enumerable: true,
      configurable: true
    });
  }

  function disableLog(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
    }
    logDisabled_ = bool;
    return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
  }

  /**
   * Disable or enable deprecation warnings
   * @param {!boolean} bool set to true to disable warnings.
   */
  function disableWarnings(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
    }
    deprecationWarnings_ = !bool;
    return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
  }

  function log() {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      if (logDisabled_) {
        return;
      }
      if (typeof console !== 'undefined' && typeof console.log === 'function') {
        console.log.apply(console, arguments);
      }
    }
  }

  /**
   * Shows a deprecation warning suggesting the modern and spec-compatible API.
   */
  function deprecated(oldMethod, newMethod) {
    if (!deprecationWarnings_) {
      return;
    }
    console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
  }

  /**
   * Browser detector.
   *
   * @return {object} result containing browser and version
   *     properties.
   */
  function detectBrowser(window) {
    var navigator = window.navigator;

    // Returned result object.

    var result = { browser: null, version: null };

    // Fail early if it's not a browser
    if (typeof window === 'undefined' || !window.navigator) {
      result.browser = 'Not a browser.';
      return result;
    }

    if (navigator.mozGetUserMedia) {
      // Firefox.
      result.browser = 'firefox';
      result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
      // Chrome, Chromium, Webview, Opera.
      // Version matches Chrome/WebRTC version.
      // Chrome 74 removed webkitGetUserMedia on http as well so we need the
      // more complicated fallback to webkitRTCPeerConnection.
      result.browser = 'chrome';
      result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
      // Edge.
      result.browser = 'edge';
      result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
    } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
      // Safari.
      result.browser = 'safari';
      result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
      result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
    } else {
      // Default fallthrough: not supported.
      result.browser = 'Not a supported browser.';
      return result;
    }

    return result;
  }

  /**
   * Checks if something is an object.
   *
   * @param {*} val The something you want to check.
   * @return true if val is an object, false otherwise.
   */
  function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  /**
   * Remove all empty objects and undefined values
   * from a nested object -- an enhanced and vanilla version
   * of Lodash's `compact`.
   */
  function compactObject(data) {
    if (!isObject(data)) {
      return data;
    }

    return Object.keys(data).reduce(function (accumulator, key) {
      var isObj = isObject(data[key]);
      var value = isObj ? compactObject(data[key]) : data[key];
      var isEmptyObject = isObj && !Object.keys(value).length;
      if (value === undefined || isEmptyObject) {
        return accumulator;
      }
      return Object.assign(accumulator, _defineProperty({}, key, value));
    }, {});
  }

  /* iterates the stats graph recursively. */
  function walkStats(stats, base, resultSet) {
    if (!base || resultSet.has(base.id)) {
      return;
    }
    resultSet.set(base.id, base);
    Object.keys(base).forEach(function (name) {
      if (name.endsWith('Id')) {
        walkStats(stats, stats.get(base[name]), resultSet);
      } else if (name.endsWith('Ids')) {
        base[name].forEach(function (id) {
          walkStats(stats, stats.get(id), resultSet);
        });
      }
    });
  }

  /* filter getStats for a sender/receiver track. */
  function filterStats(result, track, outbound) {
    var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
    var filteredResult = new Map();
    if (track === null) {
      return filteredResult;
    }
    var trackStats = [];
    result.forEach(function (value) {
      if (value.type === 'track' && value.trackIdentifier === track.id) {
        trackStats.push(value);
      }
    });
    trackStats.forEach(function (trackStat) {
      result.forEach(function (stats) {
        if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
          walkStats(result, stats, filteredResult);
        }
      });
    });
    return filteredResult;
  }

  },{}],16:[function(require,module,exports){

  var SDPUtils = require('sdp');

  function fixStatsType(stat) {
    return {
      inboundrtp: 'inbound-rtp',
      outboundrtp: 'outbound-rtp',
      candidatepair: 'candidate-pair',
      localcandidate: 'local-candidate',
      remotecandidate: 'remote-candidate'
    }[stat.type] || stat.type;
  }

  function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
    var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

    // Map ICE parameters (ufrag, pwd) to SDP.
    sdp += SDPUtils.writeIceParameters(
        transceiver.iceGatherer.getLocalParameters());

    // Map DTLS parameters to SDP.
    sdp += SDPUtils.writeDtlsParameters(
        transceiver.dtlsTransport.getLocalParameters(),
        type === 'offer' ? 'actpass' : dtlsRole || 'active');

    sdp += 'a=mid:' + transceiver.mid + '\r\n';

    if (transceiver.rtpSender && transceiver.rtpReceiver) {
      sdp += 'a=sendrecv\r\n';
    } else if (transceiver.rtpSender) {
      sdp += 'a=sendonly\r\n';
    } else if (transceiver.rtpReceiver) {
      sdp += 'a=recvonly\r\n';
    } else {
      sdp += 'a=inactive\r\n';
    }

    if (transceiver.rtpSender) {
      var trackId = transceiver.rtpSender._initialTrackId ||
          transceiver.rtpSender.track.id;
      transceiver.rtpSender._initialTrackId = trackId;
      // spec.
      var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
          trackId + '\r\n';
      sdp += 'a=' + msid;
      // for Chrome. Legacy should no longer be required.
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' ' + msid;

      // RTX
      if (transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' ' + msid;
        sdp += 'a=ssrc-group:FID ' +
            transceiver.sendEncodingParameters[0].ssrc + ' ' +
            transceiver.sendEncodingParameters[0].rtx.ssrc +
            '\r\n';
      }
    }
    // FIXME: this should be written by writeRtpDescription.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
    if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
    }
    return sdp;
  }

  // Edge does not like
  // 1) stun: filtered after 14393 unless ?transport=udp is present
  // 2) turn: that does not have all of turn:host:port?transport=udp
  // 3) turn: with ipv6 addresses
  // 4) turn: occurring muliple times
  function filterIceServers(iceServers, edgeVersion) {
    var hasTurn = false;
    iceServers = JSON.parse(JSON.stringify(iceServers));
    return iceServers.filter(function(server) {
      if (server && (server.urls || server.url)) {
        var urls = server.urls || server.url;
        if (server.url && !server.urls) {
          console.warn('RTCIceServer.url is deprecated! Use urls instead.');
        }
        var isString = typeof urls === 'string';
        if (isString) {
          urls = [urls];
        }
        urls = urls.filter(function(url) {
          var validTurn = url.indexOf('turn:') === 0 &&
              url.indexOf('transport=udp') !== -1 &&
              url.indexOf('turn:[') === -1 &&
              !hasTurn;

          if (validTurn) {
            hasTurn = true;
            return true;
          }
          return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
              url.indexOf('?transport=udp') === -1;
        });

        delete server.url;
        server.urls = isString ? urls[0] : urls;
        return !!urls.length;
      }
    });
  }

  // Determines the intersection of local and remote capabilities.
  function getCommonCapabilities(localCapabilities, remoteCapabilities) {
    var commonCapabilities = {
      codecs: [],
      headerExtensions: [],
      fecMechanisms: []
    };

    var findCodecByPayloadType = function(pt, codecs) {
      pt = parseInt(pt, 10);
      for (var i = 0; i < codecs.length; i++) {
        if (codecs[i].payloadType === pt ||
            codecs[i].preferredPayloadType === pt) {
          return codecs[i];
        }
      }
    };

    var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
      var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
      var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
      return lCodec && rCodec &&
          lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
    };

    localCapabilities.codecs.forEach(function(lCodec) {
      for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
        var rCodec = remoteCapabilities.codecs[i];
        if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
            lCodec.clockRate === rCodec.clockRate) {
          if (lCodec.name.toLowerCase() === 'rtx' &&
              lCodec.parameters && rCodec.parameters.apt) {
            // for RTX we need to find the local rtx that has a apt
            // which points to the same local codec as the remote one.
            if (!rtxCapabilityMatches(lCodec, rCodec,
                localCapabilities.codecs, remoteCapabilities.codecs)) {
              continue;
            }
          }
          rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
          // number of channels is the highest common number of channels
          rCodec.numChannels = Math.min(lCodec.numChannels,
              rCodec.numChannels);
          // push rCodec so we reply with offerer payload type
          commonCapabilities.codecs.push(rCodec);

          // determine common feedback mechanisms
          rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
            for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
              if (lCodec.rtcpFeedback[j].type === fb.type &&
                  lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                return true;
              }
            }
            return false;
          });
          // FIXME: also need to determine .parameters
          //  see https://github.com/openpeer/ortc/issues/569
          break;
        }
      }
    });

    localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
      for (var i = 0; i < remoteCapabilities.headerExtensions.length;
           i++) {
        var rHeaderExtension = remoteCapabilities.headerExtensions[i];
        if (lHeaderExtension.uri === rHeaderExtension.uri) {
          commonCapabilities.headerExtensions.push(rHeaderExtension);
          break;
        }
      }
    });

    // FIXME: fecMechanisms
    return commonCapabilities;
  }

  // is action=setLocalDescription with type allowed in signalingState
  function isActionAllowedInSignalingState(action, type, signalingState) {
    return {
      offer: {
        setLocalDescription: ['stable', 'have-local-offer'],
        setRemoteDescription: ['stable', 'have-remote-offer']
      },
      answer: {
        setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
        setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
      }
    }[type][action].indexOf(signalingState) !== -1;
  }

  function maybeAddCandidate(iceTransport, candidate) {
    // Edge's internal representation adds some fields therefore
    // not all fieldѕ are taken into account.
    var alreadyAdded = iceTransport.getRemoteCandidates()
        .find(function(remoteCandidate) {
          return candidate.foundation === remoteCandidate.foundation &&
              candidate.ip === remoteCandidate.ip &&
              candidate.port === remoteCandidate.port &&
              candidate.priority === remoteCandidate.priority &&
              candidate.protocol === remoteCandidate.protocol &&
              candidate.type === remoteCandidate.type;
        });
    if (!alreadyAdded) {
      iceTransport.addRemoteCandidate(candidate);
    }
    return !alreadyAdded;
  }


  function makeError(name, description) {
    var e = new Error(description);
    e.name = name;
    // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
    e.code = {
      NotSupportedError: 9,
      InvalidStateError: 11,
      InvalidAccessError: 15,
      TypeError: undefined,
      OperationError: undefined
    }[name];
    return e;
  }

  module.exports = function(window, edgeVersion) {
    // https://w3c.github.io/mediacapture-main/#mediastream
    // Helper function to add the track to the stream and
    // dispatch the event ourselves.
    function addTrackToStreamAndFireEvent(track, stream) {
      stream.addTrack(track);
      stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
          {track: track}));
    }

    function removeTrackFromStreamAndFireEvent(track, stream) {
      stream.removeTrack(track);
      stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
          {track: track}));
    }

    function fireAddTrack(pc, track, receiver, streams) {
      var trackEvent = new Event('track');
      trackEvent.track = track;
      trackEvent.receiver = receiver;
      trackEvent.transceiver = {receiver: receiver};
      trackEvent.streams = streams;
      window.setTimeout(function() {
        pc._dispatchEvent('track', trackEvent);
      });
    }

    var RTCPeerConnection = function(config) {
      var pc = this;

      var _eventTarget = document.createDocumentFragment();
      ['addEventListener', 'removeEventListener', 'dispatchEvent']
          .forEach(function(method) {
            pc[method] = _eventTarget[method].bind(_eventTarget);
          });

      this.canTrickleIceCandidates = null;

      this.needNegotiation = false;

      this.localStreams = [];
      this.remoteStreams = [];

      this._localDescription = null;
      this._remoteDescription = null;

      this.signalingState = 'stable';
      this.iceConnectionState = 'new';
      this.connectionState = 'new';
      this.iceGatheringState = 'new';

      config = JSON.parse(JSON.stringify(config || {}));

      this.usingBundle = config.bundlePolicy === 'max-bundle';
      if (config.rtcpMuxPolicy === 'negotiate') {
        throw(makeError('NotSupportedError',
            'rtcpMuxPolicy \'negotiate\' is not supported'));
      } else if (!config.rtcpMuxPolicy) {
        config.rtcpMuxPolicy = 'require';
      }

      switch (config.iceTransportPolicy) {
        case 'all':
        case 'relay':
          break;
        default:
          config.iceTransportPolicy = 'all';
          break;
      }

      switch (config.bundlePolicy) {
        case 'balanced':
        case 'max-compat':
        case 'max-bundle':
          break;
        default:
          config.bundlePolicy = 'balanced';
          break;
      }

      config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

      this._iceGatherers = [];
      if (config.iceCandidatePoolSize) {
        for (var i = config.iceCandidatePoolSize; i > 0; i--) {
          this._iceGatherers.push(new window.RTCIceGatherer({
            iceServers: config.iceServers,
            gatherPolicy: config.iceTransportPolicy
          }));
        }
      } else {
        config.iceCandidatePoolSize = 0;
      }

      this._config = config;

      // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
      // everything that is needed to describe a SDP m-line.
      this.transceivers = [];

      this._sdpSessionId = SDPUtils.generateSessionId();
      this._sdpSessionVersion = 0;

      this._dtlsRole = undefined; // role for a=setup to use in answers.

      this._isClosed = false;
    };

    Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
      configurable: true,
      get: function() {
        return this._localDescription;
      }
    });
    Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
      configurable: true,
      get: function() {
        return this._remoteDescription;
      }
    });

    // set up event handlers on prototype
    RTCPeerConnection.prototype.onicecandidate = null;
    RTCPeerConnection.prototype.onaddstream = null;
    RTCPeerConnection.prototype.ontrack = null;
    RTCPeerConnection.prototype.onremovestream = null;
    RTCPeerConnection.prototype.onsignalingstatechange = null;
    RTCPeerConnection.prototype.oniceconnectionstatechange = null;
    RTCPeerConnection.prototype.onconnectionstatechange = null;
    RTCPeerConnection.prototype.onicegatheringstatechange = null;
    RTCPeerConnection.prototype.onnegotiationneeded = null;
    RTCPeerConnection.prototype.ondatachannel = null;

    RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
      if (this._isClosed) {
        return;
      }
      this.dispatchEvent(event);
      if (typeof this['on' + name] === 'function') {
        this['on' + name](event);
      }
    };

    RTCPeerConnection.prototype._emitGatheringStateChange = function() {
      var event = new Event('icegatheringstatechange');
      this._dispatchEvent('icegatheringstatechange', event);
    };

    RTCPeerConnection.prototype.getConfiguration = function() {
      return this._config;
    };

    RTCPeerConnection.prototype.getLocalStreams = function() {
      return this.localStreams;
    };

    RTCPeerConnection.prototype.getRemoteStreams = function() {
      return this.remoteStreams;
    };

    // internal helper to create a transceiver object.
    // (which is not yet the same as the WebRTC 1.0 transceiver)
    RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
      var hasBundleTransport = this.transceivers.length > 0;
      var transceiver = {
        track: null,
        iceGatherer: null,
        iceTransport: null,
        dtlsTransport: null,
        localCapabilities: null,
        remoteCapabilities: null,
        rtpSender: null,
        rtpReceiver: null,
        kind: kind,
        mid: null,
        sendEncodingParameters: null,
        recvEncodingParameters: null,
        stream: null,
        associatedRemoteMediaStreams: [],
        wantReceive: true
      };
      if (this.usingBundle && hasBundleTransport) {
        transceiver.iceTransport = this.transceivers[0].iceTransport;
        transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
      } else {
        var transports = this._createIceAndDtlsTransports();
        transceiver.iceTransport = transports.iceTransport;
        transceiver.dtlsTransport = transports.dtlsTransport;
      }
      if (!doNotAdd) {
        this.transceivers.push(transceiver);
      }
      return transceiver;
    };

    RTCPeerConnection.prototype.addTrack = function(track, stream) {
      if (this._isClosed) {
        throw makeError('InvalidStateError',
            'Attempted to call addTrack on a closed peerconnection.');
      }

      var alreadyExists = this.transceivers.find(function(s) {
        return s.track === track;
      });

      if (alreadyExists) {
        throw makeError('InvalidAccessError', 'Track already exists.');
      }

      var transceiver;
      for (var i = 0; i < this.transceivers.length; i++) {
        if (!this.transceivers[i].track &&
            this.transceivers[i].kind === track.kind) {
          transceiver = this.transceivers[i];
        }
      }
      if (!transceiver) {
        transceiver = this._createTransceiver(track.kind);
      }

      this._maybeFireNegotiationNeeded();

      if (this.localStreams.indexOf(stream) === -1) {
        this.localStreams.push(stream);
      }

      transceiver.track = track;
      transceiver.stream = stream;
      transceiver.rtpSender = new window.RTCRtpSender(track,
          transceiver.dtlsTransport);
      return transceiver.rtpSender;
    };

    RTCPeerConnection.prototype.addStream = function(stream) {
      var pc = this;
      if (edgeVersion >= 15025) {
        stream.getTracks().forEach(function(track) {
          pc.addTrack(track, stream);
        });
      } else {
        // Clone is necessary for local demos mostly, attaching directly
        // to two different senders does not work (build 10547).
        // Fixed in 15025 (or earlier)
        var clonedStream = stream.clone();
        stream.getTracks().forEach(function(track, idx) {
          var clonedTrack = clonedStream.getTracks()[idx];
          track.addEventListener('enabled', function(event) {
            clonedTrack.enabled = event.enabled;
          });
        });
        clonedStream.getTracks().forEach(function(track) {
          pc.addTrack(track, clonedStream);
        });
      }
    };

    RTCPeerConnection.prototype.removeTrack = function(sender) {
      if (this._isClosed) {
        throw makeError('InvalidStateError',
            'Attempted to call removeTrack on a closed peerconnection.');
      }

      if (!(sender instanceof window.RTCRtpSender)) {
        throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
            'does not implement interface RTCRtpSender.');
      }

      var transceiver = this.transceivers.find(function(t) {
        return t.rtpSender === sender;
      });

      if (!transceiver) {
        throw makeError('InvalidAccessError',
            'Sender was not created by this connection.');
      }
      var stream = transceiver.stream;

      transceiver.rtpSender.stop();
      transceiver.rtpSender = null;
      transceiver.track = null;
      transceiver.stream = null;

      // remove the stream from the set of local streams
      var localStreams = this.transceivers.map(function(t) {
        return t.stream;
      });
      if (localStreams.indexOf(stream) === -1 &&
          this.localStreams.indexOf(stream) > -1) {
        this.localStreams.splice(this.localStreams.indexOf(stream), 1);
      }

      this._maybeFireNegotiationNeeded();
    };

    RTCPeerConnection.prototype.removeStream = function(stream) {
      var pc = this;
      stream.getTracks().forEach(function(track) {
        var sender = pc.getSenders().find(function(s) {
          return s.track === track;
        });
        if (sender) {
          pc.removeTrack(sender);
        }
      });
    };

    RTCPeerConnection.prototype.getSenders = function() {
      return this.transceivers.filter(function(transceiver) {
        return !!transceiver.rtpSender;
      })
      .map(function(transceiver) {
        return transceiver.rtpSender;
      });
    };

    RTCPeerConnection.prototype.getReceivers = function() {
      return this.transceivers.filter(function(transceiver) {
        return !!transceiver.rtpReceiver;
      })
      .map(function(transceiver) {
        return transceiver.rtpReceiver;
      });
    };


    RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
        usingBundle) {
      var pc = this;
      if (usingBundle && sdpMLineIndex > 0) {
        return this.transceivers[0].iceGatherer;
      } else if (this._iceGatherers.length) {
        return this._iceGatherers.shift();
      }
      var iceGatherer = new window.RTCIceGatherer({
        iceServers: this._config.iceServers,
        gatherPolicy: this._config.iceTransportPolicy
      });
      Object.defineProperty(iceGatherer, 'state',
          {value: 'new', writable: true}
      );

      this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
      this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
        var end = !event.candidate || Object.keys(event.candidate).length === 0;
        // polyfill since RTCIceGatherer.state is not implemented in
        // Edge 10547 yet.
        iceGatherer.state = end ? 'completed' : 'gathering';
        if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
          pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
        }
      };
      iceGatherer.addEventListener('localcandidate',
        this.transceivers[sdpMLineIndex].bufferCandidates);
      return iceGatherer;
    };

    // start gathering from an RTCIceGatherer.
    RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
      var pc = this;
      var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
      if (iceGatherer.onlocalcandidate) {
        return;
      }
      var bufferedCandidateEvents =
        this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
      this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
      iceGatherer.removeEventListener('localcandidate',
        this.transceivers[sdpMLineIndex].bufferCandidates);
      iceGatherer.onlocalcandidate = function(evt) {
        if (pc.usingBundle && sdpMLineIndex > 0) {
          // if we know that we use bundle we can drop candidates with
          // ѕdpMLineIndex > 0. If we don't do this then our state gets
          // confused since we dispose the extra ice gatherer.
          return;
        }
        var event = new Event('icecandidate');
        event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

        var cand = evt.candidate;
        // Edge emits an empty object for RTCIceCandidateComplete‥
        var end = !cand || Object.keys(cand).length === 0;
        if (end) {
          // polyfill since RTCIceGatherer.state is not implemented in
          // Edge 10547 yet.
          if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
            iceGatherer.state = 'completed';
          }
        } else {
          if (iceGatherer.state === 'new') {
            iceGatherer.state = 'gathering';
          }
          // RTCIceCandidate doesn't have a component, needs to be added
          cand.component = 1;
          // also the usernameFragment. TODO: update SDP to take both variants.
          cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

          var serializedCandidate = SDPUtils.writeCandidate(cand);
          event.candidate = Object.assign(event.candidate,
              SDPUtils.parseCandidate(serializedCandidate));

          event.candidate.candidate = serializedCandidate;
          event.candidate.toJSON = function() {
            return {
              candidate: event.candidate.candidate,
              sdpMid: event.candidate.sdpMid,
              sdpMLineIndex: event.candidate.sdpMLineIndex,
              usernameFragment: event.candidate.usernameFragment
            };
          };
        }

        // update local description.
        var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
        if (!end) {
          sections[event.candidate.sdpMLineIndex] +=
              'a=' + event.candidate.candidate + '\r\n';
        } else {
          sections[event.candidate.sdpMLineIndex] +=
              'a=end-of-candidates\r\n';
        }
        pc._localDescription.sdp =
            SDPUtils.getDescription(pc._localDescription.sdp) +
            sections.join('');
        var complete = pc.transceivers.every(function(transceiver) {
          return transceiver.iceGatherer &&
              transceiver.iceGatherer.state === 'completed';
        });

        if (pc.iceGatheringState !== 'gathering') {
          pc.iceGatheringState = 'gathering';
          pc._emitGatheringStateChange();
        }

        // Emit candidate. Also emit null candidate when all gatherers are
        // complete.
        if (!end) {
          pc._dispatchEvent('icecandidate', event);
        }
        if (complete) {
          pc._dispatchEvent('icecandidate', new Event('icecandidate'));
          pc.iceGatheringState = 'complete';
          pc._emitGatheringStateChange();
        }
      };

      // emit already gathered candidates.
      window.setTimeout(function() {
        bufferedCandidateEvents.forEach(function(e) {
          iceGatherer.onlocalcandidate(e);
        });
      }, 0);
    };

    // Create ICE transport and DTLS transport.
    RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
      var pc = this;
      var iceTransport = new window.RTCIceTransport(null);
      iceTransport.onicestatechange = function() {
        pc._updateIceConnectionState();
        pc._updateConnectionState();
      };

      var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
      dtlsTransport.ondtlsstatechange = function() {
        pc._updateConnectionState();
      };
      dtlsTransport.onerror = function() {
        // onerror does not set state to failed by itself.
        Object.defineProperty(dtlsTransport, 'state',
            {value: 'failed', writable: true});
        pc._updateConnectionState();
      };

      return {
        iceTransport: iceTransport,
        dtlsTransport: dtlsTransport
      };
    };

    // Destroy ICE gatherer, ICE transport and DTLS transport.
    // Without triggering the callbacks.
    RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
        sdpMLineIndex) {
      var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
      if (iceGatherer) {
        delete iceGatherer.onlocalcandidate;
        delete this.transceivers[sdpMLineIndex].iceGatherer;
      }
      var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
      if (iceTransport) {
        delete iceTransport.onicestatechange;
        delete this.transceivers[sdpMLineIndex].iceTransport;
      }
      var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
      if (dtlsTransport) {
        delete dtlsTransport.ondtlsstatechange;
        delete dtlsTransport.onerror;
        delete this.transceivers[sdpMLineIndex].dtlsTransport;
      }
    };

    // Start the RTP Sender and Receiver for a transceiver.
    RTCPeerConnection.prototype._transceive = function(transceiver,
        send, recv) {
      var params = getCommonCapabilities(transceiver.localCapabilities,
          transceiver.remoteCapabilities);
      if (send && transceiver.rtpSender) {
        params.encodings = transceiver.sendEncodingParameters;
        params.rtcp = {
          cname: SDPUtils.localCName,
          compound: transceiver.rtcpParameters.compound
        };
        if (transceiver.recvEncodingParameters.length) {
          params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
        }
        transceiver.rtpSender.send(params);
      }
      if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
        // remove RTX field in Edge 14942
        if (transceiver.kind === 'video'
            && transceiver.recvEncodingParameters
            && edgeVersion < 15019) {
          transceiver.recvEncodingParameters.forEach(function(p) {
            delete p.rtx;
          });
        }
        if (transceiver.recvEncodingParameters.length) {
          params.encodings = transceiver.recvEncodingParameters;
        } else {
          params.encodings = [{}];
        }
        params.rtcp = {
          compound: transceiver.rtcpParameters.compound
        };
        if (transceiver.rtcpParameters.cname) {
          params.rtcp.cname = transceiver.rtcpParameters.cname;
        }
        if (transceiver.sendEncodingParameters.length) {
          params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
        }
        transceiver.rtpReceiver.receive(params);
      }
    };

    RTCPeerConnection.prototype.setLocalDescription = function(description) {
      var pc = this;

      // Note: pranswer is not supported.
      if (['offer', 'answer'].indexOf(description.type) === -1) {
        return Promise.reject(makeError('TypeError',
            'Unsupported type "' + description.type + '"'));
      }

      if (!isActionAllowedInSignalingState('setLocalDescription',
          description.type, pc.signalingState) || pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not set local ' + description.type +
            ' in state ' + pc.signalingState));
      }

      var sections;
      var sessionpart;
      if (description.type === 'offer') {
        // VERY limited support for SDP munging. Limited to:
        // * changing the order of codecs
        sections = SDPUtils.splitSections(description.sdp);
        sessionpart = sections.shift();
        sections.forEach(function(mediaSection, sdpMLineIndex) {
          var caps = SDPUtils.parseRtpParameters(mediaSection);
          pc.transceivers[sdpMLineIndex].localCapabilities = caps;
        });

        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
          pc._gather(transceiver.mid, sdpMLineIndex);
        });
      } else if (description.type === 'answer') {
        sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
        sessionpart = sections.shift();
        var isIceLite = SDPUtils.matchPrefix(sessionpart,
            'a=ice-lite').length > 0;
        sections.forEach(function(mediaSection, sdpMLineIndex) {
          var transceiver = pc.transceivers[sdpMLineIndex];
          var iceGatherer = transceiver.iceGatherer;
          var iceTransport = transceiver.iceTransport;
          var dtlsTransport = transceiver.dtlsTransport;
          var localCapabilities = transceiver.localCapabilities;
          var remoteCapabilities = transceiver.remoteCapabilities;

          // treat bundle-only as not-rejected.
          var rejected = SDPUtils.isRejected(mediaSection) &&
              SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

          if (!rejected && !transceiver.rejected) {
            var remoteIceParameters = SDPUtils.getIceParameters(
                mediaSection, sessionpart);
            var remoteDtlsParameters = SDPUtils.getDtlsParameters(
                mediaSection, sessionpart);
            if (isIceLite) {
              remoteDtlsParameters.role = 'server';
            }

            if (!pc.usingBundle || sdpMLineIndex === 0) {
              pc._gather(transceiver.mid, sdpMLineIndex);
              if (iceTransport.state === 'new') {
                iceTransport.start(iceGatherer, remoteIceParameters,
                    isIceLite ? 'controlling' : 'controlled');
              }
              if (dtlsTransport.state === 'new') {
                dtlsTransport.start(remoteDtlsParameters);
              }
            }

            // Calculate intersection of capabilities.
            var params = getCommonCapabilities(localCapabilities,
                remoteCapabilities);

            // Start the RTCRtpSender. The RTCRtpReceiver for this
            // transceiver has already been started in setRemoteDescription.
            pc._transceive(transceiver,
                params.codecs.length > 0,
                false);
          }
        });
      }

      pc._localDescription = {
        type: description.type,
        sdp: description.sdp
      };
      if (description.type === 'offer') {
        pc._updateSignalingState('have-local-offer');
      } else {
        pc._updateSignalingState('stable');
      }

      return Promise.resolve();
    };

    RTCPeerConnection.prototype.setRemoteDescription = function(description) {
      var pc = this;

      // Note: pranswer is not supported.
      if (['offer', 'answer'].indexOf(description.type) === -1) {
        return Promise.reject(makeError('TypeError',
            'Unsupported type "' + description.type + '"'));
      }

      if (!isActionAllowedInSignalingState('setRemoteDescription',
          description.type, pc.signalingState) || pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not set remote ' + description.type +
            ' in state ' + pc.signalingState));
      }

      var streams = {};
      pc.remoteStreams.forEach(function(stream) {
        streams[stream.id] = stream;
      });
      var receiverList = [];
      var sections = SDPUtils.splitSections(description.sdp);
      var sessionpart = sections.shift();
      var isIceLite = SDPUtils.matchPrefix(sessionpart,
          'a=ice-lite').length > 0;
      var usingBundle = SDPUtils.matchPrefix(sessionpart,
          'a=group:BUNDLE ').length > 0;
      pc.usingBundle = usingBundle;
      var iceOptions = SDPUtils.matchPrefix(sessionpart,
          'a=ice-options:')[0];
      if (iceOptions) {
        pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
            .indexOf('trickle') >= 0;
      } else {
        pc.canTrickleIceCandidates = false;
      }

      sections.forEach(function(mediaSection, sdpMLineIndex) {
        var lines = SDPUtils.splitLines(mediaSection);
        var kind = SDPUtils.getKind(mediaSection);
        // treat bundle-only as not-rejected.
        var rejected = SDPUtils.isRejected(mediaSection) &&
            SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
        var protocol = lines[0].substr(2).split(' ')[2];

        var direction = SDPUtils.getDirection(mediaSection, sessionpart);
        var remoteMsid = SDPUtils.parseMsid(mediaSection);

        var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

        // Reject datachannels which are not implemented yet.
        if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
            protocol === 'UDP/DTLS/SCTP'))) {
          // TODO: this is dangerous in the case where a non-rejected m-line
          //     becomes rejected.
          pc.transceivers[sdpMLineIndex] = {
            mid: mid,
            kind: kind,
            protocol: protocol,
            rejected: true
          };
          return;
        }

        if (!rejected && pc.transceivers[sdpMLineIndex] &&
            pc.transceivers[sdpMLineIndex].rejected) {
          // recycle a rejected transceiver.
          pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
        }

        var transceiver;
        var iceGatherer;
        var iceTransport;
        var dtlsTransport;
        var rtpReceiver;
        var sendEncodingParameters;
        var recvEncodingParameters;
        var localCapabilities;

        var track;
        // FIXME: ensure the mediaSection has rtcp-mux set.
        var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
        var remoteIceParameters;
        var remoteDtlsParameters;
        if (!rejected) {
          remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
              sessionpart);
          remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
              sessionpart);
          remoteDtlsParameters.role = 'client';
        }
        recvEncodingParameters =
            SDPUtils.parseRtpEncodingParameters(mediaSection);

        var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

        var isComplete = SDPUtils.matchPrefix(mediaSection,
            'a=end-of-candidates', sessionpart).length > 0;
        var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
            .map(function(cand) {
              return SDPUtils.parseCandidate(cand);
            })
            .filter(function(cand) {
              return cand.component === 1;
            });

        // Check if we can use BUNDLE and dispose transports.
        if ((description.type === 'offer' || description.type === 'answer') &&
            !rejected && usingBundle && sdpMLineIndex > 0 &&
            pc.transceivers[sdpMLineIndex]) {
          pc._disposeIceAndDtlsTransports(sdpMLineIndex);
          pc.transceivers[sdpMLineIndex].iceGatherer =
              pc.transceivers[0].iceGatherer;
          pc.transceivers[sdpMLineIndex].iceTransport =
              pc.transceivers[0].iceTransport;
          pc.transceivers[sdpMLineIndex].dtlsTransport =
              pc.transceivers[0].dtlsTransport;
          if (pc.transceivers[sdpMLineIndex].rtpSender) {
            pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                pc.transceivers[0].dtlsTransport);
          }
          if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
            pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                pc.transceivers[0].dtlsTransport);
          }
        }
        if (description.type === 'offer' && !rejected) {
          transceiver = pc.transceivers[sdpMLineIndex] ||
              pc._createTransceiver(kind);
          transceiver.mid = mid;

          if (!transceiver.iceGatherer) {
            transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                usingBundle);
          }

          if (cands.length && transceiver.iceTransport.state === 'new') {
            if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
              transceiver.iceTransport.setRemoteCandidates(cands);
            } else {
              cands.forEach(function(candidate) {
                maybeAddCandidate(transceiver.iceTransport, candidate);
              });
            }
          }

          localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

          // filter RTX until additional stuff needed for RTX is implemented
          // in adapter.js
          if (edgeVersion < 15019) {
            localCapabilities.codecs = localCapabilities.codecs.filter(
                function(codec) {
                  return codec.name !== 'rtx';
                });
          }

          sendEncodingParameters = transceiver.sendEncodingParameters || [{
            ssrc: (2 * sdpMLineIndex + 2) * 1001
          }];

          // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
          var isNewTrack = false;
          if (direction === 'sendrecv' || direction === 'sendonly') {
            isNewTrack = !transceiver.rtpReceiver;
            rtpReceiver = transceiver.rtpReceiver ||
                new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

            if (isNewTrack) {
              var stream;
              track = rtpReceiver.track;
              // FIXME: does not work with Plan B.
              if (remoteMsid && remoteMsid.stream === '-') ; else if (remoteMsid) {
                if (!streams[remoteMsid.stream]) {
                  streams[remoteMsid.stream] = new window.MediaStream();
                  Object.defineProperty(streams[remoteMsid.stream], 'id', {
                    get: function() {
                      return remoteMsid.stream;
                    }
                  });
                }
                Object.defineProperty(track, 'id', {
                  get: function() {
                    return remoteMsid.track;
                  }
                });
                stream = streams[remoteMsid.stream];
              } else {
                if (!streams.default) {
                  streams.default = new window.MediaStream();
                }
                stream = streams.default;
              }
              if (stream) {
                addTrackToStreamAndFireEvent(track, stream);
                transceiver.associatedRemoteMediaStreams.push(stream);
              }
              receiverList.push([track, rtpReceiver, stream]);
            }
          } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
            transceiver.associatedRemoteMediaStreams.forEach(function(s) {
              var nativeTrack = s.getTracks().find(function(t) {
                return t.id === transceiver.rtpReceiver.track.id;
              });
              if (nativeTrack) {
                removeTrackFromStreamAndFireEvent(nativeTrack, s);
              }
            });
            transceiver.associatedRemoteMediaStreams = [];
          }

          transceiver.localCapabilities = localCapabilities;
          transceiver.remoteCapabilities = remoteCapabilities;
          transceiver.rtpReceiver = rtpReceiver;
          transceiver.rtcpParameters = rtcpParameters;
          transceiver.sendEncodingParameters = sendEncodingParameters;
          transceiver.recvEncodingParameters = recvEncodingParameters;

          // Start the RTCRtpReceiver now. The RTPSender is started in
          // setLocalDescription.
          pc._transceive(pc.transceivers[sdpMLineIndex],
              false,
              isNewTrack);
        } else if (description.type === 'answer' && !rejected) {
          transceiver = pc.transceivers[sdpMLineIndex];
          iceGatherer = transceiver.iceGatherer;
          iceTransport = transceiver.iceTransport;
          dtlsTransport = transceiver.dtlsTransport;
          rtpReceiver = transceiver.rtpReceiver;
          sendEncodingParameters = transceiver.sendEncodingParameters;
          localCapabilities = transceiver.localCapabilities;

          pc.transceivers[sdpMLineIndex].recvEncodingParameters =
              recvEncodingParameters;
          pc.transceivers[sdpMLineIndex].remoteCapabilities =
              remoteCapabilities;
          pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

          if (cands.length && iceTransport.state === 'new') {
            if ((isIceLite || isComplete) &&
                (!usingBundle || sdpMLineIndex === 0)) {
              iceTransport.setRemoteCandidates(cands);
            } else {
              cands.forEach(function(candidate) {
                maybeAddCandidate(transceiver.iceTransport, candidate);
              });
            }
          }

          if (!usingBundle || sdpMLineIndex === 0) {
            if (iceTransport.state === 'new') {
              iceTransport.start(iceGatherer, remoteIceParameters,
                  'controlling');
            }
            if (dtlsTransport.state === 'new') {
              dtlsTransport.start(remoteDtlsParameters);
            }
          }

          // If the offer contained RTX but the answer did not,
          // remove RTX from sendEncodingParameters.
          var commonCapabilities = getCommonCapabilities(
            transceiver.localCapabilities,
            transceiver.remoteCapabilities);

          var hasRtx = commonCapabilities.codecs.filter(function(c) {
            return c.name.toLowerCase() === 'rtx';
          }).length;
          if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
            delete transceiver.sendEncodingParameters[0].rtx;
          }

          pc._transceive(transceiver,
              direction === 'sendrecv' || direction === 'recvonly',
              direction === 'sendrecv' || direction === 'sendonly');

          // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
          if (rtpReceiver &&
              (direction === 'sendrecv' || direction === 'sendonly')) {
            track = rtpReceiver.track;
            if (remoteMsid) {
              if (!streams[remoteMsid.stream]) {
                streams[remoteMsid.stream] = new window.MediaStream();
              }
              addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
              receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
            } else {
              if (!streams.default) {
                streams.default = new window.MediaStream();
              }
              addTrackToStreamAndFireEvent(track, streams.default);
              receiverList.push([track, rtpReceiver, streams.default]);
            }
          } else {
            // FIXME: actually the receiver should be created later.
            delete transceiver.rtpReceiver;
          }
        }
      });

      if (pc._dtlsRole === undefined) {
        pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
      }

      pc._remoteDescription = {
        type: description.type,
        sdp: description.sdp
      };
      if (description.type === 'offer') {
        pc._updateSignalingState('have-remote-offer');
      } else {
        pc._updateSignalingState('stable');
      }
      Object.keys(streams).forEach(function(sid) {
        var stream = streams[sid];
        if (stream.getTracks().length) {
          if (pc.remoteStreams.indexOf(stream) === -1) {
            pc.remoteStreams.push(stream);
            var event = new Event('addstream');
            event.stream = stream;
            window.setTimeout(function() {
              pc._dispatchEvent('addstream', event);
            });
          }

          receiverList.forEach(function(item) {
            var track = item[0];
            var receiver = item[1];
            if (stream.id !== item[2].id) {
              return;
            }
            fireAddTrack(pc, track, receiver, [stream]);
          });
        }
      });
      receiverList.forEach(function(item) {
        if (item[2]) {
          return;
        }
        fireAddTrack(pc, item[0], item[1], []);
      });

      // check whether addIceCandidate({}) was called within four seconds after
      // setRemoteDescription.
      window.setTimeout(function() {
        if (!(pc && pc.transceivers)) {
          return;
        }
        pc.transceivers.forEach(function(transceiver) {
          if (transceiver.iceTransport &&
              transceiver.iceTransport.state === 'new' &&
              transceiver.iceTransport.getRemoteCandidates().length > 0) {
            console.warn('Timeout for addRemoteCandidate. Consider sending ' +
                'an end-of-candidates notification');
            transceiver.iceTransport.addRemoteCandidate({});
          }
        });
      }, 4000);

      return Promise.resolve();
    };

    RTCPeerConnection.prototype.close = function() {
      this.transceivers.forEach(function(transceiver) {
        /* not yet
        if (transceiver.iceGatherer) {
          transceiver.iceGatherer.close();
        }
        */
        if (transceiver.iceTransport) {
          transceiver.iceTransport.stop();
        }
        if (transceiver.dtlsTransport) {
          transceiver.dtlsTransport.stop();
        }
        if (transceiver.rtpSender) {
          transceiver.rtpSender.stop();
        }
        if (transceiver.rtpReceiver) {
          transceiver.rtpReceiver.stop();
        }
      });
      // FIXME: clean up tracks, local streams, remote streams, etc
      this._isClosed = true;
      this._updateSignalingState('closed');
    };

    // Update the signaling state.
    RTCPeerConnection.prototype._updateSignalingState = function(newState) {
      this.signalingState = newState;
      var event = new Event('signalingstatechange');
      this._dispatchEvent('signalingstatechange', event);
    };

    // Determine whether to fire the negotiationneeded event.
    RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
      var pc = this;
      if (this.signalingState !== 'stable' || this.needNegotiation === true) {
        return;
      }
      this.needNegotiation = true;
      window.setTimeout(function() {
        if (pc.needNegotiation) {
          pc.needNegotiation = false;
          var event = new Event('negotiationneeded');
          pc._dispatchEvent('negotiationneeded', event);
        }
      }, 0);
    };

    // Update the ice connection state.
    RTCPeerConnection.prototype._updateIceConnectionState = function() {
      var newState;
      var states = {
        'new': 0,
        closed: 0,
        checking: 0,
        connected: 0,
        completed: 0,
        disconnected: 0,
        failed: 0
      };
      this.transceivers.forEach(function(transceiver) {
        if (transceiver.iceTransport && !transceiver.rejected) {
          states[transceiver.iceTransport.state]++;
        }
      });

      newState = 'new';
      if (states.failed > 0) {
        newState = 'failed';
      } else if (states.checking > 0) {
        newState = 'checking';
      } else if (states.disconnected > 0) {
        newState = 'disconnected';
      } else if (states.new > 0) {
        newState = 'new';
      } else if (states.connected > 0) {
        newState = 'connected';
      } else if (states.completed > 0) {
        newState = 'completed';
      }

      if (newState !== this.iceConnectionState) {
        this.iceConnectionState = newState;
        var event = new Event('iceconnectionstatechange');
        this._dispatchEvent('iceconnectionstatechange', event);
      }
    };

    // Update the connection state.
    RTCPeerConnection.prototype._updateConnectionState = function() {
      var newState;
      var states = {
        'new': 0,
        closed: 0,
        connecting: 0,
        connected: 0,
        completed: 0,
        disconnected: 0,
        failed: 0
      };
      this.transceivers.forEach(function(transceiver) {
        if (transceiver.iceTransport && transceiver.dtlsTransport &&
            !transceiver.rejected) {
          states[transceiver.iceTransport.state]++;
          states[transceiver.dtlsTransport.state]++;
        }
      });
      // ICETransport.completed and connected are the same for this purpose.
      states.connected += states.completed;

      newState = 'new';
      if (states.failed > 0) {
        newState = 'failed';
      } else if (states.connecting > 0) {
        newState = 'connecting';
      } else if (states.disconnected > 0) {
        newState = 'disconnected';
      } else if (states.new > 0) {
        newState = 'new';
      } else if (states.connected > 0) {
        newState = 'connected';
      }

      if (newState !== this.connectionState) {
        this.connectionState = newState;
        var event = new Event('connectionstatechange');
        this._dispatchEvent('connectionstatechange', event);
      }
    };

    RTCPeerConnection.prototype.createOffer = function() {
      var pc = this;

      if (pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not call createOffer after close'));
      }

      var numAudioTracks = pc.transceivers.filter(function(t) {
        return t.kind === 'audio';
      }).length;
      var numVideoTracks = pc.transceivers.filter(function(t) {
        return t.kind === 'video';
      }).length;

      // Determine number of audio and video tracks we need to send/recv.
      var offerOptions = arguments[0];
      if (offerOptions) {
        // Reject Chrome legacy constraints.
        if (offerOptions.mandatory || offerOptions.optional) {
          throw new TypeError(
              'Legacy mandatory/optional constraints not supported.');
        }
        if (offerOptions.offerToReceiveAudio !== undefined) {
          if (offerOptions.offerToReceiveAudio === true) {
            numAudioTracks = 1;
          } else if (offerOptions.offerToReceiveAudio === false) {
            numAudioTracks = 0;
          } else {
            numAudioTracks = offerOptions.offerToReceiveAudio;
          }
        }
        if (offerOptions.offerToReceiveVideo !== undefined) {
          if (offerOptions.offerToReceiveVideo === true) {
            numVideoTracks = 1;
          } else if (offerOptions.offerToReceiveVideo === false) {
            numVideoTracks = 0;
          } else {
            numVideoTracks = offerOptions.offerToReceiveVideo;
          }
        }
      }

      pc.transceivers.forEach(function(transceiver) {
        if (transceiver.kind === 'audio') {
          numAudioTracks--;
          if (numAudioTracks < 0) {
            transceiver.wantReceive = false;
          }
        } else if (transceiver.kind === 'video') {
          numVideoTracks--;
          if (numVideoTracks < 0) {
            transceiver.wantReceive = false;
          }
        }
      });

      // Create M-lines for recvonly streams.
      while (numAudioTracks > 0 || numVideoTracks > 0) {
        if (numAudioTracks > 0) {
          pc._createTransceiver('audio');
          numAudioTracks--;
        }
        if (numVideoTracks > 0) {
          pc._createTransceiver('video');
          numVideoTracks--;
        }
      }

      var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
          pc._sdpSessionVersion++);
      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
        // For each track, create an ice gatherer, ice transport,
        // dtls transport, potentially rtpsender and rtpreceiver.
        var track = transceiver.track;
        var kind = transceiver.kind;
        var mid = transceiver.mid || SDPUtils.generateIdentifier();
        transceiver.mid = mid;

        if (!transceiver.iceGatherer) {
          transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
              pc.usingBundle);
        }

        var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
        // filter RTX until additional stuff needed for RTX is implemented
        // in adapter.js
        if (edgeVersion < 15019) {
          localCapabilities.codecs = localCapabilities.codecs.filter(
              function(codec) {
                return codec.name !== 'rtx';
              });
        }
        localCapabilities.codecs.forEach(function(codec) {
          // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
          // by adding level-asymmetry-allowed=1
          if (codec.name === 'H264' &&
              codec.parameters['level-asymmetry-allowed'] === undefined) {
            codec.parameters['level-asymmetry-allowed'] = '1';
          }

          // for subsequent offers, we might have to re-use the payload
          // type of the last offer.
          if (transceiver.remoteCapabilities &&
              transceiver.remoteCapabilities.codecs) {
            transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
              if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                  codec.clockRate === remoteCodec.clockRate) {
                codec.preferredPayloadType = remoteCodec.payloadType;
              }
            });
          }
        });
        localCapabilities.headerExtensions.forEach(function(hdrExt) {
          var remoteExtensions = transceiver.remoteCapabilities &&
              transceiver.remoteCapabilities.headerExtensions || [];
          remoteExtensions.forEach(function(rHdrExt) {
            if (hdrExt.uri === rHdrExt.uri) {
              hdrExt.id = rHdrExt.id;
            }
          });
        });

        // generate an ssrc now, to be used later in rtpSender.send
        var sendEncodingParameters = transceiver.sendEncodingParameters || [{
          ssrc: (2 * sdpMLineIndex + 1) * 1001
        }];
        if (track) {
          // add RTX
          if (edgeVersion >= 15019 && kind === 'video' &&
              !sendEncodingParameters[0].rtx) {
            sendEncodingParameters[0].rtx = {
              ssrc: sendEncodingParameters[0].ssrc + 1
            };
          }
        }

        if (transceiver.wantReceive) {
          transceiver.rtpReceiver = new window.RTCRtpReceiver(
              transceiver.dtlsTransport, kind);
        }

        transceiver.localCapabilities = localCapabilities;
        transceiver.sendEncodingParameters = sendEncodingParameters;
      });

      // always offer BUNDLE and dispose on return if not supported.
      if (pc._config.bundlePolicy !== 'max-compat') {
        sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
          return t.mid;
        }).join(' ') + '\r\n';
      }
      sdp += 'a=ice-options:trickle\r\n';

      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
        sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
            'offer', transceiver.stream, pc._dtlsRole);
        sdp += 'a=rtcp-rsize\r\n';

        if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
            (sdpMLineIndex === 0 || !pc.usingBundle)) {
          transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
            cand.component = 1;
            sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
          });

          if (transceiver.iceGatherer.state === 'completed') {
            sdp += 'a=end-of-candidates\r\n';
          }
        }
      });

      var desc = new window.RTCSessionDescription({
        type: 'offer',
        sdp: sdp
      });
      return Promise.resolve(desc);
    };

    RTCPeerConnection.prototype.createAnswer = function() {
      var pc = this;

      if (pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not call createAnswer after close'));
      }

      if (!(pc.signalingState === 'have-remote-offer' ||
          pc.signalingState === 'have-local-pranswer')) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not call createAnswer in signalingState ' + pc.signalingState));
      }

      var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
          pc._sdpSessionVersion++);
      if (pc.usingBundle) {
        sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
          return t.mid;
        }).join(' ') + '\r\n';
      }
      sdp += 'a=ice-options:trickle\r\n';

      var mediaSectionsInOffer = SDPUtils.getMediaSections(
          pc._remoteDescription.sdp).length;
      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
        if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
          return;
        }
        if (transceiver.rejected) {
          if (transceiver.kind === 'application') {
            if (transceiver.protocol === 'DTLS/SCTP') { // legacy fmt
              sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
            } else {
              sdp += 'm=application 0 ' + transceiver.protocol +
                  ' webrtc-datachannel\r\n';
            }
          } else if (transceiver.kind === 'audio') {
            sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
                'a=rtpmap:0 PCMU/8000\r\n';
          } else if (transceiver.kind === 'video') {
            sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
                'a=rtpmap:120 VP8/90000\r\n';
          }
          sdp += 'c=IN IP4 0.0.0.0\r\n' +
              'a=inactive\r\n' +
              'a=mid:' + transceiver.mid + '\r\n';
          return;
        }

        // FIXME: look at direction.
        if (transceiver.stream) {
          var localTrack;
          if (transceiver.kind === 'audio') {
            localTrack = transceiver.stream.getAudioTracks()[0];
          } else if (transceiver.kind === 'video') {
            localTrack = transceiver.stream.getVideoTracks()[0];
          }
          if (localTrack) {
            // add RTX
            if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
                !transceiver.sendEncodingParameters[0].rtx) {
              transceiver.sendEncodingParameters[0].rtx = {
                ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
              };
            }
          }
        }

        // Calculate intersection of capabilities.
        var commonCapabilities = getCommonCapabilities(
            transceiver.localCapabilities,
            transceiver.remoteCapabilities);

        var hasRtx = commonCapabilities.codecs.filter(function(c) {
          return c.name.toLowerCase() === 'rtx';
        }).length;
        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
          delete transceiver.sendEncodingParameters[0].rtx;
        }

        sdp += writeMediaSection(transceiver, commonCapabilities,
            'answer', transceiver.stream, pc._dtlsRole);
        if (transceiver.rtcpParameters &&
            transceiver.rtcpParameters.reducedSize) {
          sdp += 'a=rtcp-rsize\r\n';
        }
      });

      var desc = new window.RTCSessionDescription({
        type: 'answer',
        sdp: sdp
      });
      return Promise.resolve(desc);
    };

    RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
      var pc = this;
      var sections;
      if (candidate && !(candidate.sdpMLineIndex !== undefined ||
          candidate.sdpMid)) {
        return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
      }

      // TODO: needs to go into ops queue.
      return new Promise(function(resolve, reject) {
        if (!pc._remoteDescription) {
          return reject(makeError('InvalidStateError',
              'Can not add ICE candidate without a remote description'));
        } else if (!candidate || candidate.candidate === '') {
          for (var j = 0; j < pc.transceivers.length; j++) {
            if (pc.transceivers[j].rejected) {
              continue;
            }
            pc.transceivers[j].iceTransport.addRemoteCandidate({});
            sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
            sections[j] += 'a=end-of-candidates\r\n';
            pc._remoteDescription.sdp =
                SDPUtils.getDescription(pc._remoteDescription.sdp) +
                sections.join('');
            if (pc.usingBundle) {
              break;
            }
          }
        } else {
          var sdpMLineIndex = candidate.sdpMLineIndex;
          if (candidate.sdpMid) {
            for (var i = 0; i < pc.transceivers.length; i++) {
              if (pc.transceivers[i].mid === candidate.sdpMid) {
                sdpMLineIndex = i;
                break;
              }
            }
          }
          var transceiver = pc.transceivers[sdpMLineIndex];
          if (transceiver) {
            if (transceiver.rejected) {
              return resolve();
            }
            var cand = Object.keys(candidate.candidate).length > 0 ?
                SDPUtils.parseCandidate(candidate.candidate) : {};
            // Ignore Chrome's invalid candidates since Edge does not like them.
            if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
              return resolve();
            }
            // Ignore RTCP candidates, we assume RTCP-MUX.
            if (cand.component && cand.component !== 1) {
              return resolve();
            }
            // when using bundle, avoid adding candidates to the wrong
            // ice transport. And avoid adding candidates added in the SDP.
            if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
                transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
              if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                return reject(makeError('OperationError',
                    'Can not add ICE candidate'));
              }
            }

            // update the remoteDescription.
            var candidateString = candidate.candidate.trim();
            if (candidateString.indexOf('a=') === 0) {
              candidateString = candidateString.substr(2);
            }
            sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
            sections[sdpMLineIndex] += 'a=' +
                (cand.type ? candidateString : 'end-of-candidates')
                + '\r\n';
            pc._remoteDescription.sdp =
                SDPUtils.getDescription(pc._remoteDescription.sdp) +
                sections.join('');
          } else {
            return reject(makeError('OperationError',
                'Can not add ICE candidate'));
          }
        }
        resolve();
      });
    };

    RTCPeerConnection.prototype.getStats = function(selector) {
      if (selector && selector instanceof window.MediaStreamTrack) {
        var senderOrReceiver = null;
        this.transceivers.forEach(function(transceiver) {
          if (transceiver.rtpSender &&
              transceiver.rtpSender.track === selector) {
            senderOrReceiver = transceiver.rtpSender;
          } else if (transceiver.rtpReceiver &&
              transceiver.rtpReceiver.track === selector) {
            senderOrReceiver = transceiver.rtpReceiver;
          }
        });
        if (!senderOrReceiver) {
          throw makeError('InvalidAccessError', 'Invalid selector.');
        }
        return senderOrReceiver.getStats();
      }

      var promises = [];
      this.transceivers.forEach(function(transceiver) {
        ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
            'dtlsTransport'].forEach(function(method) {
              if (transceiver[method]) {
                promises.push(transceiver[method].getStats());
              }
            });
      });
      return Promise.all(promises).then(function(allStats) {
        var results = new Map();
        allStats.forEach(function(stats) {
          stats.forEach(function(stat) {
            results.set(stat.id, stat);
          });
        });
        return results;
      });
    };

    // fix low-level stat names and return Map instead of object.
    var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
      'RTCIceTransport', 'RTCDtlsTransport'];
    ortcObjects.forEach(function(ortcObjectName) {
      var obj = window[ortcObjectName];
      if (obj && obj.prototype && obj.prototype.getStats) {
        var nativeGetstats = obj.prototype.getStats;
        obj.prototype.getStats = function() {
          return nativeGetstats.apply(this)
          .then(function(nativeStats) {
            var mapStats = new Map();
            Object.keys(nativeStats).forEach(function(id) {
              nativeStats[id].type = fixStatsType(nativeStats[id]);
              mapStats.set(id, nativeStats[id]);
            });
            return mapStats;
          });
        };
      }
    });

    // legacy callback shims. Should be moved to adapter.js some days.
    var methods = ['createOffer', 'createAnswer'];
    methods.forEach(function(method) {
      var nativeMethod = RTCPeerConnection.prototype[method];
      RTCPeerConnection.prototype[method] = function() {
        var args = arguments;
        if (typeof args[0] === 'function' ||
            typeof args[1] === 'function') { // legacy
          return nativeMethod.apply(this, [arguments[2]])
          .then(function(description) {
            if (typeof args[0] === 'function') {
              args[0].apply(null, [description]);
            }
          }, function(error) {
            if (typeof args[1] === 'function') {
              args[1].apply(null, [error]);
            }
          });
        }
        return nativeMethod.apply(this, arguments);
      };
    });

    methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
    methods.forEach(function(method) {
      var nativeMethod = RTCPeerConnection.prototype[method];
      RTCPeerConnection.prototype[method] = function() {
        var args = arguments;
        if (typeof args[1] === 'function' ||
            typeof args[2] === 'function') { // legacy
          return nativeMethod.apply(this, arguments)
          .then(function() {
            if (typeof args[1] === 'function') {
              args[1].apply(null);
            }
          }, function(error) {
            if (typeof args[2] === 'function') {
              args[2].apply(null, [error]);
            }
          });
        }
        return nativeMethod.apply(this, arguments);
      };
    });

    // getStats is special. It doesn't have a spec legacy method yet we support
    // getStats(something, cb) without error callbacks.
    ['getStats'].forEach(function(method) {
      var nativeMethod = RTCPeerConnection.prototype[method];
      RTCPeerConnection.prototype[method] = function() {
        var args = arguments;
        if (typeof args[1] === 'function') {
          return nativeMethod.apply(this, arguments)
          .then(function() {
            if (typeof args[1] === 'function') {
              args[1].apply(null);
            }
          });
        }
        return nativeMethod.apply(this, arguments);
      };
    });

    return RTCPeerConnection;
  };

  },{"sdp":17}],17:[function(require,module,exports){

  // SDP helpers.
  var SDPUtils = {};

  // Generate an alphanumeric identifier for cname or mids.
  // TODO: use UUIDs instead? https://gist.github.com/jed/982883
  SDPUtils.generateIdentifier = function() {
    return Math.random().toString(36).substr(2, 10);
  };

  // The RTCP CNAME used by all peerconnections from the same JS.
  SDPUtils.localCName = SDPUtils.generateIdentifier();

  // Splits SDP into lines, dealing with both CRLF and LF.
  SDPUtils.splitLines = function(blob) {
    return blob.trim().split('\n').map(function(line) {
      return line.trim();
    });
  };
  // Splits SDP into sessionpart and mediasections. Ensures CRLF.
  SDPUtils.splitSections = function(blob) {
    var parts = blob.split('\nm=');
    return parts.map(function(part, index) {
      return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
    });
  };

  // returns the session description.
  SDPUtils.getDescription = function(blob) {
    var sections = SDPUtils.splitSections(blob);
    return sections && sections[0];
  };

  // returns the individual media sections.
  SDPUtils.getMediaSections = function(blob) {
    var sections = SDPUtils.splitSections(blob);
    sections.shift();
    return sections;
  };

  // Returns lines that start with a certain prefix.
  SDPUtils.matchPrefix = function(blob, prefix) {
    return SDPUtils.splitLines(blob).filter(function(line) {
      return line.indexOf(prefix) === 0;
    });
  };

  // Parses an ICE candidate line. Sample input:
  // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
  // rport 55996"
  SDPUtils.parseCandidate = function(line) {
    var parts;
    // Parse both variants.
    if (line.indexOf('a=candidate:') === 0) {
      parts = line.substring(12).split(' ');
    } else {
      parts = line.substring(10).split(' ');
    }

    var candidate = {
      foundation: parts[0],
      component: parseInt(parts[1], 10),
      protocol: parts[2].toLowerCase(),
      priority: parseInt(parts[3], 10),
      ip: parts[4],
      address: parts[4], // address is an alias for ip.
      port: parseInt(parts[5], 10),
      // skip parts[6] == 'typ'
      type: parts[7]
    };

    for (var i = 8; i < parts.length; i += 2) {
      switch (parts[i]) {
        case 'raddr':
          candidate.relatedAddress = parts[i + 1];
          break;
        case 'rport':
          candidate.relatedPort = parseInt(parts[i + 1], 10);
          break;
        case 'tcptype':
          candidate.tcpType = parts[i + 1];
          break;
        case 'ufrag':
          candidate.ufrag = parts[i + 1]; // for backward compability.
          candidate.usernameFragment = parts[i + 1];
          break;
        default: // extension handling, in particular ufrag
          candidate[parts[i]] = parts[i + 1];
          break;
      }
    }
    return candidate;
  };

  // Translates a candidate object into SDP candidate attribute.
  SDPUtils.writeCandidate = function(candidate) {
    var sdp = [];
    sdp.push(candidate.foundation);
    sdp.push(candidate.component);
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.address || candidate.ip);
    sdp.push(candidate.port);

    var type = candidate.type;
    sdp.push('typ');
    sdp.push(type);
    if (type !== 'host' && candidate.relatedAddress &&
        candidate.relatedPort) {
      sdp.push('raddr');
      sdp.push(candidate.relatedAddress);
      sdp.push('rport');
      sdp.push(candidate.relatedPort);
    }
    if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
      sdp.push('tcptype');
      sdp.push(candidate.tcpType);
    }
    if (candidate.usernameFragment || candidate.ufrag) {
      sdp.push('ufrag');
      sdp.push(candidate.usernameFragment || candidate.ufrag);
    }
    return 'candidate:' + sdp.join(' ');
  };

  // Parses an ice-options line, returns an array of option tags.
  // a=ice-options:foo bar
  SDPUtils.parseIceOptions = function(line) {
    return line.substr(14).split(' ');
  };

  // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
  // a=rtpmap:111 opus/48000/2
  SDPUtils.parseRtpMap = function(line) {
    var parts = line.substr(9).split(' ');
    var parsed = {
      payloadType: parseInt(parts.shift(), 10) // was: id
    };

    parts = parts[0].split('/');

    parsed.name = parts[0];
    parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
    parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
    // legacy alias, got renamed back to channels in ORTC.
    parsed.numChannels = parsed.channels;
    return parsed;
  };

  // Generate an a=rtpmap line from RTCRtpCodecCapability or
  // RTCRtpCodecParameters.
  SDPUtils.writeRtpMap = function(codec) {
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
      pt = codec.preferredPayloadType;
    }
    var channels = codec.channels || codec.numChannels || 1;
    return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
        (channels !== 1 ? '/' + channels : '') + '\r\n';
  };

  // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
  // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
  // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
  SDPUtils.parseExtmap = function(line) {
    var parts = line.substr(9).split(' ');
    return {
      id: parseInt(parts[0], 10),
      direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
      uri: parts[1]
    };
  };

  // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
  // RTCRtpHeaderExtension.
  SDPUtils.writeExtmap = function(headerExtension) {
    return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
        (headerExtension.direction && headerExtension.direction !== 'sendrecv'
          ? '/' + headerExtension.direction
          : '') +
        ' ' + headerExtension.uri + '\r\n';
  };

  // Parses an ftmp line, returns dictionary. Sample input:
  // a=fmtp:96 vbr=on;cng=on
  // Also deals with vbr=on; cng=on
  SDPUtils.parseFmtp = function(line) {
    var parsed = {};
    var kv;
    var parts = line.substr(line.indexOf(' ') + 1).split(';');
    for (var j = 0; j < parts.length; j++) {
      kv = parts[j].trim().split('=');
      parsed[kv[0].trim()] = kv[1];
    }
    return parsed;
  };

  // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
  SDPUtils.writeFmtp = function(codec) {
    var line = '';
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
      pt = codec.preferredPayloadType;
    }
    if (codec.parameters && Object.keys(codec.parameters).length) {
      var params = [];
      Object.keys(codec.parameters).forEach(function(param) {
        if (codec.parameters[param]) {
          params.push(param + '=' + codec.parameters[param]);
        } else {
          params.push(param);
        }
      });
      line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
    }
    return line;
  };

  // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
  // a=rtcp-fb:98 nack rpsi
  SDPUtils.parseRtcpFb = function(line) {
    var parts = line.substr(line.indexOf(' ') + 1).split(' ');
    return {
      type: parts.shift(),
      parameter: parts.join(' ')
    };
  };
  // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
  SDPUtils.writeRtcpFb = function(codec) {
    var lines = '';
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
      pt = codec.preferredPayloadType;
    }
    if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
      // FIXME: special handling for trr-int?
      codec.rtcpFeedback.forEach(function(fb) {
        lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
        (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
            '\r\n';
      });
    }
    return lines;
  };

  // Parses an RFC 5576 ssrc media attribute. Sample input:
  // a=ssrc:3735928559 cname:something
  SDPUtils.parseSsrcMedia = function(line) {
    var sp = line.indexOf(' ');
    var parts = {
      ssrc: parseInt(line.substr(7, sp - 7), 10)
    };
    var colon = line.indexOf(':', sp);
    if (colon > -1) {
      parts.attribute = line.substr(sp + 1, colon - sp - 1);
      parts.value = line.substr(colon + 1);
    } else {
      parts.attribute = line.substr(sp + 1);
    }
    return parts;
  };

  SDPUtils.parseSsrcGroup = function(line) {
    var parts = line.substr(13).split(' ');
    return {
      semantics: parts.shift(),
      ssrcs: parts.map(function(ssrc) {
        return parseInt(ssrc, 10);
      })
    };
  };

  // Extracts the MID (RFC 5888) from a media section.
  // returns the MID or undefined if no mid line was found.
  SDPUtils.getMid = function(mediaSection) {
    var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
    if (mid) {
      return mid.substr(6);
    }
  };

  SDPUtils.parseFingerprint = function(line) {
    var parts = line.substr(14).split(' ');
    return {
      algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
      value: parts[1]
    };
  };

  // Extracts DTLS parameters from SDP media section or sessionpart.
  // FIXME: for consistency with other functions this should only
  //   get the fingerprint line as input. See also getIceParameters.
  SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
    var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
      'a=fingerprint:');
    // Note: a=setup line is ignored since we use the 'auto' role.
    // Note2: 'algorithm' is not case sensitive except in Edge.
    return {
      role: 'auto',
      fingerprints: lines.map(SDPUtils.parseFingerprint)
    };
  };

  // Serializes DTLS parameters to SDP.
  SDPUtils.writeDtlsParameters = function(params, setupType) {
    var sdp = 'a=setup:' + setupType + '\r\n';
    params.fingerprints.forEach(function(fp) {
      sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
    });
    return sdp;
  };

  // Parses a=crypto lines into
  //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
  SDPUtils.parseCryptoLine = function(line) {
    var parts = line.substr(9).split(' ');
    return {
      tag: parseInt(parts[0], 10),
      cryptoSuite: parts[1],
      keyParams: parts[2],
      sessionParams: parts.slice(3),
    };
  };

  SDPUtils.writeCryptoLine = function(parameters) {
    return 'a=crypto:' + parameters.tag + ' ' +
      parameters.cryptoSuite + ' ' +
      (typeof parameters.keyParams === 'object'
        ? SDPUtils.writeCryptoKeyParams(parameters.keyParams)
        : parameters.keyParams) +
      (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') +
      '\r\n';
  };

  // Parses the crypto key parameters into
  //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
  SDPUtils.parseCryptoKeyParams = function(keyParams) {
    if (keyParams.indexOf('inline:') !== 0) {
      return null;
    }
    var parts = keyParams.substr(7).split('|');
    return {
      keyMethod: 'inline',
      keySalt: parts[0],
      lifeTime: parts[1],
      mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
      mkiLength: parts[2] ? parts[2].split(':')[1] : undefined,
    };
  };

  SDPUtils.writeCryptoKeyParams = function(keyParams) {
    return keyParams.keyMethod + ':'
      + keyParams.keySalt +
      (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') +
      (keyParams.mkiValue && keyParams.mkiLength
        ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength
        : '');
  };

  // Extracts all SDES paramters.
  SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
    var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
      'a=crypto:');
    return lines.map(SDPUtils.parseCryptoLine);
  };

  // Parses ICE information from SDP media section or sessionpart.
  // FIXME: for consistency with other functions this should only
  //   get the ice-ufrag and ice-pwd lines as input.
  SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
    var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart,
      'a=ice-ufrag:')[0];
    var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart,
      'a=ice-pwd:')[0];
    if (!(ufrag && pwd)) {
      return null;
    }
    return {
      usernameFragment: ufrag.substr(12),
      password: pwd.substr(10),
    };
  };

  // Serializes ICE parameters to SDP.
  SDPUtils.writeIceParameters = function(params) {
    return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
        'a=ice-pwd:' + params.password + '\r\n';
  };

  // Parses the SDP media section and returns RTCRtpParameters.
  SDPUtils.parseRtpParameters = function(mediaSection) {
    var description = {
      codecs: [],
      headerExtensions: [],
      fecMechanisms: [],
      rtcp: []
    };
    var lines = SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(' ');
    for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
      var pt = mline[i];
      var rtpmapline = SDPUtils.matchPrefix(
        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
      if (rtpmapline) {
        var codec = SDPUtils.parseRtpMap(rtpmapline);
        var fmtps = SDPUtils.matchPrefix(
          mediaSection, 'a=fmtp:' + pt + ' ');
        // Only the first a=fmtp:<pt> is considered.
        codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
        codec.rtcpFeedback = SDPUtils.matchPrefix(
          mediaSection, 'a=rtcp-fb:' + pt + ' ')
          .map(SDPUtils.parseRtcpFb);
        description.codecs.push(codec);
        // parse FEC mechanisms from rtpmap lines.
        switch (codec.name.toUpperCase()) {
          case 'RED':
          case 'ULPFEC':
            description.fecMechanisms.push(codec.name.toUpperCase());
            break;
        }
      }
    }
    SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
      description.headerExtensions.push(SDPUtils.parseExtmap(line));
    });
    // FIXME: parse rtcp.
    return description;
  };

  // Generates parts of the SDP media section describing the capabilities /
  // parameters.
  SDPUtils.writeRtpDescription = function(kind, caps) {
    var sdp = '';

    // Build the mline.
    sdp += 'm=' + kind + ' ';
    sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
    sdp += ' UDP/TLS/RTP/SAVPF ';
    sdp += caps.codecs.map(function(codec) {
      if (codec.preferredPayloadType !== undefined) {
        return codec.preferredPayloadType;
      }
      return codec.payloadType;
    }).join(' ') + '\r\n';

    sdp += 'c=IN IP4 0.0.0.0\r\n';
    sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

    // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
    caps.codecs.forEach(function(codec) {
      sdp += SDPUtils.writeRtpMap(codec);
      sdp += SDPUtils.writeFmtp(codec);
      sdp += SDPUtils.writeRtcpFb(codec);
    });
    var maxptime = 0;
    caps.codecs.forEach(function(codec) {
      if (codec.maxptime > maxptime) {
        maxptime = codec.maxptime;
      }
    });
    if (maxptime > 0) {
      sdp += 'a=maxptime:' + maxptime + '\r\n';
    }
    sdp += 'a=rtcp-mux\r\n';

    if (caps.headerExtensions) {
      caps.headerExtensions.forEach(function(extension) {
        sdp += SDPUtils.writeExtmap(extension);
      });
    }
    // FIXME: write fecMechanisms.
    return sdp;
  };

  // Parses the SDP media section and returns an array of
  // RTCRtpEncodingParameters.
  SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
    var encodingParameters = [];
    var description = SDPUtils.parseRtpParameters(mediaSection);
    var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
    var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

    // filter a=ssrc:... cname:, ignore PlanB-msid
    var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
      .map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
      })
      .filter(function(parts) {
        return parts.attribute === 'cname';
      });
    var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
    var secondarySsrc;

    var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
      .map(function(line) {
        var parts = line.substr(17).split(' ');
        return parts.map(function(part) {
          return parseInt(part, 10);
        });
      });
    if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
      secondarySsrc = flows[0][1];
    }

    description.codecs.forEach(function(codec) {
      if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
        var encParam = {
          ssrc: primarySsrc,
          codecPayloadType: parseInt(codec.parameters.apt, 10)
        };
        if (primarySsrc && secondarySsrc) {
          encParam.rtx = {ssrc: secondarySsrc};
        }
        encodingParameters.push(encParam);
        if (hasRed) {
          encParam = JSON.parse(JSON.stringify(encParam));
          encParam.fec = {
            ssrc: primarySsrc,
            mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
          };
          encodingParameters.push(encParam);
        }
      }
    });
    if (encodingParameters.length === 0 && primarySsrc) {
      encodingParameters.push({
        ssrc: primarySsrc
      });
    }

    // we support both b=AS and b=TIAS but interpret AS as TIAS.
    var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
    if (bandwidth.length) {
      if (bandwidth[0].indexOf('b=TIAS:') === 0) {
        bandwidth = parseInt(bandwidth[0].substr(7), 10);
      } else if (bandwidth[0].indexOf('b=AS:') === 0) {
        // use formula from JSEP to convert b=AS to TIAS value.
        bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
            - (50 * 40 * 8);
      } else {
        bandwidth = undefined;
      }
      encodingParameters.forEach(function(params) {
        params.maxBitrate = bandwidth;
      });
    }
    return encodingParameters;
  };

  // parses http://draft.ortc.org/#rtcrtcpparameters*
  SDPUtils.parseRtcpParameters = function(mediaSection) {
    var rtcpParameters = {};

    // Gets the first SSRC. Note tha with RTX there might be multiple
    // SSRCs.
    var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
      .map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
      })
      .filter(function(obj) {
        return obj.attribute === 'cname';
      })[0];
    if (remoteSsrc) {
      rtcpParameters.cname = remoteSsrc.value;
      rtcpParameters.ssrc = remoteSsrc.ssrc;
    }

    // Edge uses the compound attribute instead of reducedSize
    // compound is !reducedSize
    var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
    rtcpParameters.reducedSize = rsize.length > 0;
    rtcpParameters.compound = rsize.length === 0;

    // parses the rtcp-mux attrіbute.
    // Note that Edge does not support unmuxed RTCP.
    var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
    rtcpParameters.mux = mux.length > 0;

    return rtcpParameters;
  };

  // parses either a=msid: or a=ssrc:... msid lines and returns
  // the id of the MediaStream and MediaStreamTrack.
  SDPUtils.parseMsid = function(mediaSection) {
    var parts;
    var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
    if (spec.length === 1) {
      parts = spec[0].substr(7).split(' ');
      return {stream: parts[0], track: parts[1]};
    }
    var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
      .map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
      })
      .filter(function(msidParts) {
        return msidParts.attribute === 'msid';
      });
    if (planB.length > 0) {
      parts = planB[0].value.split(' ');
      return {stream: parts[0], track: parts[1]};
    }
  };

  // SCTP
  // parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
  // to draft-ietf-mmusic-sctp-sdp-05
  SDPUtils.parseSctpDescription = function(mediaSection) {
    var mline = SDPUtils.parseMLine(mediaSection);
    var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
    var maxMessageSize;
    if (maxSizeLine.length > 0) {
      maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
    }
    if (isNaN(maxMessageSize)) {
      maxMessageSize = 65536;
    }
    var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
    if (sctpPort.length > 0) {
      return {
        port: parseInt(sctpPort[0].substr(12), 10),
        protocol: mline.fmt,
        maxMessageSize: maxMessageSize
      };
    }
    var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
    if (sctpMapLines.length > 0) {
      var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0]
        .substr(10)
        .split(' ');
      return {
        port: parseInt(parts[0], 10),
        protocol: parts[1],
        maxMessageSize: maxMessageSize
      };
    }
  };

  // SCTP
  // outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
  // support by now receiving in this format, unless we originally parsed
  // as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
  // protocol of DTLS/SCTP -- without UDP/ or TCP/)
  SDPUtils.writeSctpDescription = function(media, sctp) {
    var output = [];
    if (media.protocol !== 'DTLS/SCTP') {
      output = [
        'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
        'c=IN IP4 0.0.0.0\r\n',
        'a=sctp-port:' + sctp.port + '\r\n'
      ];
    } else {
      output = [
        'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
        'c=IN IP4 0.0.0.0\r\n',
        'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
      ];
    }
    if (sctp.maxMessageSize !== undefined) {
      output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
    }
    return output.join('');
  };

  // Generate a session ID for SDP.
  // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
  // recommends using a cryptographically random +ve 64-bit value
  // but right now this should be acceptable and within the right range
  SDPUtils.generateSessionId = function() {
    return Math.random().toString().substr(2, 21);
  };

  // Write boilder plate for start of SDP
  // sessId argument is optional - if not supplied it will
  // be generated randomly
  // sessVersion is optional and defaults to 2
  // sessUser is optional and defaults to 'thisisadapterortc'
  SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
    var sessionId;
    var version = sessVer !== undefined ? sessVer : 2;
    if (sessId) {
      sessionId = sessId;
    } else {
      sessionId = SDPUtils.generateSessionId();
    }
    var user = sessUser || 'thisisadapterortc';
    // FIXME: sess-id should be an NTP timestamp.
    return 'v=0\r\n' +
        'o=' + user + ' ' + sessionId + ' ' + version +
          ' IN IP4 127.0.0.1\r\n' +
        's=-\r\n' +
        't=0 0\r\n';
  };

  SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
    var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

    // Map ICE parameters (ufrag, pwd) to SDP.
    sdp += SDPUtils.writeIceParameters(
      transceiver.iceGatherer.getLocalParameters());

    // Map DTLS parameters to SDP.
    sdp += SDPUtils.writeDtlsParameters(
      transceiver.dtlsTransport.getLocalParameters(),
      type === 'offer' ? 'actpass' : 'active');

    sdp += 'a=mid:' + transceiver.mid + '\r\n';

    if (transceiver.direction) {
      sdp += 'a=' + transceiver.direction + '\r\n';
    } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
      sdp += 'a=sendrecv\r\n';
    } else if (transceiver.rtpSender) {
      sdp += 'a=sendonly\r\n';
    } else if (transceiver.rtpReceiver) {
      sdp += 'a=recvonly\r\n';
    } else {
      sdp += 'a=inactive\r\n';
    }

    if (transceiver.rtpSender) {
      // spec.
      var msid = 'msid:' + stream.id + ' ' +
          transceiver.rtpSender.track.id + '\r\n';
      sdp += 'a=' + msid;

      // for Chrome.
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' ' + msid;
      if (transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' ' + msid;
        sdp += 'a=ssrc-group:FID ' +
            transceiver.sendEncodingParameters[0].ssrc + ' ' +
            transceiver.sendEncodingParameters[0].rtx.ssrc +
            '\r\n';
      }
    }
    // FIXME: this should be written by writeRtpDescription.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
    if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
    }
    return sdp;
  };

  // Gets the direction from the mediaSection or the sessionpart.
  SDPUtils.getDirection = function(mediaSection, sessionpart) {
    // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
    var lines = SDPUtils.splitLines(mediaSection);
    for (var i = 0; i < lines.length; i++) {
      switch (lines[i]) {
        case 'a=sendrecv':
        case 'a=sendonly':
        case 'a=recvonly':
        case 'a=inactive':
          return lines[i].substr(2);
          // FIXME: What should happen here?
      }
    }
    if (sessionpart) {
      return SDPUtils.getDirection(sessionpart);
    }
    return 'sendrecv';
  };

  SDPUtils.getKind = function(mediaSection) {
    var lines = SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(' ');
    return mline[0].substr(2);
  };

  SDPUtils.isRejected = function(mediaSection) {
    return mediaSection.split(' ', 2)[1] === '0';
  };

  SDPUtils.parseMLine = function(mediaSection) {
    var lines = SDPUtils.splitLines(mediaSection);
    var parts = lines[0].substr(2).split(' ');
    return {
      kind: parts[0],
      port: parseInt(parts[1], 10),
      protocol: parts[2],
      fmt: parts.slice(3).join(' ')
    };
  };

  SDPUtils.parseOLine = function(mediaSection) {
    var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
    var parts = line.substr(2).split(' ');
    return {
      username: parts[0],
      sessionId: parts[1],
      sessionVersion: parseInt(parts[2], 10),
      netType: parts[3],
      addressType: parts[4],
      address: parts[5]
    };
  };

  // a very naive interpretation of a valid SDP.
  SDPUtils.isValidSDP = function(blob) {
    if (typeof blob !== 'string' || blob.length === 0) {
      return false;
    }
    var lines = SDPUtils.splitLines(blob);
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
        return false;
      }
      // TODO: check the modifier a bit more.
    }
    return true;
  };

  // Expose public methods.
  if (typeof module === 'object') {
    module.exports = SDPUtils;
  }

  },{}]},{},[1])(1)
  });
  });

  unwrapExports(adapter);

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(
      function(value) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function() {
          return value;
        });
      },
      function(reason) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function() {
          // @ts-ignore
          return constructor.reject(reason);
        });
      }
    );
  }

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function isArray$1(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop$1() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function() {
      fn.apply(thisArg, arguments);
    };
  }

  /**
   * @constructor
   * @param {Function} fn
   */
  function Promise$1(fn) {
    if (!(this instanceof Promise$1))
      throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */
    this._state = 0;
    /** @type {!boolean} */
    this._handled = false;
    /** @type {Promise|undefined} */
    this._value = undefined;
    /** @type {!Array<!Function>} */
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise$1._immediateFn(function() {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self)
        throw new TypeError('A promise cannot be resolved with itself.');
      if (
        newValue &&
        (typeof newValue === 'object' || typeof newValue === 'function')
      ) {
        var then = newValue.then;
        if (newValue instanceof Promise$1) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise$1._immediateFn(function() {
        if (!self._handled) {
          Promise$1._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  /**
   * @constructor
   */
  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(
        function(value) {
          if (done) return;
          done = true;
          resolve(self, value);
        },
        function(reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        }
      );
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise$1.prototype['catch'] = function(onRejected) {
    return this.then(null, onRejected);
  };

  Promise$1.prototype.then = function(onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop$1);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise$1.prototype['finally'] = finallyConstructor;

  Promise$1.all = function(arr) {
    return new Promise$1(function(resolve, reject) {
      if (!isArray$1(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(
                val,
                function(val) {
                  res(i, val);
                },
                reject
              );
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise$1.resolve = function(value) {
    if (value && typeof value === 'object' && value.constructor === Promise$1) {
      return value;
    }

    return new Promise$1(function(resolve) {
      resolve(value);
    });
  };

  Promise$1.reject = function(value) {
    return new Promise$1(function(resolve, reject) {
      reject(value);
    });
  };

  Promise$1.race = function(arr) {
    return new Promise$1(function(resolve, reject) {
      if (!isArray$1(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise$1.resolve(arr[i]).then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise$1._immediateFn =
    // @ts-ignore
    (typeof setImmediate === 'function' &&
      function(fn) {
        // @ts-ignore
        setImmediate(fn);
      }) ||
    function(fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  var _default = /*#__PURE__*/function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this._stream = null;
      this.element = options.el;
      this.width = options.width;
      this.height = options.height;
      this.log = options.log;
    }

    _createClass(_default, [{
      key: "ready",
      value: function ready() {
        var _this = this;

        var width = this.width,
            height = this.height,
            element = this.element,
            log = this.log;
        element.setAttribute('autoplay', 'autoplay');
        element.setAttribute('muted', 'muted');
        return new Promise$1(function (resolve, reject) {
          var constraints = {
            audio: false,
            video: {
              width: width,
              height: height
            }
          };

          var handleSuccess = function handleSuccess(stream) {
            _this._stream = stream;

            if ('srcObject' in element) {
              element.srcObject = stream;
            } else {
              element.src = window.URL.createObjectURL(stream);
            }

            element.addEventListener('loadmetadata', element.play);
            resolve(stream);
          };

          var handleError = function handleError(error) {
            log("\n          navigator.MediaDevices.getUserMedia is error.\n          - name   : ".concat(error.name, "\n          - message: ").concat(error.message, "\n        "));
            reject(error);
          };

          navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess)["catch"](handleError);
        });
      }
    }, {
      key: "toBase64",
      value: function toBase64() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'png';
        var width = this.width,
            height = this.height,
            element = this.element;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        element && context.drawImage(element, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL("image/".concat(type));
        canvas.remove && canvas.remove();
        return dataURL || '';
      }
    }, {
      key: "stop",
      value: function stop(callback) {
        if (this._stream) {
          this._stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });

          this._stream.getVideoTracks().forEach(function (track) {
            track.stop();
          });

          this._stream = null;
        }

        isFunction_1(callback) && callback();
      }
    }]);

    return _default;
  }();

  // 1. 需要使用 cacheAny 存储方法？
  // 2. 每次新建 canvas，原先移除 canvas，但是觉着回收机制应该会自动回收才对，所以删除了之前代码，

  var cacheAny = {};

  var createOnSave = function createOnSave(callback, type) {
    if (cacheAny[type]) return cacheAny[type];
    var domCanvas = document.createElement('canvas');
    domCanvas.width = 320;
    domCanvas.height = 240;
    var context = domCanvas.getContext('2d');
    var image = context.getImageData(0, 0, domCanvas.width, domCanvas.height);
    var index = 0;

    var onSave = function onSave(data) {
      var column = data.split(';');

      for (var i = 0; i < 320; i++) {
        var item = parseInt(column[i]);
        image.data[index] = item >> 16 & 0xff;
        image.data[index + 1] = item >> 8 & 0xff;
        image.data[index + 2] = item & 0xff;
        image.data[index + 3] = 0xff;
        index += 4;
      }

      if (index >= 4 * 320 * 240) {
        context.putImageData(image, 0, 0);
        var dataURL = domCanvas.toDataURL('image/' + type);
        index = 0;
        isFunction_1(callback) && callback(dataURL);
      }
    };

    cacheAny[type] = onSave;
    return onSave;
  };

  var _default$1 = /*#__PURE__*/function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this.element = options.el;
      this.config = options;
      this.log = options.log;
    }

    _createClass(_default, [{
      key: "ready",
      value: function ready() {
        var _this = this;

        var config = this.config;
        var events = ['capture', 'save', 'setCamera', 'getCameraList', 'pauseCamera', 'resumeCamera'];
        window.webcam = config; // 两天时间调研发现十分诡异
        // 使用的 object 对象在 IE10 以及 IE10- 必须使用 id 重新获取一遍
        // 所以如果仅仅不考虑IE10 以及 IE10-，可以移除此处代码

        var id = this.element.getAttribute('id');
        config.id = id;
        var run = 3;
        var timer = -1;

        var _register = function _register() {
          clearTimeout(timer);
          var element = querySelector('#' + id); // 注意此处也需要修改 var element = this.element;

          if (isNil_1(element && element.capture)) {
            if (run === 0) {
              _this.log("Flash movie not yet registered!");
            } else {
              run--;
              timer = setTimeout(_register, 1000 * (4 - run));
            }
          } else {
            events.forEach(function (event) {
              config[event] = function (x) {
                try {
                  return element[event](x);
                } catch (e) {
                  _this.log(['The flash goes wrong', e]);
                }
              };
            });
            isFunction_1(config.onLoad) && config.onLoad();
          }
        };

        _register();
      }
    }, {
      key: "toBase64",
      value: function toBase64(callback) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'png';
        this.config.onSave = createOnSave(callback, type);
        this.config.capture();
      }
    }, {
      key: "stop",
      value: function stop(callback) {
        // 尚未找到关闭方法
        isFunction_1(callback) && callback();
      }
    }]);

    return _default;
  }();

  if (isNil_1(window) || isNil_1(Math) || isNil_1(navigator)) {
    throw new Error(" It only can run in browser. ");
  }

  var supported = Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && Boolean(URL && URL.createObjectURL);
  var baseConfig = {
    el: null,
    id: 'camera' + uuid(),
    // id 首字母不可为数字
    width: 320,
    height: 240,
    mode: 'native',
    silent: true
  };
  var flashConfig = {
    swffile: './assets/jscam_canvas_only.swf',
    onCapture: noop_1,
    onTick: noop_1,
    onSave: noop_1,
    onLoad: noop_1,
    debug: noop_1
  };

  var queryCamera = function queryCamera(wrapper, options) {
    var width = options.width,
        height = options.height,
        swffile = options.swffile,
        mode = options.mode,
        id = options.id;
    var originSource = wrapper.innerHTML;
    var source = {
      "native": "<video id=\"".concat(id, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" auto=\"auto\" muted=\"muted\"></video>"),
      flash: "<object id=\"".concat(id, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" data=\"").concat(swffile, "\" type=\"application/x-shockwave-flash\"><param name=\"movie\" value=\"").concat(swffile, "\" /><param name=\"FlashVars\" value=\"mode=callback&amp;quality=85\" /><param name=\"allowScriptAccess\" value=\"always\" /></object>")
    };
    wrapper.innerHTML = originSource + source[mode];
    return wrapper.querySelector('#' + id);
  };

  var _default$2 = /*#__PURE__*/function () {
    function _default$2(options) {
      _classCallCheck(this, _default$2);

      // eslint-disable-next-line no-undef
      this.version = "0.0.1";
      this.element = null;
      this.camera = null;
      this.config = null;
      this.ready(options);
    }

    _createClass(_default$2, [{
      key: "_initNative",
      value: function _initNative() {
        this._nativeCamera = new _default({
          el: this.camera,
          width: this.config.width,
          height: this.config.height,
          log: this.log
        });
      }
    }, {
      key: "_initFlash",
      value: function _initFlash() {
        this._flashCamera = new _default$1({
          el: this.camera,
          onCapture: this.config.onCapture,
          onTick: this.config.onTick,
          onSave: this.config.onSave,
          onLoad: this.config.onLoad,
          debug: this.config.debug,
          log: this.log
        });
      }
    }, {
      key: "ready",
      value: function ready(options) {
        this.config = merge_1({}, baseConfig, flashConfig, isString_1(options) ? {
          el: options
        } : options);

        var element = querySelector(this.config.el);

        if (!element) {
          this.log("\n        The element wasn't found.\n        Please check whether the parameters are correct.\n      ");
          return;
        }

        if (!supported && !this.config.swffile) {
          this.log("\n        The browser's userMedia isn't supported!\n        Please provide the '*.swf' file path.\n        Or try a new browser.\n      ");
          return;
        }

        if (!/^(native|flash)$/.test(this.config.mode)) {
          this.config.mode = supported ? 'native' : 'flash';
        }

        var useNative = /^native$/.test(this.config.mode);
        this.element = element;
        this.camera = queryCamera(this.element, {
          id: this.config.id,
          width: useNative ? this.config.width : baseConfig.width,
          // 受 swffile 文件限制
          height: useNative ? this.config.height : baseConfig.height,
          // 受 swffile 文件限制
          swffile: useNative ? '' : this.config.swffile,
          mode: this.config.mode
        });
        useNative ? this._initNative() : this._initFlash();
        useNative ? this._nativeCamera.ready() : this._flashCamera.ready();
      }
    }, {
      key: "toBase64",
      value: function toBase64(callback) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'png';
        if (!isFunction_1(callback)) return;
        /^native$/.test(this.config.mode) ? callback(this._nativeCamera.toBase64(type)) : this._flashCamera.toBase64(callback, type);
      }
    }, {
      key: "stop",
      value: function stop(callback) {
        this._nativeCamera && this._nativeCamera.stop(callback);
        this._flashCamera && this._flashCamera.stop(callback);
      }
    }, {
      key: "log",
      value: function log(message) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
        var args = ["web-camera ".concat(type, ": ")];
        Array.isArray(message) ? args.push.apply(args, _toConsumableArray(message)) : args.push(message);
        !this.config.silent && console && console[type].apply(console, args);
      } // file(name = `image-${_.uuid()}`, type = 'png') {
      //   if (!_.validFileName(name)) {
      //     this.log(`
      //       The fileName is invalid.
      //       It can't contain '/', '\\', ':', '*', '?', '"', '<', '>', '|'.
      //       And It can't start with '.'.
      //     `);
      //     return;
      //   }
      //   if (_.isNil(atob) || _.isNil(Uint8Array) || _.isNil(Blob) || _.isNil(File)) {
      //     this.log(`
      //       The browser is not support Blob.
      //       So can't convert to file.
      //       You can try a new browser.
      //     `);
      //     return;
      //   }
      //   this.toBase64(dataURL => {
      //     const dataArray = dataURL.split(',');
      //     const mime = dataArray[0].match(/:(.*?);/)[1];
      //     const blob = atob(dataArray[1]);
      //     let length = blob.length;
      //     const u8Array = new Uint8Array(length);
      //     while (length--) {
      //       u8Array[length] = blob.charCodeAt(length);
      //     }
      //     // const imageFile = new Blob([u8Array], { type: mime });
      //     return new File([u8Array], name + type, { type: mime });
      //   });
      // }

    }]);

    return _default$2;
  }();

  return _default$2;

}());
//# sourceMappingURL=index.js.map
