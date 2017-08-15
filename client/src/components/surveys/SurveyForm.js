// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

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
			<form
				onSubmit={this.props.handleSubmit(values => {
					console.log(values);
				})}
			>
				<div>
					{this.renderFields()}
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'SurveyForm'
})(SurveyForm);
