// import something here
import io from 'socket.io-client'
export default async ({ app, router, Vue }) => {
  Vue.prototype.$IO = await io('http://localhost:3000')
}
