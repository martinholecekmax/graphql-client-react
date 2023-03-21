import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import qs from 'qs';

const useQueryState = (query) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const decodeObjString = (str) =>
    qs.parse(str, {
      ignoreQueryPrefix: true,
      arrayFormat: 'bracket',
      decoder(str, decoder, charset) {
        const strWithoutPlus = str.replace(/\+/g, ' ');
        if (charset === 'iso-8859-1') {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }

        const keywords = {
          true: true,
          false: false,
          null: null,
          undefined,
        };
        if (str in keywords) {
          return keywords[str];
        }

        // utf-8
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      },
    });

  const setQuery = useCallback(
    (value) => {
      const existingQueries = qs.parse(searchQuery, {
        ignoreQueryPrefix: true,
      });
      const newQueries = {
        ...existingQueries,
        [query]: value,
      };
      const encoded = qs.stringify(newQueries, {
        encode: true,
        encodeValuesOnly: true,
      });

      setSearchParams({ query: encoded });
    },
    [query, history]
  );

  return [decodeObjString(searchQuery)[query], setQuery];
};

export default useQueryState;
