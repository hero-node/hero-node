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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvdXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBaUM7QUFDakMsbUNBQThCO0FBQzlCLDBDQUFrRDtBQUNsRCw0Q0FBZ0Q7QUFFaEQsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsTUFBTSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFN0Msa0JBQWUsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFO0lBQzlCLE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksUUFBUSxDQUFDO0lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUN0QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUM7SUFDVCxDQUFDO0lBQ0QsTUFBTSxJQUFJLEdBQUcsY0FBSSxFQUFFLENBQUM7SUFDcEIsSUFBSSxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLGFBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=