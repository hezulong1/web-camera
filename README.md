# web-camera

一款浏览器拍照工具，兼容支持 canvas（理论是 IE9）以上。

> 现在浏览器基于 `navigator.MediaDevices.getUserMedia` 封装。
> 不支持 `navigator.MediaDevices.getUserMedia` 浏览器使用第三方组件 [jquery-webcam](https://www.xarg.org/project/jquery-webcam-plugin/)

可见：[Demo](https://hezulong1.github.io/web-camera/test/)

## 使用

```javascript
// 实例化
var camera = new WebCamera(options);
// 初始化
camera.ready();
// 转化成 base64 编码
camera.toBase64(function(dataURL) {
  // code
}, 'png' );
```

## 属性

| 名称 | 类型 | 说明 | 默认值 |
|------|------|-----|--------|
| el | string / HTMLElement | 容器（必填） | '' |
| id | string | camera 的 id | `uuid()` |
| width | number | camera 的宽度，在 flash 模式下无效 | 320 |
| height | number | camera 的高度，在 flash 模式下无效 | 240 |
| mode | string | `native`，`flash`，`''` | '' |
| swffile | string | flash 模式下，jquery.webcam 属性，如果不考虑可不配置 | './assets/jscam_canvas_only.swf' |
| debug | function | flash 模式下，jquery.webcam 属性，如果不考虑可不配置 | `noop`|
| onCapture | function | flash 模式下，jquery.webcam 属性，如果不考虑可不配置 | `noop`|
| onTick | function | flash 模式下，jquery.webcam 属性，如果不考虑可不配置 |`noop` |
| onSave | function | flash 模式下，jquery.webcam 属性，如果不考虑可不配置，注意：如果你重新配置了 `onSave`，那么方法 `toBase64` 你需要重新编写，否则会失效 | `onSave` |
| onTick | function | flash 模式下，jquery.webcam 属性，如果不考虑可不配置 |`noop` |
| onLoad | function | flash 模式下，jquery.webcam 属性，如果不考虑可不配置 |`noop` |

## 方法

- ready: 初始化参数

- toBase64: 导出至 base64 编码，接受 2 个参数
  1. callback: 回调方法，必填
  2. type: 图片类型，默认值为 `png`，目前浏览器仅仅支持 `png` 与 `jpeg`，不合规范的将自动转换成 `png`

```javascript

camera.toBase64(dataURL => { /* code */ })

camera.toBase64(dataURL => { /* code */ }, 'jpeg')

```
