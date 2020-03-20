import * as _ from 'u';
import NativeCamera from './native';
import FlashCamera from './flash';

if (_.isNil(window) || _.isNil(Math) || _.isNil(navigator)) {
  throw new Error(` It only can run in browser. `);
}

const supported = Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && Boolean(URL && URL.createObjectURL);

const baseConfig = {
  el    : null,
  id    : 'camera' + _.uuid(), // id 首字母不可为数字
  width : 320,
  height: 240,
  mode  : 'native',
  silent: true
};

const flashConfig = {
  swffile  : './assets/jscam_canvas_only.swf',
  onCapture: _.noop,
  onTick   : _.noop,
  onSave   : _.noop,
  onLoad   : _.noop,
  debug    : _.noop
};

const queryCamera = (wrapper, options) => {
  const { width, height, swffile, mode, id } = options;
  const originSource = wrapper.innerHTML;
  const source = {
    native: `<video id="${id}" width="${width}" height="${height}" auto="auto" muted="muted"></video>`,
    flash : `<object id="${id}" width="${width}" height="${height}" data="${swffile}" type="application/x-shockwave-flash"><param name="movie" value="${swffile}" /><param name="FlashVars" value="mode=callback&amp;quality=85" /><param name="allowScriptAccess" value="always" /></object>`
  };
  wrapper.innerHTML = originSource + source[mode];
  return wrapper.querySelector('#' + id);
};

export default class {
  constructor(options) {
    // eslint-disable-next-line no-undef
    this.version = __VERSION__;
    this.element = null;
    this.camera = null;
    this.config = null;
    this.ready(options);
  }
  _initNative() {
    this._nativeCamera = new NativeCamera({
      el    : this.camera,
      width : this.config.width,
      height: this.config.height,
      log   : this.log
    });
  }
  _initFlash() {
    this._flashCamera = new FlashCamera({
      el       : this.camera,
      onCapture: this.config.onCapture,
      onTick   : this.config.onTick,
      onSave   : this.config.onSave,
      onLoad   : this.config.onLoad,
      debug    : this.config.debug,
      log      : this.log
    });
  }
  ready(options) {
    this.config = _.merge({}, baseConfig, flashConfig, _.isString(options) ? { el: options } : options);
    const element = _.querySelector(this.config.el);

    if (!element) {
      this.log(`
        The element wasn't found.
        Please check whether the parameters are correct.
      `);
      return;
    }

    if (!supported && !this.config.swffile) {
      this.log(`
        The browser's userMedia isn't supported!
        Please provide the '*.swf' file path.
        Or try a new browser.
      `);
      return;
    }

    if (!(/^(native|flash)$/.test(this.config.mode))) {
      this.config.mode = supported ? 'native' : 'flash';
    }
    const useNative = /^native$/.test(this.config.mode);

    this.element = element;
    this.camera = queryCamera(this.element, {
      id     : this.config.id,
      width  : useNative ? this.config.width : baseConfig.width, // 受 swffile 文件限制
      height : useNative ? this.config.height : baseConfig.height, // 受 swffile 文件限制
      swffile: useNative ? '' : this.config.swffile,
      mode   : this.config.mode
    });

    useNative ? this._initNative() : this._initFlash();
    useNative ? this._nativeCamera.ready() : this._flashCamera.ready();
  }
  toBase64(callback, type = 'png') {
    if (!_.isFunction(callback)) return;

    /^native$/.test(this.config.mode)
      ? callback(this._nativeCamera.toBase64(type))
      : this._flashCamera.toBase64(callback, type);
  }
  log(message, type = 'error') {
    const args = [`web-camera ${type}: `];
    Array.isArray(message) ? args.push(...message) : args.push(message);
    !this.config.silent && console && console[type].apply(console, args);
  }
  file(name = `image-${_.uuid()}`, type = 'png') {
    if (!_.validFileName(name)) {
      this.log(`
        The fileName is invalid.
        It can't contain '/', '\\', ':', '*', '?', '"', '<', '>', '|'.
        And It can't start with '.'.
      `);
      return;
    }

    if (_.isNil(atob) || _.isNil(Uint8Array) || _.isNil(Blob) || _.isNil(File)) {
      this.log(`
        The browser is not support Blob.
        So can't convert to file.
        You can try a new browser.
      `);
      return;
    }

    const dataURL = this.base64(type);
    const dataArray = dataURL.split(',');
    const mime = dataArray[0].match(/:(.*?);/)[1];
    const blob = atob(dataArray[1]);

    let length = blob.length;
    const u8Array = new Uint8Array(length);
    while (length--) {
      u8Array[length] = blob.charCodeAt(length);
    }

    // const imageFile = new Blob([u8Array], { type: mime });
    return new File([u8Array], name + type, { type: mime });
  }
}
