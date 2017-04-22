// @flow
import React from 'react';
import FloalaEditor from 'react-froala-wysiwyg';
import { reduxForm, Field } from 'redux-form';
import ChipInput from 'material-ui-chip-input';
import InputField from '../../../../components/InputField';

const StoryForm = () => <form style={{ marginBottom: 50 }}>
	<Field
		name="tags"

		component={({ input: { value, onChange } }) => <ChipInput
			fullWidth
			hintText="Enter tags ... "
			underlineStyle={{ border: 'none' }}
			value={value || []}
			onRequestAdd={chip => onChange([...(value || []), chip])}
			onRequestDelete={(chip, index) => onChange(value.filter((val, i) => index !== i))}
		/>}
	/>

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
