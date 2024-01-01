import { FC } from 'react';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {useTranslation} from "react-i18next";
import { useMutation } from 'react-query';
import { useNavigate, Link } from "react-router-dom";
import logoIcon from '../../assets/logo-icon.png';
import mapIcon from '../../assets/map-icon.svg';
import ToggleLanguage from '../sidebar/togglelanguage/ToggleLanguage';
import { useState } from "react";

const Register:FC = () => {
    const navigate = useNavigate();
    const [t,] = useTranslation();
    const [registerError, setRegisterError] = useState<number | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const mutation = useMutation({mutationFn:(data:FieldValues) => {
        return fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setRegisterError(401)
                } else {
                    setRegisterError(500)
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            navigate('/login')
        })
        .catch(() => {
            throw new Error('Register failed');
        });
    }});

    const onSubmit: SubmitHandler<FieldValues> = (formData: FieldValues) => {
        setRegisterError(null)
        mutation.mutate(formData)
    }

    return (
        <main className="login-main-box">
        <div className="login-title-box">
            <img className="login-logo" src={logoIcon}/>
            <h1 className="login-title">Homecrag</h1>
        </div>
        <ToggleLanguage justify={'start'} classname={'translate-btn-box-alt'}/>
        <Link className="login-link-alt" to='/'><img src={mapIcon} alt='back to map' className="login-link-img"/></Link>
        <div className="login-form-box">
            <h2 className="login-sub-title">{t('register')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <label htmlFor='username' className="login-label">{t('username')}</label>
                <input 
                    className="login-input"
                    type="text" 
                    id="username"
                    aria-invalid={errors.username ? "true" : "false"}
                    {...register("username", {required: true, minLength: 2, maxLength: 255})} 
                />
                {errors.username && errors.username.type === "required" && (
                    <span role="alert" className="login-error">{t('required')}</span>
                )}
                {errors.username && errors.username.type === "maxLength" && (
                    <span role="alert" className="login-error">{t('maxlength')}</span>
                )}
                {errors.username && errors.username.type === "minLength" && (
                    <span role="alert" className="login-error">{t('minlength2')}</span>
                )}
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
            {registerError && (
                <span role="alert" className="login-error">{registerError===401?t('error401alt'):t('error500')}</span>
            )}
            <Link to='/login' className="login-link">{t('login')}</Link>
            </div>
        </main>
    )
}

export default Register;