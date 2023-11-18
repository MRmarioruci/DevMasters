import {useState} from 'react';
import Lottie from 'react-lottie-player'
import contactAnimation from '../animations/contact.json';
import chickyAnimation from '../animations/chicky.json';
import useDatabase from '../utils/useDatabase';

type TCategory = 'Cheatsheets' | 'Projects' | 'Anti-patterns' | 'Leetcode';

function Newsletter() {
	const {addNewsletter} = useDatabase('newsletter');

	const [email, setEmail] = useState<string>('');
	const [category, setCategory] = useState<TCategory | string>('Cheatsheets');
	const [newsletterError, setNewsletterError] = useState<null | string>(null);
	const [added, setAdded] = useState<boolean>(false);

	const save = async (e:any) => {
		e.preventDefault();
		const res = await addNewsletter({
			email: email,
			category: category
		})
		if(!res) setNewsletterError('An unexpected error occured. Please try again later.');

		if(res === 'added'){
			setAdded(true);
		}else{
			setNewsletterError('Your email is already listed on our newsletter.');
		}
	}
	return (
		<div className="main__contents">
			{!added &&
				<div className="text__center">
					<Lottie
						loop
						animationData={contactAnimation}
						play
						style={{ width: '350px', height: '350px', margin: 'auto' }}
						className='newsletter__animation'
					/>
					<h4>Be the first to find out about new content.</h4>
					<div>We are growing all the time and having you in the loop would be great.<br />Just add your email and what you are most interested in and we will reach out.</div>
					<div className="flex flex__row mtop--30 text__left">
						<div style={{flexBasis: '60%'}}>Email</div>
						<div>Interested in</div>
					</div>
					<form className="newsletter__wrapper" onSubmit={save}>
						<div className="input__wrap mtop--10 contact__email">
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email here..."/>
							<select onChange={(e) => setCategory(e.target.value)} value={category}>
								<option>Cheatsheets</option>
								<option>Projects</option>
								<option>Anti-patterns</option>
								<option>Leetcode</option>
							</select>
						</div>
						<button className="btn btn__primary btn__circle mtop--15" disabled={!email}>
							<span className="material-icons">
								send
							</span>
						</button>
					</form>
					{newsletterError && <div className="text__danger font__12">{newsletterError}</div>}
				</div>
			}
			{added && 
				<div className="text__center">
					<Lottie
						loop
						animationData={chickyAnimation}
						play
						style={{ width: '350px', height: '350px', margin: 'auto' }}
						className='newsletter__animation'
					/>
					<h3 className="text__success">Chicky says that you were added!</h3>
					<h5>We've got you. You will be notified whenever new content is added. We are still growing so please be patient.</h5>
				</div>
			}
		</div>
	)
}

export default Newsletter