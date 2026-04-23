import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from "@/store/useAuthStore"
import styles from './Layout.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
interface LayoutProps {
  children: ReactNode;
}
//chidren타입을 LayoutProps라는 인터페이스로 감쌌으니까 {children}:LayoutProps가 되는 것

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { isLoggedIn, setLogout, roles, userName } = useAuthStore();
  const handledJoin = () => {
    router.push('/join');
  }
  const handledLogout = () => {
    setLogout();
    router.push('/login');
  }
  const hideLayout = ['/login', '/join'].includes(router.pathname)
  console.log('roles', roles)
  return (
    <div className={styles.container} >
      {!hideLayout && <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">MY LOGO</Link>
        </nav>
        <div>{isLoggedIn ? (
          <>
            <span className={styles.username}>{userName}</span>
            <button className={styles.authButton} onClick={handledLogout}>로그아웃</button>
            {roles.includes("ROLE_ADMIN") ? <button className={cx('authButton')}><Link href="/Manage">관리자</Link></button> : ""}
          </>

        ) : (
          <button className={styles.authButton} onClick={handledJoin}>회원가입</button>
        )}
        </div>
      </header>}
      <main className={styles.main}>
        {children}
      </main>
      {!hideLayout && <footer className={styles.footer}>
        <p>@ 2026 Next.js SCSS Project</p>
      </footer>}
    </div>
  )
}
export default Layout;