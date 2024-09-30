const authorizedRole=(...allowedRoles)=>{
    return (req,res,next)=>{

       
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden Access"})
        }
        next()
    }
}

module.exports=authorizedRole