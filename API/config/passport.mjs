import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcryptjs';

// Load User model
import { findOne, findById } from '../models/User';

export default function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			// Match user
			findOne({
				email: email,
			}).then((user) => {
				if (!user) {
					return done(null, false, { message: 'That email is not registered' });
				}

				// Match password
				compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Password incorrect' });
					}
				});
			});
		})
	);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		findById(id, function (err, user) {
			done(err, user);
		});
	});
}
