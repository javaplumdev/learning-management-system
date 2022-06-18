import { useContext } from 'react';
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { ContextVariable } from '../../context/context-config';

const AnnouncementPage = () => {
	const { id } = useParams();
	const { postAnnouncement, subjectData } = useContext(ContextVariable);

	const subjectName = subjectData.filter((item) => item.subjectID === id);

	console.log(subjectName);

	const subjectPostAnnouncement = postAnnouncement.filter(
		(item) => id === item.subjectID
	);

	return (
		<>
			<NavbarComponent />
			<Container>
				<div className="w-100 border mt-3 p-3 rounded">
					{subjectName.map((item) => {
						return (
							<div key={item.subjectID}>
								<h3>{item.subjectName} announcement</h3>
							</div>
						);
					})}
				</div>

				<div className="mt-2">
					<Row>
						<Col md="3" className="mt-3">
							<div className="bg-primary rounded p-3 text-white">
								<p>Activities</p>
								<p>Students Enrolled</p>

								<Link
									to={`/announcementpage/${id}`}
									className="text-white text-decoration-none"
								>
									Announcement
								</Link>
							</div>
						</Col>
						<Col md="9" className="mt-3">
							<div>
								{subjectPostAnnouncement.length === 0 ? (
									<div className="text-center">
										<h3>Does not have announcement yet</h3>
									</div>
								) : (
									subjectPostAnnouncement.map((item) => {
										return (
											<div
												key={item.postID}
												className="border p-3 rounded my-3"
											>
												<p>{item.name}</p>
												<small>{item.content}</small>
											</div>
										);
									})
								)}
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default AnnouncementPage;
