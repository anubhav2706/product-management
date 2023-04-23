import React from 'react';
import { Redirect } from 'react-router-dom';

const MyRedirect = ({ redirect, routeName }) => {
  if (!redirect) {
    return <div />;
  }
  return <Redirect to={routeName} />
};

export default MyRedirect;