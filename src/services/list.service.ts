import { prismaClient } from "../app";

class ListService {
  private static instance: ListService;

  static getInstance(): ListService {
    if (!ListService.instance) {
      ListService.instance = new ListService();
    }
    return ListService.instance;
  }

  async getListByUserIdAndName(userId: string, name: string) {
    return await prismaClient.list.findFirst({
      where: { userId, name },
    });
  }

  async getListById(listId: string) {
    return await prismaClient.list.findUnique({ where: { id: listId } });
  }

  async getListByIdAndUserId(listId: string, userId: string) {
    return await prismaClient.list.findUnique({
      where: { id: listId, userId },
      include: {
        items: {
          include: {
            content: {
              include: {
                movie: true,
                tvShow: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllListByUserId(userId: string, includeItems: boolean) {
    let query: any = {
      where: {
        userId: userId,
      },
    };

    if (includeItems) {
      query["include"] = {
        items: true,
      };
    }

    return await prismaClient.list.findMany(query);
  }

  async create(userId: string, name: string) {
    return await prismaClient.list.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(listId: string, userId: string, name: string) {
    return await prismaClient.list.updateMany({
      where: {
        id: listId,
        userId: userId,
      },
      data: {
        name,
      },
    });
  }

  async delete(listId: string, userId: string) {
    return await prismaClient.list.deleteMany({
      where: {
        id: listId,
        userId,
      },
    });
  }
}

export default ListService.getInstance();
