const mongoose=require("mongoose")


const dbConnect=async()=>{
    try{
       const res= await mongoose.connect(process.env.CONNECTION_STRING)
       
    }catch(err){
        console.error("Error connecting to MongoDB",err)
         process.exit(1)
    }
}

module.exports=dbConnect