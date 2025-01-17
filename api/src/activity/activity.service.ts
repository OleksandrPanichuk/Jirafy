import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ActivityType } from './activity.types';
import { CreateActivityInput, FindAllActivityInput } from './dto';

const DEFAULT_TAKE_ACTIVITY = 40;

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllWorkspaceActivity(
    dto: FindAllActivityInput,
    userId: string,
  ) {
    const { type, identifier, cursor, take } = dto;

    let whereCondition: Prisma.ActivityWhereInput;

    switch (type) {
      case ActivityType.WORKSPACE: {
        whereCondition = {
          workspaceId: identifier,
          workspace: {
            members: {
              some: {
                userId,
              },
            },
          },
        };
        break;
      }
      default: {
        whereCondition = {};
      }
    }

    const limit = take ?? DEFAULT_TAKE_ACTIVITY;

    const activity = await this.prisma.activity.findMany({
      where: whereCondition,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      take: cursor ? limit + 1 : limit,
    });
    let nextCursor: typeof cursor | undefined = undefined;

    if (activity.length > limit) {
      const nextItem = activity.pop();
      nextCursor = nextItem!.id;
    }

    return {
      activity,
      nextCursor,
    };
  }

  public async create(input: CreateActivityInput) {
    const { type, data, userId, workspaceId, issueId, projectId } = input;

    return await this.prisma.activity.create({
      data: {
        type,
        data,
        userId,
        workspaceId,
        issueId,
        projectId,
      },
    });
  }
}
