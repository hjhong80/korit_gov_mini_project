import axios from 'axios';

export const instance = axios.create({ baseURL: 'http://localhost:8080' });

instance.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰 가져오기
        const accessToken = localStorage.getItem('AccessToken');

        // 토큰이 있다면 헤더에 추가 (Bearer 방식)
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config; // 변경된 설정으로 요청 진행
    },
    (error) => {
        // 요청 보내기 전 에러 발생 시 처리
        return Promise.reject(error);
    }
);

/* 2. 응답 인터셉터 (Response Interceptor)
   - 서버로부터 응답을 받은 '직후'에 실행됩니다.
   - 주로 에러를 전역적으로 처리하거나(예: 401), 데이터 가공을 합니다.
*/
instance.interceptors.response.use(
    (response) => {
        // 응답이 성공적(200번대)일 때 실행
        // 필요한 경우 response.data만 바로 반환하도록 수정 가능
        return response;
    },
    (error) => {
        // 응답이 에러(400, 500번대)일 때 실행
        console.error('API Error:', error);

        // 예시: 토큰 만료(401) 시 처리 로직
        // if (error.response && error.response.status === 401) {
        //     alert("로그인이 만료되었습니다.");
        //     localStorage.removeItem('AccessToken');
        //     window.location.href = '/login';
        // }

        return Promise.reject(error); // 에러를 호출한 곳(try-catch)으로 넘김
    }
);