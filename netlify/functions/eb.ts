// Netlify Function (Node) proxy for EasyBroker API
// Route configured in netlify.toml: /eb/* -> /.netlify/functions/eb/:splat
export async function handler(event: any) {
  const apiKey = process.env.VITE_EASYBROKER_API_KEY
  if (!apiKey) {
    return { statusCode: 500, body: 'Missing API key' }
  }

  const { path, rawQuery } = event
  // path is like "/.netlify/functions/eb/v1/properties" – strip the function prefix
  const upstreamPath = String(path).replace(/^\/.netlify\/functions\/eb/, '')
  const upstreamUrl = `https://api.easybroker.com${upstreamPath}${rawQuery ? `?${rawQuery}` : ''}`

  const res = await fetch(upstreamUrl, {
    method: event.httpMethod,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Authorization': apiKey,
    },
    body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
  })
  const text = await res.text()
  return {
    statusCode: res.status,
    headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' },
    body: text,
  }
}


