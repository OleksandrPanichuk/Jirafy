import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkspaceInput, SelectWorkspaceInput } from './dto';
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

  @Post('select')
  selectWorkspace(
    @Body() dto: SelectWorkspaceInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.workspacesService.selectWorkspace(dto, userId);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteWorkspace(@Param('id') workspaceId:string,@CurrentUser('id') userId: string) {
    return this.workspacesService.delete(workspaceId,userId);
  }
}
