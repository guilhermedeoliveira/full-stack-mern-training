// SurveyFormReview shows users form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>
					{label}
				</label>
				<div>
					{formValues[name]}
				</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please, review your entries</h5>
			{reviewFields}
			<button
				className="yellow darken-3 btn-flat white-text"
				onClick={onCancel}
			>
				Back
				<i className="material-icons left">keyboard_arrow_left</i>
			</button>
			<button
				onClick={() => submitSurvey(formValues)}
				type="submit"
				className="green btn-flat right white-text"
			>
				Submit Survey
				<i className="material-icons right">done_all</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
