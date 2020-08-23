export default function (context) {
  console.log('middleware')
  const userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
  context.isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(userAgent)
}
