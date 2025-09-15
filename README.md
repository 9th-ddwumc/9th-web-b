# 9th-web-b
[UMC DDWU 9th를 위한 깃허브 사용법 및 규칙](https://makeus-challenge.notion.site/26fb57f4596b80e78684e241677067b5)

<br>

## 🌱 Pull Requests Rule

**Title**: :이모지: [WeekN_닉네임_미션번호] 
	(ex. ✨ Week01_bbungya_01)

**Reviewers(PR을 리뷰해 줄 팀원)**: 파트장으로 설정

**Assignees(PR 담당자)**: 본인

**Labels**: 해당하는 기능 label 설정

<br/>

## 📚 <span id="git-컨벤션">git 컨벤션</span>
### 브랜치 명명 규칙 
- 브랜치 명: `weekN_닉네임` (ex. week01_bbungya)
    - 만약 한 주차에 미션이 여러 개면 닉네임 뒤에 `_미션 번호` 를 붙입니다. (ex. week01_bbungya_01)
    - 다음 주차로 이어지는 미션이라면 **저번주 브랜치에서 새 브랜치 생성**

### 커밋 메세지 규칙 
**Gitmoji 사용**
  
| **타입** | **설명** | **이모지** |
| --- | --- | --- |
| feat | 새로운 기능 추가 | ✨ |
| fix | 버그 수정 | 🐛 |
| docs | 문서 수정 (README, 주석 등) |  📝 |
| style | 코드 스타일 변경 (포맷, 세미콜론 등) | 🎨 |
| refactor | 리팩토링 (기능 변화 없음) | ♻️ |
| test | 테스트 코드 추가 / 수정 | ✅ |
| chore | 빌드 설정, 패키지 관리 등 기타 작업 | 🧽 |
| perf | 성능 개선 | ⚡ |
| ci | CI/CD 설정 변경 | 👷🏻 |
| build | 빌드 관련 파일 수정 (예: Gradle) | 🌱 |
| revert | 이전 커밋 되돌리기 | ⏪ |

### 커밋 메세지 형식 
**type(scope): subject**

- `type` : 커밋의 종류
- `scope (optional)` : 영향 받는 모듈 or 기능
- `subject` : 커밋의 간단한 설명

feat(user): 회원 프로필 조회 API 추가 <br>
fix(jwt): 토큰 만료 시간 오류 수정 <br>
docs: 사용자 API 명세 추가<br>
refactor(user): 로직 분리 및 유틸 메서드 추출<br>
style: 코드 정렬 및 불필요한 공백 제거<br>
test(user): 회원가입 테스트 케이스 추가<br>

<br>

## 1. 자신의 브랜치에 프로젝트 업로드하기

## 2. Main 브랜치로 PR(Pull Request) 날리기

## 3. 스터디원 코드 리뷰해주기

Copyright © Soyeon Lee (bbungya) All rights reserved.
