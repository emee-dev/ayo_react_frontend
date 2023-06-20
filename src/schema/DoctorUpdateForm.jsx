import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const DoctorUpdateForm = Schema.Model({
	firstname: StringType().isRequired("This field is required."),
	lastname: StringType().isRequired("This field is required."),
	specialization: StringType().isRequired("This field is required."),
	education: StringType().isRequired("This field is required."),
	license: StringType().isRequired("This field is required."),
	location: StringType().isRequired("This field is required."),
	phone: StringType().isRequired("This field is required."),
});

export default DoctorUpdateForm;
