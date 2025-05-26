import { prismaClient } from "../app";

class ListItemService {
  private static instance: ListItemService;

  static getInstance(): ListItemService {
    if (!ListItemService.instance) {
      ListItemService.instance = new ListItemService();
    }
    return ListItemService.instance;
  }

  async getListItemByListIdAndContentId(listId: string, contentId: string) {
    return await prismaClient.listItem.findFirst({
      where: { listId, contentId },
    });
  }

  async getAllListItemByListId(listId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prismaClient.listItem.findMany({
        where: { listId },
        skip,
        take: limit,
        include: {
          content: {
            include: {
              movie: true,
              tvShow: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.listItem.count({
        where: { listId },
      }),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(listId: string, contentId: string) {
    return await prismaClient.listItem.create({
      data: {
        list: {
          connect: {
            id: listId,
          },
        },
        content: {
          connect: {
            id: contentId,
          },
        },
      },
    });
  }

  async delete(listItemId: string, listId: string) {
    return await prismaClient.listItem.deleteMany({
      where: {
        id: listItemId,
        listId,
      },
    });
  }
}

export default ListItemService.getInstance();
