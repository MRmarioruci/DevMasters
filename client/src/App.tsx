import { BrowserRouter, Routes, Route } from "react-router-dom";
import './scss/main.scss';
import 'animate.css';
import Main from './components/Main';
import Nav from './components/Nav';
import Cheatsheet from "./components/Cheatsheets";
import Projects from "./components/Projects";
import BestPractices from "./components/BestPractices";
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
					<Route path="/cheatsheets/:id/:group?" element={<Cheatsheet />} />
					<Route path="/pbl/:id/:group?" element={<Projects />} />
          			<Route path="/bestpractices/:id/:group?" element={<BestPractices />} />
				</Routes>
			</BrowserRouter>
			<Community />
			<Footer />
		</ThemeContextProvider>
	);
}

export default App;
