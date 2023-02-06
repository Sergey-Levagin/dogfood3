import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import { FormProduct } from '../Form/FormProduct'
import styles from './styles.module.css'

export function EditProduct() {
  const { editProductByIdProduct } = useApi()
  const { id } = useParams()
  const { getDataProduct } = useApi()

  const { isLoading, error, data: product } = useQuery({
    queryKey: ['productData', id],
    queryFn: () => getDataProduct(id),
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  const { mutateAsync } = useMutation({
    mutationFn: editProductByIdProduct,
  })

  return (
    <div className={styles.container}>
      <h3>Редактировать товар</h3>
      <FormProduct functionSubmit={mutateAsync} id={id} product={product} />
    </div>
  )
}
