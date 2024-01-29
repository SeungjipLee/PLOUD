# 시작하기

```bash
npm install
npm start
```

## 사용 라이브러리
- React : 리액트
- React-dom : 리액트 돔
- React-Redux/toolkit : Redux - 상태들을 중앙에서 관리하여 부모 자식 프롭으로 상태를 주고 받는 것이 아닌 스토어를 통해서 주고 받음
- Redux-resist : Redux 가 관리하는 상태들을 브라우저의 로컬스토리지에 저장 - 새로고침해도 데이터가 날라가지 않음
- babel : ?
- Webpack : 컴포넌트별로 나누어져있는 자바스크립트 코드를 하나의 js 파일로 합쳐서 전송해줌

### 저장소 : 앱의 상태 저장
### 액션 : 무엇이 일어날지 서술하는 객체, 내부 상태를 변경하는 유일한 방법
- type 필드를 가진 객체
```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```
### 리듀서 : 액션이 상태 트리를 어떻게 변경할지 명시
### 디스패치 : 상태 내의 무언가를 변경 (액션을 디스패치함)

## 프론트 일지

2024.01.25
민호 - 로그인 구현
준형 - 회원가입 구현

2024.01.26
승집 - 소셜로그인 구현
준형 - 게시판, 마이페이지 뼈대 생성

2024.01.29
준형 - 리덕스 적용(로그인 페이지)
승집 - 회원가입 페이지 기능 추가
민호 - 개인연습페이지 생성

### 리덕스 생성순서

featrues 폴더에 필요한 slice 를 만들기
useSelector : 스토어의 데이터를 읽을 수 있음
useDispatch : dispatch action 수행


## 오류 정리

### 로그인, 회원가입 페이지 구현
- axios 요청으로 회원가입, 로그인 확인

1. axios 요청시 url 이 틀렸을 때 : localhost 사용자로그인 창이 뜸
- backend url 확인 후 수정
