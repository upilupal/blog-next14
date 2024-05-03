import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

export const resetPasswordService = async (
  userId: number,
  password: string,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('account not found');
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      message: 'reset password success',
    };
  } catch (error) {
    throw error;
  }
};
