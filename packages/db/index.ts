import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export {
  Prisma,
  SubscriptionFrequency,
  SubscriptionPlanSlug,
  type Account,
  type Config,
  type User,
} from '@prisma/client';
export * from './common';
