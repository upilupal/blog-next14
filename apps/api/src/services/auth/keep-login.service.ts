import prisma from "../../prisma";

export const keepLoginService = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error("invalid user id");
    }

    return {
      message: "keep login success",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
