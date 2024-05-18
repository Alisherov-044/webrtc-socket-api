import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        app.enableCors({
            origin: ["http://localhost:5173", "http://192.168.1.11:5173"],
            methods: ["GET", "POST"],
        });
        await app.listen(3000);
    } catch (error) {
        console.error(error);
    }
}
bootstrap();
