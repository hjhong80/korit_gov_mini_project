# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<!--

zustand : 프론트엔드 내에서 전역상태관리, props로 일일히 데이터를 넘겨줘야 하는 번거로움 한계를 극복
ex) UI 상태 반영 - 공통적으로 보이는 형태 설정

react-query : 리액트 서버(프론트엔드) - DB(백엔드)간 데이터 동기화(정합성)을 유지하기 위해 사용
app.jsx 의
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}>

구문에 K-V cache 형태로 저장

useQuery : GET - DB에서 데이터를 읽어와서 DB와 프론트엔드 간의 데이터 동기화
자동으로 수행
refetch 사용

useMutation : POST, PUT, DELETE - 데이터의 추가나 수정이 발생했을때 DB와 프론트엔드 간의 데이터 동기화
트리거를 작동시켜서 수행
onSuccess / onError 등등 수정후 발생되는 이벤트의 조건에 따라 수행해야 하는 작업들이 존재

이 외에도 useInfiniteQuery(무한 스크롤 해야 하는 쇼핑몰 - 적합한 백엔드 설계 필요) 등등이 존재


cf) 다른 컴포넌트에서 사용하지 않고 해당 컴포넌트에서만 사용하는 상태이거나, 하나의 컴포넌트에서 모든 작업을 수행할때는 react-query를 굳이 사용할 필요 없이 useEffect로 사용 가능.

-->
