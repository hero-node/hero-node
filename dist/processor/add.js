"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const Docker = require("dockerode");
const lodash_1 = require("lodash");
exports.default = async (chainname) => {
    const logger = logger_1.LoggerFactory.getLabeledInstance('processor', 'add');
    const chainMap = {
        eth: 'ethereum/client-go',
        ipfs: 'ipfs/go-ipfs'
    };
    if (!lodash_1.includes(lodash_1.keys(chainMap), chainname)) {
        logger.warn(`${chainname} invalid!`);
        return;
    }
    const docker = new Docker({
        // host: 'localhost',
        // port: 3000,
        socketPath: '/var/run/docker.sock'
    });
    docker.pull(chainMap[chainname], (err, stream) => {
        docker.modem.followProgress(stream, onFinished, onProgress);
        function onFinished(err, output) {
            logger.info(output);
            logger.info(`${chainname} added!`);
        }
        function onProgress(event) {
            const INDICATOR = 'Pulling fs layer';
            if (event.status === INDICATOR) {
            }
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvYWRkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWdEO0FBQ2hELG9DQUFvQztBQUNwQyxtQ0FBd0M7QUFFeEMsa0JBQWUsS0FBSyxFQUFDLFNBQVMsRUFBQyxFQUFFO0lBQy9CLE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sUUFBUSxHQUFHO1FBQ2YsR0FBRyxFQUFFLG9CQUFvQjtRQUN6QixJQUFJLEVBQUUsY0FBYztLQUNyQixDQUFDO0lBQ0YsSUFBSSxDQUFDLGlCQUFRLENBQUMsYUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU87S0FDUjtJQUNELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO1FBQ3hCLHFCQUFxQjtRQUNyQixjQUFjO1FBQ2QsVUFBVSxFQUFFLHNCQUFzQjtLQUNuQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTVELG9CQUFvQixHQUFHLEVBQUUsTUFBTTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxvQkFBb0IsS0FBSztZQUN2QixNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztZQUVyQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2FBRS9CO1FBRUgsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=