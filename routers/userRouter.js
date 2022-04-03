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
			phoneNumber: req.body.phoneNumber,
			description: req.body.description,
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

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				firstName: user.firstName,
                lastName: user.lastName,
				email: user.email,
				phoneNumber: user.phoneNumber,
				description: user.description,
			},
			'22secretEmory22'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

userRouter.post("/api/updateUser", async (req, res) => {
  try {
    await User.findOneAndUpdate(
		{ email: req.body.email },
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,

		},
		{ new: true }
	);
	res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email'})
  }
});

userRouter.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, '22secretEmory22')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

userRouter.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, '22secretEmory22')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})


module.exports = userRouter;