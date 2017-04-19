// @flow
import React from 'react';
import FloalaEditor from 'react-froala-wysiwyg';
import { reduxForm, Field } from 'redux-form';
import InputField from '../../../../components/InputField';

const StoryForm = () => <form style={{ marginBottom: 50 }}>
	<InputField
		name="name"
		hintText="Title"
		fullWidth
		style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 30 }}
		underlineStyle={{ border: 'none' }}
	/>

	<Field
		name="text"

		component={({ input }) => <FloalaEditor
			tag="textarea"
			model={input.value}
			onModelChange={input.onChange}

			config={{
				placeholderText: 'Tell your story ...',
				charCounterCount: false,
				theme: 'dark',
				heightMin: 250,
			}}
		/>}
	/>
</form>;

export default reduxForm({
	form: 'story-form',
	touchOnBlur: false,
	touchOnChange: true,
})(StoryForm);
