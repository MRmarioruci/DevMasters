
interface IPageNavProps{
    items: any[],
    selectedItem: any,
    setSelectedItem: any
}
function PageNav({
    items,
    selectedItem,
    setSelectedItem
}: IPageNavProps) {
	return (
        <div className='page__menu tabs'>
            {/* <div className={`tabs__item ${selectedItem?.title === 'My Board' && 'tabs__item-active'} `} onClick={() => setselectedItem(null)}>
                My Board
            </div>
            <div className="separator">
            </div> */}
            {items.map((item, idx) => {
                return (
                    <div className={`tabs__item ${selectedItem?.title === item.title && 'tabs__item-active'} `} key={`group_${idx}`} onClick={() => setSelectedItem(item)}>
                        <span className="material-icons">
                            {selectedItem?.title === item.title ? 'radio_button_checked' : 'check_box_outline_blank'}
                        </span>
                        {item.title}
                    </div>
                )
            })}
        </div>
	)
}

export default PageNav


