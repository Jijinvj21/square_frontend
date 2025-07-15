// middleware.js in project root
export const config = { matcher: '/post/:path*' };

export default async function middleware(req) {
  const ua = req.headers.get('user-agent') || '';
  const crawlers = /Twitterbot|facebookexternalhit|LinkedInBot|WhatsApp|Pinterest/i;
  
  if (!crawlers.test(ua)) return;
  
  const path = req.nextUrl.pathname;
  const postId = path.split('/').pop();
  
  // Fetch post data from your API
  const post = await fetch(`https://your-api.com/posts/${postId}`).then(res => res.json());
  
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${post.title}</title>
        <meta property="og:title" content="${post.title}" />
        <meta property="og:description" content="${post.description}" />
        <meta property="og:image" content="${post.imageUrl}" />
        <meta property="og:url" content="https://yourdomain.com${path}" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image">
      </head>
      <body>
        <img src="${post.imageUrl}" alt="${post.title}" />
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' },
  });
}