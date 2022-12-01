const express =require("express");
const {userRouter} =require('./routes')

const app= express();

app.use('/api/v1/user',userRouter);

app.get('/',(req,res)=>{
    res.send("Hello");
});

app.listen(3000,()=>{
    console.log("App is Listening")
});