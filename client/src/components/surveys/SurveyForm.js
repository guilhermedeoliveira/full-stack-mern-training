// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

const FIELD = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
	renderFields() {
		return _.map(FIELD, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(values => {
						console.log(values);
					})}
				>
					{this.renderFields()}
				</form>
				<Link to="/surveys" className="red btn-flat white-text">
					Cancel
					<i className="material-icons right">clear</i>
				</Link>
				<button type="submit" className="teal btn-flat right white-text">
					Next
					<i className="material-icons right">done</i>
				</button>
			</div>
		);
	}
}

export default reduxForm({
	form: 'SurveyForm'
})(SurveyForm);
