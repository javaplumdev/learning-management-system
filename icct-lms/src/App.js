import './App.css';
// Components
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRouter from './components/ProtectedRouter';
import Homepage from './components/Homepage';
// Router DOM
import { Routes, Route } from 'react-router-dom';
// Context
import { ContextFunction } from './context/context-config';

function App() {
	return (
		<ContextFunction>
			<div className="App">
				<div className="loginFormContainer p-3">
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/homepage"
							element={
								<ProtectedRouter>
									<Homepage />
								</ProtectedRouter>
							}
						/>
					</Routes>
				</div>
			</div>
		</ContextFunction>
	);
}

export default App;
