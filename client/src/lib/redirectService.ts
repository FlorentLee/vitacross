/**
 * 页面重定向服务
 * 处理登录前页面的记录和登录后的跳转
 */

const REDIRECT_URL_KEY = 'vitacross_redirect_url';

/**
 * 保存当前页面 URL 用于登录后重定向
 */
export function saveCurrentPageForRedirect(url?: string): void {
  const pageUrl = url || window.location.pathname + window.location.hash;
  
  // 不保存登录/注册页面
  if (pageUrl.includes('/login') || pageUrl.includes('/register')) {
    return;
  }
  
  sessionStorage.setItem(REDIRECT_URL_KEY, pageUrl);
}

/**
 * 获取保存的重定向 URL
 */
export function getSavedRedirectUrl(): string | null {
  return sessionStorage.getItem(REDIRECT_URL_KEY);
}

/**
 * 清除保存的重定向 URL
 */
export function clearSavedRedirectUrl(): void {
  sessionStorage.removeItem(REDIRECT_URL_KEY);
}

/**
 * 获取 URL 查询参数中的重定向地址
 */
export function getRedirectFromQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('redirect');
}

/**
 * 构建带有重定向参数的 URL
 */
export function buildUrlWithRedirect(baseUrl: string, redirectPath?: string): string {
  if (!redirectPath) {
    return baseUrl;
  }
  
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}redirect=${encodeURIComponent(redirectPath)}`;
}

/**
 * 执行重定向
 */
export function performRedirect(url: string, setLocation: (path: string) => void): void {
  clearSavedRedirectUrl();
  setLocation(url);
}

/**
 * 获取最终的重定向 URL（优先级：查询参数 > 保存的 URL > 默认 URL）
 */
export function getFinalRedirectUrl(defaultUrl: string = '/account'): string {
  const queryRedirect = getRedirectFromQuery();
  if (queryRedirect) {
    return decodeURIComponent(queryRedirect);
  }
  
  const savedRedirect = getSavedRedirectUrl();
  if (savedRedirect) {
    return savedRedirect;
  }
  
  return defaultUrl;
}
