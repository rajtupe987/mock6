const express=require("express");
const {connection}=require("./config/db")
const cors=require("cors");
const {userRouter}=require("./routes/userroute")
const {quezeRouter}=require("./routes/dashboard");
const {auth}=require("./middleware/auth")


const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcom to Quezoo")
})


app.use("/",userRouter);
app.use(auth)
app.use("/dashboard",quezeRouter)
app.listen(process.env.Port,async()=>{
    try {
         await connection;
         console.log("db connected")
    } catch (error) {
        console.log("connecting database error")
    }
    console.log(`port is running at ${process.env.Port}`)
})