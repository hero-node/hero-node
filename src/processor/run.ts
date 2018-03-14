import { default as server } from '../server';
import { LoggerFactory } from '../utils/logger';

export default () => {
  const logger = LoggerFactory.getLabeledInstance('processor', 'run');
  const port = 7001;
  logger.info(`server will start on port ${port}`);
  server.listen(port);
};
