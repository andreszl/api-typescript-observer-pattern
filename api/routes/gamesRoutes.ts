import { Router } from 'express';
import { gamesController } from '../controllers/gamesController';

class GamesRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', gamesController.index);
        this.router.post('/', gamesController.create);
        this.router.put('/:id', gamesController.update);
        this.router.delete('/:id', gamesController.delete);
        this.router.get('/:id', gamesController.getGameById);
    }
}

const gamesRoutes = new GamesRoutes();

export default gamesRoutes.router;