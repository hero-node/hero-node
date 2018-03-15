import { LoggerFactory } from '../utils/logger';

export default chainname => {
  const logger = LoggerFactory.getLabeledInstance('processor', 'add');
  logger.info(`${chainname} added!`);
};
