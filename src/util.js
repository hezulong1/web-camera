import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isElement from 'lodash/isElement';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';
import merge from 'lodash/merge';
import noop from 'lodash/noop';

const uuid = () => Math.random().toString(36).slice(4) + +new Date();
const querySelector = selector => {
  let element;
  if (isString(selector)) {
    element = document.querySelector(selector);
  } else if (isPlainObject(selector)) {
    element = querySelector(selector.el);
  } else if (isElement(selector)) {
    element = selector;
  }
  return element;
};
const validFileName = fileName => !isNil(fileName) && /^(?!\.)[^\\\/:\*\?"<>\|]{1,255}$/.test(fileName);

export {
  isPlainObject,
  isFunction,
  isElement,
  isString,
  isNil,
  merge,
  noop,
  uuid,
  querySelector,
  validFileName
};
