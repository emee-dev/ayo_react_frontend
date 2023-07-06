import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

const MedicalRecordSchema = Schema.Model({
	medication_name: StringType().isRequired(
		"Please provide the name of the prescribed medication."
	),
	rpt: NumberType().isRequired(
		"Please specify the recommended repetition rate for the medication."
	),
	dosage: NumberType().isRequired(
		"Please indicate the prescribed dosage for the medication."
	),
	quantity: NumberType().isRequired(
		"Please specify the quantity of medication prescribed."
	),
	duration: NumberType().isRequired(
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
