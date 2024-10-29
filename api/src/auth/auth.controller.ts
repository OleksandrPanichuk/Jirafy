import { CurrentUser } from '@/common/decorators';
import { AuthenticatedGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { OAuthState } from './auth.constants';
import { AuthService } from './auth.service';
import { OAuthUser } from './auth.types';
import { SignInInput, SignUpInput, VerifyIdentityInput } from './dto';
import { GithubOAuthGuard, GoogleOAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  private CLIENT_URL: string;

  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    this.CLIENT_URL = config.get<string>('CLIENT_URL');
  }

  @Post('verify-identity')
  @UseGuards(AuthenticatedGuard)
  async verifyIdentity(
    @Body() dto: VerifyIdentityInput,
    @CurrentUser('id') id: string,
  ) {
    return this.authService.verifyIdentity(dto, id);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Session() session, @Body() body: SignInInput) {
    const user = await this.authService.signIn(body);
    session.passport = { user: user.id };
    return user;
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpInput, @Session() session) {
    const user = await this.authService.signUp(dto);
    session.passport = { user: user.id };
    return user;
  }

  @Post('sign-out')
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  async logOut(@Req() req: Request) {
    req.session.destroy((err) => console.log(err));
    return { message: 'Successfully logged out' };
  }

  @Get('sign-in/google')
  @UseGuards(GoogleOAuthGuard)
  signInWithGoogle() {}

  @Get('callback/google')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(
    @Req() req: Request,
    @Session() session,
    @Res() res: Response,
  ) {
    return this.callback(res, req, session, 'google');
  }

  @Get('sign-in/github')
  @UseGuards(GithubOAuthGuard)
  signInWithGithub() {}

  @Get('callback/github')
  @UseGuards(GithubOAuthGuard)
  async githubCallback(
    @Req() req: Request,
    @Session() session,
    @Res() res: Response,
  ) {
    return this.callback(res, req, session, 'github');
  }

  private async callback(
    res: Response,
    req: Request,
    session: any,
    type: string,
  ) {
    try {
      const data = await this.authService.signInWithOAuth(
        req?.user as OAuthUser,
      );

      if (data.state === OAuthState.SIGNED_IN) {
        session.passport = { user: data.userId };
        return res.redirect(this.CLIENT_URL);
      }

      res.cookie('oauth_data', data.token, {
        expires: new Date(Date.now() + 1000 * 60 * 10),
      });

      return res.redirect(this.CLIENT_URL + '/oauth');
    } catch (err) {
      console.log(err);
      return res.redirect(`${this.CLIENT_URL}/auth?error=${type}`);
    }
  }
}
