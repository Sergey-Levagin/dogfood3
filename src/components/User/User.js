import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useApi } from '../../custom/useApi'
import stylesUser from './styles.module.css'
import { clearToken, getTokenSelector } from '../../redux/slice/tokenSlice/tokenSlice'
import { deleteAllProductsFromCart } from '../../redux/slice/cartSlice.js/cartSlice'

export function User() {
  const { dataUser } = useApi()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [])

  function submit() {
    dispatch(deleteAllProductsFromCart())
    dispatch(clearToken())
    localStorage.clear()
    navigate('/signin')
  }

  const {
    isLoading, error, data: user,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => dataUser(),
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  return (
    <div className={stylesUser.container}>
      <div><h2>Личный кабинет</h2></div>
      <div className={stylesUser.block}>
        <div className={stylesUser.avatar}><img src={user.avatar} alt="" /></div>
        <div>
          <p>
            Фамилия Имя :
            {' '}
            <span>{ user.name}</span>
          </p>
          <p>
            Тип :
            {' '}
            <span>{user.about}</span>
          </p>
          <p>
            группа :
            {' '}
            <span>{user.group}</span>
          </p>
          <p>
            email :
            {' '}
            <span>{user.email}</span>
          </p>
          <button type="button" onClick={() => submit()}>Выйти</button>
        </div>

      </div>
    </div>
  )
}
