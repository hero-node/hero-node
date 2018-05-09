import { LoggerFactory } from '../utils/logger';
import * as Docker from 'dockerode';
import { includes, keys, reduce } from 'lodash';

export default async chainname => {
  const logger = LoggerFactory.getLabeledInstance('processor', 'add');
  const chainMap = {
    eth: 'ethereum/client-go',
    ipfs: 'ipfs/go-ipfs',
  };

  if (!includes(keys(chainMap), chainname)) {
    logger.warn(`${chainname} invalid!`);
    return;
  }
  const docker = new Docker({
    // host: 'localhost',
    // port: 3000,
    socketPath: '/var/run/docker.sock',
  });

  const imageName = `${chainMap[chainname]}:latest`;
  docker.pull(imageName, (err, stream) => {
    docker.modem.followProgress(stream, onFinished, onProgress);
    const progressing = {};

    function onFinished(err, output) {
      logger.info(`${chainname} added!`);
    }

    function onProgress(event) {
      const INDICATOR_PREPARE = 'Pulling fs layer';
      const INDICATOR_DOWNLOADING = 'Downloading';
      const INDICATOR_COMPLETE = 'Download complete';
      const INDICATOR_FINISHED =
        'Status: Image is up to date for ipfs/go-ipfs:latest';

      switch (event.status) {
        case INDICATOR_PREPARE:
          progressing[event.id] = 'Waiting';
          break;
        case INDICATOR_DOWNLOADING:
          progressing[event.id] = event.progress;
          output();
          break;
        case INDICATOR_COMPLETE:
          progressing[event.id] = INDICATOR_COMPLETE;
          output();
          break;
        case INDICATOR_FINISHED:
          // console.log(event);
          // logger.info(event.status);
          break;
        default:
          break;
        // console.debug(event);
      }
    }

    function output() {
      const payload = reduce(
        keys(progressing),
        (result, key) => {
          result += `${key}: ${progressing[key]}\r\n`;
          return result;
        },
        '',
      );
      console.clear();
      console.log(payload);
    }
  });
};
