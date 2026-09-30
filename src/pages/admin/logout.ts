export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = ({ cookies, redirect }) => {
  cookies.delete('devlog_admin', { path: '/' });
  return redirect('/admin/login');
};
