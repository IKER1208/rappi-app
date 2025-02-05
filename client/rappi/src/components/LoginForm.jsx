import { useState } from 'react';
import axios from 'axios';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Icon = styled.div`
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Message = styled.p`
  text-align: center;
  color: ${props => (props.success ? 'green' : 'red')};
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessage('Login exitoso');
      setSuccess(true);
      console.log('Respuesta del servidor:', response.data);
      // Aquí podrías redirigir o guardar el token
    } catch (error) {
      setMessage('Error en el login');
      setSuccess(false);
      console.error('Error al hacer login:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Icon>
              <FaUserAlt />
            </Icon>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Icon>
              <FaLock />
            </Icon>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <Button type="submit">Log In</Button>
        </form>
        {message && <Message success={success}>{message}</Message>}
      </FormWrapper>
    </Container>
  );
};

export default LoginForm;
