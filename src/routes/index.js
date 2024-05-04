import express from 'express';
import { authorRoutes } from './authorRoutes.js';
import { bookRoutes } from './bookRoutes.js';

export const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('node js course'));
  app.use(express.json(), bookRoutes, authorRoutes);
};
