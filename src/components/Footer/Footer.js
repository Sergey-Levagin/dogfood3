import stylesFooter from './styles.module.css'

export function Footer() {
  return (
    <footer className={stylesFooter.footer}>
      <div className={stylesFooter.logo}>
        Logo
      </div>
      <div className={stylesFooter.menu_left}>
        <ul>
          <li>Каталог</li>
          <li>Акции</li>
          <li>Новости</li>
          <li>Отзывы</li>
        </ul>
      </div>
      <div className={stylesFooter.menu_right}>
        <ul>
          <li>Оплата</li>
          <li>Доставка</li>
          <li>Часто спрашивают</li>
          <li>Контакты</li>
        </ul>
      </div>
      <div className={stylesFooter.contacts}>
        <h3>Мы на связи</h3>
        <h3>8(999)999-99-99</h3>
        <p>dogfood@mail.ru</p>
        <ul className={stylesFooter.icons}>
          <li>I</li>
          <li>T</li>
          <li>Vk</li>
          <li>Wt</li>
        </ul>
      </div>
    </footer>
  )
}
