/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { CustomTextareaComponent } from '../../custom/useCustomComponentForFormik'
import styles from './styles.module.css'

export function FormProduct({ functionSubmit, id, product }) {
  let obj = {
    id,
    available: true,
    pictures: '',
    name: '',
    price: '',
    discount: '',
    stock: '',
    wight: '',
    description: '',
  }

  if (id && product) {
    obj = {
      id,
      available: product.available,
      pictures: product.pictures,
      name: product.name,
      price: product?.price,
      discount: product.discount,
      stock: product.stock,
      wight: product.wight,
      description: product.description,
    }
  }

  function textForButton() {
    if (id) {
      return 'Редактировать товар'
    } return 'Добавить товар'
  }

  const SignupSchema = Yup.object().shape({
    available: Yup.boolean()
      .required('Поле обязательное для заполнения!'),
    pictures: Yup.string().url()
      .required('Поле обязательное для заполнения!'),
    name: Yup.string()
      .required('Поле обязательное для заполнения!'),
    price: Yup.number()
      .required('Поле обязательное для заполнения!'),
    discount: Yup.number()
      .required('Поле обязательное для заполнения!'),
    stock: Yup.number()
      .required('Поле обязательное для заполнения!'),
    wight: Yup.string()
      .required('Поле обязательное для заполнения!'),
    description: Yup.string()
      .required('Поле обязательное для заполнения!'),
  })

  return (
    <Formik
      initialValues={obj}
      validationSchema={SignupSchema}
      onSubmit={(value, helpers) => {
        functionSubmit(value)
        helpers.resetForm({ value })
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.container__form}>

          <label htmlFor="name"> Название товара </label>
          <Field className={styles.form_iput} name="name" type="text" placeholder="Наименование..." />
          {errors.name && touched.name ? (
            <div className={styles.form__errors_text}>{errors.name}</div>
          ) : null}
          <label htmlFor="available">
            Товар доступен
          </label>
          <div className={styles.form_radio}>
            <label htmlFor="available">
              <Field name="available" type="radio" value="true" />
              Доступен
            </label>
            <label htmlFor="available">
              <Field name="available" type="radio" value="false" />
              Недоступен
            </label>
          </div>
          <label htmlFor="pictures"> Изоображение товара </label>
          <Field className={styles.form_iput} name="pictures" type="text" placeholder="https://..." />
          {errors.pictures && touched.pictures ? (
            <div className={styles.form__errors_text}>{errors.pictures}</div>
          ) : null}
          <label htmlFor="price"> Цена товара </label>
          <Field className={styles.form_iput} name="price" type="number" placeholder="Цена..." />
          {errors.price && touched.price ? (
            <div className={styles.form__errors_text}>{errors.price}</div>
          ) : null}
          <label htmlFor="discount"> Скидка в % </label>
          <Field className={styles.form_iput} name="discount" type="number" placeholder="...%" />
          {errors.discount && touched.discount ? (
            <div className={styles.form__errors_text}>{errors.discount}</div>
          ) : null}
          <label htmlFor="stock"> Количество товара </label>
          <Field className={styles.form_iput} name="stock" type="number" placeholder="шт." />
          {errors.stock && touched.stock ? (
            <div className={styles.form__errors_text}>{errors.stock}</div>
          ) : null}
          <label htmlFor="wight"> Упаковка </label>
          <Field className={styles.form_iput} name="wight" type="text" placeholder=" 100г. / 1 шт." />
          {errors.wight && touched.wight ? (
            <div className={styles.form__errors_text}>{errors.wight}</div>
          ) : null}
          <label htmlFor="description"> Описание </label>
          <Field name="description" as={CustomTextareaComponent} placeholder="Описание..." />
          {errors.description && touched.description ? (
            <div className={styles.form__errors_text}>{errors.description}</div>
          ) : null}
          <button className={styles.container__form_button} type="submit">{textForButton()}</button>
        </Form>
      )}
    </Formik>
  )
}
