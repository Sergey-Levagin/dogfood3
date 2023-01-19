/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { useApi } from '../../custom/useApi'
import stylesSignup from './styles.module.css'

export function Signup() {
  const { signUp } = useApi()

  const { mutateAsync } = useMutation({
    mutationFn: signUp,
  })

  return (
    <div className={stylesSignup.block}>
      <h2>Регистрация</h2>
      <Formik
        initialValues={{ email: '', group: '', password: '' }}
        onSubmit={(values) => {
          mutateAsync(values)
        }}
      >
        <Form className={stylesSignup.form}>
          <label htmlFor="email">Введите Email</label>
          <Field name="email" type="email" />

          <label htmlFor="group">Введите группу</label>
          <Field name="group" type="text" required />

          <label htmlFor="password">Введите пароль</label>
          <Field name="password" type="password" />

          <button className={stylesSignup.button} type="submit">Зарегистрироваться</button>

        </Form>
      </Formik>
    </div>
  )
}
