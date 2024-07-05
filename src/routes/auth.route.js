import express from 'express'
import { signup, login, logout, jwtLogin, verifyOTP, adminLogin, assignAdminRole} from '../controllers/auth.controller.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/verify-otp", verifyOTP)
router.post("/jwtlogin", jwtLogin)
router.post("/logout", logout)
router.post("/admin-login", adminLogin)
router.post("/assign-admin",assignAdminRole)

export default router;