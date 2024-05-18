import { Module } from "@nestjs/common";
import { ChatGetaway } from "./websockets/chat.getaway";

@Module({
    imports: [ChatGetaway],
})
export class AppModule {}
