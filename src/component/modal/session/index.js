import React from 'react';

import OpenStep from './open';
import RegisterStep from './register';
import LoginStep from './login';
import { useAuth } from '../../../context/AuthContext';
// closed, open, register, login
function SessionModal() {
  const { step, openModal } = useAuth();
  return (
    <>
      {step === 'open' && <OpenStep setStep={openModal} />}
      {step === 'register' && <RegisterStep setStep={openModal} />}
      {step === 'login' && <LoginStep setStep={openModal} />}
    </>
  );
}

export default SessionModal;
