/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../custom/useApi'
import { getListFavouriteProducts } from '../../redux/slice/favouriteSlice/favouriteSlice'
import { getTokenSelector } from '../../redux/slice/tokenSlice/tokenSlice'
import { CardProduct } from '../CardProduct/CardProduct'
import { EmptyListFavourite } from '../EmptyListFavourite/EmptyListFavourite'
import styles from './styles.module.css'

export function Favourite() {
  const token = useSelector(getTokenSelector)
  const favourite = useSelector(getListFavouriteProducts)
  const { getProductsById } = useApi()
  const KEY_FOR_QUERY = ['getProductsByIdForFavourite']
  const getKeyForQuery = (idProducts) => KEY_FOR_QUERY.concat(idProducts)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [])

  const { error, isLoading, data: products } = useQuery({
    queryKey: getKeyForQuery(favourite),
    queryFn: () => getProductsById(favourite),
  })
  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  return (
    <div>
      <h1 className={styles.heading}>Избранные товары</h1>
      {favourite.length === 0 ? <EmptyListFavourite />
        : (
          <div className={styles.container}>
            {products.map((product) => (
              <div key={product._id}>
                <CardProduct product={product} />
              </div>
            ))}

          </div>
        )}
    </div>
  )
}
