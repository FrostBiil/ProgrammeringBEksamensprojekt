import Router from '../Router'
import AuthRoutes from './auth'
import GameRoutes from './game'

class ApiRoute extends Router {
  public baseRoute = '/api'

  public routes() {

    /**
     * Tilføj api endpoints her
     */
    this.router.use(AuthRoutes.baseRoute, AuthRoutes.router)
    this.router.use(GameRoutes.baseRoute, GameRoutes.router)
  }
}

export default new ApiRoute()