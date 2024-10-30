import { CurrentUser } from '@/common/decorators';
import { AuthenticatedGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkspaceInput } from './dto';
import { WorkspacesService } from './workspaces.service';

@UseGuards(AuthenticatedGuard)
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser('id') userId: string) {
    return this.workspacesService.findAll(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateWorkspaceInput, @CurrentUser('id') userId: string) {
    return this.workspacesService.create(dto, userId);
  }
}
