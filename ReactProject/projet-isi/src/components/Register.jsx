import { useState } from 'react'
import '../styles/Auth.css'
import { auth, db } from '../firebase/config.js'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';
import { handleSubmit as handleVideoSubmit } from '../firebase/config.js';

function Register(props){

    const [error, setError] = useState('')

    const [dataForm, setDataForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    function handleChange(event){
        const { name, value } = event.target;
        setDataForm(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        createUserWithEmailAndPassword(auth, dataForm.email, dataForm.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                if (user) {
                    setDoc(doc(db, "Users", user.uid), {
                        email: user.email,
                        username: dataForm.username,
                        nom: dataForm.firstName,
                        prenom: dataForm.lastName
                    }).then(() => {
                        // Une fois l'utilisateur enregistré, ajoutez la vidéo
                        handleVideoSubmit(e, dataForm.username);
                    }).catch((error) => {
                        setError(error.message);
                    });
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <div className='loginbody'>
            <div className="register-form-container">
                <form className="form">
                    <h2>Sign Up</h2>
                    <label htmlFor="username">Username:</label>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="username"
                            className="form--input"
                            name="username"
                            onChange={handleChange}
                            value={dataForm.username}
                        />
                    </div>
                    <div className="name-input-container">
                        <input
                            type="text"
                            placeholder="First name"
                            className="form--input"
                            name="firstName"
                            onChange={handleChange}
                            value={dataForm.firstName}
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="form--input"
                            name="lastName"
                            onChange={handleChange}
                            value={dataForm.lastName}
                        />
                    </div>
                    <label htmlFor="email">Email:</label>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="youremail@gmail.com"
                            className="form--input"
                            name="email"
                            onChange={handleChange}
                            value={dataForm.email}
                        />
                    </div>
                    <label htmlFor="password">Password:</label>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="*******"
                            className="form--input"
                            name="password"
                            onChange={handleChange}
                            value={dataForm.password}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="form--submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Sign up
                    </button>
                    {error && 
                        <div className='error'>
                            <p>{error}</p>
                        </div>
                    }
                    <button
                        className="link-btn"
                        onClick={() => props.onSwitchForm("login")}
                    >
                        Vous avez un compte? Connectez-vous
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
