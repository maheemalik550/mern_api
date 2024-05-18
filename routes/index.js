const express = require("express")
const { Signup_controller,get_controller,Login_controllers, Check_auth_controller,verify_otp_controller, Logout_Controller } = require("../Controllers/auth_controllers")
const Check_auth_middleware = require("../middleware/check_auth_middleware")
const { post_controller } = require("../Controllers/post_controller")
const test_middleware = require("../middleware/test_middleware")
const response_controller = require("../Controllers/response_controller")
const blood_donor_controller = require("../Controllers/donors_controller")


const router = express.Router()

router.get('/get',get_controller)
router.post('/Signup',Signup_controller)
router.post('/logout',Logout_Controller)
router.post('/login',Login_controllers)
router.post('/donors',blood_donor_controller)
router.get('/checkauth',Check_auth_middleware,Check_auth_controller)
router.post('/check-post',Check_auth_middleware ,post_controller)
router.post('/verify-otp',verify_otp_controller)
router.get('/test/:id',test_middleware,response_controller)
// Check_auth_controller

module.exports = router