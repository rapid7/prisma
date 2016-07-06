# prisma

A simple string-to-color conversion tool. The string provided generates a unique and consistent color, and an immutable object of the various valid HTML color values are returned.

`prisma` has no dependencies, and has a tiny footprint of only 1.6kb (minified and gzipped).

### Installation

Install via npm:

```
$ npm i prisma --save
```

and incorporate into your project:

```javascript
// ES2015
import prisma from 'prisma';

// CommonJS
const prisma = require('prisma');

// UMD
const prisma = window.prisma;
```

### Usage

Simply pass a value to the `prisma` function, and it will return an object with the hashed color information:

```javascript
const colorizedString = prisma('Hello World!');

/* colorizedString is now the object:
{
  hex: '#7e7be2',
  hsl: 'hsl(242, 64%, 68%)',
  hslArray: [242, 0.64, 0.68],
  hsla: 'hsla(242, 64%, 68%, 1)',
  hslaArray: [242, 0.64, 0.68, 1],
  rgb: 'rgb(126, 123, 226)',
  rgbArray: [126, 123, 226],
  rgba: 'rgba(126, 123, 226, 1)',
  rgbaArray: [126, 123, 226, 1],
  shouldTextBeDark: false,
  shouldTextBeDarkW3C: true
}
*/
```

Additionally, you can pass an object of options to the call:

```javascript
const colorizedStringWithOptions = prisma('Hello World!', {
  brightnessThreshold: 135,
  defaultHex: '1d1d1d',
  opacity: 0.5
});

/* colorizedStringWithOptions is now the object:
{
  hex: '#7e7be2',
  hsl: 'hsl(242, 64%, 68%)',
  hslArray: [242, 0.64, 0.68],
  hsla: 'hsla(242, 64%, 68%, 0.5)',
  hslaArray: [242, 0.64, 0.68, 0.5],
  rgb: 'rgb(126, 123, 226)',
  rgbArray: [126, 123, 226],
  rgba: 'rgba(126, 123, 226, 0.5)',
  rgbaArray: [126, 123, 226, 0.5],
  shouldTextBeDark: false,
  shouldTextBeDarkW3C: true
}
*/
```

#### Options

**brightnessThreshold**

Numeric brightness value used as comparator when calculating `shouldTextBeDark`, where brightness values greater than or equal to the number provided will return `true`. Valid values are between 0 and 255, with the recommended range between 128 and 145.
* Default = `130`
* Good = `140`
* Bad = `"140"`

**defaultHex**

Hexadecimal code that is the given default for empty strings. Shorthand values or with preceding hash is allowed.
* Default = `000000`
* Good = `ffffff`
* Good = `#fff`
* Bad = `red`

**opacity**

Numeric opacity value used in `rgba` and `hsla` (note that these are the only two colors impacted by opacity).
* Default = `1`
* Good = `0.5`
* Bad = `50`
* Bad = `-0.6`

#### Object properties returned

**hex** `{string}`

The hexadecimal color code as a string used in CSS

**hsl** `{string}`

The computed values for HSL (hue, saturation, luminance) as a string used in CSS

**hslArray** `{Array<number>}`

The computed values for HSL as an array of numbers

**hsla** `{string}`

The computed values for HSLA (hue, saturation, luminance, alpha of opacity) as a string used in CSS

**hslaArray** `{Array<number>}`

The computed values for HSLA as an array of numbers

**rgb** `{string}`

The Computed values for RGB (red, green, blue) as a string used in CSS

**rgbArray** `{Array<number>}`

The computed values for RGB as an array of numbers

**rgba** `{string}`

The Computed values for RGBA (red, green, blue, alpha of opacity) as a string used in CSS

**rgbaArray** `{Array<number>}`

The computed values for RGBA as an array of numbers

**shouldTextBeDark** `{boolean}`

Boolean value denoting if using this color as a background-color on an element, should the foreground text color be dark. This is based on an opinionated gamma value threshold.

**shouldTextBeDarkW3C** `{boolean}`

Boolean value denoting if using this color as a background-color on an element, should the foreground text color be dark. This is based on the W3C Relative Luminance Definition that is [defined in the W3 spec](https://www.w3.org/TR/WCAG20/#relativeluminancedef).

### Additional functions

**prisma.shouldTextBeDark(hexColor: string[, brightnessThreshold: number])** *returns `{boolean}`*

Pass a hexadecimal color to it (with or without leading hash), and it returns whether the foreground text should be dark or not based on brightness level.

```javascript
prisma.shouldTextBeDark('#000'); // false
prisma.shouldTextBeDark('ffffff'); // true
```

**prisma.shouldTextBeDarkW3C(hexColor: string[, brightnessThreshold: number])** *returns `{boolean}`*

Pass a hexadecimal color to it (with or without leading hash), and it returns whether the foreground text should be dark or not based on the W3C standard.

```javascript
prisma.shouldTextBeDarkW3C('#000'); // false
prisma.shouldTextBeDarkW3C('ffffff'); // true
```

### How does it work?

Internally the string is hashed using a simple bitwise operation, and the resultant integer is converted into a hexadecimal code that the other values are built from. Because the hash is a bitwise operation based on charCodeAt, the consistency of the hash is guaranteed, and therefore the resultant colors are as well.

### Development

Clone the git repository, and run `npm install`. From there, you can run any of the following npm scripts:
* `build` = builds the library with `NODE_ENV=development` and with source maps, outputting to the `dist` folder
* `build-minified` = builds the library with `NODE_ENV=production` and minified, outputting tot the `dist` folder
* `dev` = runs the playground React application to see `prisma` in action. Have fun playing!
* `lint` = runs ESLint against the files in `src`
* `prepublish` = runs `lint`, `transpile`, `build`, and `build-minified`
* `transpile` = runs babel to transpile the files in `src` to an ES5-compliant version in the `lib` folder
