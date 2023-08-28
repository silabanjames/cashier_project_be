import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){};

  canActivate(
    context: ExecutionContext,
  ): boolean{

    const requirePermission = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);

    const { user } = context.switchToHttp().getRequest();
    const userPermission = user.role;

    const hasAllRequiredPermissions = requirePermission.every(permission=>userPermission.includes(permission));

    // jika tidak ada requirePermission atau requirePermission memenuhi
    if(!requirePermission || hasAllRequiredPermissions){
      return true;
    }

    throw new ForbiddenException('Insufficient Permission');
  }
}
