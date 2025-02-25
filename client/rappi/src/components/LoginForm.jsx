import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #007bff;
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #007bff;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor ingresa tu email y contraseña.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            onLogin(response.data.user);
            navigate("/client/rappi/src/components/Pedidos.jsx");  // 🔄 Redirige a productos después de iniciar sesión
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error desconocido";
            alert(`Error al iniciar sesión: ${errorMessage}`);
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login</Title>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Icon><FaUserAlt /></Icon>
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                        <Icon><FaLock /></Icon>
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </InputGroup>
                    <Button type="submit">Log In</Button>
                </form>
            </FormWrapper>
        </Container>
    );
};


LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
