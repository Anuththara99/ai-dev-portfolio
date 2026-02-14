import { PrismaClient } from '@/generated/prisma';

/**
 * Prisma Client Singleton for Serverless Environments
 * 
 * In serverless environments like Vercel, we need to prevent multiple
 * instances of PrismaClient from being created during hot reloads.
 * This pattern ensures we reuse a single instance across requests.
 * 
 * Reference: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#serverless-environments
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

