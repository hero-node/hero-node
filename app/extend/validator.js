"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const _isChecksumAddress = (address) => {
    // Check each case
    address = address.replace('0x', '');
    const addressHash = _.toLower(address);
    for (let i = 0; i < 40; i++) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 &&
            address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 &&
                address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
exports.isEthAddress = (address) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    }
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) ||
        /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    }
    else {
        // Otherwise check each case
        return _isChecksumAddress(address);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJleHRlbmQvdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTRCO0FBRTVCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUM3QyxrQkFBa0I7SUFDbEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM1QixzRUFBc0U7UUFDdEUsRUFBRSxDQUFDLENBQ0QsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDL0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDM0MsQ0FBQyxDQUFDLENBQUM7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFO0lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyx1REFBdUQ7UUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ1IscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNuQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNELHNEQUFzRDtRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sNEJBQTRCO1FBQzVCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=