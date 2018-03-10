import { Application } from 'egg';

export default (app: Application) => {
  app.get('/ipfs/nodes', app.controller.files.getNodesList);
  app.post('/ipfs/upload/file', app.controller.files.uploadFile);
  app.post('/ipfs/upload/raw', app.controller.files.uploadRaw);
  app.get('/', app.controller.home.welcome);
  app.get('/dev/qr', app.controller.home.generateQrImg);
};
