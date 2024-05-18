import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

type TMsgCall = {
    type: "offer" | "answer" | "candidate";
    from: string;
    to: string;
    sdp: RTCSessionDescription;
};

type TMsgCandidate = Omit<TMsgCall, "sdp"> & {
    candidate: RTCIceCandidate;
};

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:5173", "http://192.168.1.11:5173"],
    },
})
export class ChatGetaway {
    @WebSocketServer() server: Socket;

    @SubscribeMessage("join-room")
    async joinRoom(
        @MessageBody() room: string,
        @ConnectedSocket() socket: Socket,
    ) {
        socket.join(room);
    }

    @SubscribeMessage("call")
    async call(
        @MessageBody() msg: TMsgCall,
        @ConnectedSocket() socket: Socket,
    ) {
        // this.server.to(msg.to).emit("new-call", msg);
        // this.server.emit("new-call", msg);
        socket.broadcast.emit("new-call", msg);
    }

    @SubscribeMessage("answer")
    async answer(
        @MessageBody() msg: TMsgCall,
        @ConnectedSocket() socket: Socket,
    ) {
        // this.server.to(msg.to).emit("new-answer", msg);
        // this.server.emit("new-answer", msg);
        socket.broadcast.emit("new-answer", msg);
    }

    @SubscribeMessage("candidate")
    async candidate(
        @MessageBody() msg: TMsgCandidate,
        @ConnectedSocket() socket: Socket,
    ) {
        // this.server.to(msg.to).emit("new-candidate", msg);
        // this.server.emit("new-candidate", msg);
        socket.broadcast.emit("new-candidate", msg);
    }
}
