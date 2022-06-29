import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../../features/authSlice';
import '../App.css';

const SignInPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signingIn = useSelector((state) => state.auth.signingIn);
  const error = useSelector((state) => state.auth.error);

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const payload = { login, password };
    dispatch(doLogin(payload));
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="signin">
      <div>
        <input type="text" placeholder="Login" value={login} onChange={handleChangeLogin} />
      </div>
      <div>
        {error && <div>{error.message}</div>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <button onClick={handleSubmit} disabled={signingIn}>
        Авторизация
      </button>
    </div>
  );
};

export default SignInPage;
