import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}> 
        <div className={styles.logo}>
            Nishant Thapa
        </div>
        <div className={styles.text}>All right are reserved NTC</div>
    </div>
  )
}

export default Footer