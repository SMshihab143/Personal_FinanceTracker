import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Skip CORS pre‑flight OPTIONS so browser doesn’t get 401 on preflight
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    if (req.method === 'OPTIONS') return true;
    return super.canActivate(ctx);
  }
}
