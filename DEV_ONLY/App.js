import debounce from 'lodash/debounce';
import React, {Component} from 'react';
import styled from 'styled-components';

import prisma from '../src';

const Container = styled.div`
  height: 100vh;
  padding: 15px;
`;

const Main = styled.main`
  margin-top: 15px;
`;

const Input = styled.input`
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: block;
  outline: 0;
  padding: 6px;
  width: 100%;
`;

const Color = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const ColorDisplay = styled.div`
  flex-basis: 15px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 15px;
  margin-right: 5px;
  width: 15px;
`;

const ColorText = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 15px;
`;

const ColorTextDisplay = ColorText.extend`
  border-radius: 3px;
  margin-top: 5px;
  padding: 5px;
`;

class App extends Component {
  state = {
    colors: []
  };

  debounceOnChangeInput = debounce((value) => {
    if (value) {
      const color = prisma(value, {
        defaultHex: '#5d5',
        opacity: 0.5
      });

      console.log(color);

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
    }
  }, 150);

  onChangeInput = (e) => {
    const value = e.currentTarget.value;

    // if (value) {
    this.debounceOnChangeInput(value);
    // }
  };

  render() {
    const {colors} = this.state;

    return (
      <Container>
        <header>
          <h1>prisma</h1>

          <div>Enter the string value below and see the resulting color value!</div>
        </header>

        <Main>
          <Input
            onChange={this.onChangeInput}
            placeholder="Enter a string to see the resulting color value"
            type="text"
          />

          <h4>Resulting colors and their tags</h4>

          <div>
            {colors.map(({hex, hsl, isTextDark, isTextDarkW3C, rgb, string}, colorIndex) => {
              const hexDisplayStyle = {
                backgroundColor: hex
              };
              const rgbDisplayStyle = {
                backgroundColor: rgb
              };
              const hslDisplayStyle = {
                backgroundColor: hsl
              };
              const textDisplayStyle = {
                backgroundColor: hex,
                color: isTextDark ? '#000' : '#fff'
              };
              const textDisplayStyleW3C = {
                backgroundColor: hex,
                color: isTextDarkW3C ? '#000' : '#fff'
              };

              const key = `color-${colorIndex}`;

              return (
                <Color key={key}>
                  <ColorDisplay style={hexDisplayStyle} />

                  <ColorText>{hex}</ColorText>

                  <ColorDisplay style={rgbDisplayStyle} />

                  <ColorText>{rgb}</ColorText>

                  <ColorDisplay style={hslDisplayStyle} />

                  <ColorText>{hsl}</ColorText>

                  <ColorTextDisplay style={textDisplayStyle}>Standard: {string}</ColorTextDisplay>

                  <ColorTextDisplay style={textDisplayStyleW3C}>W3C-Compliant: {string}</ColorTextDisplay>
                </Color>
              );
            })}
          </div>
        </Main>
      </Container>
    );
  }
}

export default App;
