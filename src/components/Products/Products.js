/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import { getValueSearchSelector } from '../../redux/slice/searchSlice/searchSlice'
import { getTokenSelector } from '../../redux/slice/tokenSlice/tokenSlice'
import { CartProduct } from '../CartProduct/CardProduct'
import styles from './styles.module.css'

export function Products() {
  const { searchProducts } = useApi()
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)
  const search = useSelector(getValueSearchSelector)
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!token) return navigate('/signin')
  }, [])

  const {
    isLoading, error, data: products,
  } = useQuery({
    queryKey: [`getAllProducts + ${search}`],
    queryFn: () => searchProducts(search),
  })

  function titleOfTheSearchResult() {
    if (search) {
      return `По запросу ${search} найдено ${products.length} товара(ов)`
    } return ''
  }

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`
  return (
    <>
      <h2 className={styles.h1}>{titleOfTheSearchResult()}</h2>
      <div className={styles.container}>
        {products?.map((product) => (
          (
            <div className={styles.block_product} key={product._id}>
              <CartProduct product={product} />
            </div>
          )

        )) }
      </div>
    </>
  )
}
