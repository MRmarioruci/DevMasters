import {useEffect, useState} from 'react';
import mainAnimation from '../animations/main.json';
import Lottie from 'react-lottie-player'
import {menu} from './utils/NavItems';
import Newsletter from './Newsletter';
import NewsletterModal from './NewsletterModal';
import MainGroup from './Main/MainGroup';
import { TMenuGroup } from './Main/Main.types';

function Main() {
	const [loading, setLoading] = useState<boolean>(true);
	const [newsletterModal, setNewsletterModal] = useState<boolean>(!(!!localStorage.getItem('devmasters__newsletter-modal')) ?? true);
	
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
				{menu.map((item: TMenuGroup) => {
					return <MainGroup
						key={item.id}
						id={item.id}
						title={item.title}
						description={item.description}
						baseLink={item.id}
					/>
				})}
				<Newsletter />
			</div>
			{ newsletterModal && <NewsletterModal setModal={setNewsletterModal}/>}
		</>
	)
}

export default Main