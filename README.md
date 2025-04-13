# NestJS API-MCP 연동 POC

NestJS 기반의 간단한 Product 관리 API와 MCP 연동을 위한 개념 증명(POC) 프로젝트입니다.

### 사전 요구사항

- Node.js (v22 이상)
- Docker 및 Docker Compose
- Yarn 패키지 매니저

### 설치

# 의존성 설치

yarn install

````

### 환경 설정

```bash
# Docker 컨테이너 실행 (PostgreSQL 및 Redis)
docker-compose up -d
````

### 데이터베이스 마이그레이션

```bash
# 마이그레이션 생성
yarn migration:create

# 마이그레이션 실행
yarn migration:up
```

### 애플리케이션 실행

```bash
# 개발 모드로 실행
yarn start:dev

# 프로덕션 모드로 실행
yarn build
yarn start:prod
```

## API 문서

애플리케이션이 실행된 후, Swagger UI를 통해 API 문서에 접근할 수 있습니다:

```
http://localhost:3000/api
```
