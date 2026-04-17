import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from './lib/axios'
import type { Book } from '@/types/book'
export default function Home() {
  // const [bookList, setBookList] = useState<book[]>([])
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await api.get('/api/list');
  //       // 데이터가 확실히 왔을 때만 업데이트
  //       if (response.data) {
  //         setBookList(response.data);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchBooks();
  // }, [])
  const { data: bookList, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await api.get('/api/list');
      return response.data;
    }
  });
  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생:{error.message}</div>;
  return (
    <div>HOME
      {/* <button onClick={getList}>리스트 가져오기</button> */}
      <div>

        {bookList.map((item: Book) => { return <div key={item.id}>{<Link href={`/book/${item.id}`}>{item.title}</Link>}{item.description}{item.author}{item.published}</div> })}
      </div>
    </div>
  )
}
