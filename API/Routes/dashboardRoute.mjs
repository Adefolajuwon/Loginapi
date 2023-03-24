import User from '../model/User.mjs';
import express from 'express';

import { Router } from 'express';
const router = express.Router();
router.route('/').get(async (req, res) => {
	const token = req.headers['x-access-token'];

	try {
		const decoded = jwt.verify(token, 'secret123');
		const email = decoded.email;
		const user = await User.findOne({ email: email });

		return res.json({ status: 'ok', quote: user.quote });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error: 'invalid token' });
	}
});
router.route('/').post(async (req, res) => {
	const token = req.headers['x-access-token'];

	try {
		const decoded = jwt.verify(token, 'secret123');
		const email = decoded.email;
		await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

		return res.json({ status: 'ok' });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error: 'invalid token' });
	}
});
export default router;
