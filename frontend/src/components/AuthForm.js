import { useState } from 'react';

export function  AuthForm(props) {

  const {title,name,buttonText,onSubmit,footer} = props;

  const [dataUser,setDataUser] = useState({
    email: '',
    password: '',
  });

  function resetDataUser () {
    setDataUser({
      email: '',
      password: '',
    });
  }

  // в объект записываются данные пользователя при регистрации емаил и пароль которые он вводит
  function handleChangeInput(event){
    const {name,value} = event.target;
    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [name]:value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if(!dataUser.email || !dataUser.password) return;

    onSubmit(dataUser) // отправляем данные которые ввел пользователь
      .then(() => {
        resetDataUser(); // очищаем поля
      });
  }

  return (
    <section className={`auth auth_type_${name}`}>
      <div className="auth__container">
      <h1 className="auth__title">{title}</h1>
      <form className={`auth__form auth__form_type_${name}`} action="#" name={`auth-${name}`} onSubmit={handleSubmit}>
      <div className="auth__block">
        <input
          className='auth__input auth__input_type_email'
          type="email"
          name="email"
          placeholder="Email"
          minLength="4"
          maxLength="40"
          required
          autoComplete="username"
          value={dataUser.email}
          onChange={handleChangeInput}
        />
        <span className='auth__error'></span>
      </div>
      <div className="auth__block">
        <input
          className='auth__input auth__input_type_password'
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="40"
          required
          autoComplete="current-password"
          value={dataUser.password}
          onChange={handleChangeInput}
        />
        <span className='auth__error'></span>
      </div>
      <button className="auth__button" type="submit">{buttonText}</button>      
      {
        footer && <div className="auth__footer">
          {footer}
        </div>
      }
      </form>
      </div>
    </section>
  )
}