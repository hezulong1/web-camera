import 'webrtc-adapter/out/adapter';
import Promise from 'promise-polyfill';

export default class {
  constructor(options) {
    this.element = options.el;
    this.width = options.width;
    this.height = options.height;
    this.log = options.log;
  }
  ready() {
    const { width, height, element, log } = this;
    element.setAttribute('autoplay', 'autoplay');
    element.setAttribute('muted', 'muted');
    return new Promise((resolve, reject) => {
      const constraints = {
        audio: false,
        video: { width, height }
      };
      const handleSuccess = stream => {
        if ('srcObject' in element) {
          element.srcObject = stream;
        } else {
          element.src = window.URL.createObjectURL(stream);
        }
        element.addEventListener('loadmetadata', element.play);
        resolve(stream);
      };
      const handleError = error => {
        log(`
          navigator.MediaDevices.getUserMedia is error.
          - name   : ${error.name}
          - message: ${error.message}
        `);
        reject(error);
      };
      navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
    });
  }
  toBase64(type = 'png') {
    const { width, height, element } = this;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    element && context.drawImage(element, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL(`image/${type}`);
    canvas.remove && canvas.remove();
    return dataURL || '';
  }
}
