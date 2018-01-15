// constants
import {BRIGHTNESS_THRESHOLD, DEFAULT_HEX_CODE_VALUE} from './constants';

// utils
import {
  getHslaString,
  getNormalizedValue,
  getProperHex,
  rgbToHsl,
  shouldForegroundBeDark,
  shouldForegroundBeDarkW3C,
  stringToRgb,
  stringToHex
} from './utils';

/**
 * @function prisma
 *
 * @description
 * return object with a variety of color options for the developer
 *
 * @param {string} value
 * @param {object} options={}
 * @param {string} [options.defaultHex=DEFAULT_HEX_CODE_VALUE]
 * @param {number} [options.brightnessThreshold=BRIGHTNESS_THRESHOLD]
 * @param {number} [options.opacity=1]
 * @returns {object}
 */
export const prisma = (value, options = {}) => {
  const {
    defaultHex = DEFAULT_HEX_CODE_VALUE,
    brightnessThreshold: passedBrightnessThreshold = BRIGHTNESS_THRESHOLD,
    opacity: passedOpacity = 1
  } = options;

  const opacity = getNormalizedValue(passedOpacity, 0, 1);

  const hexString = stringToHex(`${value}`, getProperHex(defaultHex));
  const rgbArray = stringToRgb(hexString);
  const rgbaArray = [...rgbArray, opacity];
  const hslArray = rgbToHsl(rgbArray);
  const hslaArray = [...hslArray, opacity];

  return Object.freeze({
    hex: `#${hexString}`,
    hsl: `hsl(${hslArray.join(', ')})`,
    hslArray: Object.freeze(hslArray),
    hsla: `hsla(${getHslaString(hslaArray)})`,
    hslaArray: Object.freeze(hslaArray),
    rgb: `rgb(${rgbArray.join(', ')})`,
    rgbArray: Object.freeze(rgbArray),
    rgba: `rgba(${rgbaArray.join(', ')})`,
    rgbaArray: Object.freeze(rgbaArray),
    shouldTextBeDark: shouldForegroundBeDark(rgbArray, getNormalizedValue(passedBrightnessThreshold, 0, 255)),
    shouldTextBeDarkW3C: shouldForegroundBeDarkW3C(rgbArray)
  });
};

/**
 * @function shouldTextBeDark
 *
 * @description
 * convenience function if you want to test if the foreground
 * should be dark based on a specific brightness level
 *
 * @param {string} [color=DEFAULT_HEX_CODE_VALUE]
 * @param {number} [passedBrightnessThreshold=BRIGHTNESS_THRESHOLD]
 * @returns {boolean}
 */
export const shouldTextBeDark = (color = DEFAULT_HEX_CODE_VALUE, passedBrightnessThreshold = BRIGHTNESS_THRESHOLD) => {
  const brightnessThreshold = getNormalizedValue(passedBrightnessThreshold, 0, 255);

  const properHex = getProperHex(color);
  const rgbArray = stringToRgb(properHex);

  return shouldForegroundBeDark(rgbArray, brightnessThreshold);
};

/**
 * @function shouldTextBeDarkW3C
 *
 * @description
 * convenience function if you want to test if the foreground
 * should be dark based on the W3C standard
 *
 * @param {string} color=DEFAULT_HEX_CODE_VALUE
 * @returns {boolean}
 */
export const shouldTextBeDarkW3C = (color = DEFAULT_HEX_CODE_VALUE) => {
  const properHex = getProperHex(color);
  const rgbArray = stringToRgb(properHex);

  return shouldForegroundBeDarkW3C(rgbArray);
};

prisma.shouldTextBeDark = shouldTextBeDark;
prisma.shouldTextBeDarkW3C = shouldTextBeDarkW3C;

export default prisma;
