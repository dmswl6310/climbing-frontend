# 🏔️ 오르리

### 내 위치 주변의 클라이밍장에 대한 정보를 보여주는 서비스
### > [웹사이트 이동](http://13.125.164.197/)
<br>


## 1. 프로젝트 세팅  

### 1) 노드, yarn 설치

- node 버전 : v20.10.0
- yarn 버전 : v1.22.21
(설치 : npm install —global yarn)
<br>
  
### 2) 프로젝트 설정

**[Next.js](https://nextjs.org/docs) + typescript**

- eslint와 router 사용
- styled component 사용 [(next.js에서 어떤 style을 쓸까?](https://blog.nextinnovation.kr/tech/Nextjs_Styling/))
<br>


### 3) 브랜치 구조

- main(미사용-배포시 사용고려)
- dev(작업브랜치)
    
    L refactor/folder-setting
    
    L feat/filter
    
    L fix/filter
    
    L …
<br>    

### 4) PR 올리기

- 예시 (feat/filter)
    1. dev에서 pull (+ yarn), 브랜치(feat/filter) 따서 작업
    2. 작업 후 PR 올리기(feat/filter → dev)
    3. 팀원이 확인후 approve 또는 comment달기
    4. dev로 브랜치를 merge 후 브랜치(feat/filter) 삭제
<br>

### 5) commit 방식

우테코 프리코스에서 하던 commit 방식 유지

> **chore**
> 
> 
> : 패키지 매니저 설정할 경우, 코드 수정 없이 설정을 변경
> 
> **docs**
> 
> : documentation 변경
> 
> **feat**
> 
> : 새로운 기능
> 
> **fix**
> 
> : 버그 수정
> 
> **refactor**
> 
> : 버그를 수정하거나 기능을 추가하지 않는 코드 변경, 리팩토링
> 
> **style**
> 
> : 코드 의미에 영향을 주지 않는 변경사항 ( white space, formatting, colons )
> 
> **test**
> 
> : 누락된 테스트 추가 또는 기존 테스트 수정
> 
<br>

## 2. 폴더 구조

public : 이미지(png, svg), 기타 자료

src

  L components : Button, Checkbox.. 등등
  
      🚫 [atomic 디자인 패턴](https://com789.tistory.com/35) → 분리기준이 애매, 유연하지 않다. (필요시 추후 적용)
  
  
  </aside>
  
  L pages : **하위 폴더명에 맞추어 path 설정**
  
  L service : API 연결, 로그인 관련
  
  L store, hook : 필요시 추가 예정

<br>  

## 3. 프로젝트 실행

yarn (프로젝트 세팅 업데이트)

yarn dev (실행 후 링크 클릭)
