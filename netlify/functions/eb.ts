// Netlify Function proxy for EasyBroker API
// Receives requests to /eb/* and forwards to https://api.easybroker.com/*
// injecting the X-Authorization header from env var VITE_EASYBROKER_API_KEY

export const config = {
  path: '/eb/*',
}

export default async (request: Request): Promise<Response> => {
  const apiKey = process.env.VITE_EASYBROKER_API_KEY
  if (!apiKey) {
    return new Response('Missing API key', { status: 500 })
  }

  const url = new URL(request.url)
  // Strip "/eb" prefix
  const upstreamPath = url.pathname.replace(/^\/eb/, '')
  const upstreamUrl = new URL(`https://api.easybroker.com${upstreamPath}${url.search}`)

  const init: RequestInit = {
    method: request.method,
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Authorization': apiKey,
    }),
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.text()
  }

  const res = await fetch(upstreamUrl, init)
  const body = await res.text()
  return new Response(body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}


