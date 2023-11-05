import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { QRCode } from 'react-qrcode-logo';
import '../../scss/partials/share.scss'

function ShareModal({url}: { url: string}) {
	const [modal, setModal] = useState<boolean>(false)
	const [copied, setCopied] = useState<boolean>(false);
	const copy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	}
	const share = (where:string) => {
		if (where === 'facebook') {
			window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
				'facebook-share-dialog',
				'width=800,height=600'
			);
		} else if (where === 'linkedin') {
			window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url), '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
		} else if (where === 'twitter') {
			window.open('https://twitter.com/intent/tweet?text=Participate in the campaign&url=' + url,
				'twitter-share-dialog',
				'width=800,height=600'
			);
		}
	}
	return (
		<div className={`share inline--flex`}>
			{!modal &&
				<div className="btn btn__inverted btn__md text__secondary" onClick={() => setModal(true)}>
					<span className="material-icons font__20">
						share
					</span>
					Share
				</div>
			}
			{modal &&
				<div className="modal__overlay active">
					<div className="modal active animate__animated animate__fadeIn">
						<div className="modal__header">
							<div className="modal__header-title">
								<h3>Share</h3>
								<div className="text--muted font--12">Copy the url, share directly to social media or just scan the qr code</div>
							</div>
							<div className="close-modal modal--x" onClick={() => { setModal(false) }}>
								<svg viewBox="0 0 20 20">
									<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
								</svg>
							</div>
						</div>
						<div className="modal__content">
							<div className="modal__body share">
								<br/><br/>
								<div className='share__copy input__wrap'>
									<input type="text" value={url} disabled />
									<CopyToClipboard text={url} onCopy={() => copy()}>
										<button className={`btn ${copied ? 'btn__success' : 'btn__primary'} btn__sm share__copy-button`}>
											<span className="material-icons font--16 vm--align mright--5">
												content_copy
											</span>
											{copied ? 'Copied...' : 'Copy'}
										</button>
									</CopyToClipboard>
								</div>
								<div className="share__social">
									<div className="btn btn__inverted btn__circle" onClick={() => share('facebook')}>
										<img src="https://api.iconify.design/lucide:facebook.svg" width={30} alt="Facebook" />
									</div>
									<div className="btn btn__inverted btn__circle" onClick={() => share('linkedin')}>
										<img src="https://api.iconify.design/streamline:computer-logo-linkedin-network-linkedin-professional.svg" width={30} alt="Facebook" />
									</div>
									<div className="btn btn__inverted btn__circle" onClick={() => share('twitter')}>
										<img src="https://api.iconify.design/fa6-brands:x-twitter.svg" width={30} alt="Facebook" />
									</div>
								</div>
								<div className="share__qr">
									<QRCode value={url} qrStyle='dots' size={250} eyeRadius={5} />
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

export default ShareModal;
