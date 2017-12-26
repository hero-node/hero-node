const Koa = require('koa');
const Router = require('koa-router');
const cors = require('kcors');
const config = require('config');
const logger = require('./src/utils/logger')('index');
const { isEthAddress } = require('./src/utils/validator');
// var request = require('request');
// var qr = require('qr-image');
// var ipfsAPI = require('ipfs-api');
// var ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });
// var heroNodes = [];
// var ipfsNodes = [];
// ipfs.swarm.peers().then(peers => {
//   for (var i = 0; i < peers.length; i++) {
//     var ip = peers[i].addr + '';
//     ipfsNodes.push(ip + '/' + peers[i].peer._idB58String);
//     ip = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)[0];
//     console.log(ip);
//     request(ip + '/isHeroNode', function(error, response, body) {
//       if (!error && response.statusCode == 200) {
//         console.log(body);
//         var isHeroNode = JSON.parse(body).isHeroNode;
//         if (isHeroNode) {
//           heroNodes.push(ip);
//         }
//       }
//     });
//   }
// });

const port = 3001;
const server = new Koa();
const router = new Router();
server.use(
  cors({
    'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type'
  })
);

router.get('/status/node-validation', async ctx => {
  const payload = { valid: true };
  ctx.body = payload;
});

server.use(router.routes()).use(router.allowedMethods());

// app.use(
//   '/hero',
//   express.static('./', {
//     maxAge: 0
//   })
// );
// app.use('/isHeroNode', function(req, res, next) {
//   res.send({ isHeroNode: true });
//   res.end();
// });

// app.use('/heroNodes', function(req, res, next) {
//   res.send(heroNodes);
//   res.end();
// });
// app.use('/ipfsNodes', function(req, res, next) {
//   res.send(ipfsNodes);
//   res.end();
// });
// app.use('/ipfsNodes', function(req, res, next) {
//   res.send(ipfsNodes);
//   res.end();
// });
// app.use('/qr', function(req, res, next) {
//   var code = qr.image(req.query.value, { type: 'png' });
//   res.setHeader('Content-type', 'image/png'); //sent qr image to client side
//   code.pipe(res);
// });
// app.use('/json2hash', function(req, res, next) {
//   if (req.method === 'POST') {
//     res.send(req.body);
//     res.end();
//   } else if (req.method === 'GET') {
//     ipfs.add(new Buffer(JSON.stringify(req.query))).then(hash => {
//       res.send(hash[0].hash);
//       res.end();
//     });
//   }
// });

// var proxy = require('http-proxy-middleware');
// var ipfsProxy = proxy('/ipfs', {
//   target: 'http://localhost:8080',
//   changeOrigin: true
// });
// app.use(ipfsProxy);
// var ipfsApiProxy = proxy('/ipfsapi', {
//   target: 'http://localhost:5001',
//   changeOrigin: true
// });
// app.use(ipfsApiProxy);

// app.use('/eth', function(req, res, next) {
//   var options = {
//     url: 'http://localhost:8545',
//     method: req.method
//   };
//   if (req.method === 'POST') {
//     options.body = JSON.stringify(req.body);
//   }
//   request(options, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.send(body);
//       res.end();
//     } else {
//       res.send(error);
//       res.end();
//     }
//   });
// });

// var filterBTC = function(pathname, req) {
//   return (
//     pathname.match(
//       /^([\/][13][a-km-zA-HJ-NP-Z1-9]{25,34})|(uimedia)|(.bit)|(Websocket)$/
//     ) != null
//   );
// };
// var zeroNetProxy = proxy(filterBTC, {
//   target: 'http://localhost:43110',
//   changeOrigin: true,
//   ws: true
// });
// app.use(zeroNetProxy);

// var filterEth = function(pathname, req) {
//   return isEthAddress(pathname.replace('/', ''));
// };
// var heroNetProxy = proxy(filterEth, {
//   target: 'http://localhost:43110',
//   changeOrigin: true,
//   ws: false
// });
// app.use(heroNetProxy);

logger.info('========================================');
logger.info('HeroNode is now under heavy development');
logger.info('any kind of help is warmly welcome!');
logger.info('========================================');
logger.info(`heronode server is running at ${port}`);
server.listen(port);
