import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient} from "@repo/db/client";


const app = express();
app.use(express.json());


app.post("/signup", async(req,res)=>{
    // DB Call

    const body = req.body;
    const parseData = CreateUserSchema.safeParse(body);

    if(!parseData || !parseData.success){
        console.log(parseData.error);
        res.status(403).json({
            message: "Invalid inputs"
        });
        return;
    }

    const userExists = await prismaClient.user.findFirst({
        where:{
            email: parseData.data.username
        }
    });

    if(userExists){
        res.status(403).json({
            message:"User already exists"
        });
        return;
    }


    const user = await prismaClient.user.create({
        data:{
            name: parseData.data?.name,
            email: parseData.data.username,
            password: parseData.data.password
        }
    })
    res.json({
        userId: user.id
    })
});

app.post("/signin", async(req,res) =>{

    const body = req.body;


    const parseData  = SigninSchema.safeParse(body);
    if(!parseData || !parseData.success){
        res.status(403).json({
            message:"Incorrect inputs"
        });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where:{
            email: parseData.data.username,
            password: parseData.data.password
        }
    });

    if(!user){
        res.status(403).json({
            message:"User not found . Signup First"
        });
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    },JWT_SECRET);

    res.json({
        token
    })
});

app.post("/room",middleware,async (req,res)=>{

    const parseData  = CreateRoomSchema.safeParse(req.body);
    if(!parseData || !parseData.success){
        res.status(403).json({
            message:"Incorrect inputs"
        });
        return;
    }

    //@ts-ignore
    const userId  = req.userId;
    try{
        const room = await prismaClient.room.create({
            data:{
                slug: parseData.data.name,
                adminId: userId
            }
        })
        res.json({
            roomId:room.id
        })
    }
    catch(e){
        res.status(403).json({
            message:"Room already exists with this name"
        });
    }
});


app.get("/chats/:roomId", async (req,res)=> {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where:{
            roomId: roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50
    });

    res.json({
        messages
    });
    return;
})
app.get("/room/:slug", async (req,res)=> {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where:{
            slug
        },
    });

    res.json({
        room
    });
    return;
})


app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});
