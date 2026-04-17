import {useSuspenseQuery,useMutation,useQueryClient}from "@tanstack/react-query";
import api from '@/pages/lib/axios';
import {useRouter}from 'next/router';
import { ChangeEvent,useState } from "react";




interface EditFormProps{
  id:string|string[]|null;
  onCancel:()=>void;
}

export default function EditForm({id,onCancel }:EditFormProps) {
const[item,setItem]=useState({})
  const router=useRouter();
const queryClient=useQueryClient
const{data:book}=useSuspenseQuery({
  queryKey:['book',id],
  queryFn:()=>{
    return api.get('/api/book/${id}').then(res=>res.data);
  }
})
const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
  const{name,value}=e.target;
  setItem({name,value});
  

}
  return (
  <form>
    <input type="text" value={book.title} name="title" onChange={onChange}/>
    <input type="text" value={book.description} name="description" onChange={onChange}/>
    <input type="text" value={book.author} name="author" onChange={onChange}/>
    
    <button>수정</button>
    <button onClick={onCancel}>취소</button>
    </form>
  
)
}