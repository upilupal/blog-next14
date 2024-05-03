import { JWT_SECRET, NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error('invalid email address');
    }

    const token = sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '30m',
    });

    const link = NEXT_BASE_URL + `/reset-password?token=${token}`;

    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Link Reset Password',
      html: `<a href="${link}" target="_blank">Reset Password Here </a>`,
    });

    return {
      message: 'email reset password has been sent',
    };
  } catch (error) {
    throw error;
  }
};
