import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from '@/pages/lib/axios';
import { ChangeEvent, useState } from "react";

interface EditFormProps {
  id: string | string[] | null | undefined;
  onCancel: () => void;
}

export default function EditForm({ id, onCancel }: EditFormProps) {
  const getNumericId = (val: string | string[] | null | undefined): number => {
    if (!val) return 0;
    const target = Array.isArray(val) ? val[0] : val;
    return Number(target) || 0;

  };
  const nextId = getNumericId(id)

  const queryClient = useQueryClient()

  const { data: book } = useSuspenseQuery({
    queryKey: ['book', nextId],
    queryFn: () => {
      return api.get(`/api/book/${id}`).then(res => res.data);
    }
  })
  const [item, setItem] = useState({
    id: nextId,
    title: book.title,
    author: book.author,
    description: book.description
  })

  const updateMutation = useMutation({
    mutationFn: (updateBook: { id: number, title: string, author: string, description: string }) => {
      console.log("updateBook", updateBook)
      return api.put('/api/book/update', updateBook)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      queryClient.invalidateQueries({ queryKey: ['book', id] })
      alert('수정이 완료 되었습니다.')
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "등록 중 오류가 발생했습니다.");
    }
  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <form method="post">
      <input type="text" value={item.title} name="title" onChange={onChange} placeholder="제목" />
      <input type="text" value={item.description} name="description" onChange={onChange} placeholder="내용" />
      <input type="text" value={item.author} name="author" onChange={onChange} placeholder="저자" />

      <button onClick={() => updateMutation.mutate({ ...item, id: nextId })}>수정</button>
      <button onClick={onCancel}>취소</button>
    </form>

  )
}