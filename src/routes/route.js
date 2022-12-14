const express = require('express');
const router = express.Router();
const userregisterController = require("../controller/user")
const adminregisterController = require("../controller/admin")
const quesController = require("../controller/question")
const examController = require("../controller/exam")
const adminAuth = require("../middleware/adminAuth")
const userAuth = require("../middleware/userAuth")

//admin
router.post("/adminregister",adminregisterController.adminRegister)
router.post("/adminlogin",adminregisterController.adminLogin)
router.post('/createQues/:adminId', adminAuth.adminAuth, quesController.createQues);
router.put('/updateQues/:adminId/:quesId', adminAuth.adminAuth, quesController.updateQues);

//user
router.post("/userregister",userregisterController.userRegister)
router.post("/userlogin",userregisterController.userLogin)
router.get('/viewExam', userAuth.userAuth, examController.viewExam);
router.post('/ansQues/:quesId', userAuth.userAuth, examController.ansQues);





module.exports = router;