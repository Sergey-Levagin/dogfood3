/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import { useCalculationCart } from '../../custom/useCalculationCart'
import {
  changeCheckboxForOneProduct,
  clearProductFromCartById, clearProductFromCartBySelection,
  getCartSelector,
} from '../../redux/slice/cartSlice.js/cartSlice'
import { getTokenSelector } from '../../redux/slice/tokenSlice/tokenSlice'
import { EmptyCart } from '../EmptyCart/EmptyCart'
import styles from './styles.module.css'

export function Cart() {
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()

  const cart = useSelector(getCartSelector)
  const { getProductsById } = useApi()
  const dispatch = useDispatch()
  const KEY_FOR_QUERY = ['getProductsById']
  const getKeyForQuery = (idProducts) => KEY_FOR_QUERY.concat(idProducts)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [])

  const {
    addCountProdutInCart, addCheckboxProdutInCart,
    decrementProductInCart, incrementProductInCart,
    priceCalculation, defaultValueCheckboxForAllProducts,
    changeValueCheckboxForAllProducts, calculationCostProduct,
    calculationCostCart, maxQuantityAvailableProduct, discountProductsInCart,
    discountAllProductsInCart, getCountAllProductsInCartByCheckboxTrue,
  } = useCalculationCart()

  function tegDiscount(discount) {
    if (discount) {
      return <p className={styles.block_discount}>{`-${discount}%`}</p>
    } return ' '
  }

  const { isLoading, error, data: products } = useQuery({
    queryKey: getKeyForQuery(cart.map((product) => product.id)),
    queryFn: () => getProductsById(cart.map((product) => product.id)),
  })
  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  return (
    <div className={styles.container}>
      <h1>Корзина</h1>
      {cart.length === 0 ? <EmptyCart />
        : (
          <div className={styles.container__product_cart}>
            <div>
              <div className={styles.container__selection}>
                <input
                  checked={defaultValueCheckboxForAllProducts()}
                  type="checkbox"
                  onChange={() => changeValueCheckboxForAllProducts()}
                />
                <button type="button" onClick={() => dispatch(clearProductFromCartBySelection())}>
                  Удалить выбранные товары

                </button>
              </div>
              <div className={styles.container__products}>
                {products.map((prod) => ((
                  <div key={prod._id} className={styles.block}>
                    <div>
                      <input
                        checked={addCheckboxProdutInCart(prod._id)}
                        onChange={() => dispatch(changeCheckboxForOneProduct(prod._id))}
                        type="checkbox"
                      />
                    </div>
                    <div className={styles.block_img}>
                      {tegDiscount(prod.discount)}
                      <img
                        src={prod.pictures}
                        alt="описание"
                      />
                    </div>
                    <div className={styles.block__product_name}>
                      <p onClick={() => navigate(`/product_id:${prod._id}`)}>{prod.name}</p>

                    </div>
                    <div>
                      <div className={styles.block__counter}>
                        <button
                          disabled={addCountProdutInCart(prod._id) === 1}
                          type="button"
                          onClick={() => decrementProductInCart(prod._id)}
                        >
                          -

                        </button>
                        <input
                          id={prod._id}
                          value={addCountProdutInCart(prod._id)}
                          readOnly
                        />
                        <button
                          disabled={addCountProdutInCart(prod._id) === prod.stock}
                          onClick={() => incrementProductInCart(prod._id, prod.stock)}
                          type="button"
                        >
                          +

                        </button>
                      </div>
                      <div className={styles.block__price}>
                        <p>{maxQuantityAvailableProduct(prod._id, prod.stock)}</p>
                        <p>
                          {priceCalculation(prod.price, prod.discount)}
                          {' '}
                          Р
                          {' '}
                          /шт.
                        </p>
                        <button type="button" onClick={() => dispatch(clearProductFromCartById(prod._id))}>
                          Удалить

                        </button>
                      </div>
                    </div>
                    <div className={styles.block__cost}>
                      <h4 style={prod.discount ? { color: 'rgb(212, 35, 35)' } : { color: 'black' }}>
                        {calculationCostProduct(prod.price, prod.discount, prod._id)}
                        {' '}
                        P
                      </h4>
                      <del style={{ color: 'grey' }}>{discountProductsInCart(prod._id, prod.price, prod.discount)}</del>
                    </div>
                  </div>
                )))}
              </div>

            </div>
            <div className={styles.container__cart}>
              <div><h4>Итого</h4></div>
              <hr />
              <div className={styles.cart__block}>
                <div className={styles.cart__block_discount}>
                  <span>Товаров</span>
                  <span>{getCountAllProductsInCartByCheckboxTrue()}</span>
                </div>
                <div className={styles.cart__block_discount}>
                  <span>
                    Скидка
                    {' '}
                  </span>
                  <span>
                    {discountAllProductsInCart(products)}
                    {' '}
                    P
                  </span>
                </div>
                <div className={styles.cart__block_cost}>
                  <span>
                    К оплате:
                    {' '}
                  </span>
                  <span>
                    {calculationCostCart(products)}
                    {' '}
                    P
                  </span>
                </div>
              </div>
              <button type="button">Оформить заказ</button>
            </div>
          </div>
        )}
    </div>
  )
}

/* onChange={(event) => dispatch(changeQuantityProduct({
  id: prod._id,
  count: event.target.value,
}))} */
