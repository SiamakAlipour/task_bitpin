export const handlePrice = (price) => {
	let nf = new Intl.NumberFormat();
	return nf.format(price);
};
