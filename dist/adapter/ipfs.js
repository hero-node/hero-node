"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IPFS = require("ipfs");
let instance;
class Ipfs {
    constructor() {
        return new IPFS();
    }
}
exports.default = () => {
    if (!instance)
        instance = new Ipfs();
    return instance;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBmcy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjLyIsInNvdXJjZXMiOlsiYWRhcHRlci9pcGZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBRTdCLElBQUksUUFBUSxDQUFDO0FBRWI7SUFDRTtRQUNFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQUVELGtCQUFlLEdBQUcsRUFBRTtJQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRXJDLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDIn0=