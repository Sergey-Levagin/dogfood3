/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */

import { Field, Form, Formik } from 'formik'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as Yup from 'yup'
import { useApi } from '../../custom/useApi'
import styles from './styles.module.css'
import { CustomTextareaComponent } from './CustomTextareaComponent'

export function ProductReview({ productId }) {
  const {
    getFeedbackProductById, addFeedbackProductById, dataUser, deleteReviewByIdProduct,
  } = useApi()

  const queryClient = useQueryClient()

  const mutationAddFeedback = useMutation({
    mutationFn: addFeedbackProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getFeedbackProductById', productId] })
    },
  })

  const mutateDeleteReview = useMutation({
    mutationFn: deleteReviewByIdProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getFeedbackProductById', productId] })
    },
  })

  const { data: user } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => dataUser(),
  })

  function generatorIconStar(counter) {
    // eslint-disable-next-line prefer-spread
    const arr = Array.apply(null, { length: counter }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
    ))
    return arr
  }

  const {
    isLoading, error, data: reviews,
  } = useQuery({
    queryKey: ['getFeedbackProductById', productId],
    queryFn: () => getFeedbackProductById(productId),
  })

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  const getProductCreatedTimestamp = (value) => {
    const date = new Date(value)
    return date.toLocaleDateString()
  }

  const SignupSchema = Yup.object().shape({
    text: Yup.string()
      .required('Поле обязательное для заполнения!'),
    rating: Yup.number()
      .required('Required'),
  })

  return (
    <>
      <div>
        <h3>Отзывы о товаре</h3>
        <p className={styles.reviews_count}>{reviews.length}</p>
        <hr />
      </div>
      <div style={reviews.length !== 0 ? { display: 'none' } : { display: 'inline' }}>
        <p className={styles.reviews_count_text}>
          Отзывов пока нет, но ваш может стать первым
          <br />
          Поделитесь мнением о покупке и помогите другим покупателям сделать выбор
        </p>
      </div>
      <div className={styles.container}>
        { reviews?.map((review) => (
          <div key={review._id} className={styles.container__block}>
            <div className={styles.container__header}>
              <div className={styles.header__avatar}>
                <img src={review.author.avatar} alt="avatar" />
                <h5>{review.author.name}</h5>
              </div>
              <div className={styles.header__rating}>
                <div className={styles.header__rating__date}>
                  <p>{getProductCreatedTimestamp(review.created_at)}</p>
                </div>
                <span className={styles.header__rating__on}>
                  {generatorIconStar(review.rating)}
                </span>
                <span className={styles.header__rating__off}>
                  {generatorIconStar(5 - (review.rating))}
                </span>
              </div>
            </div>
            <div className={styles.container__text}>
              <p>{review.text}</p>
            </div>
            <div
              className={styles.container__block__button_del}
            >
              {user._id === review.author._id
                ? (
                  <button onClick={() => mutateDeleteReview.mutateAsync({ productId, idReview: review._id })} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg>
                  </button>
                ) : ''}
            </div>

          </div>
        ))}
        <hr className={styles.container_hr} />
        <div className={styles.container__form}>
          <div className={styles.container__form__header}>
            <div className={styles.header__avatar}>
              <img src={user.avatar} alt="avatar" />
              <h5>{user.name}</h5>
            </div>
          </div>
          <div>
            <Formik
              initialValues={{ text: '', id: productId, rating: 5 }}
              validationSchema={SignupSchema}
              onSubmit={(value, helpers) => {
                mutationAddFeedback.mutateAsync(value)
                helpers.resetForm({ value })
              }}
            >
              {({ errors, touched }) => (
                <Form className={styles.container__form__text}>
                  <div className={styles.block_rating_area}>
                    <p>Рейтинг</p>
                    <div className={styles.rating_area}>
                      <Field type="radio" id="star-5" name="rating" value="5" />
                      <label htmlFor="star-5" title="Оценка «5»" />
                      <Field type="radio" id="star-4" name="rating" value="4" />
                      <label htmlFor="star-4" title="Оценка «4»" />
                      <Field type="radio" id="star-3" name="rating" value="3" />
                      <label htmlFor="star-3" title="Оценка «3»" />
                      <Field type="radio" id="star-2" name="rating" value="2" />
                      <label htmlFor="star-2" title="Оценка «2»" />
                      <Field type="radio" id="star-1" name="rating" value="1" />
                      <label htmlFor="star-1" title="Оценка «1»" />
                    </div>
                  </div>
                  <Field name="text" as={CustomTextareaComponent} placeholder="Ваш отзыв..." />
                  {errors.text && touched.text ? (
                    <div className={styles.form__errors_text}>{errors.text}</div>
                  ) : null}
                  <button type="submit">Отправить</button>
                </Form>
              )}
            </Formik>
          </div>

        </div>
      </div>
    </>
  )
}

// getKeyForQuery(feed?.reviews?.map((el) => el._id))
// feed?.reviews.map((el) => el._id)
