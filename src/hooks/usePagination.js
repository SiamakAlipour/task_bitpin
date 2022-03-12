import { useState, useCallback } from 'react';

function usePagination(items, postPerPage) {
	const [currentPage, setCurrentPage] = useState(1);
	// const [currentPosts, setCurrentPosts] = useState(null);
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;

	const currentPosts = items?.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = useCallback(
		(event, value) => {
			setCurrentPage(value);
		},
		[setCurrentPage]
	);

	return { currentPosts, paginate };
}

export default usePagination;
