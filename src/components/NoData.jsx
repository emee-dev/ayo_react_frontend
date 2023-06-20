const customStyle = {
	display: "flex",
	width: "max-content",
	margin: "auto",
};

const NoDataPlaceHolder = ({ displayText }) => {
	return (
		<div style={customStyle}>
			<div>{displayText}</div>
		</div>
	);
};

export default NoDataPlaceHolder;
