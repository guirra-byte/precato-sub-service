import { Sub } from '@prisma/client';

const mockSubService = () => ({
  subService: {
    findByEmail: jest.fn().mockResolvedValue({} as Sub),
    findById: jest.fn().mockResolvedValue({} as Sub),
  },
  subRepository: {
    findByEmail: jest.fn().mockResolvedValue({} as Sub),
    findById: jest.fn().mockResolvedValue({} as Sub),
  },
  msgService: {
    // Mock das funções do msgService que serão utilizadas pelo serviço
  },
  dateProvider: {
    // Mock das funções do dateProvider que serão utilizadas pelo serviço
  },
  msgRepository: {
    // Mock das funções do msgRepository que serão utilizadas pelo serviço
  },
});

export const SubServiceMock = jest.fn().mockImplementation(mockSubService);
