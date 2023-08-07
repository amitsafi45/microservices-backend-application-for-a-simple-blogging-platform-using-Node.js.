import { Router } from "express"
import { Message } from "../constants/message"
import pingRoutes from './ping.routes'
import userRoutes from './user.routes'
import mediaRoutes from './media.routes'
export type Route = {
    path: string
    route: Router
  }
  
  const router = Router()
  const routes: Route[] = [
    {
      path: "/ping",
      route: pingRoutes,
    },
    {
      path: "/user",
      route: userRoutes,
    },
    {
      path:'/media',
      route:mediaRoutes
    }
  ];
  
  // *Instantiate all the routes
  routes.forEach((route) => {
    router.use(route.path, route.route)
  })
  
  // *Route to ensure that server is currently running
  router.get('/', (req, res) => {
    res.send({
      success: true,
      message: Message['welcomeMessage'],
      data: [],
    })
  })
  
  export default router