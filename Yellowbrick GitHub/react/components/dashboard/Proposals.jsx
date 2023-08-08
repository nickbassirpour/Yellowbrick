// import node module libraries
import React from 'react';
import { Link } from 'react-router-dom';
// import { Col, Row, Card, ListGroup, Dropdown, Image } from 'react-bootstrap';
import {Card, ListGroup, } from 'react-bootstrap';

// import data files
// import { allcourses } from 'data/courses/AllCoursesData';

const Proposals = () => {
// const RecentCourses = ({ title }) => {
	// The forwardRef is important!!
	// Dropdown needs access to the DOM node in order to position the Menu
	// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	// 	<Link
	// 		to=""
	// 		ref={ref}
	// 		onClick={(e) => {
	// 			e.preventDefault();
	// 			onClick(e);
	// 		}}
	// 	>
	// 		{children}
	// 	</Link>
	// ));

	// const ActionMenu = () => {
	// 	return (
	// 		<div>
	// 			<Dropdown>
	// 				<Dropdown.Toggle as={CustomToggle}>
	// 					<i className="fe fe-more-vertical text-muted"></i>
	// 				</Dropdown.Toggle>
	// 				<Dropdown.Menu align="end">
	// 					<Dropdown.Header>SETTINGS</Dropdown.Header>
	// 					<Dropdown.Item eventKey="1">
	// 						<i className="fe fe-edit dropdown-item-icon"></i> Edit
	// 					</Dropdown.Item>
	// 					<Dropdown.Item eventKey="2">
	// 						<i className="fe fe-trash dropdown-item-icon"></i> Remove
	// 					</Dropdown.Item>
	// 				</Dropdown.Menu>
	// 			</Dropdown>
	// 		</div>
	// 	);
	// };

	return (
		<Card className="h-100 bg-white">
			<Card.Header className="d-flex align-items-center justify-content-between card-header-height bg-primary">
				<h4 className="mb-0">Proposals</h4>
				<Link to="/proposals" className="btn btn-outline-white btn-sm bg-white">
					View all
				</Link>
			</Card.Header>
			<Card.Body>
				<ListGroup variant="flush">
					{/* {allcourses.slice(0, 4).map((item, index) => (
						<ListGroup.Item
							className={`px-0 ${index === 0 ? 'pt-0' : ''}`}
							key={index}
						>
							<Row>
								<Col className="col-auto">
									<Link to="#">
										<Image
											src={item.image}
											alt=""
											className="img-fluid rounded img-4by3-lg"
										/>
									</Link>
								</Col>
								<Col className="ps-0">
									<Link to="#">
										<h5 className="text-primary-hover">{item.title}</h5>
									</Link>
									<div className="d-flex align-items-center">
										<Image
											src="Instructor Image"
											alt=""
											className="rounded-circle avatar-xs me-2"
										/>
										<span className="fs-6">Instructor Name</span>
									</div>
								</Col>
								<Col className="col-auto">
									<ActionMenu />
								</Col>
							</Row>
						</ListGroup.Item>
					))} */}
				</ListGroup>
			</Card.Body>
		</Card>
	);
};
export default Proposals;