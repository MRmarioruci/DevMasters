import Lottie from 'react-lottie-player';
import monkeyAnimation from '../animations/monkey2.json';
import '../scss/pages/Community.scss';

function Community() {
	return (
		<div className="community">
			<h2>Community</h2>
			<div className="font__20">
				Do you think something interesting could be added to the platform?.
			</div>
			<div style={{marginTop: '-20px'}}>
				<br />
				We are open to new ideas and content as we are growing.
				<br />
				Go to the project repository, make a change and create a PR request. Simple as that.
			</div>
			<div className="flex flex__row text__center">
				<a href="https://github.com/MRmarioruci/DevMasters" target="_blank" rel="noreferrer" className="btn btn__secondary btn__md">
					Github Repo
				</a>
			</div>
			<div className="community__monkey">
				<Lottie
					loop
					animationData={monkeyAnimation}
					play
					className="community__monkeyInner"
				/>
			</div>
		</div>
	)
}

export default Community