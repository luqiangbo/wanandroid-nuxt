export default function (context) {
  // console.log(process.env)
  // console.log('auth', context)
  const userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
  context.isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(userAgent)
}
