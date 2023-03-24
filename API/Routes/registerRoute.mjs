import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../model/User.mjs';
import express from 'express';

const router = express.Router();

router.route('/').post(async (req, res) => {
	console.log(req.body);
	try {
		let errors = [];
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			errors.push({ msg: 'Please Enter All Field' });
		}
		if (password.length < 6) {
			errors.push({ msg: 'Passowrd my be at least 6 characters' });
		} else {
			User.findOne({ email: email }).then((user) => {
				if (user) {
					errors.push({ msg: 'user already exists please log in' });
				} else {
					const newUser = new User({
						name,
						email,
						password,
					});

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							newUser.save();
							then((user) => {
								req.flash(
									'success_msg',
									'You are now registered and can log in'
								);
								res.redirect('/users/login');
							}).catch((err) => console.log(err));
						});
					});
				}
			});
		}
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' });
	}
});
export default router;
