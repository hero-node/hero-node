import { Application } from 'egg';

export default (app: Application) => {
  app.get('/ipfs/nodes', app.controller.files.getNodesList);
  app.post('/ipfs/upload', app.controller.files.upload);
  app.get('/', app.controller.home.welcome);
  app.get('/dev/qr', app.controller.home.generateQrImg);
};
