/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useApi } from '../../custom/useApi'
import { useCalculationCart } from '../../custom/useCalculationCart'
import { addProductInFavourite } from '../../redux/slice/favouriteSlice/favouriteSlice'
import { ProductReview } from '../ProductReview/ProductReview'
import styles from './styles.module.css'
import { ReactComponent as Favourite } from './heart-solid.svg'
import { useCardProduct } from '../../custom/useCardProduct'

export function Product() {
  const { getDataProduct, dataUser, deleteProductById } = useApi()
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { priceCalculation } = useCalculationCart()
  const {
    checkingTheProductDiscount,
    dataForButton,
    checkProductInFavourite,
    tegDiscount,
    dataForButtonColor,
    addProductToCart,
    averageRatingProduct,
  } = useCardProduct()

  const { data: user } = useQuery({
    queryKey: ['repoData'],
    queryFn: dataUser,
  })

  const { mutateAsync } = useMutation({
    mutationFn: deleteProductById,

  })
  const { isLoading, error, data: product } = useQuery({
    queryKey: ['productData', id],
    queryFn: () => getDataProduct(id),
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  return (
    <div
      className={styles.container}
      key={product._id}
    >
      <div>
        <h1>{product.name}</h1>
      </div>
      <div className={styles.container__card}>
        <div className={styles.container__card_img}>
          <span className={product.discount ? styles.block_discount : ''}>
            {tegDiscount(product.discount)}
          </span>
          <img
            src={product.pictures}
            alt={product.name}
          />
        </div>
        <div className={styles.container__card_block}>
          <div className={styles.card_block__edit}>
            {user?._id === product.author._id
              ? (
                <button type="button" onClick={() => navigate(`/edit_product_id:${id}`)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg></button>)
              : ' '}
          </div>
          <div
            className={styles.card_block__button_del}
          >
            {user?._id === product.author._id
              ? (
                <button onClick={() => mutateAsync(id)} type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg>
                </button>
              ) : ''}
          </div>
          <div className={styles.card_block__rating}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
            <h4 className={styles.card_block__rating__text}>
              {`${averageRatingProduct(product.reviews)} / 5`}
            </h4>
          </div>
          <div>
            <button
              onClick={() => dispatch(addProductInFavourite(id))}
              className={styles.container__card_block_favourite}
              type="button"
            >
              <span className={styles.card_block_favourite__block_svg}>
                <Favourite className={checkProductInFavourite(id)
                  ? styles.card_img__favourite_on : styles.card_img__favourite_off}
                />
                <span>{checkProductInFavourite(id) ? 'В избранном' : 'Добавить в избранное'}</span>

              </span>
            </button>

          </div>
          <div className={styles.card_block__likes}>
            <p>
              {product.likes.length}
              {' '}
              покупателю(ям) понравился этот товар
            </p>
          </div>
          <div className={styles.card_block__stock}>
            <p>
              В наличии -
              {' '}
              {product.stock}
              {' '}
              шт.
            </p>
          </div>
          <div>
            <p>
              Упаковка -
              {' '}
              {product.wight}

            </p>
          </div>
          <div className={styles.card_block__price}>
            <del className={styles.block__price_del}>
              {checkingTheProductDiscount(product.discount, product.price)}
            </del>
            <h3 className={styles.block__price_h3} style={product.discount ? { color: 'rgb(212, 35, 35)' } : { color: 'black' }}>
              {priceCalculation(product.price, product.discount)}
              {' '}
              P
            </h3>
          </div>
          <div className={styles.card_block__button}>
            <button type="button" className={dataForButtonColor(id) ? styles.block__button_incart : styles.block__button_not_cart} onClick={() => addProductToCart(id)}>{dataForButton(id)}</button>
          </div>
        </div>
      </div>
      <div className={styles.block__description}>
        <h3>Описание</h3>
        <hr />
        <p>{product.description}</p>
      </div>
      <div className={styles.reviews}>
        <ProductReview productId={product._id} feedBack={product.reviews} />
      </div>
    </div>

  )
}
