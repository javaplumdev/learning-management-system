import { useContext } from 'react';
import StudentNavbarComponent from './StudentNavbarComponent';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';

const StudentAnnouncementPage = () => {
	const { postAnnouncement } = useContext(ContextVariable);
	const { id } = useParams();

	const finalPostAnnouncement = postAnnouncement.filter(
		(item) => item.subjectID === id
	);

	console.log(finalPostAnnouncement);

	return (
		<>
			<StudentNavbarComponent />
			<Container>
				{finalPostAnnouncement.length === 0 ? (
					<div
						className="justify-content-center d-flex align-items-center"
						style={{ height: '320px' }}
					>
						<h4>No posts yet</h4>
					</div>
				) : (
					finalPostAnnouncement.map((item) => {
						return (
							<div key={item.id} className="border p-3 rounded my-3">
								<small>{item.name}</small>
								<p>{item.content}</p>
							</div>
						);
					})
				)}
			</Container>
		</>
	);
};

export default StudentAnnouncementPage;
