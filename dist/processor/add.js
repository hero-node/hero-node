"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const Docker = require("dockerode");
const lodash_1 = require("lodash");
exports.default = async (chainname) => {
    const logger = logger_1.LoggerFactory.getLabeledInstance('processor', 'add');
    const chainMap = {
        eth: 'ethereum/client-go',
        ipfs: 'ipfs/go-ipfs',
    };
    if (!lodash_1.includes(lodash_1.keys(chainMap), chainname)) {
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
            const INDICATOR_FINISHED = 'Status: Image is up to date for ipfs/go-ipfs:latest';
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
            const payload = lodash_1.reduce(lodash_1.keys(progressing), (result, key) => {
                result += `${key}: ${progressing[key]}\r\n`;
                return result;
            }, '');
            console.clear();
            console.log(payload);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvYWRkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWdEO0FBQ2hELG9DQUFvQztBQUNwQyxtQ0FBZ0Q7QUFFaEQsa0JBQWUsS0FBSyxFQUFDLFNBQVMsRUFBQyxFQUFFO0lBQy9CLE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sUUFBUSxHQUFHO1FBQ2YsR0FBRyxFQUFFLG9CQUFvQjtRQUN6QixJQUFJLEVBQUUsY0FBYztLQUNyQixDQUFDO0lBRUYsSUFBSSxDQUFDLGlCQUFRLENBQUMsYUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU87S0FDUjtJQUNELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO1FBQ3hCLHFCQUFxQjtRQUNyQixjQUFjO1FBQ2QsVUFBVSxFQUFFLHNCQUFzQjtLQUNuQyxDQUFDLENBQUM7SUFFSCxNQUFNLFNBQVMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUQsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLG9CQUFvQixHQUFHLEVBQUUsTUFBTTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQsb0JBQW9CLEtBQUs7WUFDdkIsTUFBTSxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztZQUM3QyxNQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUM1QyxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDO1lBQy9DLE1BQU0sa0JBQWtCLEdBQ3RCLHFEQUFxRCxDQUFDO1lBRXhELFFBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsS0FBSyxpQkFBaUI7b0JBQ3BCLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO29CQUNsQyxNQUFNO2dCQUNSLEtBQUsscUJBQXFCO29CQUN4QixXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7b0JBQ3ZDLE1BQU0sRUFBRSxDQUFDO29CQUNULE1BQU07Z0JBQ1IsS0FBSyxrQkFBa0I7b0JBQ3JCLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLENBQUM7b0JBQzNDLE1BQU0sRUFBRSxDQUFDO29CQUNULE1BQU07Z0JBQ1IsS0FBSyxrQkFBa0I7b0JBQ3JCLHNCQUFzQjtvQkFDdEIsNkJBQTZCO29CQUM3QixNQUFNO2dCQUNSO29CQUNFLE1BQU07Z0JBQ1Isd0JBQXdCO2FBQ3pCO1FBQ0gsQ0FBQztRQUVEO1lBQ0UsTUFBTSxPQUFPLEdBQUcsZUFBTSxDQUNwQixhQUFJLENBQUMsV0FBVyxDQUFDLEVBQ2pCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNkLE1BQU0sSUFBSSxHQUFHLEdBQUcsS0FBSyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDNUMsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxFQUNELEVBQUUsQ0FDSCxDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=