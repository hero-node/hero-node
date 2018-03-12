import { createLogger, format, transports } from 'winston';
import * as _ from 'lodash';
import * as moment from 'moment';

interface ILoggerFactory {}

class LoggerFactory implements ILoggerFactory {
  private _instances = new Map();

  constructor(category, callee) {
    if (!category || _.isEmpty(category)) category = 'default';
    if (!callee || _.isEmpty(callee)) callee = 'default';
    const identity = `${category}-${callee}`;
    let labeledInstance = this._instances.get(identity);
    if (!labeledInstance) {
      const { printf } = format;
      labeledInstance = createLogger({
        label: callee,
        format: printf(info => {
          return `${moment().format('YYYY-MM-DD hh:mm:ss.SSS')} ${_.padEnd(
            info.level,
            7,
          )} --- [${category}] ${callee}: ${info.message}`;
        }),
        transports: [new transports.Console()],
      });
      this._instances.set(identity, labeledInstance);
    }
    return labeledInstance;
  }
}

export const getLogger = (category, callee) => {
  if (category && !_.isEmpty(category))
    category = _.chain(category)
      .replace(' ', '')
      .toUpper()
      .value();
  if (callee && !_.isEmpty(callee))
    callee = _.chain(callee)
      .replace(' ', '.')
      .toLower()
      .value();
  return new LoggerFactory(category, callee);
};
