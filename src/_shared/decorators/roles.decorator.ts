import { SetMetadata } from '@nestjs/common';
import { rolesIdsConfig } from '../../config/roles.config';

export const Roles = (roles: string) =>
  SetMetadata('roles', rolesIdsConfig[`${roles}`]);
