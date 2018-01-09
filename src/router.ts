import { Application } from 'egg';

export default (app: Application) => {
  const controller = app.controller;
  app.post('/upload', controller.files.upload);
  app.get('/', controller.index.welcome);
};
