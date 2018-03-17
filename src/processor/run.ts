import * as _ from 'lodash';
import { default as server } from '../server';
import { LoggerFactory } from '../utils/logger';

export default port => {
  const logger = LoggerFactory.getLabeledInstance('processor', 'run');
  if (!_.isNumber(port) || port <= 0) port = 80;
  logger.info(`server will start on port ${port}`);
  server.listen(port);
};
