import React from 'react';
import '../assets/styles/components/Title.scss';
// import logo from '../assets/ISAAR-Logo.png';

const Title = ({ title }) => {
  return (
    <>
      <h2 className='section-title'>{title}</h2>
    </>
  );
};

export default Title;
