import {useEffect, useState} from 'react';
import mainAnimation from '../animations/main.json';
import Lottie from 'react-lottie-player'
import {menu} from './utils/NavItems';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

type MenuItem = {
	title: string;
	href: string;
	icon: string;
	hasContent: boolean
}
type MenuGroup = {
	title: string;
	items: MenuItem[];
}

function Main() {

	const [loading, setLoading] = useState<boolean>(true);
	const interviewMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Interview Cheatsheets');
	/* const projectsMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Project Based Learning');
	const juniorMistakesMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Junior Mistakes');
	const leetcodeMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Leetcode'); */

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000 );
	}, [])
	return (
		<>
			{loading && <div className="loader__full"><div className="loader"></div></div>}
			<div className="main">
				<div className="main__header">
					<div className="main__header-left">
						<div>
							<h1>
								Be a pro
							</h1>
							<h1>
								<span className="text__primary">S</span>oftware <span className="text__primary">E</span>ngineer
							</h1>
						</div>
						<div className="mtop--10 font__18 text__bold">
							Everything from quick revision to in-depth topics based on your path.
						</div>
						<div className="mtop--10 text__muted">
							Ace your interviews with our educational content to help you quickly brush up on your learnings.
							Do a quick review of the most related topics and learn more about them.
							Learn through projects and many more.
						</div>
					</div>
					<div className="main__header-right">
						<Lottie
							loop
							animationData={mainAnimation}
							play
							className="main__header-rightLottie"
						/>
					</div>
				</div>
				<div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">Interview Cheatsheets</div>
					<div className="text__center text__muted">
						Interview specific cheatsheets. Concepts and general interview material to brush up before the big day.	
					</div>
					<div className="main__contents-menu">
						{interviewMenu?.items.map((item:MenuItem, index) => {
							return (
								<Link to={`/cheatsheets/${item.href}`} className="card main__contents-card" key={`menu__${index}`}>
									<b className="text__primary font__10">{'/'}</b> {item.title}
									{!item.hasContent && <div className="main__contents-cardUnderConstruction">Under Construction</div>}
								</Link>
							)
						})}
					</div>
					<div className="text__center">
						{/* <button className="btn btn__secondary text__normal btn__rounded">
							<span className="material-icons">
								add
							</span>
							Suggest an addition
						</button> */}
					</div>
				</div>
				<div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">Project Based Learning</div>
					<div className="text__center text__muted mtop--20 mbottom--20">
						Learn by doing. Project based learning is the way to go in this profession <br/>and here you will find a list of projects to complete with instructions, based on your level
					</div>
					<h4 className="text__center">Coming soon</h4>
				</div>
				<div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">Junior Mistakes</div>
					<div className="text__center text__muted mtop--20 mbottom--20">
						Here you will find anti-patterns and coding mistakes every junior falls into. Don't worry, we've got you.
					</div>
					<h4 className="text__center">Coming soon</h4>
				</div>
				<div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">Leetcode</div>
					<div className="text__center text__muted mtop--20 mbottom--20">
						Practice for the leetcode-style problems. Learn DSA, Algorithms and Solving patterns. Be a pro.
					</div>
					<h4 className="text__center">Coming soon</h4>
				</div>
				<Newsletter />
			</div>
		</>
	)
}

export default Main