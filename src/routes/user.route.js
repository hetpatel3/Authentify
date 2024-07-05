import express from 'express'
import { getUser } from '../controllers/auth.controller.js'

const router = express.Router()

router.get("/user-data", getUser)

export default router;