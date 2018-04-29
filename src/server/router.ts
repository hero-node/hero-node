import { readFile } from 'fs';
import { promisify } from 'util';
import * as _ from 'lodash';
import * as Router from 'koa-router';
import * as IPFS from 'ipfs-api';
import * as Web3 from 'web3';
import * as geolite2 from 'geolite2';
import * as maxmind from 'maxmind';
import * as IP from 'public-ip';
import { request } from 'urllib';

import { LoggerFactory } from '../utils/logger';

const router = new Router();
const ipfs = IPFS({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
});
const web3 = new Web3('http://localhost:8545');

const logger = LoggerFactory.getLabeledInstance('server', 'router');
const uploadAsync = promisify(ipfs.files.add);
const getFileListAsync = promisify(ipfs.files.ls);
const getIpfsNodeId = promisify(ipfs.id);
const getIpfsSwarmPeers = promisify(ipfs.swarm.peers);
const readFileAsync = promisify(readFile);

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello, Heronode!';
  await next();
});

router.post('/api/ipfs/upload/raw', async (ctx, next) => {
  const body = (ctx.request as any).fields;
  const content = _.get(body, 'content');
  if (!content) {
    logger.info('body content is empty!');
    ctx.status = 500;
    ctx.body = 'please make sure content field is not empty';
    await next;
    return;
  }
  logger.info(`uploading content: ${content}`);
  try {
    const resp = await uploadAsync(Buffer.from(content));
    ctx.body = resp;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
  await next;
});

router.post('/api/ipfs/upload/file', async (ctx, next) => {
  const body = _.head(_.values((ctx.request as any).fields));
  const filePath = _.get(_.head(body), 'path');
  logger.info(`uploading content with path: ${filePath}`);
  const fileContent = await readFileAsync(filePath);
  const resp = await uploadAsync(fileContent);
  ctx.body = resp;
  await next;
});

router.get('/api/ipfs/cat', async (ctx, next) => {
  const ipfsPath = ctx.query.path;
  try {
    const resp = await ipfs.files.cat(ipfsPath);
    ctx.body = resp;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
  await next;
});

router.get('/dashboard', async ctx => {
  await ctx.redirect('/dashboard/home');
});

router.get('/dashboard/home', async ctx => {
  await ctx.render('home');
});

router.get('/dashboard/files', async ctx => {
  await ctx.render('files');
});

router.get('/dashboard/geo', async ctx => {
  await ctx.render('geo');
});

router.get('/dashboard/node', async ctx => {
  await ctx.render('nodes');
});

router.get('/internal/nodeinfo', async ctx => {
  const [nodeId, peers] = await Promise.all([
    getIpfsNodeId(),
    getIpfsSwarmPeers(),
  ]);
  const addrs = _.reduce(
    peers,
    (accu, peer) => {
      const addrInfoArr = peer.addr.toString().split('/');
      accu.push(addrInfoArr[2]);
      return accu;
    },
    [],
  );

  ctx.body = {
    nodeId,
    addrs,
    eth: { node: web3.version.node },
  };
});

router.get('/internal/geo', async (ctx, next) => {
  const lookup = maxmind.openSync(geolite2.paths.city);
  const peers = await getIpfsSwarmPeers();
  const addrs = _.reduce(
    peers,
    (accu, peer) => {
      const addrInfoArr = peer.addr.toString().split('/');
      accu.push(addrInfoArr[2]);
      return accu;
    },
    [],
  );
  const geos = _.reduce(
    addrs,
    (accu, el) => {
      if (el) {
        const location = _.get(lookup.get(el), 'location');
        if (location) {
          _.set(location, 'id', el.split('.').join(''));
          _.set(location, 'ip', el);
          _.set(location, 'weight', Math.sqrt(Math.random() * 10));
          accu.push(location);
        }
      }
      return accu;
    },
    [],
  );
  const ip = await IP.v4();
  const currentLocation = _.get(lookup.get(ip), 'location');
  currentLocation.ip = ip;
  currentLocation.id = ip.split('.').join('');

  ctx.body = { currentLocation, geos };
});

router.get('/internal/filelist', async (ctx, next) => {
  ipfs.refs.local(function(err, files) {
    console.log(err, files);
    ctx.body = 123;
  });
});

export default router;
