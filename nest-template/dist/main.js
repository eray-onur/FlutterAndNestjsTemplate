"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nest.JS Template')
        .setDescription('Template API Description')
        .setVersion('0.1')
        .build();
    const authDocument = swagger_1.SwaggerModule.createDocument(app, config, {
        ignoreGlobalPrefix: true,
        include: [auth_module_1.AuthModule, user_module_1.UserModule]
    });
    swagger_1.SwaggerModule.setup('api', app, authDocument);
    await app.listen(3000, '127.0.0.1');
}
bootstrap();
//# sourceMappingURL=main.js.map