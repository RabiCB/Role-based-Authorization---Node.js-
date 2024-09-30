const express = require("express")
const verifytoken = require("../middlewares/authMiddleware")
const authorizedRole = require("../middlewares/rolebasedMiddleware")
const router = express.Router()


router.get("/admin", verifytoken, authorizedRole("admin"), (req, res) => {
    res.json({ message: "Welcome to admin dashboard" })
})
router.get("/user", verifytoken, authorizedRole("user"), (req, res) => {
    res.json({ message: "Welcome to user dashboard" })
})

module.exports = router