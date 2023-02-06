/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import stylesSignin from './styles.module.css'

export function Signin() {
  const { signIn } = useApi()

  const { mutateAsync } = useMutation({
    mutationFn: signIn,
  })

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('в формате dog-food@mail.com').required('Поле обязательное для заполнения!'),
    password: Yup.string()
      .min(4, 'Пароль должен содержать не менее 4 символов')
      .required('Поле обязательное для заполнения!'),
  })

  return (
    <div className={stylesSignin.block}>
      <h2>Авторизация</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          mutateAsync(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className={stylesSignin.form}>
            <label htmlFor="email">Введите Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? (
              <div className={stylesSignin.form__errors_text}>{errors.email}</div>
            ) : null}

            <label htmlFor="password">Введите пароль</label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div className={stylesSignin.form__errors_text}>{errors.password}</div>
            ) : null}

            <button className={stylesSignin.form_button} type="submit">Войти</button>
            <Link to="/signup" className={stylesSignin.form_link}>Зарегистрироваться</Link>

          </Form>
        )}
      </Formik>
    </div>
  )
}
