import { PrismaService } from '@app/prisma';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  constructor(private readonly prisma: PrismaService) {}

  public async checkIfFileIsUsed(key: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        cover: {
          is: {
            key,
          },
        },
      },
    });
    if (projects.length > 0) {
      throw new ForbiddenException('This file is used');
    }

    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            avatar: {
              is: {
                key,
              },
            },
          },
          {
            coverImage: {
              is: {
                key,
              },
            },
          },
        ],
      },
    });

    if (users.length > 0) {
      throw new ForbiddenException('This file is used');
    }

    const workspaces = await this.prisma.workspace.findMany({
      where: {
        logo: {
          is: {
            key,
          },
        },
      },
    });

    if (workspaces.length > 0) {
      throw new ForbiddenException('This file is used');
    }

    const documents = await this.prisma.document.findMany({
      where: {
        coverImage: {
          is: {
            key,
          },
        },
      },
    });

    if (documents.length > 0) {
      throw new ForbiddenException('This file is used');
    }

    const conversations = await this.prisma.conversation.findMany({
      where: {
        image: {
          is: {
            key,
          },
        },
      },
    });

    if (conversations.length > 0) {
      throw new ForbiddenException('This file is used');
    }


		//TODO: remove file from messages and comments
  }
}
