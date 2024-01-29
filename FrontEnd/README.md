# 시작하기

```bash
npm install
npm start
```

## 프론트 일지

2024.01.25
민호 - 로그인 구현
준형 - 회원가입 구현

2024.01.26
승집 - 소셜로그인 구현
준형 - 게시판, 마이페이지 뼈대 생성

2024.01.29~
준형 - 리액트 사용법 만들기(상태관리 : 리덕스, 훅, 라우트)

### 리덕스 생성순서
featrues 폴더에 필요한 slice 를 만들기
useSelector : 스토어의 데이터를 읽을 수 있음
useDispatch : dispatch action 수행


### 로그인, 회원가입 페이지 구현
- axios 요청으로 회원가입, 로그인 확인

1. axios 요청시 url 이 틀렸을 때 : localhost 사용자로그인 창이 뜸
- backend url 확인 후 수정