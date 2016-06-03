# prisma

A simple string-to-color conversion tool

#### Installation

Install via npm:

```
$ npm i prisma --save
```

and incorporate into your project:

```
// ES2015
import prisma from 'prisma';

// CommonJS
const prisma = require('prisma');

// UMD
const prisma = window.prisma;
```

#### Usage

Simply pass a value to the `prisma` function, and it will return an object with the hashed color information:

```
const colorizedString = prisma('Hello World!');

/*
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
  shouldTextBeDark: true
}
/*
```

A breakdown of the values:

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

Boolean value denoting if using this color as a background-color on an element, should the foreground text color be dark. This is based on the W3C Relative Luminance Definition that is [defined in the W3 spec](https://www.w3.org/TR/WCAG20/#relativeluminancedef).

#### How does it work?

Internally the string is hashed using a simple bitwise operation, and the resultant integer is converted into a hexadecimal code that the other values are built from. Because the hash is a bitwise operation based on charCodeAt, the consistency of the hash is guaranteed, and therefore the resultant colors are as well.

#### Development

Clone the git repository, and run `npm install`. From there, you can run any of the following npm scripts:
* `build` = builds the library with `NODE_ENV=development` and with source maps, outputting to the `dist` folder
* `build-minified` = builds the library with `NODE_ENV=production` and minified, outputting tot the `dist` folder
* `dev` = runs the playground React application to see `prisma` in action. Have fun playing!
* `lint` = runs ESLint against the files in `src`
* `prepublish` = runs `lint`, `transpile`, `build`, and `build-minified`
* `transpile` = runs babel to transpile the files in `src` to an ES5-compliant version in the `lib` folder
