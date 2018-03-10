"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
const lodash_1 = require("lodash");
const ipfs_1 = require("../adapter/ipfs");
const fileExistAsync = util_1.promisify(fs.exists);
const readFileAsync = util_1.promisify(fs.readFile);
exports.default = async (filepath) => {
    let fullpath;
    if (path.isAbsolute(filepath)) {
        fullpath = filepath;
    }
    else {
        fullpath = path.join(process.cwd(), filepath);
    }
    const existed = await fileExistAsync(fullpath);
    if (!existed) {
        console.error('[ERROR] file does not exist, please check the path!');
        return;
    }
    const ipfs = ipfs_1.default();
    try {
        const payload = await readFileAsync(fullpath);
        ipfs.on('ready', async () => {
            const ipfsFileAdd = util_1.promisify(ipfs.files.add);
            const res = await ipfsFileAdd(payload);
            const firstObj = lodash_1.head(res);
            console.log('[INFO] uploaded successfully');
            console.log(`[INFO] path: ${firstObj['path']}, size: ${firstObj['size']}`);
            ipfs.stop(() => {
                console.log('[INFO] disconnecting...');
                return;
            });
        });
    }
    catch (err) {
        console.error(err);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvdXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBaUM7QUFDakMsbUNBQThCO0FBQzlCLDBDQUFrRDtBQUVsRCxNQUFNLGNBQWMsR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxNQUFNLGFBQWEsR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUU3QyxrQkFBZSxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUU7SUFDOUIsSUFBSSxRQUFRLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQztJQUNULENBQUM7SUFDRCxNQUFNLElBQUksR0FBRyxjQUFJLEVBQUUsQ0FBQztJQUNwQixJQUFJLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtZQUMxQixNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxRQUFRLEdBQUcsYUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUNULGdCQUFnQixRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQzlELENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztBQUNILENBQUMsQ0FBQyJ9