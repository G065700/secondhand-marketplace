# secondhand-marketplace

이 프로젝트는 중고 물품 거래를 위한 풀스택 Next.js 애플리케이션입니다. <br/>
사용자는 중고 물품을 구매하고 판매하며, 프로필을 관리하고, 채팅 시스템을 통해 다른 사용자와 상호작용할 수 있습니다.


## 배포

이 프로젝트는 Vercel을 통해 배포되었습니다: [https://ebk-secondhandmarketplace.vercel.app/](https://ebk-secondhandmarketplace.vercel.app/)

## 테스트 계정
![img.png](img.png)
- 비밀번호는 다음과 같은 패턴입니다.
  - admin001 → !Admin001
  - client001 → !Client001

## 화면정의서
https://github.com/G065700/secondhand-marketplace/blob/main/화면정의서.md

## 주요 기능

- NextAuth.js를 이용한 사용자 인증 (회원가입, 로그인, 로그아웃)
- 상품 등록 및 관리 (상품 업로드, 업데이트, 조회, 판매 완료 표시)
- 사용자 프로필 관리
- **찜한 상품 관리**
- **사용자 간 실시간 채팅 기능**
- **사용자 활동/상품 기록 추적**
- 이미지 업로드 (Cloudinary 연동)
- 위치 기반 서비스 (카카오 지도 연동)
- 관리자 기능 (사용자 및 상품 관리)
- Tailwind CSS 및 Material UI (Joy UI)를 사용한 반응형 UI

## 사용 기술

**프론트엔드:**

- Next.js 15 (React 19)
- TypeScript
- React Hook Form
- NextAuth.js
- Tailwind CSS
- Emotion (@mui/joy용)
- @mui/joy (Material UI Joy)
- React Icons
- React Kakao Maps SDK
- React Toastify
- SWR (데이터 패칭용)
- Axios (HTTP 클라이언트)
- Day.js (날짜 처리용)
- Query String (URL 파라미터 처리용)
- React Pagination (UI 페이지네이션용)

**백엔드:**

- Next.js API Routes
- Prisma (ORM)
- **Supabase (PostgreSQL 데이터베이스 호스팅)**
- bcryptjs (비밀번호 해싱)

**개발 도구:**

- ESLint
- Prettier
- Yarn (패키지 매니저)

## 시작하기

### 전제 조건

- Node.js (v18 이상)
- Yarn (v4 이상)
- Supabase (PostgreSQL 데이터베이스 호스팅)

### 설치

1.  **저장소 복제:**

    ```bash
    git clone https://github.com/your-username/secondhand-marketplace.git
    cd secondhand-marketplace
    ```

2.  **의존성 설치:**

    ```bash
    yarn install
    ```

3.  **환경 변수 설정:**
    프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

    ```env
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.avhvbfixtqlmvsjccaul.supabase.co:5432/postgres"
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
    NEXT_PUBLIC_KAKAO_MAP_APP_KEY="YOUR_KAKAO_MAP_APP_KEY"
    ```

    _`[YOUR-PASSWORD]`는 Supabase 데이터베이스 비밀번호로, 다른 플레이스홀더는 실제 값으로 대체하세요. `NEXTAUTH_SECRET`은 길고 무작위적인 문자열이면 됩니다._

4.  **Prisma 클라이언트 생성 및 데이터베이스 스키마 푸시:**
    ```bash
    yarn pnpify prisma generate
    yarn pnpify prisma db push
    ```
    _이 명령을 실행하기 전에 PostgreSQL 데이터베이스가 실행 중이고 접근 가능한지 확인하세요._

### 애플리케이션 실행

개발 서버를 실행하려면:

```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 프로덕션 빌드

```bash
yarn build
yarn start
```

## 프로젝트 구조 (주요 디렉토리)

- `src/app`: Next.js App Router 페이지 및 API 라우트.
- `src/components`: 재사용 가능한 React 컴포넌트.
- `src/helpers`: 유틸리티 함수 (예: `prismadb.ts`, `uploadImage.ts`).
- `src/pages/api/auth`: 인증을 위한 NextAuth.js API 라우트.
- `src/types`: TypeScript 타입 정의.
- `prisma`: Prisma 스키마 및 마이그레이션.
- `public`: 정적 자산.

## 린팅 및 포맷팅

- **린트:** `yarn lint`
- **포맷:** `yarn format`

## 기여

이 프로젝트에 기여하는 것을 환영합니다. 기존 코드 스타일을 따르고 풀 리퀘스트를 제출해 주세요.

## 라이선스

[여기에 라이선스를 명시하세요. 예: MIT License]