// // "use client"

// // import { useEffect, useState } from "react"
// // import { useSocket } from "../hooks/useSocket";

// // export function ChatRoomClient({
// //     messages,
// //     id
// // }:{
// //     messages:{message : string}[],
// //     id: string
// // }){
// //     const [chats,setChats] = useState(messages);
// //     const [currentMessage,setCurrentMessage] = useState("");
// //     const {socket ,loading} = useSocket();

// //     useEffect(() => {
// //         if(socket && !loading){

// //             socket.send(JSON.stringify({
// //                 type:"join_room",
// //                 roomId: id
// //             }))


// //             socket.onmessage = (event) => {
// //                 const parseData = JSON.parse(event.data);
// //                 if(parseData.type === "chat"){
// //                     setChats(c => [...c,{message:parseData.message}]);
// //                 }
// //             }
// //         }

// //     },[socket,loading,id]);
    
// //     return (
// //         <div>
// //             {messages.map((m, index) => (
// //                 <div key={index}>{m.message}</div>
// //             ))}

// //             <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}></input>
// //             <button onClick={() => {
// //                 socket?.send(JSON.stringify({
// //                     type:"chat",
// //                     roomId: id,
// //                     message: currentMessage
// //                 }))
// //                 setCurrentMessage("");
// //             }}>
// //                 Send Messages
// //             </button>

// //         </div>

// //     )
// // }

// "use client"

// import { useEffect, useState } from "react"
// import { useSocket } from "../hooks/useSocket";
// import { CirclesWithBar } from 'react-loader-spinner';

// export function ChatRoomClient({
//     messages,
//     id
// }:{
//     messages:{message : string}[],
//     id: string
// }){
//     const [chats,setChats] = useState(messages);
//     const [currentMessage,setCurrentMessage] = useState("");
//     const {socket ,loading} = useSocket();
    

//     useEffect(() => {
//         if(socket && !loading){

//             socket.send(JSON.stringify({
//                 type:"join_room",
//                 roomId: id
//             }))


//             socket.onmessage = (event) => {
//                 const parseData = JSON.parse(event.data);
//                 if(parseData.type === "chat"){
//                     setChats(c => [...c,{message:parseData.message}]);
//                 }
//             }
//         }

//     },[socket,loading,id]);
    
//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
//             <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
//                 <div className="mb-4">
//                 <h2 className="text-bold text-xl text-center pb-4">All Messages</h2>
//                     {chats.map((m, index) => (
//                         <div key={index} className="p-2 bg-gray-200 rounded mb-2 cursor-pointer">{m.message}</div>
//                     ))}
//                 </div>
//                 <div className="flex">
                    
//                     <input 
//                         type="text" 
//                         value={currentMessage} 
//                         onChange={(e) => setCurrentMessage(e.target.value)} 
//                         className="flex-grow border-2 border-gray-300 p-2 rounded-lg mr-2"
//                         placeholder="Type your message..."
//                     />
//                     <button 
//                         onClick={() => {
//                             socket?.send(JSON.stringify({
//                                 type:"chat",
//                                 roomId: id,
//                                 message: currentMessage
//                             }))
//                             setCurrentMessage("");
//                         }}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }
"use client"

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket";


export function ChatRoomClient({
    messages,
    id
}:{
    messages:{message : string}[],
    id: string
}){
    const [chats,setChats] = useState(messages);
    const [currentMessage,setCurrentMessage] = useState("");
    const {socket ,loading} = useSocket();
    

    useEffect(() => {
        if(socket && !loading){
            socket.send(JSON.stringify({
                type:"join_room",
                roomId: id
            }));

            const handleMessage = (event: MessageEvent) => {
                const parseData = JSON.parse(event.data);
                if(parseData.type === "chat"){
                    setChats(c => [...c,{message:parseData.message}]);
                }
            };

            socket.addEventListener("message", handleMessage);

            return () => {
                socket.removeEventListener("message", handleMessage);
            };
        }
    },[socket,loading,id]);
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
                <div className="mb-4">
                <h2 className="text-bold text-xl text-center pb-4">All Messages</h2>
                    {chats.map((m, index) => (
                        <div key={index} className="p-2 bg-gray-200 rounded mb-2 cursor-pointer">{m.message}</div>
                    ))}
                </div>
                <div className="flex">
                    
                    <input 
                        type="text" 
                        value={currentMessage} 
                        onChange={(e) => setCurrentMessage(e.target.value)} 
                        className="flex-grow border-2 border-gray-300 p-2 rounded-lg mr-2"
                        placeholder="Type your message..."
                    />
                    <button 
                        onClick={() => {
                            socket?.send(JSON.stringify({
                                type:"chat",
                                roomId: id,
                                message: currentMessage
                            }))
                            setCurrentMessage("");
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}