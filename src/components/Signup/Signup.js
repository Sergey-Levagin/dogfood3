/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useApi } from '../../custom/useApi'
import stylesSignup from './styles.module.css'

export function Signup() {
  const { signUp } = useApi()

  const { mutateAsync } = useMutation({
    mutationFn: signUp,
  })

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('в формате dog-food@mail.com').required('Поле обязательное для заполнения!'),
    group: Yup.string()
      .required('Поле обязательное для заполнения!'),
    password: Yup.string()
      .min(4, 'Пароль должен содержать не менее 4 символов')
      .required('Поле обязательное для заполнения!'),
  })

  return (
    <div className={stylesSignup.block}>
      <h2>Регистрация</h2>
      <Formik
        initialValues={{ email: '', group: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          mutateAsync(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className={stylesSignup.form}>
            <label htmlFor="email">Введите Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? (
              <div className={stylesSignup.form__errors_text}>{errors.email}</div>
            ) : null}

            <label htmlFor="group">Введите группу</label>
            <Field name="group" type="text" required />
            {errors.group && touched.group ? (
              <div className={stylesSignup.form__errors_text}>{errors.group}</div>
            ) : null}

            <label htmlFor="password">Введите пароль</label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div className={stylesSignup.form__errors_text}>{errors.password}</div>
            ) : null}

            <button className={stylesSignup.form_button} type="submit">Зарегистрироваться</button>
            <Link to="/signin" className={stylesSignup.form_link}>Войти в аккаунт</Link>
          </Form>
        )}
      </Formik>
    </div>
  )
}
