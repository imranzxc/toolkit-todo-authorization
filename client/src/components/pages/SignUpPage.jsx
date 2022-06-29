import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/authSlice';
import '../App.css';

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const signingUp = useSelector((state) => state.auth.signingUp);
  const error = useSelector((state) => state.auth.error);

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(createUser({ login, password }));
    setTimeout(() => {
      if (!error) {
        return;
      } else {
        navigate('/signin');
      }
    }, 4000);
  };

  return (
    <div className="signup">
      {error}
      {signingUp && <div>You are registered</div>}
      <div>
        <input type="text" placeholder="Login" value={login} onChange={handleChangeLogin} />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <button onClick={handleSubmit} disabled={signingUp}>
        Регистрация
      </button>
    </div>
  );
};

export default SignUpPage;
