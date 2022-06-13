import React from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

export default function SignInUpController({ isShown, setIsShown }) {
  if (isShown === 'signin') {
    return <SignInModal setIsShown={setIsShown} />;
  } else if (isShown === 'signup') {
    return <SignUpModal setIsShown={setIsShown} />;
  } else {
    return null;
  }
}
