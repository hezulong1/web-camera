/**
 * reference: https://www.xarg.org/project/jquery-webcam-plugin/
 */
import { isNil, isFunction, querySelector } from 'u';

// Todo: 或许存在缓存问题
// 1. 需要使用 cacheAny 存储方法？
// 2. 每次新建 canvas，原先移除 canvas，但是觉着回收机制应该会自动回收才对，所以删除了之前代码，
const cacheAny = {};
const createOnSave = function(callback, type) {
  if (cacheAny[type]) return cacheAny[type];
  const domCanvas = document.createElement('canvas');
  domCanvas.width = 320;
  domCanvas.height = 240;
  const context = domCanvas.getContext('2d');
  const image = context.getImageData(0, 0, domCanvas.width, domCanvas.height);
  let index = 0;

  const onSave = function(data) {
    const column = data.split(';');
    for (let i = 0; i < 320; i++) {
      const item = parseInt(column[i]);
      image.data[index] = (item >> 16) & 0xff;
      image.data[index + 1] = (item >> 8) & 0xff;
      image.data[index + 2] = item & 0xff;
      image.data[index + 3] = 0xff;
      index += 4;
    }

    if (index >= 4 * 320 * 240) {
      context.putImageData(image, 0, 0);
      const dataURL = domCanvas.toDataURL('image/' + type);
      index = 0;
      isFunction(callback) && callback(dataURL);
    }
  };

  cacheAny[type] = onSave;
  return onSave;
};

export default class {
  constructor(options) {
    this.element = options.el;
    this.config = options;
    this.log = options.log;
  }
  ready() {
    const config = this.config;
    const events = ['capture', 'save', 'setCamera', 'getCameraList', 'pauseCamera', 'resumeCamera'];
    window.webcam = config;

    // 两天时间调研发现十分诡异
    // 使用的 object 对象在 IE10 以及 IE10- 必须使用 id 重新获取一遍
    // 所以如果仅仅不考虑IE10 以及 IE10-，可以移除此处代码
    const id = this.element.getAttribute('id');
    config.id = id;

    let run = 3;
    let timer = -1;
    const _register = () => {
      clearTimeout(timer);
      const element = querySelector('#' + id); // 注意此处也需要修改 var element = this.element;
      if (isNil(element && element.capture)) {
        if (run === 0) {
          this.log(`Flash movie not yet registered!`);
        } else {
          run--;
          timer = setTimeout(_register, 1000 * (4 - run));
        }
      } else {
        events.forEach(event => {
          config[event] = x => {
            try { return element[event](x) } catch (e) { this.log(['The flash goes wrong', e]) }
          };
        });
        isFunction(config.onLoad) && config.onLoad();
      }
    };
    _register();
  }
  toBase64(callback, type = 'png') {
    this.config.onSave = createOnSave(callback, type);
    this.config.capture();
  }
}
