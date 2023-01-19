/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'

import { Link } from 'react-router-dom'
import { useApi } from '../../custom/useApi'

import stylesSignin from './styles.module.css'

export function Signin() {
  const { signIn } = useApi()

  const { mutateAsync } = useMutation({
    mutationFn: signIn,
  })

  return (
    <div className={stylesSignin.block}>
      <h2>Авторизация</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          mutateAsync(values)
        }}
      >
        <Form className={stylesSignin.form}>
          <label htmlFor="email">Введите Email</label>
          <Field name="email" type="email" />

          <label htmlFor="password">Введите пароль</label>
          <Field name="password" type="password" />

          <button className={stylesSignin.button} type="submit">Войти</button>
          <Link to="/signup" className={stylesSignin.link}>Зарегистрироваться</Link>

        </Form>
      </Formik>
    </div>
  )
}
