import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { IntegrationService } from "src/integration/integration.service";



async function bootstrap() {
    const logger = new Logger('ImportExternalProductsSeed');
    let exitCode = 0;
    try {
        const app = await NestFactory.createApplicationContext(AppModule, {
            logger: ['error', 'warn', 'debug', 'verbose'],
        });

        const integrationService = app.get(IntegrationService);
        await integrationService.importProductsFromExternalAPI();
        await app.close();
    } catch (error) {
        exitCode = 1;
        logger.error('Error during import-external-products seed:', error);
    }
    process.exit(exitCode);
}
bootstrap();