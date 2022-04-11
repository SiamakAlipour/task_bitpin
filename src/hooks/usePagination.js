/**
 * usePagination will take items and current page
 * then it will return an object with @param {Array} currentPosts for the current page
 * and the @function paginate for Pagination component
 */

import { useState, useCallback } from 'react';
import { POSTS_COUNT } from 'utils/constants/index';

/**
 * checkPage
 * @param {Array} items
 * @param {number} page
 * @returns {number}
 * if the page is bigger than the lastPage
 * and smaller than the firstPage it will return 1
 */

const checkPage = (items, page) => {
  const lastPage = Math.ceil(items.length / POSTS_COUNT);
  if (page < 1 || page > lastPage) {
    return 1;
  }
  return null;
};

function usePagination(items, page) {
  const [currentPage, setCurrentPage] = useState(checkPage(items, parseInt(page, 10)) || 1);

  const indexOfLastPost = currentPage * POSTS_COUNT;
  const indexOfFirstPost = indexOfLastPost - POSTS_COUNT;

  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = useCallback(
    (event, value) => {
      setCurrentPage(value);
    },
    [setCurrentPage],
  );

  return { currentPosts, currentPage, paginate };
}

export default usePagination;
