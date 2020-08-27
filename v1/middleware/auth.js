export default function (context) {
  // console.log(process.env)
  // console.log('auth', context)
  const { app, store, redirect, req, route } = context
  console.log(context)
}
