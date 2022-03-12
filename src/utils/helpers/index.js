import { toggleFavorite } from 'store/actions/market';
import { getCookie, setCookie } from 'utils/services/cookies';

export const handlePrice = (price) => {
	let nf = new Intl.NumberFormat();
	return nf.format(price);
};
export const handleAddFavorite = (id, market) => {
	console.log(id);
	toggleFavorite(id);
	const cookie = getCookie('fav') ? getCookie('fav') : [];
	setCookie('fav', [...cookie, { id }], 30);
};
export const handleRemoveFavorite = (id) => {
	toggleFavorite(id);
	const cookie = getCookie('fav') ? getCookie('fav') : [];
	const newCookie = cookie.filter((cookie) => cookie.id !== id);
	setCookie('fav', newCookie, 30);
};
