import React from 'react';
// import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';
import { parseUnit } from '../utils/overValidation';

const OverRefrigerant = ({ match, history }) => {
  const unit = parseUnit(match.params.unit, match.params.unitnumber);

  // console.log(match.params);
  return (
    <>
      <div className='navigationContainer'>
        <Navigation onMain={false} />
        <UserInfo />
      </div>
      <Title title='Sobrecalentamiento' />
      <div className='title-container'>
        <h1>Tipo de Gas</h1>
        <header>
          <h2>{`${match.params.store} - ${unit}`}</h2>
        </header>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/overheating/main/R22/${match.params.unit}/${match.params.unitnumber}/${match.params.storecr}/${match.params.store}`}
        >
          <button type='submit'>R-22</button>
        </Link>
        <Link
          to={`/overheating/main/R404a/${match.params.unit}/${match.params.unitnumber}/${match.params.storecr}/${match.params.store}`}
        >
          <button type='submit'>R404a</button>
        </Link>
      </div>
    </>
  );
};

export default OverRefrigerant;
