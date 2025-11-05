import dotenv from 'dotenv';
dotenv.config();
import Express, { Application } from "express";
import router from "./routes";
import sequelize from "./database/database";

class App {
    private app: Application = Express();
    private port: number = Number(process.env.PORT) || 3000;

    constructor( ) {
        this.initMiddlewares();
        this.routes();
    }

    private initMiddlewares() {
        this.app.use(Express.urlencoded({ extended: true }));
        this.app.use(Express.json());
    }

    private routes() {
        this.app.use('/api', router);
    }

    private async initDatabase() {
        try {
            await sequelize.sync();
            await sequelize.authenticate();
        } catch (error) {
            console.error('Erro ao iniciar banco de dados', error);
        }
    }

    public async start() {
        this.app.listen(this.port, () => {
           this.initDatabase();
            console.log(`http://localhost:${this.port}`);
        })
    }
}

const app = new App();
app.start();