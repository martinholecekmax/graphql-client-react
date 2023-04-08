import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import { useSubscription } from '@apollo/client';

const ProductObserver = ({
  subscription,
  messageProperty,
  titleProperty,
  messageType = 'success',
}) => {
  const { data, loading } = useSubscription(subscription, {});
  const { addToast } = useToasts();

  useEffect(() => {
    if (!loading && data) {
      console.log('data', data);
      const message = data[Object.keys(data)[0]][messageProperty];
      const title = data[Object.keys(data)[0]][titleProperty];
      const id = data[Object.keys(data)[0]].id;
      addToast(title, {
        id: id,
        appearance: messageType,
        placement: 'bottom-left',
        autoDismissTimeout: 4500,
        autoDismiss: true,
      });
    }
  }, [loading, data, addToast]);

  return null;
};

export default ProductObserver;
