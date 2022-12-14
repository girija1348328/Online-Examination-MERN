//lets think about admin
const adminModel = require("../model/adminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const adminRegister = async function (req, res) {

    try {
        let data = req.body

        let { firstName, lastName, email, password } = data
        //firstName
        if (!firstName) return res.status(400).send({ msg: "firstName required" })

        //lastName
        if (!lastName) return res.status(400).send({ msg: "firstName required" })

        //email
        if (!email) return res.status(400).send({ status:false,msg: "firstName required" })
        let emailValid = await adminModel.findOne({ email: email });
        if (emailValid) return res.status(400).send({  status:false,msg: "email already exist" })

        //password
        if (!password) return res.status(400).send({ msg: "firstName required" })
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);


        let result = await adminModel.create(data)
        console.log(result)
        res.status(200).send({ status: true, message: "user created successfully", data: result })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.msg })
    }

}

const adminLogin = async function (req, res) {

    try {
        const data = req.body
        const { email, password } = data

        if (!email) return res.status(400).send({ status: false, message: "enter email" })
        if (!password) return res.status(400).send({ status: false, message: "enter password" })

        //compare
        const findUser = await adminModel.findOne({ email: email })
        if (findUser) {
            const validPassword = await bcrypt.compare(password, findUser.password)
            if (!validPassword) return res.status(401).send({ status: false, message: "wrong password" })
        }
        else {
            return res.status(401).send({ status: false, message: "wrong email" })

        }

        let token = jwt.sign({
            userId: findUser._id.toString(),
            project: "onlineExamination",
            type: "User",
        }, "GirijaSankarMohanta")

        res.setHeader("Authorization", token)
        return res.status(200).send({ status: true, message: "successfully login", token: token })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { adminRegister, adminLogin }