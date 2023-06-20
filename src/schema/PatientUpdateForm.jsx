import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const PatientUpdateForm = Schema.Model({
	firstname: StringType().isRequired("This field is required."),
	lastname: StringType().isRequired("This field is required."),
	allegies: StringType().isRequired("This field is required."),
	phone: StringType().isRequired("This field is required."),
});

export default PatientUpdateForm;
