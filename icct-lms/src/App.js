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
import AnnouncementPage from './components/teacher/AnnouncementPage';
import StudentRecord from './components/teacher/StudentRecord';
import StudentsEnrolled from './components/teacher/StudentsEnrolled';
// Student
import StudentProfile from './components/student/StudentProfile';
import SubjectPage from './components/student/SubjectPage';
import QuizPage from './components/student/QuizPage';
import StudentAnnouncementPage from './components/student/StudentAnnouncementPage';
import StudentGrades from './components/student/StudentGrades';
import SubjectMembers from './components/student/SubjectMembers';
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
					<Route path="/students-enrolled/:id" element={<StudentsEnrolled />} />

					<Route path="/announcementpage/:id" element={<AnnouncementPage />} />
					<Route path="/createquiz/:subjectName/:id" element={<CreateQuiz />} />
					<Route path="/studentrecord/:id" element={<StudentRecord />} />

					{/* Student */}
					<Route path="/studentprofile" element={<StudentProfile />} />
					<Route path="/subjectpage/:id" element={<SubjectPage />} />
					<Route path="/quizpage/:id" element={<QuizPage />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/studentannouncement/:id"
						element={<StudentAnnouncementPage />}
					/>
					<Route path="/studentgrades/:id" element={<StudentGrades />} />
					<Route path="/subjectmembers/:id" element={<SubjectMembers />} />
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;
