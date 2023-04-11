import React, { useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }

  return {
    value: '',
    isValid: false
  }
};

const pswdReducer = (state, action) => {
  if(action.type === 'USER_PSWD') {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'CHECK_PSWD') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }

  return {
    value: '',
    isValid: false
  }
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [pswdState, dispatchPswd] = useReducer(pswdReducer, {
    value: '',
    isValid: null
  });

  const context = useContext(AuthContext);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('useEffect Method is running...');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
  //     );
  //   }, 100);

  //   return () => {
  //     console.log('Clean UP!');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && pswdState.value.trim().length > 6 && enteredCollege.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPswd({type: 'USER_PSWD', val: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid && enteredCollege.trim().lengt > 0
    );
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 0 && emailState.isValid && pswdState.value.trim().length > 6
    );
  }

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPswd({type: 'CHECK_PSWD'});
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, pswdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email"
          label="E-Mail" 
          type="email" 
          isValid={emailState.isValid} 
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          id="password"
          label="Password" 
          type="password" 
          isValid={pswdState.isValid} 
          value={pswdState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {/* added another input college */}
        <Input 
          id="college"
          label="College" 
          type="text" 
          isValid={collegeIsValid} 
          value={enteredCollege}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
