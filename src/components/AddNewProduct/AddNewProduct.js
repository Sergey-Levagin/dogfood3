/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
// import { Field, Form, Formik } from 'formik'
import { useApi } from '../../custom/useApi'
// import { CustomTextareaComponent } from '../../custom/useCustomComponentForFormik'
import { FormProduct } from '../Form/FormProduct'
import styles from './styles.module.css'

export function AddNewProduct() {
  const { addNewProduct } = useApi()

  const { mutateAsync } = useMutation({
    mutationFn: addNewProduct,
  })

  return (

    <div className={styles.container}>
      <h1>Добавление нового товара</h1>

      <FormProduct functionSubmit={mutateAsync} />

    </div>
  )
}
