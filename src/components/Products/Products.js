/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import { useSortProduct } from '../../custom/useSortProduct'
import { getValueSearchSelector } from '../../redux/slice/searchSlice/searchSlice'
import { getValueSortProduct, setValueSort } from '../../redux/slice/sortProductSlice/sortProductSlice'
import { valueSortProduct } from '../../redux/slice/sortProductSlice/valueSortProduct'
import { getTokenSelector } from '../../redux/slice/tokenSlice/tokenSlice'
import { CardProduct } from '../CardProduct/CardProduct'
import styles from './styles.module.css'

export function Products() {
  const token = useSelector(getTokenSelector)
  const { searchProducts } = useApi()
  const navigate = useNavigate()
  const search = useSelector(getValueSearchSelector)
  const dispatch = useDispatch()
  const { getSortListProductsByFilter } = useSortProduct()
  const [searchParams, setSearchParams] = useSearchParams()
  // const valueSort = searchParams.get('filter') ?? useSelector(getValueSortProduct)
  const valueSort = useSelector(getValueSortProduct)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [])

  useEffect(() => {
    if (token) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filter: valueSort,
      })
    }
  }, [valueSort])

  function stylesForActionButtonSort(valueButton) {
    if (valueButton === valueSort) {
      return styles.block__filter_button_on
    }
    return styles.block__filter_button_off
  }
  const {
    isLoading, error, data,
  } = useQuery({
    queryKey: [`getAllProducts + ${search}`],
    queryFn: () => searchProducts(search),
    enabled: !!token,
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  const products = valueSort === '' ? data : getSortListProductsByFilter(data)

  function titleOfTheSearchResult() {
    if (search) {
      return (
        <h2 className={styles.h1}>
          По запросу
          {' '}
          &quot;
          {search}
          &quot;
          {' '}
          найдено
          {' '}
          {products.length}
          {' '}
          товара(ов)
        </h2>
      )
    } return ''
  }

  return (
    <>
      {titleOfTheSearchResult()}
      <div className={styles.block__filter}>
        <button className={stylesForActionButtonSort(valueSortProduct.POPULAR)} onClick={() => dispatch(setValueSort(valueSortProduct.POPULAR))} type="button">Популярные</button>
        <button className={stylesForActionButtonSort(valueSortProduct.NEW)} onClick={() => dispatch(setValueSort(valueSortProduct.NEW))} type="button">Новинки</button>
        <button className={stylesForActionButtonSort(valueSortProduct.DISCOUNT)} onClick={() => dispatch(setValueSort(valueSortProduct.DISCOUNT))} type="button">Акции</button>
        <button className={stylesForActionButtonSort(valueSortProduct.PRICE_UP)} onClick={() => dispatch(setValueSort(valueSortProduct.PRICE_UP))} type="button">Сначала дорогие</button>
        <button className={stylesForActionButtonSort(valueSortProduct.PRICE_BOTTOM)} onClick={() => dispatch(setValueSort(valueSortProduct.PRICE_BOTTOM))} type="button">Сначала дешевые</button>
      </div>
      <div className={styles.container}>
        {products?.map((product) => (
          (
            <div className={styles.block_product} key={product._id}>
              <CardProduct product={product} />
            </div>
          )

        )) }
      </div>
    </>
  )
}

// dispatch(setValueSort(searchParams.get('filter') ?? ''))
