/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCalculationCart } from '../../custom/useCalculationCart'
import { addProductInCart, getCartSelector } from '../../redux/slice/cartSlice.js/cartSlice'
import styles from './styles.module.css'

export function CartProduct({ product }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(getCartSelector)
  const { priceCalculation } = useCalculationCart()
  function addProductToCart(id) {
    dispatch(addProductInCart(id))
  }

  function dataProduct(id) {
    navigate(`/product_id:${id}`)
  }

  function dataForButton(id) {
    if (cart.some((prod) => prod.id === id)) {
      return 'В корзине'
    } return 'Купить'
  }

  function dataForButtonColor(id) {
    if (cart.some((prod) => prod.id === id)) {
      return styles.block__button_incart
    } return styles.block__button_not_cart
  }
  function checkingTheProductDiscount(discount, price) {
    if (discount) {
      return `${price} P`
    } return ' '
  }
  function tegDiscount(discount) {
    if (discount) {
      return <p className={styles.block_discount}>{`-${discount}%`}</p>
    } return ' '
  }
  return (
    <div
      className={styles.block}
    >
      <div className={styles.block_img}>
        {tegDiscount(product.discount)}
        <img
          src={product.pictures}
          alt="описание"
        />
      </div>
      <div className={styles.block__name_product}>
        <p onClick={() => dataProduct(product._id)}>{product.name}</p>
      </div>
      <div className={styles.block__price}>
        <del>
          {checkingTheProductDiscount(product.discount, product.price)}
        </del>
        <h4 style={product.discount ? { color: 'rgb(212, 35, 35)' } : { color: 'black' }}>
          {priceCalculation(product.price, product.discount)}
          {' '}
          P
        </h4>
      </div>
      <div className={styles.block__button}>
        <button type="button" className={dataForButtonColor(product._id)} onClick={() => addProductToCart(product._id)}>{dataForButton(product._id)}</button>
      </div>
    </div>
  )
}
