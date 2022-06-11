import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
// React
import { useContext } from 'react';
// Context
import { ContextVariable } from '../../context/context-config';
// React DOM
import { useNavigate, Link } from 'react-router-dom';

const NavbarComponent = () => {
	const { logOut } = useContext(ContextVariable);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Container>
				<Link to="/teacherhomepage" className="text-decoration-none">
					<h5 className="text-dark">ICCT LMS Teacher</h5>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
						<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link onClick={() => handleLogout()} eventKey={2}>
							Log out
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
