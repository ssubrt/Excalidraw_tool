import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient} from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080});

interface User {
    userId : string;
    rooms : string[];
    ws : WebSocket;
}

// interface Message {
//     roomId : string;
//     message: string;
// }

const users : User[] = [];
// const roomMessages : {[roomId: string] : Message[]} = {};   

function checkUser(token: string) : string | null {
    try {
        const decoded = jwt.verify(token,JWT_SECRET);

        if(typeof decoded === "string"){
            return null;
        }

        if(!decoded || !decoded.userId){
            return null;
        }

        return decoded.userId;

        
        
    } catch (error : any) {
        console.log("Error: " + error.message);
        return null;
    }

}

wss.on("connection",function connection(ws,request) {

    const url = request.url;

    if(!url){
        return;
    }

    const queryParama = new URLSearchParams(url.split("?")[1]);
    const token = queryParama.get("token") || "";
    const userId = checkUser(token);

    if(userId === null){
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on("message",async function message(data){
        const parseData  = JSON.parse(data as unknown as string);

        if(parseData.type === "join_room"){
            const user = users.find(x => x.ws === ws);
            if(user){
                user?.rooms.push(parseData.roomId);

                // //Shows last 5 Messages to new members
                // if(roomMessages[parseData.roomId]){
                //     const lastMessages = roomMessages[parseData.roomId]?.splice(-5);
                //     user?.ws.send(JSON.stringify({
                //         type: "previous_messages",
                //         messages: lastMessages,
                //         roomId: parseData.roomId
                //     }));
                // }
            }
            

        }

        if(parseData.type === "leave_room"){
            const user = users.find(x => x.ws === ws);;
            if(!user){
                return;
            }

            user.rooms = user?.rooms.filter(x => x === parseData.room);

            //Inform Rest Others members of the room that x person leves the room
            users.forEach(user => {
                if(user.rooms.includes(parseData.roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "leave_room",
                        userId: user.userId,
                        roomId: parseData.roomId
                    }))
                }
            })
        }

        if(parseData.type === "chat"){
            const roomId = parseData.roomId;
            const message = parseData.message;

            // // Store the message
            // if (!roomMessages[roomId]) {
            //     roomMessages[roomId] = [];
            // }
            // roomMessages[roomId].push({ roomId, message });
            console.log("Storing message in database:", { roomId, message, userId });

            try {
                await prismaClient.chat.create({
                    data: {
                        roomId,
                        message,
                        userId
                    }
                });
                console.log("Message stored successfully");

                users.forEach(user => {
                    if (user.rooms.includes(roomId)) {
                        user.ws.send(JSON.stringify({
                            type: "chat",
                            message: message,
                            roomId
                        }));
                    }
                });
            } catch (error) {
                console.error("Error storing message in database:", error);
            }
        }
    })
})