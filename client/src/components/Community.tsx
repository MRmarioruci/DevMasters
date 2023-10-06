import React from 'react'
import '../scss/pages/Community.scss';

function Community() {
	return (
		<div className="community">
			<h2>Community</h2>
			<div className="font__20">Your support is much appreciated. Every bit of extra knowledge that can be added to this platform is valuable for everyone.</div>
			<div>
				You can contribute with code or fill in on the material.
			</div>
			<div className="flex flex__row text__center">
				<div className="btn btn__secondary btn__md">
					Github Repo
				</div>
				<div className="btn btn__secondary btn__md">
					contact@marioruci.com
				</div>
			</div>
		</div>
	)
}

export default Community