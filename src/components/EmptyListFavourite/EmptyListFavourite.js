import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export function EmptyListFavourite() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.container__img}>
          <img alt="dog_heart" src="https://thumbs.dreamstime.com/b/ми-ая-собака-шаржа-умает-я-того-чтобы-по-юбить-vector-и-юстрация-42335258.jpg" />
        </div>
        <p>
          Раздел Избранные товары пуст.
          <br />
          Для добавления товара в избранные нажмите на сердечко.
        </p>
        <div className={styles.container__button}>
          <button onClick={() => navigate('/products')} type="button">Перейти в каталог</button>
        </div>
      </div>
    </div>
  )
}
