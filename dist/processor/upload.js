"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util_1 = require("util");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvdXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXlCO0FBRXpCLCtCQUFpQztBQUtqQyxNQUFNLGNBQWMsR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxNQUFNLGFBQWEsR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUU3QyxrQkFBZSxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUU7SUFDOUIsTUFBTSxNQUFNLEdBQUcsc0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkUsSUFBSSxRQUFRLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQztJQUNULENBQUM7SUFDRCxNQUFNLElBQUksR0FBRyxjQUFJLEVBQUUsQ0FBQztJQUNwQixJQUFJLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtZQUMxQixNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxRQUFRLEdBQUcsYUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7QUFDSCxDQUFDLENBQUMifQ==