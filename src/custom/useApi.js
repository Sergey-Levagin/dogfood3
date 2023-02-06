/* eslint-disable no-constant-condition */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addToken, getTokenSelector,
} from '../redux/slice/tokenSlice/tokenSlice'
import { URL_ADDRESS } from '../utils/constant'

export const useApi = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)

  function getNameGroupByToken() {
    if (token) {
      const payloadToken = token.split('.')
      const str = atob(payloadToken[1])
      const objToken = JSON.parse(str)
      return objToken.group
    } return ''
  }
  const group = getNameGroupByToken()

  async function signUp(data) {
    const response = await fetch(`${URL_ADDRESS}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    try {
      if (response.status === 201) {
        alert('Вы успешно зарегистрировались')
        navigate('/signin')
      } else if (response.status === 409 || 400) {
        throw new SyntaxError(res.message)
      } else {
        throw SyntaxError('Ошибка сервера')
      }
    } catch (error) {
      alert(error)
    }
  }

  async function dataUser() {
    const response = await fetch(`${URL_ADDRESS}v2/${group}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return res
    }
  }

  async function signIn(values) {
    const response = await fetch(`${URL_ADDRESS}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        dispatch(addToken(res.token))
        navigate('/products')
        alert('Вход успешно выполнен')
      } else if (response.status === 401 || 404) {
        throw new SyntaxError(res.message)
      } else {
        throw SyntaxError('Ошибка сервера')
      }
    } catch (error) {
      alert(error)
    }
  }

  async function getAllProducts() {
    const response = await fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      return res
    }
  }

  async function getDataProduct(id) {
    const response = await fetch(`https://api.react-learning.ru/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      return res
    }
  }
  async function getProductsById(ids) {
    const response = await Promise.all(ids.map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())))

    const res = response.map((data) => data)
    return res
    /* try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      return res
    } */
  }
  async function searchProducts(text) {
    const response = await fetch(`https://api.react-learning.ru/products/search?query=${text}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return null
    }
  }

  async function getFeedbackProductById(id) {
    const response = await fetch(`https://api.react-learning.ru/products/review/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return null
    }
  }
  async function addFeedbackProductById(values) {
    const { id, ...value } = values

    const response = await fetch(`https://api.react-learning.ru/products/review/${id}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })

    const res = await response.json()
    try {
      if (response.status === 200) {
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return null
    }
  }

  async function addNewProduct({ id, ...value }) {
    const response = await fetch('https://api.react-learning.ru/products', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })

    const res = await response.json()
    try {
      if (response.status === 201) {
        alert('Товар добавлен')
        navigate('/products')
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return null
    }
  }

  async function deleteReviewByIdProduct({ idReview, productId }) {
    const response = await fetch(`https://api.react-learning.ru/products/review/${productId}/${idReview}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        alert('Отзыв удален')
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return res
    }
  }

  async function editProductByIdProduct(values) {
    const { id: idProduct, ...value } = values
    const response = await fetch(`https://api.react-learning.ru/products/${idProduct}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        alert('Товар успешно отредактирован')
        navigate(`/product_id:${idProduct}`)
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return res
    }
  }

  async function deleteProductById(id) {
    const response = await fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    try {
      if (response.status === 200) {
        alert('Товар удален')
        navigate('/products')
        return res
      }
      throw new SyntaxError(res.message)
    } catch (error) {
      alert(error)
      return res
    }
  }
  return {
    signUp,
    signIn,
    dataUser,
    getAllProducts,
    getDataProduct,
    getProductsById,
    searchProducts,
    getFeedbackProductById,
    addFeedbackProductById,
    addNewProduct,
    deleteReviewByIdProduct,
    editProductByIdProduct,
    deleteProductById,
  }
}
