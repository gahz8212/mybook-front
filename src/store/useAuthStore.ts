import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import api from "../pages/lib/axios"

interface UserState{
  accessToken:string|null;
  userName:string|null;
  roles:string[];
  isLoggedIn:boolean;
  setLogin:(data:{accessToken:string,userName:string,role:string})=>void;
  setLogout:()=>void;
}

export const useAuthStore=create<UserState>()(
  persist(
  (set)=>({
    accessToken:null,
    userName:null,
    roles:[],
    isLoggedIn:false,
    setLogin:(data)=>{
      const{accessToken,userName,role}=data;
      set({
        accessToken,
        userName,
        roles:role?role.split(','):[],
        isLoggedIn:true});
      },
    setLogout:async()=>{
      try{
        await api.post("/api/logout")
      }catch(e){console.error("로그아웃 서버 통신 실패",e)}
      
      set({
        accessToken:null,
        userName:null,
        roles:[],
        isLoggedIn:false});
      },}),{
        name:'auth-storage'
      }
)
);

export default useAuthStore;