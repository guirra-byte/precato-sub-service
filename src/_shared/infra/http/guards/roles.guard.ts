import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from '../../../services/matchRoles.service';

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = this.reflector.get<string[]>('roles', context.getHandler());

    if (!handler || handler.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const sub = req.user;
    const controller_roles = handler[0].split(';');

    return await matchRoles(controller_roles, sub.roles);
  }
}
