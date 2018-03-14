"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
// prettier-ignore
exports.default = () => {
    const logger = logger_1.LoggerFactory.getLabeledInstance('processor', 'helper');
    // ASCII Banner
    /*
    ___  ___  _______   ________  ________          ________   ________  ________  _______
    |\  \|\  \|\  ___ \ |\   __  \|\   __  \        |\   ___  \|\   __  \|\   ___ \|\  ___ \
    \ \  \\\  \ \   __/|\ \  \|\  \ \  \|\  \       \ \  \\ \  \ \  \|\  \ \  \_|\ \ \   __/|
    \ \   __  \ \  \_|/_\ \   _  _\ \  \\\  \       \ \  \\ \  \ \  \\\  \ \  \ \\ \ \  \_|/__
      \ \  \ \  \ \  \_|\ \ \  \\  \\ \  \\\  \       \ \  \\ \  \ \  \\\  \ \  \_\\ \ \  \_|\ \
      \ \__\ \__\ \_______\ \__\\ _\\ \_______\       \ \__\\ \__\ \_______\ \_______\ \_______\
        \|__|\|__|\|_______|\|__|\|__|\|_______|        \|__| \|__|\|_______|\|_______|\|_______|
    */
    logger.info(`___  ___  _______   ________  ________          ________   ________  ________  _______  `);
    logger.info(`|\\  \\|\\  \\|\\  ___ \\ |\\   __  \\|\\   __  \\        |\\   ___  \\|\\   __  \\|\\   ___ \\|\\  ___ \\ `);
    logger.info(`\\ \\  \\\\\\  \\ \\   __/|\\ \\  \\|\\  \\ \\  \\|\\  \\       \\ \\  \\\\ \\  \\ \\  \\|\\  \\ \\  \\_|\\ \\ \\   __/|    `);
    logger.info(` \\ \\   __  \\ \\  \\_|/_\\ \\   _  _\\ \\  \\\\\\  \\       \\ \\  \\\\ \\  \\ \\  \\\\\\  \\ \\  \\ \\\\ \\ \\  \\_|/__   `);
    logger.info(`  \\ \\  \\ \\  \\ \\  \\_|\\ \\ \\  \\\\  \\\\ \\  \\\\\\  \\       \\ \\  \\\\ \\  \\ \\  \\\\\\  \\ \\  \\_\\\\ \\ \\  \\_|\\ \\ `);
    logger.info(`   \\ \\__\\ \\__\\ \\_______\\ \\__\\\\ _\\\\ \\_______\\       \\ \\__\\\\ \\__\\ \\_______\\ \\_______\\ \\_______\\ `);
    logger.info(`    \\|__|\\|__|\\|_______|\\|__|\\|__|\\|_______|        \\|__| \\|__|\\|_______|\\|_______|\\|_______| `);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWdEO0FBRWhELGtCQUFrQjtBQUNsQixrQkFBZSxHQUFHLEVBQUU7SUFDbEIsTUFBTSxNQUFNLEdBQUcsc0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkUsZUFBZTtJQUNmOzs7Ozs7OztNQVFFO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQywwRkFBMEYsQ0FBQyxDQUFDO0lBQ3hHLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkdBQTZHLENBQUMsQ0FBQztJQUMzSCxNQUFNLENBQUMsSUFBSSxDQUFDLDhIQUE4SCxDQUFDLENBQUM7SUFDNUksTUFBTSxDQUFDLElBQUksQ0FBQywrSEFBK0gsQ0FBQyxDQUFDO0lBQzdJLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0lBQXNJLENBQUMsQ0FBQztJQUNwSixNQUFNLENBQUMsSUFBSSxDQUFDLDBIQUEwSCxDQUFDLENBQUM7SUFDeEksTUFBTSxDQUFDLElBQUksQ0FBQywyR0FBMkcsQ0FBQyxDQUFDO0FBQzNILENBQUMsQ0FBQSJ9