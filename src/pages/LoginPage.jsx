import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import SignForm from "../assets/SignForm.jsx";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';
import Header from "../components/Header.jsx";
import Main from "../assets/Main.jsx";

export default function LoginPage(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState({email: "", password: ""})

    
    function alterardados(e){
        let newobj = {...dados};
        newobj[e.target.name] = e.target.value;
        setDados({...newobj});
    }

    function login(){
        console.log("a");
    }

    function fazerlogin(e){
        setLoading(true);
        e.preventDefault();
        axios.post("https://localhost:5000/sign-in", dados)
        .then(
            (res) => {
                login(res.data);
                navigate("/");
            }
        )
        .catch(
            (err) => {alert("Ocorreu um erro, tente novamente");setLoading(false)}
        )
    }

    return(
        <>
        <Header />
        <Main>
        <SignForm onSubmit={fazerlogin}>
            <input type="email" name="email" placeholder="E-mail" onChange={alterardados} />
            <input type="password" name="password" placeholder="Senha" onChange={alterardados}/>
            <button type="submit" disabled={loading}>
            {
            loading
              ? <ThreeDots color="#FFFFFF" height={50} width={50} />
              : "ENTRAR"
               }
            </button>
        </SignForm>
        <Link to="/sign-up">
            Não possui uma conta? Cadastre-se
        </Link>
        </Main>
        </>

    )

}

/* const { login } = useContext(AuthContext); import AuthContext from "../contexts/AuthContext.js";*/