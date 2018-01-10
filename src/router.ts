import { Application } from 'egg';

export default (app: Application) => {
  app.get('/ipfs/nodes', app.controller.files.getNodesList);
  app.post('/upload', app.controller.files.upload);
  app.get('/', app.controller.index.welcome);
  app.get('/dev/qr', app.controller.index.generateQrImg);
};
