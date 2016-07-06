(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("prisma", [], factory);
	else if(typeof exports === 'object')
		exports["prisma"] = factory();
	else
		root["prisma"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar MATH_ROUND = Math.round;\nvar MATH_MAX = Math.max;\nvar MATH_MIN = Math.min;\nvar OBJECT_FREEZE = Object.freeze;\n\nvar SHORTHAND_REGEXP = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;\nvar DEFAULT_HEX_CODE_VALUE = '000000';\nvar L_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;\nvar BRIGHTNESS_THRESHOLD = 130;\n\n/**\n * get the full six-character hexcode from any shorthand values\n *\n * @param {string} color=DEFAULT_HEX_CODE_VALUE\n * @returns {string}\n */\nvar getProperHex = function getProperHex() {\n  var color = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_HEX_CODE_VALUE : arguments[0];\n\n  return color.replace(SHORTHAND_REGEXP, function (match, red, green, blue) {\n    return '' + red + red + green + green + blue + blue;\n  }).replace('#', '');\n};\n\n/**\n * convenience function to round fraction to two digits\n *\n * @param {number} number\n * @returns {number}\n */\nvar roundToTwoDigits = function roundToTwoDigits(number) {\n  return MATH_ROUND(number * 100) / 100;\n};\n\n/**\n * based on array of hsl / hsla values,\n * return built string of comma-separated hsl CSS values\n *\n * @param {Array} hsla\n * @returns {string}\n */\nvar getHslaString = function getHslaString(hsla) {\n  return hsla.reduce(function (hslaValueString, hslaPart, index) {\n    var isHue = index === 0;\n    var isAlpha = index === 3;\n\n    if (isHue) {\n      return hslaValueString + hslaPart;\n    }\n\n    if (isAlpha) {\n      return hslaValueString + ', ' + hslaPart;\n    }\n\n    return hslaValueString + ', ' + MATH_ROUND(hslaPart * 100) + '%';\n  }, '');\n};\n\n/**\n * determine whether the foreground color for the text\n * used with the color as a background color should\n * be dark (preferrably black), based on general brightness guideliness\n *\n * @param {Array<number>} rgb\n * @param {number} brightnessThreshold\n * @returns {boolean}\n */\nvar shouldForegroundBeDark = function shouldForegroundBeDark(rgb, brightnessThreshold) {\n  var brightnessValue = rgb.reduce(function (currentBrightnessValue, colorPart, colorPartIndex) {\n    switch (colorPartIndex) {\n      case 0:\n        return currentBrightnessValue + colorPart * colorPart * 0.241;\n\n      case 1:\n        return currentBrightnessValue + colorPart * colorPart * 0.691;\n\n      case 2:\n        return currentBrightnessValue + colorPart * colorPart * 0.068;\n    }\n  }, 0);\n\n  return Math.sqrt(brightnessValue) >= brightnessThreshold;\n};\n\n/**\n * determine whether the foreground color for the text\n * used with the color as a background color should\n * be dark (preferrably black), based on relative\n * luminance definitions in the spec:\n *\n * https://www.w3.org/TR/WCAG20/#relativeluminancedef\n *\n * @param {Array} rgb\n * @returns {boolean}\n */\nvar shouldForegroundBeDarkW3C = function shouldForegroundBeDarkW3C(rgb) {\n  var L = rgb.reduce(function (currentL, color, colorIndex) {\n    var updatedColor = color / 255;\n\n    if (updatedColor <= 0.03928) {\n      updatedColor /= 12.92;\n    } else {\n      updatedColor = Math.pow((updatedColor + 0.055) / 1.055, 2.4);\n    }\n\n    switch (colorIndex) {\n      case 0:\n        return currentL + 0.2126 * updatedColor;\n\n      case 1:\n        return currentL + 0.7152 * updatedColor;\n\n      case 2:\n        return currentL + 0.0722 * updatedColor;\n    }\n  }, 0);\n\n  return L > L_THRESHOLD;\n};\n\n/**\n * converts string to integer hash value\n *\n * @param {string} string\n * @returns {number}\n */\nvar hashCode = function hashCode(string) {\n  var hash = 0,\n      index = string.length;\n\n  for (; index--;) {\n    hash = string.charCodeAt(index) + ((hash << 5) - hash);\n  }\n\n  return hash;\n};\n\n/**\n * convert integer value to hex code\n *\n * @param {number} integer\n * @param {string} defaultHex\n * @returns {string}\n */\nvar integerToHex = function integerToHex(integer, defaultHex) {\n  var hex = (integer >> 24 & 0xFF).toString(16) + (integer >> 16 & 0XFF).toString(16) + (integer >> 8 & 0xFF).toString(16) + (integer & 0xFF).toString(16);\n\n  if (!hex) {\n    return defaultHex;\n  }\n\n  if (hex.length < 6) {\n    var hexCharArray = [];\n\n    for (var index = 0; index < 6; index++) {\n      hexCharArray.push(hex[index] || '0');\n    }\n\n    return hexCharArray.join('');\n  }\n\n  return hex.substring(0, 6);\n};\n\n/**\n * based on string passed, return hex code generated\n * from hashed value\n *\n * @param {string} string\n * @param {string} defaultHex\n * @returns {string}\n */\nvar stringToHex = function stringToHex(string, defaultHex) {\n  if (!string) {\n    return defaultHex;\n  }\n\n  var hash = hashCode(string);\n\n  return integerToHex(hash, defaultHex).substring(0, 6);\n};\n\n/**\n * build RGB color from hashed string value\n *\n * @param {string} hex\n * @returns {Array<number>}\n */\nvar stringToRgb = function stringToRgb(hex) {\n  var red = parseInt(hex.substring(0, 2), 16);\n  var green = parseInt(hex.substring(2, 4), 16);\n  var blue = parseInt(hex.substring(4, 6), 16);\n\n  return [red, green, blue];\n};\n\n/**\n * based on rgb array, return hsl array value\n *\n * @param {number} red\n * @param {number} green\n * @param {number} blue\n * @returns {Array}\n */\nvar rgbToHsl = function rgbToHsl(_ref) {\n  var _ref2 = _slicedToArray(_ref, 3);\n\n  var red = _ref2[0];\n  var green = _ref2[1];\n  var blue = _ref2[2];\n\n  var fractionalRed = red / 255;\n  var fractionalGreen = green / 255;\n  var fractionalBlue = blue / 255;\n\n  var max = MATH_MAX(fractionalRed, fractionalGreen, fractionalBlue);\n  var min = MATH_MIN(fractionalRed, fractionalGreen, fractionalBlue);\n\n  var luminance = (max + min) / 2;\n\n  if (max === min) {\n    return [0, 0, luminance];\n  }\n\n  var delta = max - min;\n  var saturation = luminance > 0.5 ? delta / (2 - max - min) : delta / (max + min);\n\n  var hue = void 0;\n\n  switch (max) {\n    case fractionalRed:\n      hue = (fractionalGreen - fractionalBlue) / delta + (fractionalGreen < fractionalBlue ? 6 : 0);\n      break;\n\n    case fractionalGreen:\n      hue = (fractionalBlue - fractionalRed) / delta + 2;\n      break;\n\n    case fractionalBlue:\n      hue = (fractionalRed - fractionalGreen) / delta + 4;\n      break;\n  }\n\n  hue *= 60;\n\n  return [MATH_ROUND(MATH_MAX(0, hue)), roundToTwoDigits(saturation), roundToTwoDigits(luminance)];\n};\n\n/**\n * return object with a variety of color options for the developer\n *\n * @param {string} value\n * @param {object} options={}\n * @param {string} [options.defaultHex=DEFAULT_HEX_CODE_VALUE]\n * @param {number} [options.brightnessThreshold=BRIGHTNESS_THRESHOLD]\n * @param {number} [options.opacity=1]\n * @returns {object}\n */\nvar createPrisma = function createPrisma(value) {\n  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];\n  var _options$defaultHex = options.defaultHex;\n  var defaultHex = _options$defaultHex === undefined ? DEFAULT_HEX_CODE_VALUE : _options$defaultHex;\n  var _options$brightnessTh = options.brightnessThreshold;\n  var brightnessThreshold = _options$brightnessTh === undefined ? BRIGHTNESS_THRESHOLD : _options$brightnessTh;\n  var _options$opacity = options.opacity;\n  var opacity = _options$opacity === undefined ? 1 : _options$opacity;\n\n\n  if (opacity > 1 || opacity < 0) {\n    throw new SyntaxError('Your opacity value is invalid; it needs to be a decimal value between 0 and 1.');\n  }\n\n  if (brightnessThreshold < 0 || brightnessThreshold > 255) {\n    throw new SyntaxError('Your brightnessThreshold is invalid; it needs to be a numeric value between 0 and 255.');\n  }\n\n  var stringValue = '' + value;\n  var finalDefaultHex = getProperHex(defaultHex);\n  var hexString = stringToHex(stringValue, finalDefaultHex);\n\n  var rgbArray = stringToRgb(hexString);\n  var rgbaArray = rgbArray.concat([opacity]);\n  var hslArray = rgbToHsl(rgbArray);\n  var hslaArray = hslArray.concat([opacity]);\n\n  var hex = '#' + hexString;\n  var rgb = 'rgb(' + rgbArray.join(', ') + ')';\n  var rgba = 'rgba(' + rgbaArray.join(', ') + ')';\n  var hsl = 'hsl(' + getHslaString(hslArray) + ')';\n  var hsla = 'hsla(' + getHslaString(hslaArray) + ')';\n\n  var shouldTextBeDark = shouldForegroundBeDark(rgbArray, brightnessThreshold);\n  var shouldTextBeDarkW3C = shouldForegroundBeDarkW3C(rgbArray);\n\n  var prisma = Object.create(null);\n\n  prisma.hex = hex;\n\n  prisma.rgb = rgb;\n  prisma.rgbArray = OBJECT_FREEZE(rgbArray);\n\n  prisma.rgba = rgba;\n  prisma.rgbaArray = OBJECT_FREEZE(rgbaArray);\n\n  prisma.hsl = hsl;\n  prisma.hslArray = OBJECT_FREEZE(hslArray);\n\n  prisma.hsla = hsla;\n  prisma.hslaArray = OBJECT_FREEZE(hslaArray);\n\n  prisma.shouldTextBeDark = shouldTextBeDark;\n  prisma.shouldTextBeDarkW3C = shouldTextBeDarkW3C;\n\n  return OBJECT_FREEZE(prisma);\n};\n\n/**\n * convenience function if you want to test if the foreground\n * should be dark based on a specific brightness level\n *\n * @param {string} color=DEFAULT_HEX_CODE_VALUE\n * @param {number} brightnessThreshold=BRIGHTNESS_THRESHOLD\n * @returns {boolean}\n */\ncreatePrisma.shouldTextBeDark = function () {\n  var color = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_HEX_CODE_VALUE : arguments[0];\n  var brightnessThreshold = arguments.length <= 1 || arguments[1] === undefined ? BRIGHTNESS_THRESHOLD : arguments[1];\n\n  if (brightnessThreshold < 0 || brightnessThreshold > 255) {\n    throw new SyntaxError('Your brightnessThreshold is invalid; it needs to be a numeric value between 0 and 255.');\n  }\n\n  var properHex = getProperHex(color);\n  var rgbArray = stringToRgb(properHex);\n\n  return shouldForegroundBeDark(rgbArray, brightnessThreshold);\n};\n\n/**\n * convenience function if you want to test if the foreground\n * should be dark based on the W3C standard\n *\n * @param {string} color=DEFAULT_HEX_CODE_VALUE\n * @returns {boolean}\n */\ncreatePrisma.shouldTextBeDarkWEC = function () {\n  var color = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_HEX_CODE_VALUE : arguments[0];\n\n  var properHex = getProperHex(color);\n  var rgbArray = stringToRgb(properHex);\n\n  return shouldForegroundBeDarkW3C(rgbArray);\n};\n\nexports.default = createPrisma;\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXguanM/MWZkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNQVRIX1JPVU5EID0gTWF0aC5yb3VuZDtcbmNvbnN0IE1BVEhfTUFYID0gTWF0aC5tYXg7XG5jb25zdCBNQVRIX01JTiA9IE1hdGgubWluO1xuY29uc3QgT0JKRUNUX0ZSRUVaRSA9IE9iamVjdC5mcmVlemU7XG5cbmNvbnN0IFNIT1JUSEFORF9SRUdFWFAgPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuY29uc3QgREVGQVVMVF9IRVhfQ09ERV9WQUxVRSA9ICcwMDAwMDAnO1xuY29uc3QgTF9USFJFU0hPTEQgPSBNYXRoLnNxcnQoMS4wNSAqIDAuMDUpIC0gMC4wNTtcbmNvbnN0IEJSSUdIVE5FU1NfVEhSRVNIT0xEID0gMTMwO1xuXG4vKipcbiAqIGdldCB0aGUgZnVsbCBzaXgtY2hhcmFjdGVyIGhleGNvZGUgZnJvbSBhbnkgc2hvcnRoYW5kIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvcj1ERUZBVUxUX0hFWF9DT0RFX1ZBTFVFXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBnZXRQcm9wZXJIZXggPSAoY29sb3IgPSBERUZBVUxUX0hFWF9DT0RFX1ZBTFVFKSA9PiB7XG4gIHJldHVybiBjb2xvclxuICAgICAgLnJlcGxhY2UoU0hPUlRIQU5EX1JFR0VYUCwgKG1hdGNoLCByZWQsIGdyZWVuLCBibHVlKSA9PiB7XG4gICAgICAgIHJldHVybiBgJHtyZWR9JHtyZWR9JHtncmVlbn0ke2dyZWVufSR7Ymx1ZX0ke2JsdWV9YDtcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZSgnIycsICcnKTtcbn07XG5cbi8qKlxuICogY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gcm91bmQgZnJhY3Rpb24gdG8gdHdvIGRpZ2l0c1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmNvbnN0IHJvdW5kVG9Ud29EaWdpdHMgPSAobnVtYmVyKSA9PiB7XG4gIHJldHVybiBNQVRIX1JPVU5EKG51bWJlciAqIDEwMCkgLyAxMDA7XG59O1xuXG4vKipcbiAqIGJhc2VkIG9uIGFycmF5IG9mIGhzbCAvIGhzbGEgdmFsdWVzLFxuICogcmV0dXJuIGJ1aWx0IHN0cmluZyBvZiBjb21tYS1zZXBhcmF0ZWQgaHNsIENTUyB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBoc2xhXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBnZXRIc2xhU3RyaW5nID0gKGhzbGEpID0+IHtcbiAgcmV0dXJuIGhzbGEucmVkdWNlKChoc2xhVmFsdWVTdHJpbmcsIGhzbGFQYXJ0LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGlzSHVlID0gaW5kZXggPT09IDA7XG4gICAgY29uc3QgaXNBbHBoYSA9IGluZGV4ID09PSAzO1xuXG4gICAgaWYgKGlzSHVlKSB7XG4gICAgICByZXR1cm4gaHNsYVZhbHVlU3RyaW5nICsgaHNsYVBhcnQ7XG4gICAgfVxuXG4gICAgaWYgKGlzQWxwaGEpIHtcbiAgICAgIHJldHVybiBgJHtoc2xhVmFsdWVTdHJpbmd9LCAke2hzbGFQYXJ0fWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2hzbGFWYWx1ZVN0cmluZ30sICR7TUFUSF9ST1VORChoc2xhUGFydCAqIDEwMCl9JWA7XG4gIH0sICcnKTtcbn07XG5cbi8qKlxuICogZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGZvcmVncm91bmQgY29sb3IgZm9yIHRoZSB0ZXh0XG4gKiB1c2VkIHdpdGggdGhlIGNvbG9yIGFzIGEgYmFja2dyb3VuZCBjb2xvciBzaG91bGRcbiAqIGJlIGRhcmsgKHByZWZlcnJhYmx5IGJsYWNrKSwgYmFzZWQgb24gZ2VuZXJhbCBicmlnaHRuZXNzIGd1aWRlbGluZXNzXG4gKlxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSByZ2JcbiAqIEBwYXJhbSB7bnVtYmVyfSBicmlnaHRuZXNzVGhyZXNob2xkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3Qgc2hvdWxkRm9yZWdyb3VuZEJlRGFyayA9IChyZ2IsIGJyaWdodG5lc3NUaHJlc2hvbGQpID0+IHtcbiAgY29uc3QgYnJpZ2h0bmVzc1ZhbHVlID0gcmdiLnJlZHVjZSgoY3VycmVudEJyaWdodG5lc3NWYWx1ZSwgY29sb3JQYXJ0LCBjb2xvclBhcnRJbmRleCkgPT4ge1xuICAgIHN3aXRjaCAoY29sb3JQYXJ0SW5kZXgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRCcmlnaHRuZXNzVmFsdWUgKyAoY29sb3JQYXJ0ICogY29sb3JQYXJ0ICogMC4yNDEpO1xuXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBjdXJyZW50QnJpZ2h0bmVzc1ZhbHVlICsgKGNvbG9yUGFydCAqIGNvbG9yUGFydCAqIDAuNjkxKTtcblxuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gY3VycmVudEJyaWdodG5lc3NWYWx1ZSArIChjb2xvclBhcnQgKiBjb2xvclBhcnQgKiAwLjA2OCk7XG4gICAgfVxuICB9LCAwKTtcblxuICByZXR1cm4gTWF0aC5zcXJ0KGJyaWdodG5lc3NWYWx1ZSkgPj0gYnJpZ2h0bmVzc1RocmVzaG9sZDtcbn07XG5cbi8qKlxuICogZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGZvcmVncm91bmQgY29sb3IgZm9yIHRoZSB0ZXh0XG4gKiB1c2VkIHdpdGggdGhlIGNvbG9yIGFzIGEgYmFja2dyb3VuZCBjb2xvciBzaG91bGRcbiAqIGJlIGRhcmsgKHByZWZlcnJhYmx5IGJsYWNrKSwgYmFzZWQgb24gcmVsYXRpdmVcbiAqIGx1bWluYW5jZSBkZWZpbml0aW9ucyBpbiB0aGUgc3BlYzpcbiAqXG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNyZWxhdGl2ZWx1bWluYW5jZWRlZlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHJnYlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IHNob3VsZEZvcmVncm91bmRCZURhcmtXM0MgPSAocmdiKSA9PiB7XG4gIGNvbnN0IEwgPSByZ2IucmVkdWNlKChjdXJyZW50TCwgY29sb3IsIGNvbG9ySW5kZXgpID0+IHtcbiAgICBsZXQgdXBkYXRlZENvbG9yID0gY29sb3IgLyAyNTU7XG5cbiAgICBpZiAodXBkYXRlZENvbG9yIDw9IDAuMDM5MjgpIHtcbiAgICAgIHVwZGF0ZWRDb2xvciAvPSAxMi45MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlZENvbG9yID0gKCh1cGRhdGVkQ29sb3IgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40O1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29sb3JJbmRleCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gY3VycmVudEwgKyAoMC4yMTI2ICogdXBkYXRlZENvbG9yKTtcblxuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gY3VycmVudEwgKyAoMC43MTUyICogdXBkYXRlZENvbG9yKTtcblxuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gY3VycmVudEwgKyAoMC4wNzIyICogdXBkYXRlZENvbG9yKTtcbiAgICB9XG4gIH0sIDApO1xuXG4gIHJldHVybiBMID4gTF9USFJFU0hPTEQ7XG59O1xuXG4vKipcbiAqIGNvbnZlcnRzIHN0cmluZyB0byBpbnRlZ2VyIGhhc2ggdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5jb25zdCBoYXNoQ29kZSA9IChzdHJpbmcpID0+IHtcbiAgbGV0IGhhc2ggPSAwLFxuICAgICAgaW5kZXggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIGZvciAoOyBpbmRleC0tOykge1xuICAgIGhhc2ggPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCkgKyAoKGhhc2ggPDwgNSkgLSBoYXNoKTtcbiAgfVxuXG4gIHJldHVybiBoYXNoO1xufTtcblxuLyoqXG4gKiBjb252ZXJ0IGludGVnZXIgdmFsdWUgdG8gaGV4IGNvZGVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaW50ZWdlclxuICogQHBhcmFtIHtzdHJpbmd9IGRlZmF1bHRIZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGludGVnZXJUb0hleCA9IChpbnRlZ2VyLCBkZWZhdWx0SGV4KSA9PiB7XG4gIGxldCBoZXggPSAoKGludGVnZXIgPj4gMjQpJjB4RkYpLnRvU3RyaW5nKDE2KSArICgoaW50ZWdlciA+PiAxNikmMFhGRikudG9TdHJpbmcoMTYpICtcbiAgICAgICgoaW50ZWdlciA+PiA4KSYweEZGKS50b1N0cmluZygxNikgKyAoaW50ZWdlciYweEZGKS50b1N0cmluZygxNik7XG5cbiAgaWYgKCFoZXgpIHtcbiAgICByZXR1cm4gZGVmYXVsdEhleDtcbiAgfVxuXG4gIGlmIChoZXgubGVuZ3RoIDwgNikge1xuICAgIGxldCBoZXhDaGFyQXJyYXkgPSBbXTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA2OyBpbmRleCsrKSB7XG4gICAgICBoZXhDaGFyQXJyYXkucHVzaChoZXhbaW5kZXhdIHx8ICcwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhleENoYXJBcnJheS5qb2luKCcnKTtcbiAgfVxuXG4gIHJldHVybiBoZXguc3Vic3RyaW5nKDAsIDYpO1xufTtcblxuLyoqXG4gKiBiYXNlZCBvbiBzdHJpbmcgcGFzc2VkLCByZXR1cm4gaGV4IGNvZGUgZ2VuZXJhdGVkXG4gKiBmcm9tIGhhc2hlZCB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0SGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBzdHJpbmdUb0hleCA9IChzdHJpbmcsIGRlZmF1bHRIZXgpID0+IHtcbiAgaWYgKCFzdHJpbmcpIHtcbiAgICByZXR1cm4gZGVmYXVsdEhleDtcbiAgfVxuXG4gIGNvbnN0IGhhc2ggPSBoYXNoQ29kZShzdHJpbmcpO1xuXG4gIHJldHVybiBpbnRlZ2VyVG9IZXgoaGFzaCwgZGVmYXVsdEhleCkuc3Vic3RyaW5nKDAsIDYpO1xufTtcblxuLyoqXG4gKiBidWlsZCBSR0IgY29sb3IgZnJvbSBoYXNoZWQgc3RyaW5nIHZhbHVlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhleFxuICogQHJldHVybnMge0FycmF5PG51bWJlcj59XG4gKi9cbmNvbnN0IHN0cmluZ1RvUmdiID0gKGhleCkgPT4ge1xuICBjb25zdCByZWQgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gIGNvbnN0IGdyZWVuID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICBjb25zdCBibHVlID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuXG4gIHJldHVybiBbcmVkLCBncmVlbiwgYmx1ZV07XG59O1xuXG4vKipcbiAqIGJhc2VkIG9uIHJnYiBhcnJheSwgcmV0dXJuIGhzbCBhcnJheSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBncmVlblxuICogQHBhcmFtIHtudW1iZXJ9IGJsdWVcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuY29uc3QgcmdiVG9Ic2wgPSAoW3JlZCwgZ3JlZW4sIGJsdWVdKSA9PiB7XG4gIGNvbnN0IGZyYWN0aW9uYWxSZWQgPSByZWQgLyAyNTU7XG4gIGNvbnN0IGZyYWN0aW9uYWxHcmVlbiA9IGdyZWVuIC8gMjU1O1xuICBjb25zdCBmcmFjdGlvbmFsQmx1ZSA9IGJsdWUgLyAyNTU7XG5cbiAgY29uc3QgbWF4ID0gTUFUSF9NQVgoZnJhY3Rpb25hbFJlZCwgZnJhY3Rpb25hbEdyZWVuLCBmcmFjdGlvbmFsQmx1ZSk7XG4gIGNvbnN0IG1pbiA9IE1BVEhfTUlOKGZyYWN0aW9uYWxSZWQsIGZyYWN0aW9uYWxHcmVlbiwgZnJhY3Rpb25hbEJsdWUpO1xuXG4gIGNvbnN0IGx1bWluYW5jZSA9IChtYXggKyBtaW4pIC8gMjtcblxuICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICByZXR1cm4gWzAsIDAsIGx1bWluYW5jZV07XG4gIH1cblxuICBjb25zdCBkZWx0YSA9IG1heCAtIG1pbjtcbiAgY29uc3Qgc2F0dXJhdGlvbiA9IGx1bWluYW5jZSA+IDAuNSA/IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pIDogZGVsdGEgLyAobWF4ICsgbWluKTtcblxuICBsZXQgaHVlO1xuXG4gIHN3aXRjaCAobWF4KSB7XG4gICAgY2FzZSBmcmFjdGlvbmFsUmVkOlxuICAgICAgaHVlID0gKGZyYWN0aW9uYWxHcmVlbiAtIGZyYWN0aW9uYWxCbHVlKSAvIGRlbHRhICsgKGZyYWN0aW9uYWxHcmVlbiA8IGZyYWN0aW9uYWxCbHVlID8gNiA6IDApO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGZyYWN0aW9uYWxHcmVlbjpcbiAgICAgIGh1ZSA9IChmcmFjdGlvbmFsQmx1ZSAtIGZyYWN0aW9uYWxSZWQpIC8gZGVsdGEgKyAyO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGZyYWN0aW9uYWxCbHVlOlxuICAgICAgaHVlID0gKGZyYWN0aW9uYWxSZWQgLSBmcmFjdGlvbmFsR3JlZW4pIC8gZGVsdGEgKyA0O1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBodWUgKj0gNjA7XG5cbiAgcmV0dXJuIFtNQVRIX1JPVU5EKE1BVEhfTUFYKDAsIGh1ZSkpLCByb3VuZFRvVHdvRGlnaXRzKHNhdHVyYXRpb24pLCByb3VuZFRvVHdvRGlnaXRzKGx1bWluYW5jZSldO1xufTtcblxuLyoqXG4gKiByZXR1cm4gb2JqZWN0IHdpdGggYSB2YXJpZXR5IG9mIGNvbG9yIG9wdGlvbnMgZm9yIHRoZSBkZXZlbG9wZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zPXt9XG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVmYXVsdEhleD1ERUZBVUxUX0hFWF9DT0RFX1ZBTFVFXVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmJyaWdodG5lc3NUaHJlc2hvbGQ9QlJJR0hUTkVTU19USFJFU0hPTERdXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXVxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuY29uc3QgY3JlYXRlUHJpc21hID0gKHZhbHVlLCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3Qge1xuICAgICAgZGVmYXVsdEhleCA9IERFRkFVTFRfSEVYX0NPREVfVkFMVUUsXG4gICAgICBicmlnaHRuZXNzVGhyZXNob2xkID0gQlJJR0hUTkVTU19USFJFU0hPTEQsXG4gICAgICBvcGFjaXR5ID0gMVxuICB9ID0gb3B0aW9ucztcblxuICBpZiAob3BhY2l0eSA+IDEgfHwgb3BhY2l0eSA8IDApIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1lvdXIgb3BhY2l0eSB2YWx1ZSBpcyBpbnZhbGlkOyBpdCBuZWVkcyB0byBiZSBhIGRlY2ltYWwgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLicpO1xuICB9XG5cbiAgaWYgKGJyaWdodG5lc3NUaHJlc2hvbGQgPCAwIHx8IGJyaWdodG5lc3NUaHJlc2hvbGQgPiAyNTUpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1lvdXIgYnJpZ2h0bmVzc1RocmVzaG9sZCBpcyBpbnZhbGlkOyBpdCBuZWVkcyB0byBiZSBhIG51bWVyaWMgdmFsdWUgYmV0d2VlbiAwIGFuZCAyNTUuJyk7XG4gIH1cblxuICBjb25zdCBzdHJpbmdWYWx1ZSA9IGAke3ZhbHVlfWA7XG4gIGNvbnN0IGZpbmFsRGVmYXVsdEhleCA9IGdldFByb3BlckhleChkZWZhdWx0SGV4KTtcbiAgY29uc3QgaGV4U3RyaW5nID0gc3RyaW5nVG9IZXgoc3RyaW5nVmFsdWUsIGZpbmFsRGVmYXVsdEhleCk7XG5cbiAgY29uc3QgcmdiQXJyYXkgPSBzdHJpbmdUb1JnYihoZXhTdHJpbmcpO1xuICBjb25zdCByZ2JhQXJyYXkgPSByZ2JBcnJheS5jb25jYXQoW29wYWNpdHldKTtcbiAgY29uc3QgaHNsQXJyYXkgPSByZ2JUb0hzbChyZ2JBcnJheSk7XG4gIGNvbnN0IGhzbGFBcnJheSA9IGhzbEFycmF5LmNvbmNhdChbb3BhY2l0eV0pO1xuXG4gIGNvbnN0IGhleCA9IGAjJHtoZXhTdHJpbmd9YDtcbiAgY29uc3QgcmdiID0gYHJnYigke3JnYkFycmF5LmpvaW4oJywgJyl9KWA7XG4gIGNvbnN0IHJnYmEgPSBgcmdiYSgke3JnYmFBcnJheS5qb2luKCcsICcpfSlgO1xuICBjb25zdCBoc2wgPSBgaHNsKCR7Z2V0SHNsYVN0cmluZyhoc2xBcnJheSl9KWA7XG4gIGNvbnN0IGhzbGEgPSBgaHNsYSgke2dldEhzbGFTdHJpbmcoaHNsYUFycmF5KX0pYDtcblxuICBjb25zdCBzaG91bGRUZXh0QmVEYXJrID0gc2hvdWxkRm9yZWdyb3VuZEJlRGFyayhyZ2JBcnJheSwgYnJpZ2h0bmVzc1RocmVzaG9sZCk7XG4gIGNvbnN0IHNob3VsZFRleHRCZURhcmtXM0MgPSBzaG91bGRGb3JlZ3JvdW5kQmVEYXJrVzNDKHJnYkFycmF5KTtcblxuICBsZXQgcHJpc21hID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBwcmlzbWEuaGV4ID0gaGV4O1xuXG4gIHByaXNtYS5yZ2IgPSByZ2I7XG4gIHByaXNtYS5yZ2JBcnJheSA9IE9CSkVDVF9GUkVFWkUocmdiQXJyYXkpO1xuXG4gIHByaXNtYS5yZ2JhID0gcmdiYTtcbiAgcHJpc21hLnJnYmFBcnJheSA9IE9CSkVDVF9GUkVFWkUocmdiYUFycmF5KTtcblxuICBwcmlzbWEuaHNsID0gaHNsO1xuICBwcmlzbWEuaHNsQXJyYXkgPSBPQkpFQ1RfRlJFRVpFKGhzbEFycmF5KTtcblxuICBwcmlzbWEuaHNsYSA9IGhzbGE7XG4gIHByaXNtYS5oc2xhQXJyYXkgPSBPQkpFQ1RfRlJFRVpFKGhzbGFBcnJheSk7XG5cbiAgcHJpc21hLnNob3VsZFRleHRCZURhcmsgPSBzaG91bGRUZXh0QmVEYXJrO1xuICBwcmlzbWEuc2hvdWxkVGV4dEJlRGFya1czQyA9IHNob3VsZFRleHRCZURhcmtXM0M7XG5cbiAgcmV0dXJuIE9CSkVDVF9GUkVFWkUocHJpc21hKTtcbn07XG5cbi8qKlxuICogY29udmVuaWVuY2UgZnVuY3Rpb24gaWYgeW91IHdhbnQgdG8gdGVzdCBpZiB0aGUgZm9yZWdyb3VuZFxuICogc2hvdWxkIGJlIGRhcmsgYmFzZWQgb24gYSBzcGVjaWZpYyBicmlnaHRuZXNzIGxldmVsXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yPURFRkFVTFRfSEVYX0NPREVfVkFMVUVcbiAqIEBwYXJhbSB7bnVtYmVyfSBicmlnaHRuZXNzVGhyZXNob2xkPUJSSUdIVE5FU1NfVEhSRVNIT0xEXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY3JlYXRlUHJpc21hLnNob3VsZFRleHRCZURhcmsgPSAoY29sb3IgPSBERUZBVUxUX0hFWF9DT0RFX1ZBTFVFLCBicmlnaHRuZXNzVGhyZXNob2xkID0gQlJJR0hUTkVTU19USFJFU0hPTEQpID0+IHtcbiAgaWYgKGJyaWdodG5lc3NUaHJlc2hvbGQgPCAwIHx8IGJyaWdodG5lc3NUaHJlc2hvbGQgPiAyNTUpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1lvdXIgYnJpZ2h0bmVzc1RocmVzaG9sZCBpcyBpbnZhbGlkOyBpdCBuZWVkcyB0byBiZSBhIG51bWVyaWMgdmFsdWUgYmV0d2VlbiAwIGFuZCAyNTUuJyk7XG4gIH1cblxuICBjb25zdCBwcm9wZXJIZXggPSBnZXRQcm9wZXJIZXgoY29sb3IpO1xuICBjb25zdCByZ2JBcnJheSA9IHN0cmluZ1RvUmdiKHByb3BlckhleCk7XG5cbiAgcmV0dXJuIHNob3VsZEZvcmVncm91bmRCZURhcmsocmdiQXJyYXksIGJyaWdodG5lc3NUaHJlc2hvbGQpO1xufTtcblxuLyoqXG4gKiBjb252ZW5pZW5jZSBmdW5jdGlvbiBpZiB5b3Ugd2FudCB0byB0ZXN0IGlmIHRoZSBmb3JlZ3JvdW5kXG4gKiBzaG91bGQgYmUgZGFyayBiYXNlZCBvbiB0aGUgVzNDIHN0YW5kYXJkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yPURFRkFVTFRfSEVYX0NPREVfVkFMVUVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jcmVhdGVQcmlzbWEuc2hvdWxkVGV4dEJlRGFya1dFQyA9IChjb2xvciA9IERFRkFVTFRfSEVYX0NPREVfVkFMVUUpID0+IHtcbiAgY29uc3QgcHJvcGVySGV4ID0gZ2V0UHJvcGVySGV4KGNvbG9yKTtcbiAgY29uc3QgcmdiQXJyYXkgPSBzdHJpbmdUb1JnYihwcm9wZXJIZXgpO1xuXG4gIHJldHVybiBzaG91bGRGb3JlZ3JvdW5kQmVEYXJrVzNDKHJnYkFycmF5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByaXNtYTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFXQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ])
});
;