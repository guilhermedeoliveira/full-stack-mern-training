const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thank you for voting!');
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		//es6 restructuring. Out of req.body, I want to get all of these properties
		//off the body thats added to req. The actual adding logic has to be added in.
		const { title, subject, body, recipients } = req.body;

		//use Survey.js model to represent a new instance of the survey being created
		//stored in memory. Has not been persisted at this point.
		const survey = new Survey({
			// es6 syntax, instead of doing title: title
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email })),
			//takes the list of email addresses, split into array, and return an obj
			//with key of email and value of email address. Hs been shortened es6 style
			_user: req.user.id, //this is mongo mongoose generated id
			dateSent: Date.now()
		});

		//place to send the email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
