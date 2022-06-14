// React
import React, { useContext, useState } from 'react';
// Component
import StudentSidebar from './StudentSidebar';
// React bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// Context
import { ContextVariable } from '../../context/context-config';

const StudentFeed = () => {
	const { activitiesData } = useContext(ContextVariable);

	return (
		<div className="mt-5">
			<Container>
				<Row>
					<Col md="3">
						<StudentSidebar />
					</Col>
					<Col md="9">
						<div className="border rounded p-3 ">
							<p>Student Feed</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default StudentFeed;
