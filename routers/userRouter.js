const express = require("express");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userRouter = express.Router();

userRouter.post("/api/register", async (req,res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email'})
    }
});
userRouter.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
    console.log(user)
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
    // console.log(isPasswordValid)
    // console.log(req.body.password)
    // console.log(user.password)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				firstName: user.firstName,
                lastName: user.lastName,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

module.exports = userRouter;