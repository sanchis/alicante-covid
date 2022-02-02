import LoadingIcon from 'components/icons/LoadingIcon'
import { useRouter } from 'next/router'
import styles from './loading.module.css'
import { useEffect, useState } from 'react'
export default function Loading () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setLoadingSpinner = () => {
      setLoading(true)
    }
    const unsetLoadingSpinner = () => {
      setLoading(false)
    }
    router.events.on('routeChangeStart', setLoadingSpinner)
    router.events.on('routeChangeComplete', unsetLoadingSpinner)
    router.events.on('routeChangeError', unsetLoadingSpinner)
    return () => {
      router.events.off('routeChangeStart', setLoadingSpinner)
      router.events.off('routeChangeComplete', unsetLoadingSpinner)
      router.events.off('routeChangeError', unsetLoadingSpinner)
    }
  }, [])

  const LoaderComponent = () =>
    <div className={styles.containerLoading}>
      <div className={styles.icon}>
        <LoadingIcon width='50%' height='50%' />
      </div>
    </div>

  return (
    loading
      ? <LoaderComponent />
      : null

  )
}
