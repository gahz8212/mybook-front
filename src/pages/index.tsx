import { useEffect, useState, useCallback } from 'react';
import api from './lib/axios'
interface book {
  id: number;
  title: string;
  description: string;
  image: string | null;
  author: string;
  published: string;
  uploadFile: string | null
}
export default function Home() {
  const [bookList, setBookList] = useState<book[]>([])

  // const getList = useCallback(async () => {
  //   try {

  //     const response = await api.get('/api/list');
  //     console.log("전체응답", response);
  //     setBookList(response.data)
  //   } catch (error) {
  //     console.error('데이터 로딩 실패', error)
  //   }
  // }, [])
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/api/list');
        // 데이터가 확실히 왔을 때만 업데이트
        if (response.data) {
          setBookList(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchBooks();
  }, [])

  return (
    <div>HOME
      {/* <button onClick={getList}>리스트 가져오기</button> */}
      <div>

        {bookList.map((item) => { return <div key={item.id}>{item.title}{item.description}{item.author}{item.published}</div> })}
      </div>
    </div>
  )
}
