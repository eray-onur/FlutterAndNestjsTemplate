"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeInMongodConnection = exports.rootMongooseTestModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_2 = require("mongoose");
let mongod;
const rootMongooseTestModule = (options = {}) => mongoose_1.MongooseModule.forRootAsync({
    useFactory: async () => {
        mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongod.getUri();
        return Object.assign({ uri: mongoUri }, options);
    },
});
exports.rootMongooseTestModule = rootMongooseTestModule;
const closeInMongodConnection = async () => {
    await (0, mongoose_2.disconnect)();
    if (mongod)
        await mongod.stop();
};
exports.closeInMongodConnection = closeInMongodConnection;
//# sourceMappingURL=mongo-inmemory.db.js.map