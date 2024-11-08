import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllByWorkspaceSlug(slug: string, userId: string) {
    return this.prisma.project.findMany({
      where: {
        workspace: {
          slug
        },
        members: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
