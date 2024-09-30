const express=require("express")
const dotenv=require("dotenv")
const dbConnect=require("./database/connectdb")

const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const PORT=7001 || process.env.PORT
const app=express()
dotenv.config()


dbConnect();

app.use(express.json())


app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)


app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`)
})