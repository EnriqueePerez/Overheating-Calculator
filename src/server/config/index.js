require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
}); //babel register is using the configuration with preset-env and preset-react

require('../server');
