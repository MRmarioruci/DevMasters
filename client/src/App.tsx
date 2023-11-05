import { BrowserRouter, Routes, Route } from "react-router-dom";
import './scss/main.scss';
import 'animate.css';
import Main from './components/Main';
import Nav from './components/Nav';
import Cheatsheet from "./components/Cheatsheet";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Community from "./components/Community";
import ThemeContextProvider from './contexts/theme-context';

function App() {
	return (
		<ThemeContextProvider>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route index element={<Main />} />
					<Route path="/cheatsheets/:id" element={<Cheatsheet />} />
					<Route path="/projects/:id" element={<Projects />} />
				</Routes>
			</BrowserRouter>
			<Community />
			<Footer />
		</ThemeContextProvider>
	);
}

export default App;
