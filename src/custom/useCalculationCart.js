/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import {
  chengeCheckboxForAllProducts, getCartSelector, increaseQuantityProduct, reduceQuantityProduct,
} from '../redux/slice/cartSlice.js/cartSlice'

export const useCalculationCart = () => {
  const cart = useSelector(getCartSelector)
  const dispatch = useDispatch()

  const addCountProdutInCart = (id) => {
    const elem = cart.find((product) => product.id === id)
    return elem.count
  }

  const addCheckboxProdutInCart = (id) => {
    const elem = cart.find((product) => product.id === id)
    return elem.checkbox
  }

  function decrementProductInCart(id) {
    const valueElement = document.getElementById(id).value
    if (valueElement > 1) {
      document.getElementById(id).value = valueElement - 1
      dispatch(reduceQuantityProduct(id))
    }
  }

  function incrementProductInCart(id, stock) {
    const valueElement = document.getElementById(id).value
    if (valueElement < stock) {
      document.getElementById(id).value = Number(valueElement) + 1
      dispatch(increaseQuantityProduct(id))
    }
  }

  function priceCalculation(price, discount) {
    return Math.trunc(price - (price / 100) * discount)
  }

  function defaultValueCheckboxForAllProducts() {
    return cart.every((prod) => prod.checkbox === true)
  }

  function changeValueCheckboxForAllProducts() {
    const valueAllCheckbox = defaultValueCheckboxForAllProducts()
    dispatch(chengeCheckboxForAllProducts(valueAllCheckbox))
  }

  function calculationCostProduct(price, discount, id) {
    const priceProduct = priceCalculation(price, discount)
    const element = cart.find((prod) => prod.id === id)
    return priceProduct * element.count
  }

  function calculationCostCart(products) {
    let cost = 0
    cart.map((product) => {
      if (product.checkbox) {
        const element = products.find((prod) => prod._id === product.id)
        const price = priceCalculation(element.price, element.discount)
        cost += (price * product.count)
      } return product
    })
    return cost
  }

  function maxQuantityAvailableProduct(id, stock) {
    const count = addCountProdutInCart(id)
    if (count === stock) {
      return `Доступно ${stock} шт.`
    } return ''
  }
  function discountProductsInCart(id, price, discount) {
    const element = cart.find((prod) => prod.id === id)
    if (discount) {
      return `${element.count * price} P`
    }
    return ' '
  }
  function discountAllProductsInCart(products) {
    let cost = 0
    const discountedPrice = calculationCostCart(products)
    cart.map((product) => {
      if (product.checkbox) {
        const element = products.find((prod) => prod._id === product.id)
        const { price } = element
        cost += price * product.count
      } return product
    })
    return Math.trunc(cost - discountedPrice)
  }
  return {
    addCountProdutInCart,
    addCheckboxProdutInCart,
    decrementProductInCart,
    incrementProductInCart,
    priceCalculation,
    defaultValueCheckboxForAllProducts,
    changeValueCheckboxForAllProducts,
    calculationCostProduct,
    calculationCostCart,
    maxQuantityAvailableProduct,
    discountProductsInCart,
    discountAllProductsInCart,
  }
}
