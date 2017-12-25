const { createLogger, format, transports } = require('winston');
const _ = require('lodash');
const moment = require('moment');

class LoggerFactory {
  constructor(category, callee) {
    this._instances = new Map();
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
            7
          )} --- [${category}] ${callee}: ${info.message}`;
        }),
        transports: [new transports.Console()]
      });
      this._instances.set(identity, labeledInstance);
    }
    return labeledInstance;
  }
}

module.exports = (category, callee) => {
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
