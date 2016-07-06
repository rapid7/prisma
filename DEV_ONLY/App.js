import Prefixer from 'inline-style-prefixer';
import debounce from 'lodash/debounce';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';

import prisma from '../src';

const prefixer = new Prefixer();

const STYLES = prefixer.prefix({
  color: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  colorDisplay: {
    flexBasis: 15,
    flexGrow: 0,
    flexShrink: 0,
    height: 15,
    marginRight: 5,
    width: 15
  },
  colorText: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0,
    marginRight: 15
  },
  container: {
    height: '100vh',
    padding: 15
  },
  input: {
    appearance: 'none',
    border: '1px solid #ccc',
    borderRadius: 3,
    display: 'block',
    outline: 0,
    padding: 6,
    width: '100%'
  },
  main: {
    marginTop: 15
  }
});

class App extends Component {
  state = {
    colors: []
  };

  debounceOnChangeInput = debounce((value) => {
    const color = prisma(value, {
      defaultHex: '#5d5',
      opacity: 0.5
    });

    const colors = [
      ...this.state.colors,
      {
        hex: color.hex,
        hsl: color.hsl,
        isTextDark: color.shouldTextBeDark,
        isTextDarkW3C: color.shouldTextBeDarkW3C,
        rgb: color.rgb,
        string: value
      }
    ];

    this.setState({
      colors
    });
  }, 150);

  onChangeInput = (e) => {
    const value = e.currentTarget.value;

    // if (value) {
      this.debounceOnChangeInput(value);
    // }
  };

  render() {
    const {
        colors
    } = this.state;

    return (
        <div style={STYLES.container}>
          <header>
            <h1>
              prisma
            </h1>

            <div>
              Enter the string value below and see the resulting color value!
            </div>
          </header>

          <main style={STYLES.main}>
            <input
                onChange={this.onChangeInput}
                placeholder="Enter a string to see the resulting color value"
                style={STYLES.input}
                type="text"
            />

            <h4>
              Resulting colors and their tags
            </h4>

            <div>
              {colors.map(({hex, hsl, isTextDark, isTextDarkW3C, rgb, string}, colorIndex) => {
                const hexDisplayStyle = {
                  ...STYLES.colorDisplay,
                  backgroundColor: hex
                };
                const rgbDisplayStyle = {
                  ...STYLES.colorDisplay,
                  backgroundColor: rgb
                };
                const hslDisplayStyle = {
                  ...STYLES.colorDisplay,
                  backgroundColor: hsl
                };
                const textDisplayStyle = {
                  ...STYLES.colorText,
                  backgroundColor: hex,
                  borderRadius: 3,
                  color: isTextDark ? '#000' : '#fff',
                  marginTop: 5,
                  padding: 5
                };
                const textDisplayStyleW3C = {
                  ...STYLES.colorText,
                  backgroundColor: hex,
                  borderRadius: 3,
                  color: isTextDarkW3C ? '#000' : '#fff',
                  marginTop: 5,
                  padding: 5
                };

                return (
                  <div
                      key={`color-${colorIndex}`}
                      style={STYLES.color}
                  >
                    <div style={hexDisplayStyle}/>

                    <div style={STYLES.colorText}>
                      {hex}
                    </div>

                    <div style={rgbDisplayStyle}/>

                    <div style={STYLES.colorText}>
                      {rgb}
                    </div>

                    <div style={hslDisplayStyle}/>

                    <div style={STYLES.colorText}>
                      {hsl}
                    </div>

                    <div style={textDisplayStyle}>
                      Standard: {string}
                    </div>

                    <div style={textDisplayStyleW3C}>
                      W3C-Compliant: {string}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
    );
  }
}

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);

const style = document.createElement('style');

style.textContent = `
*, *:before, *:after {
  box-sizing: border-box;
}

html, body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}`;

document.head.appendChild(style);
