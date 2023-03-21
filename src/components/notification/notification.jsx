import React from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';

import { useSubscription } from '@apollo/client';

const Notification = ({ subscription, titleProperty, messageProperty }) => {
  const { data, loading } = useSubscription(subscription, {
    fetchPolicy: 'no-cache',
  });

  if (loading) return null;
  if (!data) return null;
  if (!messageProperty) return null;

  if (data) {
    if (Object.keys(data).length === 0) return null;
    const message = data[Object.keys(data)[0]][messageProperty];
    const title = data[Object.keys(data)[0]][titleProperty];
    const id = data[Object.keys(data)[0]].id;
    setTimeout(() => {
      Store.addNotification({
        id: id,
        title: title,
        message: message,
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }, 0);
  }

  return (
    <ReactNotifications
      types={[
        {
          htmlClasses: ['notification-awesome'],
          name: 'awesome',
        },
      ]}
    />
  );
};

export default Notification;
