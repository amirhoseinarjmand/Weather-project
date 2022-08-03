import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <p className={styles.navText}>
          نام شهر مورد نظر را در کادر ورودی وارد کنید تا اطلاعات آب و هوایی آن را مشاهده کنید
        </p>
      </div>
    </>
  );
};

export default Navbar;
