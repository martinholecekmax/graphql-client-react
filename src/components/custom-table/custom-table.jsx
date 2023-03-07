import React from 'react';

import * as styles from './custom-table.module.css';

const CustomTable = ({
  headers,
  columns,
  data,
  onRowClick = () => {},
  isLoading,
}) => {
  if (!data || !data.length) {
    return <div className={styles.container}>No data</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers?.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={headers?.length}>Loading...</td>
          </tr>
        ) : null}
        {data?.map((item, index) => (
          <tr
            key={index}
            onClick={() => onRowClick(item)}
            className={styles.row}
          >
            {columns?.map((column, index) => (
              <td key={index}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
