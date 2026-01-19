/**
 * OAuth 认证服务
 * 处理 Google、Microsoft、Apple OAuth 流程
 */

export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'microsoft' | 'apple';
}

/**
 * Google OAuth 配置
 */
export const googleOAuthConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
  redirectUri: `${window.location.origin}/auth/google/callback`,
  scope: 'openid email profile',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/people/v1/rest'],
};

/**
 * Microsoft OAuth 配置
 */
export const microsoftOAuthConfig = {
  clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID || 'YOUR_MICROSOFT_CLIENT_ID',
  redirectUri: `${window.location.origin}/auth/microsoft/callback`,
  scope: 'openid email profile',
  authority: 'https://login.microsoftonline.com/common',
};

/**
 * Apple OAuth 配置
 */
export const appleOAuthConfig = {
  clientId: import.meta.env.VITE_APPLE_CLIENT_ID || 'YOUR_APPLE_CLIENT_ID',
  redirectUri: `${window.location.origin}/auth/apple/callback`,
  scope: 'openid email profile',
  teamId: import.meta.env.VITE_APPLE_TEAM_ID || 'YOUR_APPLE_TEAM_ID',
  keyId: import.meta.env.VITE_APPLE_KEY_ID || 'YOUR_APPLE_KEY_ID',
};

/**
 * 初始化 Google OAuth
 */
export async function initializeGoogleOAuth() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if ((window as any).google?.accounts?.id) {
        resolve((window as any).google.accounts.id);
      } else {
        reject(new Error('Google OAuth failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Google OAuth script'));
    document.head.appendChild(script);
  });
}

/**
 * 启动 Google OAuth 流程
 */
export async function initiateGoogleOAuth() {
  try {
    const googleAuth = await initializeGoogleOAuth();
    
    return new Promise((resolve, reject) => {
      // 使用 Google 的 One Tap 登录或重定向流程
      const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: googleOAuthConfig.clientId,
        redirect_uri: googleOAuthConfig.redirectUri,
        response_type: 'code',
        scope: googleOAuthConfig.scope,
        access_type: 'offline',
        prompt: 'consent',
      }).toString()}`;
      
      window.location.href = redirectUrl;
    });
  } catch (error) {
    console.error('Google OAuth initialization failed:', error);
    throw error;
  }
}

/**
 * 启动 Microsoft OAuth 流程
 */
export async function initiateMicrosoftOAuth() {
  try {
    const redirectUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${new URLSearchParams({
      client_id: microsoftOAuthConfig.clientId,
      redirect_uri: microsoftOAuthConfig.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      response_mode: 'query',
      prompt: 'select_account',
    }).toString()}`;
    
    window.location.href = redirectUrl;
  } catch (error) {
    console.error('Microsoft OAuth initialization failed:', error);
    throw error;
  }
}

/**
 * 启动 Apple OAuth 流程
 */
export async function initiateAppleOAuth() {
  try {
    const redirectUrl = `https://appleid.apple.com/auth/authorize?${new URLSearchParams({
      client_id: appleOAuthConfig.clientId,
      redirect_uri: appleOAuthConfig.redirectUri,
      response_type: 'code',
      response_mode: 'form_post',
      scope: 'openid email name',
      state: generateState(),
    }).toString()}`;
    
    window.location.href = redirectUrl;
  } catch (error) {
    console.error('Apple OAuth initialization failed:', error);
    throw error;
  }
}

/**
 * 处理 OAuth 回调
 */
export async function handleOAuthCallback(provider: 'google' | 'microsoft' | 'apple', code: string): Promise<OAuthUser> {
  try {
    // 调用后端 API 交换授权码获取用户信息
    const response = await fetch(`/api/auth/${provider}/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`OAuth callback failed: ${response.statusText}`);
    }

    const user: OAuthUser = await response.json();
    return user;
  } catch (error) {
    console.error(`${provider} OAuth callback failed:`, error);
    throw error;
  }
}

/**
 * 生成随机状态值用于 OAuth 安全性
 */
function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * 从 URL 获取 OAuth 授权码
 */
export function getOAuthCodeFromURL(): { code: string; state?: string } | null {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');

  if (code) {
    return { code, state: state || undefined };
  }

  return null;
}

/**
 * 清除 OAuth 相关的 URL 参数
 */
export function cleanOAuthURLParams() {
  window.history.replaceState({}, document.title, window.location.pathname);
}
