import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const MedicalRecordSchema = Schema.Model({
	medication_name: StringType().isRequired(
		"Please provide the name of the prescribed medication."
	),
	rpt: StringType()
		.containsNumber(
			"Please enter a valid number for the recommended repetition rate."
		)
		.isRequired(
			"Please specify the recommended repetition rate for the medication."
		),
	dosage: StringType().isRequired(
		"Please indicate the prescribed dosage for the medication."
	),
	quantity: StringType()
		.containsNumber("Please enter a valid number for the quantity.")
		.isRequired("Please specify the quantity of medication prescribed."),
	duration: StringType()
		.containsNumber("Please enter a valid number for the duration.")
		.isRequired(
			"Please provide the duration for which the medication should be taken."
		),
	treatment: StringType().isRequired(
		"Please enter details about the recommended treatment plan."
	),

	diagnosis: StringType().isRequired(
		"Please provide the diagnosis or medical condition for which this medication is prescribed."
	),
});

export default MedicalRecordSchema;
