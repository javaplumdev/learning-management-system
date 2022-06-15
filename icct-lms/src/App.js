import './App.css';
// Components
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRouter';
import Homepage from './components/Homepage';
// Teacher Component
import TeacherHomePage from './components/teacher/TeacherHomePage';
import StudentHomePage from './components/student/StudentHomePage';
import TeacherSubjectPage from './components/teacher/TeacherSubjectPage';
import CreateQuiz from './components/teacher/CreateQuiz';
// Student
import StudentProfile from './components/student/StudentProfile';
import SubjectPage from './components/student/SubjectPage';
import QuizPage from './components/student/QuizPage';
// Router DOM
import { Routes, Route } from 'react-router-dom';
// Context
import { ContextFunction } from './context/context-config';

function App() {
	return (
		<ContextFunction>
			<div className="App">
				<Routes>
					<Route path="/" element={<Login />} />

					<Route
						path="/homepage"
						element={
							<ProtectedRoute>
								<Homepage />
							</ProtectedRoute>
						}
					/>

					<Route path="/teacherhomepage" element={<TeacherHomePage />} />
					<Route path="/studenthomepage" element={<StudentHomePage />} />
					<Route
						path="/teacherspage/:subjectName/:id"
						element={<TeacherSubjectPage />}
					/>

					<Route path="/createquiz/:subjectName/:id" element={<CreateQuiz />} />

					{/* Student */}
					{/* StudentProfile */}
					<Route path="/studentprofile" element={<StudentProfile />} />
					<Route path="/subjectpage/:id" element={<SubjectPage />} />
					<Route path="/quizpage/:id" element={<QuizPage />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;
