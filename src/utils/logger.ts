import { createLogger, format, transports } from 'winston';
import * as _ from 'lodash';
import * as moment from 'moment';

declare namespace logger {
  type LogCallback = (
    error?: any,
    level?: string,
    msg?: string,
    meta?: any,
  ) => void;

  interface LeveledLogMethod {
    (msg: string, callback: LogCallback): any;
    (msg: string, meta: any, callback: LogCallback): any;
    (msg: string, ...meta: any[]): any;
  }

  interface ILoggerInstance {
    silly: LeveledLogMethod;
    debug: LeveledLogMethod;
    verbose: LeveledLogMethod;
    info: LeveledLogMethod;
    warn: LeveledLogMethod;
    error: LeveledLogMethod;
  }
}

export class LoggerFactory {
  static _instances = new Map<string, logger.ILoggerInstance>();

  static getLabeledInstance(category, callee): logger.ILoggerInstance {
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
