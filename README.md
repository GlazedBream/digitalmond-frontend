## 개발 환경
- Node.js v20
- Expo (via npx expo)
- React Native


## Node 버전 관리
### 1. NVM 설치
- [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)에서 'nvm-setup.exe' 설치파일 다운로드
- 설치파일 실행. 도중에 나오는 '설치 경로'와 '액티브버전 경로'를 복사해둡니다.
- 두 경로를 환경변수에 추가
### 2. Node v20 사용
- (VS Code 재시작이 필요할 수 있습니다) nvm -v으로 nvm이 설치됐는지 확인
- nvm install 20
- nvm use 20
- node -v 확인
### 3. 프로젝트 도중에 Node 버전을 변경하는 경우
- nvm install xx
- nvm use xx
- rd /s /q node_modules
- del package-lock.json
- npm install

## Expo 실행 방법
### 1. Expo 실행
- npx expo start
- 터미널에 표시되는 QR을 모바일 카메라로 오픈
- Expo 앱 설치 - 실행
### 2. Expo 실행 중
- App.js를 변경하고 Save하면 Expo 앱에서 변경을 바로 확인 가능
- 모바일 폰을 흔들흔들하면 올라오는 토스트 메뉴의 Reload나 Go Home을 활용할 수 있음
### 3. Expo 종료
- Ctrl + C
### 4. Expo 계정 연동(Option)
- [Expo](https://expo.dev/)에 가입
- VS Code 터미널에서 expo login을 통해 로그인
- 모바일 Expo 앱 로그인