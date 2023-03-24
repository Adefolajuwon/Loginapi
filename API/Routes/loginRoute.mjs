import User from '../model/User.mjs';
import express from 'express';

import { Router } from 'express';
const router = express.Router();

router.route('/').post(async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	});

	if (!user) {
		return { status: 'error', error: 'Invalid login' };
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		);

		return res.json({ status: 'ok', user: token });
	} else {
		return res.json({ status: 'error', user: false });
	}
});
export default router;
