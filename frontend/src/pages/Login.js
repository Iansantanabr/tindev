import React, { useState } from 'react';
import './Login.css'

import api from '../services/api';

import logo from '../assets/logo.svg'

export default function Login({  history }){
    const [username, setUsername] = useState('');
   
    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {
            username,
        });
        
        const { _id } = response.data;

        history.push(`/dev/${_id}`)

    }
    return(
        <div className = "login-container"> 
        <form onSubmit ={handleSubmit}>
            <img src = {logo} alt="Tindev"/>
            <input
                placeholder="Digite seu usuário de GitHub"
                value= { username}
                onChange={e => setUsername(e.target.value)}
            />
            <button type="submit">Entrar</button>
        </form>
        </div>
     
    );
};

//sempre colocar os componentes dentro de uma dic container
//usar clasName no lugar de class