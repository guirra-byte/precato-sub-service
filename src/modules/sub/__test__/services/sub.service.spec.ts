import { Test, TestingModule } from '@nestjs/testing';
import { Sub } from '@prisma/client';
import { SubService } from '../../services/sub.service';
import { SubServiceMock } from '../../../msg/mocks/mockSubService';
import { PrismaService } from '../../../../_shared/infra/prisma/prisma.service';
import { SubRepository } from '../../infra/http/prisma/repositories/SubRepository';
import { ISubRepository } from '../../contracts/ISubRepository';

const subRepositoryMock = {
  findByEmail: jest.fn().mockResolvedValue({} as Sub),
  findById: jest.fn().mockResolvedValue({} as Sub),
};
describe('Subs services tests suits', () => {
  let subsService: SubService;
  let subRepository: SubRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubService,
        {
          provide: SubRepository,
          useValue: subRepositoryMock,
        },
      ],
    }).compile();

    subsService = module.get<SubService>(SubService);
    subRepository = module.get<SubRepository>(SubRepository);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  it('Should be defined', async () => {
    expect(subsService).toBeDefined();
    expect(subRepository).toBeDefined();
  });

  describe('Find One', () => {
    describe('Find One by Email', () => {
      it('Should be able to find one sub by email', async () => {
        const email = 'test@example.com';
        const reply = {} as Sub;

        jest.spyOn(subRepositoryMock, 'findByEmail').mockResolvedValue(reply);

        const findByEmail = await subsService.findByEmail(email);

        expect(subRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
        expect(findByEmail).toEqual(reply);
      });
      // it('Should not be able to find one sub by email', async () => {
      //   const email = 'test@example.com';

      //   jest
      //     .spyOn(subsService.subRepository, 'findByEmail')
      //     .mockRejectedValueOnce(email);

      //   expect(await subsService.subRepository.findByEmail(email)).toThrowError(
      //     'Sub not found!',
      //   );
      // });
    });
    describe('Find One by Id', () => {});
  });
});
