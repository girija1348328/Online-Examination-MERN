//lets think about admin
const userModel = require("../model/userModel")

const userRegister = async function(req,res){

    try{
        let data = req.body

        let {firstName,lastName,email,password} = data
        //firstName
        if(!firstName) return res.status(400).send({msg:"firstName required"})

        //lastName
        if(!lastName) return res.status(400).send({msg:"firstName required"})

        //email
        if(!email) return res.status(400).send({msg:"firstName required"})
        let emailValid = await userModel.findOne({email:email});
        if(emailValid) return res.status(400).send({msg:"email already exist"})

        //password
        if(!password) return res.status(400).send({msg:"firstName required"})
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);


       let result = await userModel.create(data)
       res.status(200).send({status:true,message:"user created successfully",data:result})
    }
    catch(err){
        res.status(500).send({msg:err.msg})
    }

}

const userLogin = async function(req,res){

  try{  const data = req.body
    const{email,password} = data

    if(!email) return res.status(400).send({status:false,message:"enter email"})
    if(!password) return res.status(400).send({status:false,message:"enter password"})

    //compare

    const findUser = await userModel.findOne({email:email})
    if(findUser){
        const validPassword = await bcrypt.compare(password,findUser.password)
        if(!validPassword) return res.status(401).send({status:false,message:"wrong password"})
    }
    else{
         return res.status(401).send({status:false,message:"wrong email"})

    }

   let token =  jwt.sign({

        userId : findUser._id.toString(),
        project : "onlineExamination",
        type:"User",
    },GirijaSankarMohanta)

    res.setHeader("Authorization",token)
    return res.status(200).send({status:true,message:"successfully login",token:token,data:findUser})
}
catch(err){
    res.status(500).send({status:false,message:err.message})
}
}


module.exports = {userRegister,userLogin}