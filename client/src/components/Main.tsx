import mainAnimation from '../animations/main.json';
import Lottie from 'react-lottie-player'
import {menu} from './utils/NavItems';
import contactAnimation from '../animations/contact.json';

type MenuItem = {
	title: string;
	href: string;
	icon: string ;
}
type MenuGroup = {
	title: string;
	items: MenuItem[];
}

function Main() {
	const interviewMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Interview Cheatsheets');
	/* const projectsMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Project Based Learning');
	const juniorMistakesMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Junior Mistakes');
	const leetcodeMenu = menu.find( (menuItem:MenuGroup) => menuItem.title === 'Leetcode'); */
	return (
		<>
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
								<a href={`/${item.href}`} className="card main__contents-card" key={`menu__${index}`}>
									<b className="text__primary font__10">{'/'}</b> {item.title}
								</a>
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
				{/* <div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">Junior Mistakes</div>
					<div className="text__center text__muted">
						Mistakes can happen in the code whether you are a junior or senior engineer. Don't worry about it, here is a technology specific list of mistakes that will make you a pro.
					</div>
					<div className="main__contents-menu">
						{juniorMistakesMenu?.items.map((item:MenuItem, index) => {
							return (
								<a href={`/projects/${item.href}`} className="card main__contents-card" key={`menu__${index}`}>
									<b className="text__primary font__10">{'/'}</b> {item.title}
								</a>
							)
						})}
					</div>
				</div>
				<div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">Project Based Learning</div>
					<div className="text__center text__muted">
						From zero to hero. Learning new technologies is a must in our profession. The only good way to learn them is by doing. Start from level 1 to the last level and then you can call yourself a pro.
					</div>
					<div className="main__contents-menu">
						{projectsMenu?.items.map((item:MenuItem, index) => {
							return (
								<a href={`/projects/${item.href}`} className="card main__contents-card" key={`menu__${index}`}>
									<b className="text__primary font__10">{'/'}</b> {item.title}
								</a>
							)
						})}
					</div>
				</div>
				<div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">Leetcode Style Problems</div>
					<div className="text__center text__muted">
						From zero to hero. Learning new technologies is a must in our profession. The only good way to learn them is by doing. Start from level 1 to the last level and then you can call yourself a pro.
					</div>
					<div className="main__contents-menu">
						{leetcodeMenu?.items.map((item:MenuItem, index) => {
							return (
								<a href={`/${item.href}`} className="card main__contents-card" key={`menu__${index}`}>
									<b className="text__primary font__10">{'/'}</b> {item.title}
								</a>
							)
						})}
					</div>
				</div> */}
				<div className="main__contents">
					<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">How to?</div>
					<div className="text__center text__muted">
						
					</div>
					<div className="main__contents-menu">
						{/* {leetcodeMenu.map((item, index) => {
							return (
								<a href={`/${item.href}`} className="card main__contents-card" key={`menu__${index}`}>
									<b className="text__primary font__10">{'/'}</b> {item.title}
								</a>
							)
						})} */}
					</div>
				</div>
				<div className="main__contents">
					<div className="text__center">
						<Lottie
							loop
							animationData={contactAnimation}
							play
							style={{ width: '350px', height: '350px', margin: 'auto' }}
							className='newsletter__animation'
						/>
						<h4>Join our newsletter</h4>
						<div>Be the first to know about our latest material.</div>
						<div className="input__wrap mtop--10 contact__email">
							<input type="text" placeholder="Enter your email here..."/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Main