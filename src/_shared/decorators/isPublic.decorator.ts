import { SetMetadata } from '@nestjs/common/decorators';

const IS_PUBLIC_KEY = 'isPublic';
const isPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export { isPublic, IS_PUBLIC_KEY };
