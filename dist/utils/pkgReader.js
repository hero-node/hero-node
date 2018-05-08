"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
exports.default = () => {
    const pkgFile = fs_1.readFileSync(path_1.join(__dirname, '../../package.json'));
    const pkgInfo = JSON.parse(pkgFile.toString('utf8'));
    return pkgInfo;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtnUmVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9wa2dSZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBa0M7QUFDbEMsK0JBQTRCO0FBRTVCLGtCQUFlLEdBQUcsRUFBRTtJQUNsQixNQUFNLE9BQU8sR0FBRyxpQkFBWSxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRXJELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyJ9