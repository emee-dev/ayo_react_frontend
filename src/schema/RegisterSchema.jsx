import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const RegisterSchema = Schema.Model({
	email: StringType()
		.isEmail("Please enter a valid email address.")
		.isRequired("This field is required."),
	password: StringType()
		.minLength(6)
		.maxLength(20)
		.isRequired("Must have at least 6 characters"),
	firstname: StringType()
		.isRequired("You should have a firstname"),
	lastname: StringType()
		.isRequired("You should have a lastname"),
	phone: StringType()
		.minLength(10)
		.isRequired("Enter Your Contact Number"),
});

export default RegisterSchema;
