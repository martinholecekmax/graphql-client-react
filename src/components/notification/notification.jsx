import React, { useEffect } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';

import { useSubscription } from '@apollo/client';

const Notification = ({ subscription, titleProperty, messageProperty }) => {
  const { data, loading } = useSubscription(subscription, {
    fetchPolicy: 'no-cache',
  });

  if (loading) return null;
  if (!data) return null;
  if (!messageProperty) return null;

  // useEffect(() => {
  //   if (!loading && data) {
  //     console.log('data sub', data);
  //     createNotification(data);
  //   }
  // }, [loading, data]);

  // const createNotification = async (data) => {
  //   if (Object.keys(data).length === 0) return null;
  //   const message = data[Object.keys(data)[0]][messageProperty];
  //   const title = data[Object.keys(data)[0]][titleProperty];
  //   const id = data[Object.keys(data)[0]].id;
  //   try {
  //     Store.addNotification({
  //       id: id,
  //       title: title,
  //       message: message,
  //       type: 'success',
  //       insert: 'top',
  //       container: 'top-right',
  //       animationIn: ['animate__animated', 'animate__fadeIn'],
  //       animationOut: ['animate__animated', 'animate__fadeOut'],
  //       dismiss: {
  //         duration: 5000,
  //         onScreen: true,
  //       },
  //     });
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // if (data) {
  //   // console.log('data sub', data);
  //   // addNotification(data);

  //   // setTimeout(() => {

  //   // }, 0);
  // }

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
