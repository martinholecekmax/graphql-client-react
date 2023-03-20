import React from 'react';
import ReactPaginate from 'react-paginate';

import * as styles from './pagination.module.css';

const Pagination = ({ pageInfo, changePage }) => {
  const handlePageChange = ({ selected }) => {
    const { perPage, totalCount } = pageInfo;
    const skip = (selected * perPage) % totalCount;
    changePage(skip);
  };

  return (
    <div className={styles.container}>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageInfo?.pageCount || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={styles.pageContainer}
        pageClassName={styles.page}
        pageLinkClassName={styles.pageLink}
        nextClassName={styles.page}
        previousClassName={styles.page}
        nextLinkClassName={styles.pageLink}
        previousLinkClassName={styles.pageLink}
        breakLinkClassName={styles.pageLink}
        activeClassName={styles.activePage}
        activeLinkClassName={styles.activePageLink}
        onPageChange={handlePageChange}
        forcePage={pageInfo?.currentPage - 1 || 0}
      />
    </div>
  );
};

export default Pagination;
