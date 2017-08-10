const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// Charges the user
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: 'Charge 5$ dollars for 5 credits',
			source: req.body.id
		});
		// Updates the credits
		req.user.credits += 5;
		const user = await req.user.save();
		// Send user to client
		res.send(user);
	});
};
