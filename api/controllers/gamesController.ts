import { Request, Response } from "express";


class GamesController {
    public async index(req: Request, res: Response): Promise<void> {
        try{           
            res.json({'games': 'games'});
        }catch(err){
            console.log(err)
        }
    }   

    public async create(req: Request, res: Response): Promise<void> {
        try{          
            res.json({ text: `the game has been created!`});
        }catch(err){
            console.log(err)
        }
    }

    public async update(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;         
            res.json({ text: `the game with id ${id} has been updated!`});
        }catch(err){
            console.log(err)
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params.id;
            res.json({ text: `the game with id ${id} has been deleted! `})
        }catch(err){
            console.log(err)
        }
        
    }

    public async getGameById(req: Request, res: Response): Promise<any> {
        try{
            return res.json('list');
        }catch(err){
            console.log(err)
        }
    }

}

export const gamesController = new GamesController();