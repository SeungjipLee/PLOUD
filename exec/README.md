# Info

## 기술스택 및 라이브러리


| Project       | Version   | Description |
| ------------- | --------- | ----------- |
| Java          | 17        |             |
| SpringBoot    | 3.2.1     |             |
| Gradle        | 8.5       |             |
|               |           |             |
| MySQL         | 8.0.35    |             |
|               |           |             |
| React         | 18.2      |             |
| Node.js       | 20.11.0   |             |
|               |           |             |


## 빌드 설정

- git clone




# Convention

## Git
- ssafy git lab

### Bracnch Convention
- `master` : 배포활 완성 프로젝트 브랜치

- `release/~~` : develop 브랜치를 가져와서 배포 전 최종적으로 확인하고 new version으로 확립하는 브랜치

- `develop` : 개발 완료한 기능(feature)을 통합하는 브랜치

- `feature/~~` : 기능 단위로 개발을 진행하는 브랜치

- `document` : 개발 외적인 것에 대한 브랜치


### Commit Convention

#### 정의
- commit message에 대한 약속  

#### 구조
[commit type]: [commit message] #[jira issue number]</br>
[description]

ex)
Init: 스프링 프로젝트 설정 #1
스프링부트 프로젝트 생성 및 의존성 설정

```
commit type -> 커밋의 성격

commit message -> 작업한 내용의 제목

jira issue number -> 지라에 등록한 이슈의 번호

description(생략 가능) -> 추가적인 설명

cmd) git commit -m "Init: 스프링 프로젝트 설정 #1" -m "스프링부트 프로젝트 생성 및 의존성 설정"
```

#### Commit Type
- `Init: ` : 프로젝트 초기 생성

- `Feat: ` : 새로운 기능 추가

- `Fix: ` : 버그 수정 또는 typo

- `Design: ` : CSS 등 사용자 UI 디자인 변경

- `Comment: ` : 필요한 주석 추가 및 변경

- `Refactor: ` : 리팩토링

- `Rename: ` : 파일 혹은 폴더명 수정하거나 이동

- `Remove: ` : 파일 삭제

- `Style: ` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우

- `Test: ` : 테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우)

- `Chore: `: 위와 일치하지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등)

#### Commit Message
- 작업한 내용을 간결하게 설명
- 마침표와 특수 문자를 사용하지 않는다.
- 한국어로 작성

#### Jira Issue Number
- Jira에 등록한 이슈의 번호

#### Commit Description
- 작업에 대한 추가적인 설명을 작성
- 생략 가능

### PR Convention

#### PR Type
- [ ] 기능 추가
- [ ] 기능 삭제
- [ ] 버그 수정
- [ ] 의존성, 환경 변수, 빌드 관련 코드 업데이트

#### 제목
- 제목은 PR 목적을 한문장으로 요약

#### 내용
- 작업에 대한 내용을 상세하게 작성


## Jira

- ssafy jira

### 제목(개요)
```
[이름_날짜] 이슈명

예시
[김영대_0112] 로그인
```

### 규칙
- epic/task(story) 2단계 구조로만 사용하며 sub task 작성 금지
- 이슈에 해당하는 테스크 진행 시 할일 -> 진행중 -> 완료로 변경

### Sprint
- duration 1 week

### Epic
- 업무의 큰 분류
- 공부, 기능, 작업물

### Story
- epic의 하위 분류
- 작은 업무들을 구체적으로 명시

### Sub Task
- 사용하지 않음.

### Assignee
- 해당 업무의 담당자

### Estimate
- 시간당 1점 / 1 ~ 3점
- 1 week default : 40 point

### Release
- 각 sprint별


## Backend
https://velog.io/@jinyeong-afk/%EC%9E%90%EB%B0%94-%EA%B5%AC%EA%B8%80-%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98-IntelliJ-%EC%A0%81%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95


## Frontend


