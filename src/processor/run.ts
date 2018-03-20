import * as _ from 'lodash';
import { default as server } from '../server';
import { LoggerFactory } from '../utils/logger';

export default options => {
  const logger = LoggerFactory.getLabeledInstance('processor', 'run');
  let port = options.port;
  if (_.isNaN(+port) || port <= 0) port = 80;
  else port = +port;
  logger.info(`server will start on port ${port}`);
  server.listen(port);
};
