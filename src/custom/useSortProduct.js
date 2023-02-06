import { useSelector } from 'react-redux'
import { getValueSortProduct } from '../redux/slice/sortProductSlice/sortProductSlice'
import { useCalculationCart } from './useCalculationCart'
import { valueSortProduct } from '../redux/slice/sortProductSlice/valueSortProduct'

export function useSortProduct() {
  const valueSort = useSelector(getValueSortProduct)
  const { priceCalculation } = useCalculationCart()

  function getTimeCreatedProduct(timeCreated) {
    const date = new Date(timeCreated)
    return date.valueOf()
  }

  function getProductsByPopular(products) {
    return products.sort((a, b) => b.likes.length - a.likes.length)
  }

  function getProductsByDiscount(products) {
    const listDiscountProducts = products.filter((product) => product.discount !== 0)
    return listDiscountProducts.sort((a, b) => b.discount - a.discount)
  }

  function getProductsByNew(products) {
    return products.sort((a, b) => getTimeCreatedProduct(b.created_at)
      - getTimeCreatedProduct(a.created_at))
  }

  function getProductsByPriceBottom(products) {
    return products.sort((a, b) => priceCalculation(a.price, a.discount)
      - priceCalculation(b.price, b.discount))
  }

  function getProductsByPriceUp(products) {
    return products.sort((a, b) => priceCalculation(b.price, b.discount)
      - priceCalculation(a.price, a.discount))
  }

  function getSortListProductsByFilter([...products]) {
    switch (valueSort) {
      case valueSortProduct.POPULAR:
        return getProductsByPopular(products)
      case valueSortProduct.DISCOUNT:
        return getProductsByDiscount(products)
      case valueSortProduct.NEW:
        return getProductsByNew(products)
      case valueSortProduct.PRICE_BOTTOM:
        return getProductsByPriceBottom(products)
      case valueSortProduct.PRICE_UP:
        return getProductsByPriceUp(products)
      default:
        console.log(products)
        return products
    }
  }
  return { getSortListProductsByFilter }
}
