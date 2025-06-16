const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

// Custom transform to convert CSS variables to JavaScript objects
StyleDictionary.registerTransform({
  name: 'size/pxToNumber',
  type: 'value',
  matcher: (token) => token.type === 'dimension',
  transformer: (token) => {
    return parseFloat(token.value.replace('px', ''));
  }
});

StyleDictionary.registerTransform({
  name: 'color/hexToRgba',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transformer: (token) => {
    return token.value;
  }
});

// Custom format for React Native JavaScript tokens
StyleDictionary.registerFormat({
  name: 'javascript/es6',
  formatter: function(dictionary) {
    return `export const tokens = ${JSON.stringify(dictionary.tokens, null, 2)};`;
  }
});

// Custom format for TypeScript tokens
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations',
  formatter: function(dictionary) {
    let output = `export interface DesignTokens {\n`;
    
    function buildInterface(obj, indent = 1) {
      const spaces = '  '.repeat(indent);
      let result = '';
      
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && !value.value) {
          result += `${spaces}${key}: {\n`;
          result += buildInterface(value, indent + 1);
          result += `${spaces}};\n`;
        } else if (value && value.value) {
          result += `${spaces}${key}: string;\n`;
        }
      }
      
      return result;
    }
    
    output += buildInterface(dictionary.tokens);
    output += `}\n\n`;
    output += `export const tokens: DesignTokens = ${JSON.stringify(dictionary.tokens, null, 2)};`;
    
    return output;
  }
});

const StyleDictionaryExtended = StyleDictionary.extend({
  source: ['src/tokens/raw/**/*.json'],
  platforms: {
    'react-native': {
      transformGroup: 'react-native',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/pxToNumber', 'color/hexToRgba'],
      buildPath: 'src/tokens/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        },
        {
          destination: 'tokens.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    }
  }
});

StyleDictionaryExtended.buildAllPlatforms();