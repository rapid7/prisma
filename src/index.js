const MATH_ROUND = Math.round;
const MATH_MAX = Math.max;
const MATH_MIN = Math.min;
const OBJECT_FREEZE = Object.freeze;

const SHORTHAND_REGEXP = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const DEFAULT_HEX_CODE_VALUE = '000000';
const L_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;
const BRIGHTNESS_THRESHOLD = 130;

/**
 * get the full six-character hexcode from any shorthand values
 *
 * @param {string} color=DEFAULT_HEX_CODE_VALUE
 * @returns {string}
 */
const getProperHex = (color = DEFAULT_HEX_CODE_VALUE) => {
  return color
      .replace(SHORTHAND_REGEXP, (match, red, green, blue) => {
        return `${red}${red}${green}${green}${blue}${blue}`;
      })
      .replace('#', '');
};

/**
 * convenience function to round fraction to two digits
 *
 * @param {number} number
 * @returns {number}
 */
const roundToTwoDigits = (number) => {
  return MATH_ROUND(number * 100) / 100;
};

/**
 * based on array of hsl / hsla values,
 * return built string of comma-separated hsl CSS values
 *
 * @param {Array} hsla
 * @returns {string}
 */
const getHslaString = (hsla) => {
  return hsla.reduce((hslaValueString, hslaPart, index) => {
    const isHue = index === 0;
    const isAlpha = index === 3;

    if (isHue) {
      return hslaValueString + hslaPart;
    }

    if (isAlpha) {
      return `${hslaValueString}, ${hslaPart}`;
    }

    return `${hslaValueString}, ${MATH_ROUND(hslaPart * 100)}%`;
  }, '');
};

/**
 * determine whether the foreground color for the text
 * used with the color as a background color should
 * be dark (preferrably black), based on general brightness guideliness
 *
 * @param {Array<number>} rgb
 * @param {number} brightnessThreshold
 * @returns {boolean}
 */
const shouldForegroundBeDark = (rgb, brightnessThreshold) => {
  const brightnessValue = rgb.reduce((currentBrightnessValue, colorPart, colorPartIndex) => {
    switch (colorPartIndex) {
      case 0:
        return currentBrightnessValue + (colorPart * colorPart * 0.241);

      case 1:
        return currentBrightnessValue + (colorPart * colorPart * 0.691);

      case 2:
        return currentBrightnessValue + (colorPart * colorPart * 0.068);
    }
  }, 0);

  return Math.sqrt(brightnessValue) >= brightnessThreshold;
};

/**
 * determine whether the foreground color for the text
 * used with the color as a background color should
 * be dark (preferrably black), based on relative
 * luminance definitions in the spec:
 *
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 *
 * @param {Array} rgb
 * @returns {boolean}
 */
const shouldForegroundBeDarkW3C = (rgb) => {
  const L = rgb.reduce((currentL, color, colorIndex) => {
    let updatedColor = color / 255;

    if (updatedColor <= 0.03928) {
      updatedColor /= 12.92;
    } else {
      updatedColor = ((updatedColor + 0.055) / 1.055) ** 2.4;
    }

    switch (colorIndex) {
      case 0:
        return currentL + (0.2126 * updatedColor);

      case 1:
        return currentL + (0.7152 * updatedColor);

      case 2:
        return currentL + (0.0722 * updatedColor);
    }
  }, 0);

  return L > L_THRESHOLD;
};

/**
 * converts string to integer hash value
 *
 * @param {string} string
 * @returns {number}
 */
const hashCode = (string) => {
  let hash = 0,
      index = string.length;

  for (; index--;) {
    hash = string.charCodeAt(index) + ((hash << 5) - hash);
  }

  return hash;
};

/**
 * convert integer value to hex code
 *
 * @param {number} integer
 * @param {string} defaultHex
 * @returns {string}
 */
