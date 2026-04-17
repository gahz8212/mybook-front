import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/pages/lib/axios"
import { useRouter } from 'next/router';

interface readBookProps {
  id: string | string[] | undefined;
  onEdit: () => void;
}
export default function ReadBook({ id, onEdit }: readBookProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  // 1. 도서 정보 읽기 (Read)
  const { data:book } = useSuspenseQuery({
    queryKey: ['book', id],
    queryFn: () => {

      return api.get(`/api/book/${id}`).then(res => res.data);
      // enabled: !!id, // id가 있을 때만 실행
    }

  });

  // 2. 도서 삭제 (Delete)
  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/api/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] }); // 목록 새로고침
      router.push('/'); // 삭제 후 홈으로 이동
    }
  });
  return (
    <>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>{book.author}</p>
      <button onClick={() => onEdit()}>수정하기</button>
      <button onClick={() => deleteMutation.mutate()}>삭제하기</button>
    </>)
}