# 고려사항

1. 아이디, 이메일, 닉네임 중복 검사 시 즉시 입력 불가능하게 바꿔야함
  - alert가 뜨기전에 안에 있던 내용 지울 수 있음

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


## 리액트 작성 시 유의사항

### 순수함수와 컴포넌트

#### 순수함수
1. 입력이 같으면 결과가 같다.
2. 부작용(부수효과)가 없다.
- 함수는 결과값만을 반환해야 한다.   
  함수가 특정 값(전역변수 등)를 변경하거나 부수효과를 발생시킨다면 기대한 결과가 아님
#### 컴포넌트
- 순수함수와 다른점 UI 를 표현하기 위해 돔을 변경 혹은 네트워크 요청을 보내야 함
- 클래스 컴포넌트는 생명주기 메서드로 이를 처리함
- 함수형 컴포넌트는 useEffect 훅을 사용


### 리액트 훅

- 컴포넌트가 마운트 되었을 때 어떤 동작이 하고 싶다면 useEffect 훅을 사용하고 두번째 인자로 빈 배열 전달
```jsx
  useEffect(() => {
    console.log('마운트')
  }, []) // 두번째 인자인 빈 배열은 마운트 될 때 한번만 실행되어야 함을 나타냄
```

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

## axios

- withCredentials 의미 : 서로 다른 도메인의 요청을 보낼 때 credential 정보가 포함되어 있는 요청을 보낼 것인가에 대한 설정
  1. 쿠기를 첨부해서 보내는 요청
  2. 헤더에 Authorization 항목이 있는 요청

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

2. setState : 이벤트호출 시 상태를 변경하려면 이벤트 핸들러 함수는 따로 만들어서 사용

    - 오류 사례
    컴포넌트가 렌더링될 때 즉시 호출되는 코드 
    React의 상태 업데이트 함수가 이벤트 핸들러 내에서 호출되게끔 해야 함
    ```jsx
    <div onClick={setIsUserIdValid(!isUserIdValid)}>취소</div>
    ```
    - 해결
    ```jsx
    // 컴포넌트 영역
    const handlerClick = () => {
      setIsUserIdValid(!isUserIdValid)
    }
    // 리턴 영역
    <div onClick={handlerClick}>취소</div>
    // 혹은
    <div onClick={() => setIsUserIdValid(!isUserIdValid)}>취소</div>
    ```

3. e.target.value 는 텍스트라서 "true" "false" 라 반환해도 boolean 값으로 사용할 수가 없더라
    그래서 
    ```jsx
    setIsSecret(e.target.value == "true" ? true : false)
    ```
    로 사용했음

4. 미해결 - Redux non-serializable value 에 관한 이슈

    VM999:6 A non-serializable value was detected in an action, in the path: `register`. Value: ƒ register(key) {
        _pStore.dispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_0__.REGISTER,
          key: key
        });
      } 
    Take a look at the logic that dispatched this action:  {type: 'persist/PERSIST', register: ƒ, rehydrate: ƒ} 
    (See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants) 
    (To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)

    Redux 액션은 일반적으로 순수한 객체로, 모든 값이 JSON으로 직렬화 가능해야 합니다. 함수, Promise, 기타 비직렬화 가능한 객체는 포함되어서는 안 됩니다.

    ```jsx
    import { configureStore } from '@reduxjs/toolkit';

    export const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
    ```
    임시로 비직렬화 객체에 대해 경고를 하지 않도록 비활성화

5. 방을 입장하기 위해 JoinConfirmModal 에 비밀번호를 치고 엔터를 누르면 에러가 뜨고 한번 더 누르면 입장이 진행
    useState 사용 x = 비동기적으로 상태를 업데이트 함
    1. 상태를 변경하고 바로 사용할 경우 업데이트가 느리기 때문에 즉각적으로 변수를 전달해야 한다면 직접 값을 선언하고 사용
    2. useState를 사용하고 싶다면 useEffect 로 상태 변경을 감지하면 실행되도록 해야 함

6. 상태 값 할당 이후 특정 작업을 수행하고 싶을 때
    useEffect 로 특정 상태가 변경될 때 수행하게 해도 처음에 마운트 될 때도 시행되니
    초기값이면 리턴하게 해서 실제로 값이 반영됐을 때 수행하게 함
```jsx
  useEffect(() => {
    if (room.managerId === userId) {
      console.log(nickname)
      setPresenter(nickname)
      setUserList([{ userId: nickname, presenter: true }]);
    } else {
      setUserList([{ userId: nickname, presenter: false }])
      joinSession()
    }
    
  }, []);

  useEffect(() => {
    if (!presenter) return // 이부분 추가
    console.log("[presenter]", presenter)
    if (OV.current == null) joinSession();
  }, [presenter]);
```

## 오류

스터디 화상회의 페이지에서 새로고침 시 아에 방으로 접근 불가
+ 뒤로가기로 나가면 방에서 나가지지 않음



## StudyRoomPage

보여줄 비디오 종류 3
MainStreamManager ???? 카메라 누르면 메인으로 전환되고 
SubScribers 상대방 화면
Publisher 내 화면

초기 설정 main, publisher 나
subsriber 상대방
main 은 바꿀 수 있다
