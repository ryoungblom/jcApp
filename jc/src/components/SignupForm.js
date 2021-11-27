import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { firestoreDB } from '../adapters/firestore'

import { AiFillFacebook } from 'react-icons/ai';

import {
  AuthContainer,
  AuthForm,
  LogoContainer,
  Logo,
  Divider,
  Text,
  Line,
  DisplayText,
  TermsText,
  AuthError,
} from '../styles/authForm';
import logo from '../images/logo.svg';

import '../css/components/custom.css'

import InputField from './InputField';
import Button from './Button';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();

  const { signup } = useAuth();

  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    signup(email, password, firstName, lastName)
      .then((ref) => {
        setLoading(false);
        history.push('/');
        {/*firestoreDB.collection('users').doc("testUID".uid).set("testUID");*/}
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <AuthContainer>
    <LogoContainer>
      <h1 class="header-space"> Company </h1>
      <p> by JC Telemedicine </p>
      {/*<Logo src={logo} alt="logo" />*/}
    </LogoContainer>

      <DisplayText>
        Sign up for a seamless telemedicine experience
      </DisplayText>

      <Button
        color="#0095F6"
        icon={<AiFillFacebook fontSize="1.1rem" color="#ffffff" />}
        text="Log in with Facebook"
      />

      <Divider>
        <Line />
        <Text>OR</Text>
        <Line />
      </Divider>

      <AuthForm onSubmit={(e) => handleSignup(e)}>
        <InputField
          inputPlaceholder="Email"
          inputType="email"
          labelText="Email"
          inputRequired={true}
          inputRef={emailRef}
        />

        <InputField
          inputPlaceholder="First Name"
          inputType="text"
          labelText="First Name"
          inputRequired={true}
          inputRef={firstNameRef}
        />

        <InputField
          inputPlaceholder="Last Name"
          inputType="text"
          labelText="Last Name"
          inputRequired={true}
          inputRef={lastNameRef}
        />

        {/* <InputField
          inputPlaceholder="Username"
          inputType="text"
          labelText="Username"
        /> */}

        <InputField
          inputPlaceholder="Password"
          inputType="password"
          labelText="Password"
          inputRequired={true}
          inputRef={passwordRef}
        />

        <Button
          disabled={loading}
          type="submit"
          color="#0095F6"
          text="Sign up"
        />

        {error && <AuthError>{error}</AuthError>}
      </AuthForm>

      <TermsText>
        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
      </TermsText>
    </AuthContainer>
  );
}

export default SignUp;
