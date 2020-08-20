import React from 'react';
import styled from 'styled-components/macro';
import {Flex} from '../common/Flex';

import Logo from 'assets/svg/logo.svg';
import Input from '../common/Input';
import IconLink from '../common/IconLink';
import Button from '../common/Button';
import LoginWrapper from '../Login/Login.style'


const Login: React.FC = () => {
  return (
    <LoginWrapper>
     
       <Flex align="center" justify="center" direction="column">
        <img className="logo" src={Logo} alt="BugVilla Logo" />
        <h2 className="text--bold">Join The Collaboration</h2>
<form>
  <Input icon="envelope" type="email" placeholder="example@gmail.com" />
  <Input icon="lock" type="password" placeholder="password" />
  <Input icon="lock" type="password" placeholder="confirm password" />

  <Button width="50%" icon="arrow-right">SignUp</Button>
  <IconLink className="color--gray" to="/login">
    Already have an account?
  </IconLink>
</form>
</Flex>


    </LoginWrapper>
  )
}
export default Login