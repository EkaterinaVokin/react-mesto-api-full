import { Header } from './Header.js';
import { NavLink } from 'react-router-dom';
import { AuthForm } from './AuthForm.js';

export function Register(props) {

  const { onSubmit } = props;

  return (
    <>
      <Header
        actions={
          <NavLink className="nav-link nav-link_size_big" to="/sign-in">
            Войти
          </NavLink>
        }
      />
      <AuthForm
        title="Регистрация"
        name="registration"
        buttonText="Зарегистрироваться"
        onSubmit={onSubmit}
        footer={
          <span>
            Уже зарегистрированы?{' '}
            <NavLink className="nav-link" to="/sign-in">
              Войти
            </NavLink>
          </span>
        }
      />
    </>
  );
}
