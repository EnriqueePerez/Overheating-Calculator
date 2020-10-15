import express from 'express';
import webpack from 'webpack';

require('dotenv').config();

const app = express();

if (process.env.MODE === 'development') {
  // requiring all the dependencies
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const wepackHotMiddleware = require('webpack-hot-middleware');

  //creating a webpack compiler with our configurations
  const compiler = webpack(webpackConfig); //executing webpack with its configurations
  const serverConfig = { port: process.env.PORT, hot: true }; //declaring the port and enabling hot reload in dev server

  //adding the middlewares into the server
  app.use(webpackDevMiddleware(compiler, serverConfig)); //Middleware to compile all the files and put it on the server
  app.use(webpackHotMiddleware(compiler)); //Middleware to enable hot reload
}

app.get('*', (req, res) => {
  res.send({ hello: 'hola' });
});

app.listen(3000, () => {
  if (err) console.log(err);
  else {
    console.log(
      // eslint-disable-next-line comma-dangle
      `Server is running on port ${process.env.PORT} and in ${process.env.MODE} mode`
    );
  }
});
