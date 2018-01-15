// constants
import {
  DARK_TEXT_MULTIPLIERS,
  DARK_TEXT_W3C_ADDITIVE,
  DEFAULT_HEX_CODE_VALUE,
  L_THRESHOLD,
  SHORTHAND_REGEXP
} from './constants';

/**
 * @function getHslaString
 *
 * @description
 * based on array of hsl / hsla values,
 * return built string of comma-separated hsl CSS values
 *
 * @param {Array<number>} hsla
 * @returns {string}
 */
export const getHslaString = (hsla) => {
  return hsla.reduce((hslaValueString, hslaPart, index) => {
    if (index) {
      return index === 3 ? `${hslaValueString}, ${hslaPart}` : `${hslaValueString}, ${Math.round(hslaPart * 100)}%`;
    }

    return `${hslaValueString}${hslaPart}`;
  }, '');
};

/**
 * @function getHslHue
 *
 * @description
 * get the hue value for HSL
 *
 * @param {number} red the red value in RGB
 * @param {number} green the green value in RGB
 * @param {number} blue the blue value in RGB
 * @param {number} maxColor the max of the three values
 * @param {number} delta the different between the max and min
 * @returns {number} the hue value
 */
export const getHslHue = (red, green, blue, maxColor, delta) => {
  switch (maxColor) {
    case red:
      return (green - blue) / delta + (green < blue ? 6 : 0);

    case green:
      return (blue - red) / delta + 2;

    case blue:
      return (red - green) / delta + 4;
  }
};

/**
 * @function getNormalizedValue
 *
 * @description
 * get the value normalized by min and max
 *
 * @param {number} value the value to normalize
 * @param {number} min the minimum value allowed
 * @param {number} max the maximum value allowed
 * @returns {number} the normalized value
 */
export const getNormalizedValue = (value, min, max) => {
  return Math.max(Math.min(value, max), min);
};

/**
 * @function getProperHex
 *
 * @description
 * get the full six-character hexcode from any shorthand values
 *
 * @param {string} [color=DEFAULT_HEX_CODE_VALUE] the color to the the hex code for
 * @returns {string} the full hex code
 */
export const getProperHex = (color = DEFAULT_HEX_CODE_VALUE) => {
  const colorWithoutHash = color.charAt(0) === '#' ? color.slice(1) : color;

  return colorWithoutHash.replace(SHORTHAND_REGEXP, (match, red, green, blue) => {
    return `${red}${red}${green}${green}${blue}${blue}`;
  });
};

/**
 * @function hashCode
 *
 * @description
 * converts string to integer hash value
 *
 * @param {string} string the string to convert
 * @returns {number} the hash code
 */
export const hashCode = (string) => {
  if (!string) {
    return 0;
  }

  let hashValue = 5381;

  for (let index = 0; index < string.length; index++) {
    hashValue = (hashValue << 5) + hashValue + string.charCodeAt(index);
  }

  return hashValue >>> 0;
};

/**
 * @function integerToHex
 *
 * @description
 * convert integer value to hex code
 *
 * @param {number} integer the integer to convert
 * @param {string} defaultHex the default hex code
 * @returns {string} the converted integer
 */
export const integerToHex = (integer, defaultHex) => {
  let hex =
    ((integer >> 24) & 0xff).toString(16) +
    ((integer >> 16) & 0xff).toString(16) +
    ((integer >> 8) & 0xff).toString(16) +
    (integer & 0xff).toString(16);

  if (!hex) {
    return defaultHex;
  }

  if (hex.length < 6) {
    let hexCharArray = [];

    for (let index = 0; index < 6; index++) {
      hexCharArray.push(hex[index] || '0');
    }

    return hexCharArray.join('');
  }

  return hex.substring(0, 6);
};

/**
 * @function roundToTwoDigits
 *
 * @description
 * convenience function to round fraction to two digits
 *
 * @param {number} number the number to round
 * @returns {number} the rounded number
 */
export const roundToTwoDigits = (number) => {
  return Math.round(number * 100) / 100;
};

/**
 * based on rgb array, return hsl array value
 *
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @returns {Array}
 */
export const rgbToHsl = ([red, green, blue]) => {
  const fractionalRed = red / 255;
  const fractionalGreen = green / 255;
  const fractionalBlue = blue / 255;

  const max = Math.max(fractionalRed, fractionalGreen, fractionalBlue);
  const min = Math.min(fractionalRed, fractionalGreen, fractionalBlue);

  const luminance = (max + min) / 2;

  if (max === min) {
    return [0, 0, luminance];
  }

  const delta = max - min;

  const hue = Math.round(Math.max(0, getHslHue(fractionalRed, fractionalGreen, fractionalBlue, max, delta) * 60));
  const saturation = roundToTwoDigits(luminance > 0.5 ? delta / (2 - max - min) : delta / (max + min));
  const light = roundToTwoDigits(luminance);

  return [hue, saturation, light];
};

/**
 * @function stringToRgb
 *
 * @description
 * build RGB color from hashed string value
 *
 * @param {string} hex the hex code color
 * @returns {Array<number>} the rgb array
 */
export const stringToRgb = (hex) => {
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  return [red, green, blue];
};

/**
 * @function stringToHex
 *
 * @description
 * based on string passed, return hex code generated from hashed value
 *
 * @param {string} string the string to convert
 * @param {string} defaultHex the default hex code
 * @returns {string} the hex code color
 */
export const stringToHex = (string, defaultHex) => {
  if (!string) {
    return defaultHex;
  }

  return integerToHex(hashCode(string), defaultHex).substring(0, 6);
};

/**
 * @function shouldForegroundBeDark
 *
 * @description
 * determine whether the foreground color used with the color as a background color should
 * be dark (preferrably black), based on general brightness guideliness
 *
 * @param {Array<number>} rgb the array of RGBA values
 * @param {number} brightnessThreshold the threshold with which foreground should switch from dark to light
 * @returns {boolean} should the foreground be dark
 */
export const shouldForegroundBeDark = (rgb, brightnessThreshold) => {
  const brightnessValue = rgb.reduce((currentBrightnessValue, colorPart, colorPartIndex) => {
    return currentBrightnessValue + colorPart * colorPart * DARK_TEXT_MULTIPLIERS[colorPartIndex];
  }, 0);

  return Math.sqrt(brightnessValue) >= brightnessThreshold;
};

/**
 * @function shouldForegroundBeDarkW3C
 *
 * @description
 * determine whether the foreground color used with the color as a background color should
 * be dark (preferrably black), based on relative luminance definitions in the spec:
 *
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 *
 * @param {Array<number>} rgb the array of RGBA values
 * @returns {boolean} should the foreground be dark
 */
export const shouldForegroundBeDarkW3C = (rgb) => {
  const L = rgb.reduce((currentL, color, colorIndex) => {
    const reducedColor = color / 255;

    return (
      currentL +
      DARK_TEXT_W3C_ADDITIVE[colorIndex] *
        (reducedColor <= 0.03928 ? reducedColor / 12.92 : ((reducedColor + 0.055) / 1.055) ** 2.4)
    );
  }, 0);

  return L > L_THRESHOLD;
};
