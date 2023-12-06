import { useMemo, useState } from "react";
import Lottie from 'react-lottie-player'
import './Suggest.scss';
import useDatabase from "../../utils/useDatabase";
import successAnimation from '../../animations/success.json';
import errorAnimation from '../../animations/error.json';

function Suggest() {
    const {addSuggestion} = useDatabase('suggestions');
    const [modal, setModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [linkedin, setLinkedin] = useState<string>('');
    const [screen, setScreen] = useState<null | 'success' | 'error' | 'loading'>(null);

	const pathname = window.location.pathname.split('/');
	const group = pathname[1];
	const id = pathname[2];
    const submit = async () => {
        setScreen('loading');
        const res = await addSuggestion({
			type: group,
            group: id,
            title: title,
            description: description,
            code: code,
            linkedin: linkedin
		})
        if(!res) setScreen('error');
        setTimeout(() => {
            setScreen(res);    
        }, 1000);
    }
    const allFilled = useMemo(() => {
        return title && description;
    }, [title, description])

	return (
        <div className="suggest">
            { !modal &&
                <button className="btn btn__inverted-outline btn__md" onClick={() => setModal(true)}>
                    <span className="material-icons font__22">add</span>
                    Suggest
                </button>
            }
            {modal &&
				<div className="modal__overlay active">
					<div className="modal active animate__animated animate__fadeIn suggest__modal">
						<div className="modal__header">
							<div className="modal__header-title">
								<h3>Suggest</h3>
							</div>
							<div className="close-modal modal--x" onClick={() => { setModal(false) }}>
								<svg viewBox="0 0 20 20">
									<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
								</svg>
							</div>
						</div>
						<div className="modal__content">
							<div className="modal__body">
                                {screen === 'loading' && 
                                    <div className="text__center">
                                        <div className="loader"></div>
                                    </div>
                                }
                                {screen === null &&
                                    <>
                                        <div className="text__muted font--12">We are open to additions from other engineers. Please feel free to suggest content and we will add it.</div>
                                        <div className="form__group">
                                            <label>Type</label>
                                            <div className="input__wrap">
                                                <input type="text" value={group} disabled  className="capitalize"/>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <label>Group</label>
                                            <div className="input__wrap">
                                                <input type="text" value={id} disabled className="capitalize"/>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <label>
                                                <span className="text__danger">*</span>
                                                Title
                                            </label>
                                            <div className="input__wrap">
                                                <input type="text" placeholder="Type here..." value={title} onChange={(e) => setTitle(e.target.value)} />
                                                <span className="focus"></span>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <label>
                                                <span className="text__danger">*</span>
                                                Description
                                            </label>
                                            <div className="input__wrap">
                                                <textarea placeholder="Type here..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                                <span className="focus"></span>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <label>
                                                Code sample
                                            </label>
                                            <div className="input__wrap">
                                                <textarea placeholder="Type here..." value={code} onChange={(e) => setCode(e.target.value)}></textarea>
                                                <span className="focus"></span>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <label>
                                                Attribution?
                                            </label>
                                            <div className="text__muted font__12">Enter your linkedin profile url so that we can attribute this content to you.</div>
                                            <div className="input__wrap">
                                                <input type="text" placeholder="Type here..." value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                                                <span className="focus"></span>
                                            </div>
                                        </div>
                                    </>
                                }
                                {screen === 'success' && 
                                    <div className="text__center">
                                        <Lottie
                                            loop={false}
                                            animationData={successAnimation}
                                            play
                                            style={{ width: '250px', height: '250px', margin: 'auto' }}
                                        />
                                        <h4>Thank you. We will review your suggestion and add it to our content.</h4>
                                    </div>
                                }
                                {screen === 'error' && 
                                    <div className="text__center">
                                    <Lottie
                                        loop={false}
                                        animationData={errorAnimation}
                                        play
                                        style={{ width: '250px', height: '250px', margin: 'auto' }}
                                    />
                                    <h4>An error occured. Please try again later.</h4>
                                </div>
                                }
							</div>
                            <div className="modal__footer">
                                <div></div>
                                { screen === null &&
                                    <div className="flex flex__row">
                                        <button className="btn btn__secondary btn__md" onClick={() => setModal(false)}>
                                            Cancel
                                        </button>
                                        <button className="btn btn__primary btn__md" onClick={submit} disabled={!allFilled}>
                                            Submit
                                            <span className="material-icons">add</span>
                                        </button>
                                    </div>
                                }
                            </div>
						</div>
					</div>
				</div>
			}
        </div>
	)
}

export default Suggest


