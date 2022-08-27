import React from 'react';
import { useHeader } from '../context/HeaderContext';

const ProtectedRoute = ({ children }) => {
  const { setMode } = useHeader();
  setMode('default');
  return children;
};

export default ProtectedRoute;
