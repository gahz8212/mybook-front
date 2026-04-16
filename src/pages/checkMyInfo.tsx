import api from './lib/axios'
import { useState } from 'react'

const Profile = () => {
  const [message, setMessage] = useState<string>("");


  const checkMyInfo = async () => {
    try {
      const response = await api.get("/api/user/me");
      setMessage(response.data)
    } catch (error) {
      console.error('인증 실패:', error);
      setMessage('인증에 실패했습니다.');
    }
  }
  return (
    <div style={{ padding: '20px' }}>
      <h1>Next.js 인증 테스트</h1>
      <button onClick={checkMyInfo}>내 정보 가져오기</button>
      {message && <p style={{ marginTop: '10px', color: 'blue' }}>서버 응답: {message}</p>}
    </div>
  )
}
export default Profile;