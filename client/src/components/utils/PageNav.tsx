import { Link } from "react-router-dom"
interface IPageNavProps{
    pageId: string | undefined,
    items: any[],
    selectedItem: any,
}
function PageNav({
    pageId,
    items,
    selectedItem,
}: IPageNavProps) {
    const lastPart = window.location.pathname.split('/').filter(part => part !== '').pop();
    const strippedPathname = lastPart === pageId ? window.location.pathname : window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
	return (
        <div className='page__menu tabs'>
            <Link to={`${strippedPathname}/myboard`} className={`tabs__item ${selectedItem?.id === 'myboard' && 'tabs__item-active'} `}>
                My Board
            </Link>
            <div className="separator">
            </div>
            {items.map((item, idx) => {
                return (
                    <Link to={`${strippedPathname}/${item.id}`} className={`tabs__item ${selectedItem?.id === item.id && 'tabs__item-active'} `} key={`group_${idx}`}>
                        <span className="material-icons">
                            {selectedItem?.id === item.id ? 'radio_button_checked' : 'check_box_outline_blank'}
                        </span>
                        {item.title}
                    </Link>
                )
            })}
        </div>
	)
}

export default PageNav


