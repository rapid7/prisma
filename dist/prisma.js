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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar MATH_ROUND = Math.round;\nvar MATH_MAX = Math.max;\nvar MATH_MIN = Math.min;\nvar OBJECT_FREEZE = Object.freeze;\n\nvar DEFAULT_HEX_CODE_VALUE = '000000';\nvar L_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;\nvar BRIGHTNESS_THRESHOLD = 130;\n\n/**\n * convenience function to round fraction to two digits\n *\n * @param {number} number\n * @returns {number}\n */\nvar roundToTwoDigits = function roundToTwoDigits(number) {\n  return MATH_ROUND(number * 100) / 100;\n};\n\n/**\n * based on array of hsl / hsla values,\n * return built string of comma-separated hsl CSS values\n *\n * @param {Array} hsla\n * @returns {string}\n */\nvar getHslaString = function getHslaString(hsla) {\n  return hsla.reduce(function (hslaValueString, hslaPart, index) {\n    var isHue = index === 0;\n    var isAlpha = index === 3;\n\n    if (isHue) {\n      return hslaValueString + hslaPart;\n    }\n\n    if (isAlpha) {\n      return hslaValueString + ', ' + hslaPart;\n    }\n\n    return hslaValueString + ', ' + MATH_ROUND(hslaPart * 100) + '%';\n  }, '');\n};\n\n/**\n * determine whether the foreground color for the text\n * used with the color as a background color should\n * be dark (preferrably black), based on general brightness guideliness\n *\n * @param {Array<number>} rgb\n * @param {number} brightnessThreshold\n * @returns {boolean}\n */\nvar shouldForegroundBeDark = function shouldForegroundBeDark(rgb, brightnessThreshold) {\n  var brightnessComparator = brightnessThreshold;\n\n  if (brightnessThreshold < 0) {\n    brightnessComparator = 0;\n  } else if (brightnessThreshold > 255) {\n    brightnessComparator = 255;\n  }\n\n  var brightnessValue = rgb.reduce(function (currentBrightnessValue, colorPart, colorPartIndex) {\n    switch (colorPartIndex) {\n      case 0:\n        return currentBrightnessValue + colorPart * colorPart * 0.241;\n\n      case 1:\n        return currentBrightnessValue + colorPart * colorPart * 0.691;\n\n      case 2:\n        return currentBrightnessValue + colorPart * colorPart * 0.068;\n    }\n  }, 0);\n\n  return Math.sqrt(brightnessValue) >= brightnessComparator;\n};\n\n/**\n * determine whether the foreground color for the text\n * used with the color as a background color should\n * be dark (preferrably black), based on relative\n * luminance definitions in the spec:\n *\n * https://www.w3.org/TR/WCAG20/#relativeluminancedef\n *\n * @param {Array} rgb\n * @returns {boolean}\n */\nvar shouldForegroundBeDarkW3C = function shouldForegroundBeDarkW3C(rgb) {\n  var L = rgb.reduce(function (currentL, color, colorIndex) {\n    var updatedColor = color / 255;\n\n    if (updatedColor <= 0.03928) {\n      updatedColor /= 12.92;\n    } else {\n      updatedColor = Math.pow((updatedColor + 0.055) / 1.055, 2.4);\n    }\n\n    switch (colorIndex) {\n      case 0:\n        return currentL + 0.2126 * updatedColor;\n\n      case 1:\n        return currentL + 0.7152 * updatedColor;\n\n      case 2:\n        return currentL + 0.0722 * updatedColor;\n    }\n  }, 0);\n\n  return L > L_THRESHOLD;\n};\n\n/**\n * converts string to integer hash value\n *\n * @param {string} string\n * @returns {number}\n */\nvar hashCode = function hashCode(string) {\n  var hash = 0,\n      index = string.length;\n\n  for (; index--;) {\n    hash = string.charCodeAt(index) + ((hash << 5) - hash);\n  }\n\n  return hash;\n};\n\n/**\n * convert integer value to hex code\n *\n * @param {number} integer\n * @param {string} defaultHex\n * @returns {string}\n */\nvar integerToHex = function integerToHex(integer, defaultHex) {\n  var hex = (integer >> 24 & 0xFF).toString(16) + (integer >> 16 & 0XFF).toString(16) + (integer >> 8 & 0xFF).toString(16) + (integer & 0xFF).toString(16);\n\n  if (!hex) {\n    return defaultHex;\n  }\n\n  if (hex.length < 6) {\n    var hexCharArray = [];\n\n    for (var index = 0; index < 6; index++) {\n      hexCharArray.push(hex[index] || '0');\n    }\n\n    return hexCharArray.join('');\n  }\n\n  return hex.substring(0, 6);\n};\n\n/**\n * based on string passed, return hex code generated\n * from hashed value\n *\n * @param {string} string\n * @param {string} defaultHex\n * @returns {string}\n */\nvar stringToHex = function stringToHex(string, defaultHex) {\n  if (!string) {\n    return defaultHex;\n  }\n\n  var hash = hashCode(string);\n\n  return integerToHex(hash, defaultHex).substring(0, 6);\n};\n\n/**\n * build RGB color from hashed string value\n *\n * @param {string} hex\n * @returns {Array<number>}\n */\nvar stringToRgb = function stringToRgb(hex) {\n  var red = parseInt(hex.substring(0, 2), 16);\n  var green = parseInt(hex.substring(2, 4), 16);\n  var blue = parseInt(hex.substring(4, 6), 16);\n\n  return [red, green, blue];\n};\n\n/**\n * based on rgb array, return hsl array value\n *\n * @param {number} red\n * @param {number} green\n * @param {number} blue\n * @returns {Array}\n */\nvar rgbToHsl = function rgbToHsl(_ref) {\n  var _ref2 = _slicedToArray(_ref, 3);\n\n  var red = _ref2[0];\n  var green = _ref2[1];\n  var blue = _ref2[2];\n\n  var fractionalRed = red / 255;\n  var fractionalGreen = green / 255;\n  var fractionalBlue = blue / 255;\n\n  var max = MATH_MAX(fractionalRed, fractionalGreen, fractionalBlue);\n  var min = MATH_MIN(fractionalRed, fractionalGreen, fractionalBlue);\n\n  var luminance = (max + min) / 2;\n\n  if (max === min) {\n    return [0, 0, luminance];\n  }\n\n  var delta = max - min;\n  var saturation = luminance > 0.5 ? delta / (2 - max - min) : delta / (max + min);\n\n  var hue = void 0;\n\n  switch (max) {\n    case fractionalRed:\n      hue = (fractionalGreen - fractionalBlue) / delta + (fractionalGreen < fractionalBlue ? 6 : 0);\n      break;\n\n    case fractionalGreen:\n      hue = (fractionalBlue - fractionalRed) / delta + 2;\n      break;\n\n    case fractionalBlue:\n      hue = (fractionalRed - fractionalGreen) / delta + 4;\n      break;\n  }\n\n  hue *= 60;\n\n  return [MATH_ROUND(MATH_MAX(0, hue)), roundToTwoDigits(saturation), roundToTwoDigits(luminance)];\n};\n\n/**\n * return object with a variety of color options for the developer\n *\n * @param {string} value\n * @param {object} options={}\n * @param {string} [options.defaultHex=DEFAULT_HEX_CODE_VALUE]\n * @param {number} [options.gammaThreshold=BRIGHTNESS_THRESHOLD]\n * @param {number} [options.opacity=1]\n * @returns {object}\n */\nvar createPrisma = function createPrisma(value) {\n  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];\n  var _options$defaultHex = options.defaultHex;\n  var defaultHex = _options$defaultHex === undefined ? DEFAULT_HEX_CODE_VALUE : _options$defaultHex;\n  var _options$brightnessTh = options.brightnessThreshold;\n  var brightnessThreshold = _options$brightnessTh === undefined ? BRIGHTNESS_THRESHOLD : _options$brightnessTh;\n  var _options$opacity = options.opacity;\n  var opacity = _options$opacity === undefined ? 1 : _options$opacity;\n\n\n  if (defaultHex.length !== 6) {\n    throw new SyntaxError('Your defaultHex value is invalid; it needs to be the full six-character hexadecimal color code without the leading #.');\n  }\n\n  if (opacity > 1 || opacity < 0) {\n    throw new SyntaxError('Your opacity value is invalid; it needs to be a decimal value between 0 and 1.');\n  }\n\n  if (brightnessThreshold < 0 || brightnessThreshold > 255) {\n    throw new SyntaxError('Your brightnessThreshold is invalid; it needs to be a numeric value between 0 and 255.');\n  }\n\n  var stringValue = '' + value;\n  var hexString = stringToHex(stringValue, defaultHex);\n\n  var rgbArray = stringToRgb(hexString);\n  var rgbaArray = rgbArray.concat([opacity]);\n  var hslArray = rgbToHsl(rgbArray);\n  var hslaArray = hslArray.concat([opacity]);\n\n  var hex = '#' + hexString;\n  var rgb = 'rgb(' + rgbArray.join(', ') + ')';\n  var rgba = 'rgba(' + rgbaArray.join(', ') + ')';\n  var hsl = 'hsl(' + getHslaString(hslArray) + ')';\n  var hsla = 'hsla(' + getHslaString(hslaArray) + ')';\n\n  var shouldTextBeDark = shouldForegroundBeDark(rgbArray, brightnessThreshold);\n  var shouldTextBeDarkW3C = shouldForegroundBeDarkW3C(rgbArray);\n\n  var prisma = Object.create(null);\n\n  prisma.hex = hex;\n\n  prisma.rgb = rgb;\n  prisma.rgbArray = OBJECT_FREEZE(rgbArray);\n\n  prisma.rgba = rgba;\n  prisma.rgbaArray = OBJECT_FREEZE(rgbaArray);\n\n  prisma.hsl = hsl;\n  prisma.hslArray = OBJECT_FREEZE(hslArray);\n\n  prisma.hsla = hsla;\n  prisma.hslaArray = OBJECT_FREEZE(hslaArray);\n\n  prisma.shouldTextBeDark = shouldTextBeDark;\n  prisma.shouldTextBeDarkW3C = shouldTextBeDarkW3C;\n\n  return OBJECT_FREEZE(prisma);\n};\n\nexports.default = createPrisma;\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXguanM/MWZkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNQVRIX1JPVU5EID0gTWF0aC5yb3VuZDtcbmNvbnN0IE1BVEhfTUFYID0gTWF0aC5tYXg7XG5jb25zdCBNQVRIX01JTiA9IE1hdGgubWluO1xuY29uc3QgT0JKRUNUX0ZSRUVaRSA9IE9iamVjdC5mcmVlemU7XG5cbmNvbnN0IERFRkFVTFRfSEVYX0NPREVfVkFMVUUgPSAnMDAwMDAwJztcbmNvbnN0IExfVEhSRVNIT0xEID0gTWF0aC5zcXJ0KDEuMDUgKiAwLjA1KSAtIDAuMDU7XG5jb25zdCBCUklHSFRORVNTX1RIUkVTSE9MRCA9IDEzMDtcblxuLyoqXG4gKiBjb252ZW5pZW5jZSBmdW5jdGlvbiB0byByb3VuZCBmcmFjdGlvbiB0byB0d28gZGlnaXRzXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuY29uc3Qgcm91bmRUb1R3b0RpZ2l0cyA9IChudW1iZXIpID0+IHtcbiAgcmV0dXJuIE1BVEhfUk9VTkQobnVtYmVyICogMTAwKSAvIDEwMDtcbn07XG5cbi8qKlxuICogYmFzZWQgb24gYXJyYXkgb2YgaHNsIC8gaHNsYSB2YWx1ZXMsXG4gKiByZXR1cm4gYnVpbHQgc3RyaW5nIG9mIGNvbW1hLXNlcGFyYXRlZCBoc2wgQ1NTIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGhzbGFcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGdldEhzbGFTdHJpbmcgPSAoaHNsYSkgPT4ge1xuICByZXR1cm4gaHNsYS5yZWR1Y2UoKGhzbGFWYWx1ZVN0cmluZywgaHNsYVBhcnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaXNIdWUgPSBpbmRleCA9PT0gMDtcbiAgICBjb25zdCBpc0FscGhhID0gaW5kZXggPT09IDM7XG5cbiAgICBpZiAoaXNIdWUpIHtcbiAgICAgIHJldHVybiBoc2xhVmFsdWVTdHJpbmcgKyBoc2xhUGFydDtcbiAgICB9XG5cbiAgICBpZiAoaXNBbHBoYSkge1xuICAgICAgcmV0dXJuIGAke2hzbGFWYWx1ZVN0cmluZ30sICR7aHNsYVBhcnR9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7aHNsYVZhbHVlU3RyaW5nfSwgJHtNQVRIX1JPVU5EKGhzbGFQYXJ0ICogMTAwKX0lYDtcbiAgfSwgJycpO1xufTtcblxuLyoqXG4gKiBkZXRlcm1pbmUgd2hldGhlciB0aGUgZm9yZWdyb3VuZCBjb2xvciBmb3IgdGhlIHRleHRcbiAqIHVzZWQgd2l0aCB0aGUgY29sb3IgYXMgYSBiYWNrZ3JvdW5kIGNvbG9yIHNob3VsZFxuICogYmUgZGFyayAocHJlZmVycmFibHkgYmxhY2spLCBiYXNlZCBvbiBnZW5lcmFsIGJyaWdodG5lc3MgZ3VpZGVsaW5lc3NcbiAqXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJnYlxuICogQHBhcmFtIHtudW1iZXJ9IGJyaWdodG5lc3NUaHJlc2hvbGRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBzaG91bGRGb3JlZ3JvdW5kQmVEYXJrID0gKHJnYiwgYnJpZ2h0bmVzc1RocmVzaG9sZCkgPT4ge1xuICBsZXQgYnJpZ2h0bmVzc0NvbXBhcmF0b3IgPSBicmlnaHRuZXNzVGhyZXNob2xkO1xuXG4gIGlmIChicmlnaHRuZXNzVGhyZXNob2xkIDwgMCkge1xuICAgIGJyaWdodG5lc3NDb21wYXJhdG9yID0gMDtcbiAgfSBlbHNlIGlmIChicmlnaHRuZXNzVGhyZXNob2xkID4gMjU1KSB7XG4gICAgYnJpZ2h0bmVzc0NvbXBhcmF0b3IgPSAyNTU7XG4gIH1cblxuICBjb25zdCBicmlnaHRuZXNzVmFsdWUgPSByZ2IucmVkdWNlKChjdXJyZW50QnJpZ2h0bmVzc1ZhbHVlLCBjb2xvclBhcnQsIGNvbG9yUGFydEluZGV4KSA9PiB7XG4gICAgc3dpdGNoIChjb2xvclBhcnRJbmRleCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gY3VycmVudEJyaWdodG5lc3NWYWx1ZSArIChjb2xvclBhcnQgKiBjb2xvclBhcnQgKiAwLjI0MSk7XG5cbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRCcmlnaHRuZXNzVmFsdWUgKyAoY29sb3JQYXJ0ICogY29sb3JQYXJ0ICogMC42OTEpO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBjdXJyZW50QnJpZ2h0bmVzc1ZhbHVlICsgKGNvbG9yUGFydCAqIGNvbG9yUGFydCAqIDAuMDY4KTtcbiAgICB9XG4gIH0sIDApO1xuXG4gIHJldHVybiBNYXRoLnNxcnQoYnJpZ2h0bmVzc1ZhbHVlKSA+PSBicmlnaHRuZXNzQ29tcGFyYXRvcjtcbn07XG5cbi8qKlxuICogZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGZvcmVncm91bmQgY29sb3IgZm9yIHRoZSB0ZXh0XG4gKiB1c2VkIHdpdGggdGhlIGNvbG9yIGFzIGEgYmFja2dyb3VuZCBjb2xvciBzaG91bGRcbiAqIGJlIGRhcmsgKHByZWZlcnJhYmx5IGJsYWNrKSwgYmFzZWQgb24gcmVsYXRpdmVcbiAqIGx1bWluYW5jZSBkZWZpbml0aW9ucyBpbiB0aGUgc3BlYzpcbiAqXG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNyZWxhdGl2ZWx1bWluYW5jZWRlZlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHJnYlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IHNob3VsZEZvcmVncm91bmRCZURhcmtXM0MgPSAocmdiKSA9PiB7XG4gIGNvbnN0IEwgPSByZ2IucmVkdWNlKChjdXJyZW50TCwgY29sb3IsIGNvbG9ySW5kZXgpID0+IHtcbiAgICBsZXQgdXBkYXRlZENvbG9yID0gY29sb3IgLyAyNTU7XG5cbiAgICBpZiAodXBkYXRlZENvbG9yIDw9IDAuMDM5MjgpIHtcbiAgICAgIHVwZGF0ZWRDb2xvciAvPSAxMi45MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlZENvbG9yID0gKCh1cGRhdGVkQ29sb3IgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40O1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29sb3JJbmRleCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gY3VycmVudEwgKyAoMC4yMTI2ICogdXBkYXRlZENvbG9yKTtcblxuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gY3VycmVudEwgKyAoMC43MTUyICogdXBkYXRlZENvbG9yKTtcblxuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gY3VycmVudEwgKyAoMC4wNzIyICogdXBkYXRlZENvbG9yKTtcbiAgICB9XG4gIH0sIDApO1xuXG4gIHJldHVybiBMID4gTF9USFJFU0hPTEQ7XG59O1xuXG4vKipcbiAqIGNvbnZlcnRzIHN0cmluZyB0byBpbnRlZ2VyIGhhc2ggdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5jb25zdCBoYXNoQ29kZSA9IChzdHJpbmcpID0+IHtcbiAgbGV0IGhhc2ggPSAwLFxuICAgICAgaW5kZXggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIGZvciAoOyBpbmRleC0tOykge1xuICAgIGhhc2ggPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCkgKyAoKGhhc2ggPDwgNSkgLSBoYXNoKTtcbiAgfVxuXG4gIHJldHVybiBoYXNoO1xufTtcblxuLyoqXG4gKiBjb252ZXJ0IGludGVnZXIgdmFsdWUgdG8gaGV4IGNvZGVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaW50ZWdlclxuICogQHBhcmFtIHtzdHJpbmd9IGRlZmF1bHRIZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGludGVnZXJUb0hleCA9IChpbnRlZ2VyLCBkZWZhdWx0SGV4KSA9PiB7XG4gIGxldCBoZXggPSAoKGludGVnZXIgPj4gMjQpJjB4RkYpLnRvU3RyaW5nKDE2KSArICgoaW50ZWdlciA+PiAxNikmMFhGRikudG9TdHJpbmcoMTYpICtcbiAgICAgICgoaW50ZWdlciA+PiA4KSYweEZGKS50b1N0cmluZygxNikgKyAoaW50ZWdlciYweEZGKS50b1N0cmluZygxNik7XG5cbiAgaWYgKCFoZXgpIHtcbiAgICByZXR1cm4gZGVmYXVsdEhleDtcbiAgfVxuXG4gIGlmIChoZXgubGVuZ3RoIDwgNikge1xuICAgIGxldCBoZXhDaGFyQXJyYXkgPSBbXTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA2OyBpbmRleCsrKSB7XG4gICAgICBoZXhDaGFyQXJyYXkucHVzaChoZXhbaW5kZXhdIHx8ICcwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhleENoYXJBcnJheS5qb2luKCcnKTtcbiAgfVxuXG4gIHJldHVybiBoZXguc3Vic3RyaW5nKDAsIDYpO1xufTtcblxuLyoqXG4gKiBiYXNlZCBvbiBzdHJpbmcgcGFzc2VkLCByZXR1cm4gaGV4IGNvZGUgZ2VuZXJhdGVkXG4gKiBmcm9tIGhhc2hlZCB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0SGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBzdHJpbmdUb0hleCA9IChzdHJpbmcsIGRlZmF1bHRIZXgpID0+IHtcbiAgaWYgKCFzdHJpbmcpIHtcbiAgICByZXR1cm4gZGVmYXVsdEhleDtcbiAgfVxuXG4gIGNvbnN0IGhhc2ggPSBoYXNoQ29kZShzdHJpbmcpO1xuXG4gIHJldHVybiBpbnRlZ2VyVG9IZXgoaGFzaCwgZGVmYXVsdEhleCkuc3Vic3RyaW5nKDAsIDYpO1xufTtcblxuLyoqXG4gKiBidWlsZCBSR0IgY29sb3IgZnJvbSBoYXNoZWQgc3RyaW5nIHZhbHVlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhleFxuICogQHJldHVybnMge0FycmF5PG51bWJlcj59XG4gKi9cbmNvbnN0IHN0cmluZ1RvUmdiID0gKGhleCkgPT4ge1xuICBjb25zdCByZWQgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gIGNvbnN0IGdyZWVuID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICBjb25zdCBibHVlID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuXG4gIHJldHVybiBbcmVkLCBncmVlbiwgYmx1ZV07XG59O1xuXG4vKipcbiAqIGJhc2VkIG9uIHJnYiBhcnJheSwgcmV0dXJuIGhzbCBhcnJheSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBncmVlblxuICogQHBhcmFtIHtudW1iZXJ9IGJsdWVcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuY29uc3QgcmdiVG9Ic2wgPSAoW3JlZCwgZ3JlZW4sIGJsdWVdKSA9PiB7XG4gIGNvbnN0IGZyYWN0aW9uYWxSZWQgPSByZWQgLyAyNTU7XG4gIGNvbnN0IGZyYWN0aW9uYWxHcmVlbiA9IGdyZWVuIC8gMjU1O1xuICBjb25zdCBmcmFjdGlvbmFsQmx1ZSA9IGJsdWUgLyAyNTU7XG5cbiAgY29uc3QgbWF4ID0gTUFUSF9NQVgoZnJhY3Rpb25hbFJlZCwgZnJhY3Rpb25hbEdyZWVuLCBmcmFjdGlvbmFsQmx1ZSk7XG4gIGNvbnN0IG1pbiA9IE1BVEhfTUlOKGZyYWN0aW9uYWxSZWQsIGZyYWN0aW9uYWxHcmVlbiwgZnJhY3Rpb25hbEJsdWUpO1xuXG4gIGNvbnN0IGx1bWluYW5jZSA9IChtYXggKyBtaW4pIC8gMjtcblxuICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICByZXR1cm4gWzAsIDAsIGx1bWluYW5jZV07XG4gIH1cblxuICBjb25zdCBkZWx0YSA9IG1heCAtIG1pbjtcbiAgY29uc3Qgc2F0dXJhdGlvbiA9IGx1bWluYW5jZSA+IDAuNSA/IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pIDogZGVsdGEgLyAobWF4ICsgbWluKTtcblxuICBsZXQgaHVlO1xuXG4gIHN3aXRjaCAobWF4KSB7XG4gICAgY2FzZSBmcmFjdGlvbmFsUmVkOlxuICAgICAgaHVlID0gKGZyYWN0aW9uYWxHcmVlbiAtIGZyYWN0aW9uYWxCbHVlKSAvIGRlbHRhICsgKGZyYWN0aW9uYWxHcmVlbiA8IGZyYWN0aW9uYWxCbHVlID8gNiA6IDApO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGZyYWN0aW9uYWxHcmVlbjpcbiAgICAgIGh1ZSA9IChmcmFjdGlvbmFsQmx1ZSAtIGZyYWN0aW9uYWxSZWQpIC8gZGVsdGEgKyAyO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGZyYWN0aW9uYWxCbHVlOlxuICAgICAgaHVlID0gKGZyYWN0aW9uYWxSZWQgLSBmcmFjdGlvbmFsR3JlZW4pIC8gZGVsdGEgKyA0O1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBodWUgKj0gNjA7XG5cbiAgcmV0dXJuIFtNQVRIX1JPVU5EKE1BVEhfTUFYKDAsIGh1ZSkpLCByb3VuZFRvVHdvRGlnaXRzKHNhdHVyYXRpb24pLCByb3VuZFRvVHdvRGlnaXRzKGx1bWluYW5jZSldO1xufTtcblxuLyoqXG4gKiByZXR1cm4gb2JqZWN0IHdpdGggYSB2YXJpZXR5IG9mIGNvbG9yIG9wdGlvbnMgZm9yIHRoZSBkZXZlbG9wZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zPXt9XG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVmYXVsdEhleD1ERUZBVUxUX0hFWF9DT0RFX1ZBTFVFXVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmdhbW1hVGhyZXNob2xkPUJSSUdIVE5FU1NfVEhSRVNIT0xEXVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV1cbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cbmNvbnN0IGNyZWF0ZVByaXNtYSA9ICh2YWx1ZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHtcbiAgICAgIGRlZmF1bHRIZXggPSBERUZBVUxUX0hFWF9DT0RFX1ZBTFVFLFxuICAgICAgYnJpZ2h0bmVzc1RocmVzaG9sZCA9IEJSSUdIVE5FU1NfVEhSRVNIT0xELFxuICAgICAgb3BhY2l0eSA9IDFcbiAgfSA9IG9wdGlvbnM7XG5cbiAgaWYgKGRlZmF1bHRIZXgubGVuZ3RoICE9PSA2KSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdZb3VyIGRlZmF1bHRIZXggdmFsdWUgaXMgaW52YWxpZDsgaXQgbmVlZHMgdG8gYmUgdGhlIGZ1bGwgc2l4LWNoYXJhY3RlciBoZXhhZGVjaW1hbCBjb2xvciBjb2RlIHdpdGhvdXQgdGhlIGxlYWRpbmcgIy4nKTtcbiAgfVxuXG4gIGlmIChvcGFjaXR5ID4gMSB8fCBvcGFjaXR5IDwgMCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignWW91ciBvcGFjaXR5IHZhbHVlIGlzIGludmFsaWQ7IGl0IG5lZWRzIHRvIGJlIGEgZGVjaW1hbCB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEuJyk7XG4gIH1cblxuICBpZiAoYnJpZ2h0bmVzc1RocmVzaG9sZCA8IDAgfHwgYnJpZ2h0bmVzc1RocmVzaG9sZCA+IDI1NSkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignWW91ciBicmlnaHRuZXNzVGhyZXNob2xkIGlzIGludmFsaWQ7IGl0IG5lZWRzIHRvIGJlIGEgbnVtZXJpYyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDI1NS4nKTtcbiAgfVxuXG4gIGNvbnN0IHN0cmluZ1ZhbHVlID0gYCR7dmFsdWV9YDtcbiAgY29uc3QgaGV4U3RyaW5nID0gc3RyaW5nVG9IZXgoc3RyaW5nVmFsdWUsIGRlZmF1bHRIZXgpO1xuXG4gIGNvbnN0IHJnYkFycmF5ID0gc3RyaW5nVG9SZ2IoaGV4U3RyaW5nKTtcbiAgY29uc3QgcmdiYUFycmF5ID0gcmdiQXJyYXkuY29uY2F0KFtvcGFjaXR5XSk7XG4gIGNvbnN0IGhzbEFycmF5ID0gcmdiVG9Ic2wocmdiQXJyYXkpO1xuICBjb25zdCBoc2xhQXJyYXkgPSBoc2xBcnJheS5jb25jYXQoW29wYWNpdHldKTtcblxuICBjb25zdCBoZXggPSBgIyR7aGV4U3RyaW5nfWA7XG4gIGNvbnN0IHJnYiA9IGByZ2IoJHtyZ2JBcnJheS5qb2luKCcsICcpfSlgO1xuICBjb25zdCByZ2JhID0gYHJnYmEoJHtyZ2JhQXJyYXkuam9pbignLCAnKX0pYDtcbiAgY29uc3QgaHNsID0gYGhzbCgke2dldEhzbGFTdHJpbmcoaHNsQXJyYXkpfSlgO1xuICBjb25zdCBoc2xhID0gYGhzbGEoJHtnZXRIc2xhU3RyaW5nKGhzbGFBcnJheSl9KWA7XG5cbiAgY29uc3Qgc2hvdWxkVGV4dEJlRGFyayA9IHNob3VsZEZvcmVncm91bmRCZURhcmsocmdiQXJyYXksIGJyaWdodG5lc3NUaHJlc2hvbGQpO1xuICBjb25zdCBzaG91bGRUZXh0QmVEYXJrVzNDID0gc2hvdWxkRm9yZWdyb3VuZEJlRGFya1czQyhyZ2JBcnJheSk7XG5cbiAgbGV0IHByaXNtYSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgcHJpc21hLmhleCA9IGhleDtcblxuICBwcmlzbWEucmdiID0gcmdiO1xuICBwcmlzbWEucmdiQXJyYXkgPSBPQkpFQ1RfRlJFRVpFKHJnYkFycmF5KTtcblxuICBwcmlzbWEucmdiYSA9IHJnYmE7XG4gIHByaXNtYS5yZ2JhQXJyYXkgPSBPQkpFQ1RfRlJFRVpFKHJnYmFBcnJheSk7XG5cbiAgcHJpc21hLmhzbCA9IGhzbDtcbiAgcHJpc21hLmhzbEFycmF5ID0gT0JKRUNUX0ZSRUVaRShoc2xBcnJheSk7XG5cbiAgcHJpc21hLmhzbGEgPSBoc2xhO1xuICBwcmlzbWEuaHNsYUFycmF5ID0gT0JKRUNUX0ZSRUVaRShoc2xhQXJyYXkpO1xuXG4gIHByaXNtYS5zaG91bGRUZXh0QmVEYXJrID0gc2hvdWxkVGV4dEJlRGFyaztcbiAgcHJpc21hLnNob3VsZFRleHRCZURhcmtXM0MgPSBzaG91bGRUZXh0QmVEYXJrVzNDO1xuXG4gIHJldHVybiBPQkpFQ1RfRlJFRVpFKHByaXNtYSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcmlzbWE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvaW5kZXguanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFTQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQVdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ])
});
;