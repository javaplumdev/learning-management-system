import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';
import { useContext } from 'react';
import { useEffect } from 'react';

const StudentRecord = () => {
	const { id } = useParams();

	const { scoreData } = useContext(ContextVariable);

	const final = scoreData.filter((item) => item.subjectID === id);

	console.log(final);

	return (
		<>
			<NavbarComponent />
			<Container>
				{final.map((item) => {
					return (
						<div
							key={item.scoreID}
							className="d-flex justify-content-around border rounded p-2 my-3"
						>
							<p>{item.studentName}</p>
							<p>{item.score}</p>
						</div>
					);
				})}
			</Container>
		</>
	);
};

export default StudentRecord;
