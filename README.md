# Anissia WEB (front-end)
- 애니시아 프론트엔드 WEB 입니다.
- 주소 : [anissia.net](https://anissia.net)
- 인프라 자원상 Admin 사이트를 포함합니다.

## 준비과정
1. node.js 설치
   * [https://nodejs.org](https://nodejs.org)
1. yarn 설치
   ```
   npm install -g yarn
   ```
1. vue 설치
   ```
   yarn global add @vue/cli
   ```
1. git 설치
    * https://git-scm.com/
1. IDE 설치
   * IDE는 상관없으나 **WebStorm** 혹은 **Visual Studio Code (무료)** 추천
   * **Visual Studio Code (무료)**
     * https://code.visualstudio.com
     * 확장도구(extensions)도 설치
       * [Vue VS Code Extension Pack](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-extensionpack)
       * [Terminal](https://marketplace.visualstudio.com/items?itemName=formulahendry.terminal)
         * IDE 오른쪽 하단에 >_ 모양의 Toggle Integated Terminal 라는 아이콘이 생김
     * git 으로 받은 후 열기
   * **WebStorm**
     * https://www.jetbrains.com/webstorm/
1. 모듈설치
   * IDE 에서 다음 명령어 실행
   ```
   yarn install
   ```

## 실행
1. 실행
   * IDE 에서 다음 명령어 실행
    
     * [로컬서버](https://github.com/anissia-net/anissia-core) 사용시
       ```
       yarn serve
       ```
     * 개발서버 api 로 FE를 개발할 경우 (개발존 VPN 필요)
       ```
       yarn serve --mode dev-server-api
       ```
2. 접속
   * 메인 : http://localhost:8080/
   * 어드민 : http://localhost:8080/admin/
     * 로그인-권한필요
     * 로컬의 경우 CORE 프로젝트에서 자동생성되는 **운영자** 계정으로 접근
   * 편성표 : 
      * 2015년 버전 : http://localhost:8080/schedule/2015
      * 2009년 버전 : http://localhost:8080/schedule/2009

## 빌드
빌드결과 폴더 : 프로젝트폴더/dist
```
yarn run build
```

## 참고
* [애니편성표 API](https://github.com/anissia-net/anissia-web/blob/master/README-API.md)
