/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server'; //Funcion para renderear los componentes como string
import { renderRoutes } from 'react-router-config'; //router
import { StaticRouter } from 'react-router-dom'; //router
import serverRoutes from '../frontend/routes/serverRoutes';

require('dotenv').config();

const app = express();

if (process.env.MODE === 'development') {
  // requiring all the dependencies
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  //creating a webpack compiler with our configurations
  const compiler = webpack(webpackConfig); //executing webpack with its configurations
  const serverConfig = { port: process.env.PORT, hot: true }; //declaring the port and enabling hot reload in dev server

  //adding the middlewares into the server
  app.use(webpackDevMiddleware(compiler, serverConfig)); //Middleware to compile all the files and put it on the server
  app.use(webpackHotMiddleware(compiler)); //Middleware to enable hot reload
}

const setResponse = (html) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <link rel="stylesheet" href="assets/app.css" type="text/css" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculador de Sobrecalentamiento</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="assets/app.js" type="text/javascript"></script>
      </body>
    </html>
    `;
};

const renderApp = (req, res) => {
  const html = renderToString(
    <StaticRouter location={req.url} context={{}}>
      {renderRoutes(serverRoutes)}
    </StaticRouter>
  );
  //dentro del router colocamos la funcion renderRoutes y le pasamos el archivo de las rutas
  res.send(setResponse(html));
};

app.get('*', renderApp);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(
      // eslint-disable-next-line comma-dangle
      `Server is running on port ${process.env.PORT} and in ${process.env.MODE} mode`
    );
  }
});
