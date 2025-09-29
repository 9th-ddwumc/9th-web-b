import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>홈페이지</h1>
      <Outlet /> 
    </div>
  );
};