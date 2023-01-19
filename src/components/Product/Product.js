/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import { addProductInCart } from '../../redux/slice/cartSlice.js/cartSlice'
import styles from './styles.module.css'

export function Product() {
  const { getDataProduct } = useApi()
  const { id } = useParams()
  const dispatch = useDispatch()

  const addProductToCart = () => {
    dispatch(addProductInCart(id))
  }

  function priceCalculation(price, discount) {
    return Number(price) - (Number(price) / 100) * Number(discount)
  }

  const { isLoading, error, data: product } = useQuery({
    queryKey: ['productData'],
    queryFn: () => getDataProduct(id),
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`
  return (
    <div
      className={styles.container}
      key={product._id}
    >
      <h1>{product.name}</h1>
      <div className={styles.container__cart}>
        <div className={styles.block}>
          <img

            src={product.pictures}
            alt="описание"
          />
        </div>
        <div>
          <p>{product.description}</p>
          <p>
            Количество лайков:
            {' '}
            {product.likes.length}
          </p>
          <p>
            Остаток на складе:
            {' '}
            {product.stock}
            {' '}
            шт.
          </p>
          <h4>
            {priceCalculation(product.price, product.discount)}
            {' '}
            P
          </h4>
          <button onClick={() => addProductToCart()} type="button">B корзину</button>
        </div>
      </div>

    </div>
  )
}
