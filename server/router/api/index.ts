import Router from '../Router'
import AuthRoutes from './auth'

class ApiRoute extends Router {
  public baseRoute = '/api'

  public routes() {

    /**
     * Tilføj api endpoints her
     */ 
    this.router.use(AuthRoutes.baseRoute, AuthRoutes.router)
  }
}

export default new ApiRoute()