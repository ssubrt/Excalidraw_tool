"use client"

import { WS_URL } from "@/config";
import { useEffect,useState } from "react";
import { CanvasPage } from "./Canvas";



export function RoomCanvas({roomId} : {roomId : string}){
    
    const [socket,setSocket] = useState<WebSocket | null > (null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YTQ5NWRjMi0zNzVmLTRkNGQtYTk0Mi1lMDgzMWI3M2UyNTMiLCJpYXQiOjE3NDA0MTU0MTF9.wPpli-9qgO6lxWy-5f766ruEyvBy4kqSsXKRHwT5iU4`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                roomId: roomId
            }))
        }
    },[])


    

    if(!socket){
        return <div>Connecting...</div>
    }


    return (
        <div>
            <CanvasPage roomId={roomId}  socket={socket} />
           
        </div>
    )
}