import { defineMiddleware } from 'astro:middleware';

const ADMIN_COOKIE = 'devlog_admin';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // /admin 경로만 보호
  if (!pathname.startsWith('/admin')) {
    return next();
  }

  // /admin/login은 인증 없이 접근 허용
  if (pathname === '/admin/login') {
    return next();
  }

  const cookie = context.cookies.get(ADMIN_COOKIE);
  const sessionSecret = process.env.SESSION_SECRET;

  if (!cookie || cookie.value !== sessionSecret) {
    return context.redirect('/admin/login');
  }

  return next();
});
