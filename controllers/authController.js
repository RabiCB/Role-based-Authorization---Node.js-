const jwt = require("jsonwebtoken")
const bycript = require("bcrypt")
const User = require("../models/userModel")

const register = async (req, res) => {
    try {


        const { username, password, role } = req.body
        const hashedpassword = await bycript.hash(password, 10)


        const newuser = new User({
            username,
            password: hashedpassword,
            role
        })

        await newuser.save()


        res.status(201).json({ message: "User registered successfully", user: newuser })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bycript.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "please check your password" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ token: token })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    register,
    login
}