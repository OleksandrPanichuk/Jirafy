import { IDENTITY_VERIFIED_COOKIE_NAME } from '@/app.constants';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'

@Injectable()
export class IdentityVerifiedGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;

    const identityToken = request.cookies[IDENTITY_VERIFIED_COOKIE_NAME];


    if (!identityToken) {
      return false;
    }



    return (
      await this.jwtService.verifyAsync(identityToken, {
        secret: this.config.get<string>('JWT_SECRET'),
      })
    ).verified;
  }
}
