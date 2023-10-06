import { useCustomContext } from "../contexts/theme-context"

function LayoutSelector() {
    const {state, dispatch} = useCustomContext();
	const setColumns = () => {
		dispatch({ "type": "SET_COLUMNS", "payload": state.columns === 2 ? 3 : 2})
	}
    return (
		<div className="btn btn__transparent btn__md text__primary" onClick={setColumns}>
			{ state.columns === 2 &&
				<span className="material-icons">
					grid_view
				</span>	
			}
			{ state.columns === 3 &&
				<span className="material-icons">
					grid_on
				</span>	
			}
			
		</div>
    )
}

export default LayoutSelector