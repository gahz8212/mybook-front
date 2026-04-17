import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from './lib/axios';
import styles from '@/styles/auth.module.scss'
import Link from 'next/link';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirm_password: ''
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입 요청 핸들러
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("회원가입 요청 데이터:", formData);
      const response = await api.post('/api/join', formData);

      if (response.status === 200 || response.status === 201) {
        alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
        router.push('/login');
      }
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>

        <h1 className={styles.title}>JOIN</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>이름</label>
            <input
              type="name"
              value={formData.name}
              name="name"
              onChange={(e) => handleChange(e)}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label  className={styles.label}>이메일</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => handleChange(e)}
              className={styles.input}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <label  className={styles.label}>비밀번호</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={(e) => handleChange(e)}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label  className={styles.label}>비밀번호 확인</label>
            <input
              type="password"
              value={formData.confirm_password}
              name="confirm_password"
              onChange={(e) => handleChange(e)}
              className={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.button}
          >회원가입
          </button>
          <Link href="/login" className={styles.link}>로그인</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;