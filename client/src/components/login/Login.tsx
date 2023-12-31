import { FC } from 'react';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {useTranslation} from "react-i18next";
import { useMutation } from 'react-query';
import { useNavigate, Link } from "react-router-dom";
import ToggleLanguage from "../sidebar/togglelanguage/ToggleLanguage";
import './Login.css';
import logoIcon from '../../assets/logo-icon.png';
import mapIcon from '../../assets/map-icon.svg';
import { useState } from "react";

const Login:FC = () => {
    const navigate = useNavigate();
    const [t,] = useTranslation();
    const [loginError, setLoginError] = useState<number | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const mutation = useMutation({mutationFn:(data:FieldValues) => {
        return fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setLoginError(401)
                } else {
                    setLoginError(500)
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('user', JSON.stringify(data));
            navigate('/')
        })
        .catch(() => {
            throw new Error('Login failed');
        });
    }});

    const onSubmit: SubmitHandler<FieldValues> = (formData: FieldValues) => {
        setLoginError(null);
        mutation.mutate(formData);
      };

    return (
        <main className="login-main-box">
            <div className="login-title-box">
                <img className="login-logo" src={logoIcon}/>
                <h1 className="login-title">Homecrag</h1>
            </div>
            <Link className="login-link-alt" to='/'><img src={mapIcon} alt='back to map' className="login-link-img"/></Link>
            <ToggleLanguage justify={'start'} classname={'translate-btn-box-alt'}/>
            <div className="login-form-box">
                <h2 className="login-sub-title">{t('login')}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <label htmlFor="email" className="login-label">{t('email')}</label>
                    <input 
                        className="login-input"
                        type="text" 
                        id="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        {...register("email", {
                                required: true, 
                                maxLength: 255, 
                                pattern: {
                                    message: t('emailpattern'),
                                    value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                }
                        })} 
                    />
                    {errors.email && errors.email.type === "required" && (
                        <span role="alert" className="login-error">{t('required')}</span>
                    )}
                    {errors.email && errors.email.type === "maxLength" && (
                        <span role="alert" className="login-error">{t('maxlength')}</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <span role="alert" className="login-error">{t('emailpattern')}</span>
                    )}
                    <label htmlFor='password' className="login-label">{t('password')}</label>
                    <input 
                        className="login-input"
                        type="text" 
                        id="password"
                        aria-invalid={errors.username ? "true" : "false"}
                        {...register("password", {required: true, minLength: 8, maxLength: 255})} 
                    />
                    {errors.password && errors.password.type === "required" && (
                        <span role="alert" className="login-error">{t('required')}</span>
                    )}
                    {errors.password && errors.password.type === "maxLength" && (
                        <span role="alert" className="login-error">{t('maxlength')}</span>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <span role="alert" className="login-error">{t('minlength8')}</span>
                    )}
                    <button type="submit" className="login-submit">{t('submit')}</button>
                </form>
                {loginError && (
                    <span role="alert" className="login-error">{loginError===401?t('error401'):t('error500')}</span>
                )}
                <Link to='/register' className="login-link">{t('register')}</Link>
            </div>
        </main>
    )
}

export default Login;