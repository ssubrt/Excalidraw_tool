"use client"
import { useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";


export default function Home() {
  const [roomId,setRoomId] = useState("");
  const router = useRouter();
  return (
    <div className="flex  justify-center items-center h-screen w-screen bg-gray-400">
      <div className="flex flex-col items-center fade-in">
        <input
          type="text"
          className="border-2 border-gray-300 p-2 rounded-lg hover:border-blue-500"
          placeholder="Enter room ID"
          value ={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (roomId) {
              router.push(`/room/${roomId}`);
            }
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
