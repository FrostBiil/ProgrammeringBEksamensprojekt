import Express, { Application } from 'express'
import Cors from './utils/cors'
import Routes from './router'

/**
 * Singelton class to create and manage an express server
 */
export default class Server {
    private application: Application
    private port: number | string

    constructor() {
        this.port = process.env.PORT || 3000
        this.application = Express()
    }

    private plugins() {
        this.application.use(Express.urlencoded({ extended: true }))
        this.application.use(Express.json())
        this.application.use(Cors())
          this.application.use(Routes)
    }

    public run() {
        try {
            this.plugins()
            this.application.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`)
            })
        } catch (err) {
            console.error(err)
            process.exit(1)
        }
    }
}

new Server().run()