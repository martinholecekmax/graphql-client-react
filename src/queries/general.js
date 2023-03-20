import { gql } from '@apollo/client';

export const SORT_FIELDS = gql`
  query SortableFields($name: String!) {
    __type(name: $name) {
      name
      enumValues {
        name
      }
    }
  }
`;
