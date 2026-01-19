/**
 * 邮箱验证服务
 * 处理邮箱验证码的发送和验证
 */

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

export interface EmailVerificationCheckResponse {
  success: boolean;
  message: string;
  verified?: boolean;
}

/**
 * 发送邮箱验证码
 */
export async function sendEmailVerificationCode(email: string): Promise<EmailVerificationResponse> {
  try {
    const response = await fetch('/api/auth/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send verification code: ${response.statusText}`);
    }

    const data: EmailVerificationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send email verification code:', error);
    throw error;
  }
}

/**
 * 验证邮箱验证码
 */
export async function verifyEmailCode(email: string, code: string): Promise<EmailVerificationCheckResponse> {
  try {
    const response = await fetch('/api/auth/verify-email-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
      throw new Error(`Failed to verify email code: ${response.statusText}`);
    }

    const data: EmailVerificationCheckResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to verify email code:', error);
    throw error;
  }
}

/**
 * 生成随机验证码
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 验证码是否过期
 */
export function isVerificationCodeExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * 获取验证码过期时间（默认 10 分钟）
 */
export function getVerificationCodeExpiry(minutes: number = 10): Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}
