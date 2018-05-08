"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
const lodash_1 = require("lodash");
const ipfs_1 = require("../adapter/ipfs");
const logger_1 = require("../utils/logger");
const fileExistAsync = util_1.promisify(fs.exists);
const readFileAsync = util_1.promisify(fs.readFile);
exports.default = async (filepath) => {
    const logger = logger_1.LoggerFactory.getLabeledInstance('processor', 'upload');
    let fullpath;
    if (path.isAbsolute(filepath)) {
        fullpath = filepath;
    }
    else {
        fullpath = path.join(process.cwd(), filepath);
    }
    const existed = await fileExistAsync(fullpath);
    if (!existed) {
        logger.warn('file does not exist, please check the path!');
        return;
    }
    const ipfs = ipfs_1.default();
    try {
        const payload = await readFileAsync(fullpath);
        ipfs.on('ready', async () => {
            const ipfsFileAdd = util_1.promisify(ipfs.files.add);
            const res = await ipfsFileAdd(payload);
            const firstObj = lodash_1.head(res);
            logger.info('uploaded successfully');
            logger.info(`path: ${firstObj['path']}, size: ${firstObj['size']}`);
            ipfs.stop(() => {
                logger.info('disconnecting...');
                return;
            });
        });
    }
    catch (err) {
        logger.error(err);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvdXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBaUM7QUFDakMsbUNBQThCO0FBQzlCLDBDQUFrRDtBQUNsRCw0Q0FBZ0Q7QUFFaEQsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsTUFBTSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFN0Msa0JBQWUsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFO0lBQzlCLE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksUUFBUSxDQUFDO0lBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzdCLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDckI7U0FBTTtRQUNMLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQztJQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDM0QsT0FBTztLQUNSO0lBQ0QsTUFBTSxJQUFJLEdBQUcsY0FBSSxFQUFFLENBQUM7SUFDcEIsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzFCLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxNQUFNLEdBQUcsR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxhQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hDLE9BQU87WUFDVCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7QUFDSCxDQUFDLENBQUMifQ==