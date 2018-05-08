import { LoggerFactory } from '../utils/logger';
import * as Docker from 'dockerode';
import { includes, keys } from 'lodash';

export default async chainname => {
  const logger = LoggerFactory.getLabeledInstance('processor', 'add');
  const chainMap = {
    eth: 'ethereum/client-go',
    ipfs: 'ipfs/go-ipfs'
  };
  if (!includes(keys(chainMap), chainname)) {
    logger.warn(`${chainname} invalid!`);
    return;
  } 
  const docker = new Docker({
    // host: 'localhost',
    // port: 3000,
    socketPath: '/var/run/docker.sock'
  });
  docker.pull(chainMap[chainname], (err, stream) => {
    docker.modem.followProgress(stream, onFinished, onProgress);
 
    function onFinished(err, output) {
      logger.info(output);
      logger.info(`${chainname} added!`);
    }

    function onProgress(event) {
      const INDICATOR = 'Pulling fs layer';
      
      if (event.status === INDICATOR) {

      }

    }
  });
};
