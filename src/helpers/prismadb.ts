import { PrismaClient } from '@/prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// globalThis.prisma: 개발 중 서버가 여러 번 리로드되면서 PrismaClient 가 여러 번 생성되는 걸 방지
const client = globalThis.prisma || new PrismaClient();

// 프로덕션에서는 일반적으로 코드가 한 번만 실행되므로, 전역에 저장할 필요가 없음
// 개발 환경에서는 코드가 핫 리로드될 때마다 파일이 다시 평가(evaluate)되기 때문에, const client = new PrismaClient()가 계속 실행될 수도 있음
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
