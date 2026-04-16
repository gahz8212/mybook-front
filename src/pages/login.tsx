import { useState } from 'react';
import api from './lib/axios';
import { useRouter } from 'next/router';
import { useAuthStore } from "@/store/useAuthStore";
import styles from '../styles/auth.module.scss'
import Link from 'next/link';

export default function LoginPage() {
  const { setLogin } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/login', {
        email,
        password,
      });

      // 서버에서 받은 TokenDto 확인
      console.log('로그인 성공:', response.data);
      setLogin(response.data)
      // const { accessToken } = response.data;

      // 1. 액세스 토큰 저장 (일단 로컬스토리지에 저장)
      // localStorage.setItem('accessToken', accessToken);

      alert('로그인 성공!');
      router.push('/'); // 메인 페이지로 이동
    } catch (error: any) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>LOGIN</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <div>
            <label className={styles.label}>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.button}
          >
            로그인
          </button>
          <Link href="/join" className={styles.link}>회원가입</Link>
        </form>
      </div>
    </div>
  );
}