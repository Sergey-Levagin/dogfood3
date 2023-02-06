/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
// import { useState } from 'react'
import {
  Link, useNavigate, useSearchParams,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ReactComponent as Search } from './search.svg'
import { ReactComponent as Xmark } from './xmark-solid.svg'
import { ReactComponent as Cart } from './cart-shopping.svg'
import { ReactComponent as Favourite } from './heart-solid.svg'
import { ReactComponent as UserIkon } from './user-solid.svg'
import stylesHeader from './styles.module.css'
import { addValueSearch } from '../../redux/slice/searchSlice/searchSlice'
import { getCartSelector } from '../../redux/slice/cartSlice.js/cartSlice'
import { useDebounce } from '../../custom/useDebounce'
import { clearValueSort } from '../../redux/slice/sortProductSlice/sortProductSlice'
import { getListFavouriteProducts } from '../../redux/slice/favouriteSlice/favouriteSlice'

export function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(getCartSelector)
  const favourite = useSelector(getListFavouriteProducts)
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(() => searchParams.get('q') ?? '')
  const debounceValue = useDebounce(input, 500)

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: input,
    })
  }, [input])

  useEffect(() => {
    dispatch(addValueSearch(debounceValue))
  }, [debounceValue])

  const submit = () => {
    if (input) {
      navigate(`/products?${searchParams}`)
    }
  }
  const clear = () => {
    setInput('')
    dispatch(clearValueSort())
  }

  return (
    <header className={stylesHeader.header}>
      <div className={stylesHeader.header__start}>
        <img className={stylesHeader.logo} src="logo-dog.png" alt="logo" />
        <Link to="products" onClick={clear}><h2>DogFood</h2></Link>
      </div>
      <div className={stylesHeader.header__search}>
        <input placeholder="Поиск..." value={input} onChange={(event) => setInput(event.target.value)} type="search" />
        <button>
          { input ? (
            <>
              <Xmark onClick={clear} />
              {' '}
              <Search onClick={submit} />
            </>
          ) : <Search onClick={submit} />}
        </button>
      </div>
      <div className={stylesHeader.header__end}>
        <ul>
          <li>
            <Link to="/favourite">
              {favourite?.length ? <p className={stylesHeader.end_favourite_count}>{favourite.length}</p> : ''}
              <Favourite />
            </Link>
          </li>
          <li className={stylesHeader.header__end_cart}>
            <Link to="/cart">
              {cart?.length ? <p className={stylesHeader.end_cart_count}>{cart.length}</p> : ''}
              <Cart />
            </Link>
          </li>
          <li>
            <Link to="/user"><UserIkon /></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
