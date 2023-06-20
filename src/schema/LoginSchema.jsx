import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const LoginSchema = Schema.Model({
	email: StringType()
		.isEmail("Please enter a valid email address.")
		.isRequired("This field is required."),
	password: StringType()
		.minLength(6)
		.isRequired("Must have at least 6 characters"),
});

export default LoginSchema