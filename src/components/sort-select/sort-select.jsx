import React from 'react';

import { useQuery } from '@apollo/client';

import { SORT_FIELDS } from '../../queries/general';
import { camelCaseToHumanReadable } from '../../utils/general';

import * as styles from './sort-select.module.css';

const SortSelect = ({ onChange, sort, name }) => {
  const { loading, error, data } = useQuery(SORT_FIELDS, {
    variables: { name },
  });

  if (loading) return null;
  if (error) return null;

  const fields = data.__type.enumValues.map((item) => item.name);

  const options = [];
  fields.forEach((field) => {
    const formatted = camelCaseToHumanReadable(field);
    options.push(
      <option key={`${field}-ASC`} value={`${field}-ASC`}>
        {formatted} (ASC)
      </option>
    );
    options.push(
      <option key={`${field}-DESC`} value={`${field}-DESC`}>
        {formatted} (DESC)
      </option>
    );
  });

  const handleChange = (e) => {
    const selected = e.target.value || null;
    if (selected) {
      const sortVal = selected.split('-');
      const currentSort = {
        field: sortVal[0],
        order: sortVal[1],
      };
      onChange(currentSort);
    }
  };

  return (
    <div className={styles.container}>
      <select
        className={`form-select ${styles.selectBox}`}
        onChange={handleChange}
        value={`${sort?.field}-${sort?.order}`}
      >
        {options}
      </select>
    </div>
  );
};
export default SortSelect;