const integerToHex = (integer, defaultHex) => {
  let hex = ((integer >> 24)&0xFF).toString(16) + ((integer >> 16)&0XFF).toString(16) +
      ((integer >> 8)&0xFF).toString(16) + (integer&0xFF).toString(16);

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
 * based on string passed, return hex code generated
 * from hashed value
 *
 * @param {string} string
 * @param {string} defaultHex
 * @returns {string}
 */
const stringToHex = (string, defaultHex) => {
  if (!string) {
    return defaultHex;
  }

  const hash = hashCode(string);

  return integerToHex(hash, defaultHex).substring(0, 6);
};

/**
 * build RGB color from hashed string value
 *
 * @param {string} hex
 * @returns {Array<number>}
 */
const stringToRgb = (hex) => {
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  return [red, green, blue];
};

/**
 * based on rgb array, return hsl array value
 *
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @returns {Array}
 */
const rgbToHsl = ([red, green, blue]) => {
  const fractionalRed = red / 255;
  const fractionalGreen = green / 255;
  const fractionalBlue = blue / 255;

  const max = MATH_MAX(fractionalRed, fractionalGreen, fractionalBlue);
  const min = MATH_MIN(fractionalRed, fractionalGreen, fractionalBlue);

  const luminance = (max + min) / 2;

  if (max === min) {
    return [0, 0, luminance];
  }

  const delta = max - min;
  const saturation = luminance > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue;

  switch (max) {
    case fractionalRed:
      hue = (fractionalGreen - fractionalBlue) / delta + (fractionalGreen < fractionalBlue ? 6 : 0);
      break;

    case fractionalGreen:
      hue = (fractionalBlue - fractionalRed) / delta + 2;
      break;

    case fractionalBlue:
      hue = (fractionalRed - fractionalGreen) / delta + 4;
      break;
  }

  hue *= 60;

  return [MATH_ROUND(MATH_MAX(0, hue)), roundToTwoDigits(saturation), roundToTwoDigits(luminance)];
};

/**
 * return object with a variety of color options for the developer
 *
 * @param {string} value
 * @param {object} options={}
 * @param {string} [options.defaultHex=DEFAULT_HEX_CODE_VALUE]
 * @param {number} [options.brightnessThreshold=BRIGHTNESS_THRESHOLD]
 * @param {number} [options.opacity=1]
 * @returns {object}
 */
const createPrisma = (value, options = {}) => {
  const {
      defaultHex = DEFAULT_HEX_CODE_VALUE,
      brightnessThreshold = BRIGHTNESS_THRESHOLD,
      opacity = 1
  } = options;

  if (opacity > 1 || opacity < 0) {
    throw new SyntaxError('Your opacity value is invalid; it needs to be a decimal value between 0 and 1.');
  }

  if (brightnessThreshold < 0 || brightnessThreshold > 255) {
    throw new SyntaxError('Your brightnessThreshold is invalid; it needs to be a numeric value between 0 and 255.');
  }

  const stringValue = `${value}`;
  const finalDefaultHex = getProperHex(defaultHex);
  const hexString = stringToHex(stringValue, finalDefaultHex);

  const rgbArray = stringToRgb(hexString);
  const rgbaArray = rgbArray.concat([opacity]);
  const hslArray = rgbToHsl(rgbArray);
  const hslaArray = hslArray.concat([opacity]);

  const hex = `#${hexString}`;
  const rgb = `rgb(${rgbArray.join(', ')})`;
  const rgba = `rgba(${rgbaArray.join(', ')})`;
  const hsl = `hsl(${getHslaString(hslArray)})`;
  const hsla = `hsla(${getHslaString(hslaArray)})`;

  const shouldTextBeDark = shouldForegroundBeDark(rgbArray, brightnessThreshold);
  const shouldTextBeDarkW3C = shouldForegroundBeDarkW3C(rgbArray);

  let prisma = Object.create(null);

  prisma.hex = hex;

  prisma.rgb = rgb;
  prisma.rgbArray = OBJECT_FREEZE(rgbArray);

  prisma.rgba = rgba;
  prisma.rgbaArray = OBJECT_FREEZE(rgbaArray);

  prisma.hsl = hsl;
  prisma.hslArray = OBJECT_FREEZE(hslArray);

  prisma.hsla = hsla;
  prisma.hslaArray = OBJECT_FREEZE(hslaArray);

  prisma.shouldTextBeDark = shouldTextBeDark;
  prisma.shouldTextBeDarkW3C = shouldTextBeDarkW3C;

  return OBJECT_FREEZE(prisma);
};

/**
 * convenience function if you want to test if the foreground
 * should be dark based on a specific brightness level
 *
 * @param {string} color=DEFAULT_HEX_CODE_VALUE
 * @param {number} brightnessThreshold=BRIGHTNESS_THRESHOLD
 * @returns {boolean}
 */
createPrisma.shouldTextBeDark = (color = DEFAULT_HEX_CODE_VALUE, brightnessThreshold = BRIGHTNESS_THRESHOLD) => {
  if (brightnessThreshold < 0 || brightnessThreshold > 255) {
    throw new SyntaxError('Your brightnessThreshold is invalid; it needs to be a numeric value between 0 and 255.');
  }

  const properHex = getProperHex(color);
  const rgbArray = stringToRgb(properHex);

  return shouldForegroundBeDark(rgbArray, brightnessThreshold);
};

/**
 * convenience function if you want to test if the foreground
 * should be dark based on the W3C standard
 *
 * @param {string} color=DEFAULT_HEX_CODE_VALUE
 * @returns {boolean}
 */
createPrisma.shouldTextBeDarkWEC = (color = DEFAULT_HEX_CODE_VALUE) => {
  const properHex = getProperHex(color);
  const rgbArray = stringToRgb(properHex);

  return shouldForegroundBeDarkW3C(rgbArray);
};

export default createPrisma;
