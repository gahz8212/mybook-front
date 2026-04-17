import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("auth-storage");

    if (authData) {
      const { state } = JSON.parse(authData);
      if (state.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const authData = localStorage.getItem("auth-storage");
        if (authData) {
          const { state } = JSON.parse(authData);
          if (state.accessToken) {
            // 별도의 axios 인스턴스가 아닌 설정된 api 인스턴스를 사용하거나
            // 직접 호출 시에도 withCredentials 확인
            console.log(state.accessToken);
            const res = await axios.post(
              "http://localhost:8081/api/reissue",
              {},
              {
                headers: {
                  Authorization: `Bearer ${state.accessToken}`,
                },
                withCredentials: true,
              },
            );
            const { accessToken, userName, role } = res.data;
            console.log("userName", userName, "role", role);
            useAuthStore.getState().setLogin({
              accessToken,
              userName,
              role,
            });
            // [필수] 다음 요청을 위해 스토리지 업데이트
            // localStorage.setItem('accessToken', newAccessToken);

            // 실패했던 요청 재시도
            console.log("전체 config:", config);
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            return api.request(config);
          }
        }
      } catch (reissueError) {
        // localStorage.removeItem('accessToken'); // 실패 시 흔적 삭제
        useAuthStore.getState().setLogout();
        window.location.href = "/login";
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
