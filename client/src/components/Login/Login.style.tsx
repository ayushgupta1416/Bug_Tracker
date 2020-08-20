import styled from 'styled-components/macro';



const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;

  .logo {
    width: 100px
  }
  .text {
    position: absolute;
    top: 0;
    margin-left:300px;

  }
  form {
    width: 300px;
    margin-top: ${p => p.theme.spacings.my};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
export default LoginWrapper;