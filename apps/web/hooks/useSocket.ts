import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";



export function useSocket(){
    const [loading,setLoading] = useState(true);
    const [socket,setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzOWJiMmNjNS1iNjZlLTRhNjktYTBhMS04NjgwZTNlNWMxZTMiLCJpYXQiOjE3Mzk1OTkxMzd9.WlQUQlvTZCHHnE_gGgK16D8caxD6XenjOjhC5rriWUA`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    },[]);

    return {
        socket,
        loading
    }

}