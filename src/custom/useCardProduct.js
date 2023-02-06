/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux'
import { addProductInCart, getCartSelector } from '../redux/slice/cartSlice.js/cartSlice'
import { getListFavouriteProducts } from '../redux/slice/favouriteSlice/favouriteSlice'

export const useCardProduct = () => {
  const cart = useSelector(getCartSelector)
  const favourite = useSelector(getListFavouriteProducts)
  const dispatch = useDispatch()

  function checkingTheProductDiscount(discount, price) {
    if (discount) {
      return `${price} P`
    } return ' '
  }

  function dataForButtonColor(idProduct) {
    if (cart.some((prod) => prod.id === idProduct)) {
      return true
    } return false
  }

  function dataForButton(idProduct) {
    if (cart.some((prod) => prod.id === idProduct)) {
      return 'В корзине'
    } return 'Купить'
  }

  function checkProductInFavourite(idProduct) {
    return favourite.includes(idProduct)
  }

  function tegDiscount(discount) {
    if (discount) {
      return `-${discount}%`
    } return ' '
  }

  function addProductToCart(id) {
    dispatch(addProductInCart(id))
  }

  function averageRatingProduct(reviews) {
    let ratings = 0
    if (reviews.length) {
      reviews.forEach((element) => {
        ratings += element.rating
      })
      return (ratings / reviews.length).toFixed(2)
    }
    return ratings
  }

  return {
    checkingTheProductDiscount,
    dataForButton,
    checkProductInFavourite,
    tegDiscount,
    dataForButtonColor,
    addProductToCart,
    averageRatingProduct,

  }
}
