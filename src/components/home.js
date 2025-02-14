import {
  loginWithGoogle,
  signIn,
} from '../lib/firebase';

export const home = (onNavigate) => {
  const root = document.getElementById('root');
  const singInDiv = document.createElement('div');
  singInDiv.classList.add('login');
  singInDiv.innerHTML += `<header>
    <img src="./img/logo.png" id="logo"><h1 id="welcome">Bienvenida</h1></header><section class="register-container">
    </header>
    <h1>Inicio de sesión</h1>
    <input type="email" id="email" placeholder="Ingrese su correo" /> 
    <input type="password" id="password" placeholder="Ingrese su contraseña"/>
    <button type="submit" id="signin-button">Iniciar Sesión</button>
    <p>¿No tienes cuenta?,</p><a id="here">Registrate aquí</a>
    <img src="./img/google.png" id="google">`;
  root.appendChild(singInDiv);

  const submitButton = document.getElementById('signin-button');
  submitButton.addEventListener('click', () => {
    const signInEmail = document.getElementById('email').value;
    const signInPassword = document.getElementById('password').value;
    const validateEmail = /\S+@\S+/.test(signInEmail);
    signIn(signInEmail, signInPassword)
      .then((usercredentials) => {
        const user = usercredentials.user;
        localStorage.setItem('idUser', user);
        onNavigate('/feed');
      })
      .catch((error) => {
        if (signInEmail === '') {
          // eslint-disable-next-line no-alert
          alert('Ingrese su email');
          return false;
        } if (signInPassword === '') {
          // eslint-disable-next-line no-alert
          alert('Ingrese su contraseña');
          return false;
        } if (validateEmail === false) {
          // eslint-disable-next-line no-alert
          alert('Ingrese email correcto');
          return false;
        }
        return error;
      });
  });

  const submitGoogle = document.getElementById('google');
  submitGoogle.addEventListener('click', () => {
    loginWithGoogle().then((result) => {
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      onNavigate('/feed');
    });
  });

  const signInHere = document.getElementById('here');
  signInHere.addEventListener('click', () => {
    onNavigate('/register');
  });

  return singInDiv;
};
