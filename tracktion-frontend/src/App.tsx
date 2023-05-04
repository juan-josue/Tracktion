import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import theme from './theme';
import './index.css';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/projects" element={<Projects />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
