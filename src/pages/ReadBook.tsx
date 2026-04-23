import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/pages/lib/axios"
import { useRouter } from 'next/router';


interface readBookProps {
  id: string | string[] | undefined | null;
  onEdit: () => void;
}
export default function ReadBook({ id, onEdit }: readBookProps) {
  const getNumericId = (val: string | string[] | undefined | null): number => {
    if (!val) return 0;
    const target = Array.isArray(val) ? val[0] : val
    return Number(target) || 0;
  }
  const nextId = getNumericId(id)

  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. 도서 정보 읽기 (Read)
  const { data: book } = useSuspenseQuery({
    queryKey: ['book', nextId],
    queryFn: () => {
      return api.get(`/api/book/${id}`).then(res => res.data);
      // enabled: !!id, // id가 있을 때만 실행
    }
  });

  // 2. 도서 삭제 (Delete)
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/book/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] }); // 목록 새로고침
      router.push('/Main'); // 삭제 후 홈으로 이동
    }
  });
  return (
    <>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>{book.author}</p>
      
      <button className='btn sm primary' onClick={() => onEdit()}>수정하기</button>
      <button className='btn sm warning' onClick={() => deleteMutation.mutate(nextId)}>삭제하기</button>
      <button className='btn sm' onClick={() => { router.push('/Main') }}>목록으로</button>
      
    </>)
}