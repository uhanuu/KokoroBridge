import Image from "next/image";
import Link from "next/link";

import styles from "./navigation.module.css";

export default function Navigation() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href={"#"} className={styles.navItem}>
          <Image src={"/home_icon.png"} width={25} height={25} alt="홈 이동" />
          <span>홈</span>
        </Link>
        <Link href={"#"} className={styles.navItem}>
          <Image src={"/pencil_icon.png"} width={25} height={25} alt="히라가나 이동" />
          <span>히라가나</span>
        </Link>
        <Link href={"#"} className={styles.navItem}>
          <Image src={"/pencil_icon.png"} width={25} height={25} alt="카타카나 이동" />
          <span>카타카나</span>
        </Link>
        <Link href={"#"} className={styles.navItem}>
          <Image src={"/sample_icon.png"} width={25} height={25} alt="전체 이동" />
          <span>전체</span>
        </Link>
      </nav>
    </div>
  );
}
