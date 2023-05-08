import { PrismaClient as MainPrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaService } from './src/_shared/infra/prisma/prisma.service';

export const prismaMock =
  PrismaService as unknown as DeepMockProxy<PrismaService>;

jest.mock('@prisma/client', () => ({
  PrismaClient: function () {
    return mockDeep<MainPrismaClient>();
  },
}));

beforeEach(() => {
  mockReset(prismaMock);
});
