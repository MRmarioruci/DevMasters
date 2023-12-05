import { Link } from "react-router-dom";
import { menu } from "./NavItems"
import './Related.scss';
function Related() {
	const pathname = window.location.pathname.split('/');
	const group = pathname[1];
	const id = pathname[2];

	const targetGroup = menu.find((groupItem: any) => groupItem.id === group);
	if(!targetGroup) return <div></div>;

	const related = targetGroup?.items.find((item:any) => item.href === id)
	?.related;
	if(!related) return <div></div>;

	const relatedObjects = targetGroup?.items.filter((item:any) => related.includes(item.href));
    const strippedPathname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
	
	return (
        <div className="related__content">
			{!!relatedObjects.length && 'Related:'}
			{relatedObjects.map((item: any) => 
				<Link to={`${strippedPathname}/${item.href}`} key={`related_${item.href}`} className="btn btn__primary-3d font__12 btn__sm mleft--10">{item.title}</Link>
			)}
        </div>
	)
}

export default Related


