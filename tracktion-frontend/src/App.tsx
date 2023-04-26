import Login from './Login';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Projects from './Projects';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/projects" element={<Projects />} />
		</Routes>
	);
}

export default App;
