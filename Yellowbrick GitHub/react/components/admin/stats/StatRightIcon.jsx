import React from "react";
import { Card } from 'react-bootstrap';
import PropTypes from "prop-types";

const StatRightIcon = (props) => {
	const {
		title,
		value,
		// summary,
		// summaryValue,
		// summaryIcon,
		// isShowSummaryIcon,
		iconName,
		iconColorVariant,
		classValue
	} = props;

	return (
		<Card border="light" className={`${classValue} bg-white`}>
			<Card.Body>
				<div className="d-flex align-items-center justify-content-between mb-3 lh-1">
					<div>
						<span className="fs-6 text-uppercase fw-semi-bold">{title}</span>
					</div>
					<div>
						<span
							className={`fe fe-${iconName} fs-3 text-${iconColorVariant}`}
						></span>
					</div>
				</div>
				<h2 className="fw-bold mb-1">{value}</h2>
				{/* <span
					className={`text-${
						summaryIcon === 'up' ? 'success' : 'danger'
					} fw-semi-bold`}
				>
					{isShowSummaryIcon ? (
						<i className={`fe fe-trending-${summaryIcon} me-1`}></i>
					) : (
						''
					)}
					{summaryValue}
				</span> */}
				{/* <span className="ms-1 fw-medium">{summary}</span> */}
			</Card.Body>
		</Card>
	);
};

StatRightIcon.propTypes = {
      title: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		summary: PropTypes.string.isRequired,
		summaryValue: PropTypes.string.isRequired,
		summaryIcon: PropTypes.string.isRequired,
		isShowSummaryIcon: PropTypes.bool.isRequired,
		iconName: PropTypes.string.isRequired,
		iconColorVariant: PropTypes.string.isRequired,
		classValue: PropTypes.string.isRequired
}

export default StatRightIcon;