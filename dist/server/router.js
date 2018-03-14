"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const _ = require("lodash");
const Router = require("koa-router");
const IPFS = require("ipfs-api");
const logger_1 = require("../utils/logger");
const router = new Router();
const ipfs = IPFS({
    host: 'localhost',
    port: 5001,
    protocol: 'http',
});
const logger = logger_1.LoggerFactory.getLabeledInstance('server', 'router');
const uploadAsync = util_1.promisify(ipfs.files.add);
const readFileAsync = util_1.promisify(fs_1.readFile);
router.get('/', async (ctx, next) => {
    ctx.body = 'Hello, Heronode!';
    await next();
});
router.post('/api/ipfs/upload/raw', async (ctx, next) => {
    const body = ctx.request.fields;
    const content = _.get(body, 'content');
    if (!content) {
        logger.info('body content is empty!');
        ctx.status = 500;
        ctx.body = 'please make sure content field is not empty';
        await next;
        return;
    }
    logger.info(`uploading content: ${content}`);
    const resp = await uploadAsync(Buffer.from(content));
    ctx.body = resp;
    await next;
});
router.post('/api/ipfs/upload/file', async (ctx, next) => {
    const body = _.head(_.values(ctx.request.fields));
    const filePath = _.get(_.head(body), 'path');
    logger.info(`uploading content with path: ${filePath}`);
    const fileContent = await readFileAsync(filePath);
    const resp = await uploadAsync(fileContent);
    ctx.body = resp;
    await next;
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQThCO0FBQzlCLCtCQUFpQztBQUNqQyw0QkFBNEI7QUFDNUIscUNBQXFDO0FBQ3JDLGlDQUFpQztBQUVqQyw0Q0FBZ0Q7QUFFaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7SUFDaEIsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLElBQUk7SUFDVixRQUFRLEVBQUUsTUFBTTtDQUNqQixDQUFDLENBQUM7QUFDSCxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwRSxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsTUFBTSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxhQUFRLENBQUMsQ0FBQztBQUUxQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2xDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFDOUIsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3RELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2hDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixHQUFHLENBQUMsSUFBSSxHQUFHLDZDQUE2QyxDQUFDO1FBQ3pELE1BQU0sSUFBSSxDQUFDO1FBQ1gsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JELEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLE1BQU0sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDdkQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4RCxNQUFNLFdBQVcsR0FBRyxNQUFNLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixNQUFNLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=