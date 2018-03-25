"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const _ = require("lodash");
const moment = require("moment");
const winston_1 = require("winston");
class LoggerFactory {
    static getLabeledInstance(category, callee, options) {
        if (!category || _.isEmpty(category))
            category = 'main';
        if (!callee || _.isEmpty(callee))
            callee = '';
        // let colorize = true;
        // if (
        //   _.get(options, 'env') === 'prod' ||
        //   _.get(options, 'colorize') === false
        // ) {
        //   colorize = false;
        // }
        const identity = `${category}-${callee}`;
        let labeledInstance = this._instances.get(identity);
        if (!labeledInstance) {
            labeledInstance = winston_1.createLogger({
                label: callee,
                format: winston_1.format.printf(info => {
                    return `${moment().format('YYYY-MM-DD hh:mm:ss.SSS')} ${chalk_1.default.cyan(info.level)} --- [${chalk_1.default.cyan(category)}:${chalk_1.default.cyan(callee)}]: ${info.message}`;
                }),
                transports: [new winston_1.transports.Console()],
            });
            this._instances.set(identity, labeledInstance);
        }
        return labeledInstance;
    }
}
LoggerFactory._instances = new Map();
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBeUM7QUFDekMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyxxQ0FBMkQ7QUErQjNEO0lBR0UsTUFBTSxDQUFDLGtCQUFrQixDQUN2QixRQUFnQixFQUNoQixNQUFjLEVBQ2QsT0FBK0I7UUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFOUMsdUJBQXVCO1FBQ3ZCLE9BQU87UUFDUCx3Q0FBd0M7UUFDeEMseUNBQXlDO1FBQ3pDLE1BQU07UUFDTixzQkFBc0I7UUFDdEIsSUFBSTtRQUVKLE1BQU0sUUFBUSxHQUFHLEdBQUcsUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3pDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNyQixlQUFlLEdBQUcsc0JBQVksQ0FBQztnQkFDN0IsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMzQixNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUNoRSxJQUFJLENBQUMsS0FBSyxDQUNYLFNBQVMsZUFBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUNsRCxJQUFJLENBQUMsT0FDUCxFQUFFLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDO2dCQUNGLFVBQVUsRUFBRSxDQUFDLElBQUksb0JBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2QyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDekIsQ0FBQzs7QUFwQ00sd0JBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0MsQ0FBQztBQURoRSxzQ0FzQ0MifQ==