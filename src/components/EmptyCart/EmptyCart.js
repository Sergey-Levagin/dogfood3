import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export function EmptyCart() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div>
          <div className={styles.container__img}><img src="https://pixy.org/src/457/thumbs350/4575342.jpg" alt="пустая коризна" /></div>
          <h3>Ваша коризина пуста</h3>
        </div>
        <div className={styles.container__button}>
          <button onClick={() => navigate('/products')} type="button">Перейти в каталог</button>
        </div>
      </div>
    </div>
  )
}
