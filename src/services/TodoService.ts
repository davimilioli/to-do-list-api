import { Todo } from "../types/Todo";
import { TodoModel } from "../database/Todo";
import ResponseService from "./ResponseService";
import ResponseHandler from "../types/ResponseHandler";

class TodoService {

    private responseService: ResponseService;

    constructor() {
        this.responseService = new ResponseService();
    }
    
    async createTodo(title: string): Promise<ResponseHandler> {
        try {
            const create = await TodoModel.create(
                {
                    title: title,
                    completed: false
                }
            )

            return this.responseService.success(
                'Tarefa criada com sucesso',
                201, 
                create.toJSON()
            );

        } catch(error) {
            console.log('Erro interno no servidor');
            this.responseService.error('Erro interno no servidor', 500);
            throw new Error('Erro interno no servidor');
        }
    }

    async getAllTodo(page: number, pageSize: number): Promise<ResponseHandler> {
        try{
            const offset = (page - 1) * pageSize;

            const {count, rows}  = await TodoModel.findAndCountAll({
                offset: offset,
                limit: pageSize,
                order: [['id', 'ASC']]
            })

            return this.responseService.success(
                '',
                200, 
                {
                    page: page,
                    pageSize: pageSize,
                    total: count,
                    todos: rows
                }
            );

        } catch(error){
            console.log('Erro interno no servidor');
            this.responseService.error('Erro interno no servidor', 500);
            throw new Error('Erro interno no servidor');
        }
    }

    async getByIdTodo(id: number): Promise<ResponseHandler> {
        try{
            const todo = await TodoModel.findByPk(id);

            if(!todo){
                return this.responseService.error(
                    'Tarefa não encontrada',
                    404
                );
            }

            return this.responseService.success('', 200, todo);
        } catch(error) {
            console.log('Erro interno no servidor');
            this.responseService.error('Erro interno no servidor', 500);
            throw new Error('Erro interno no servidor');
        }
    }

    async deleteTodo(id: number): Promise<ResponseHandler> {

        try{
            const todo = await TodoModel.findByPk(id);

            if(!todo){
                return this.responseService.error(
                    'Tarefa não encontrada',
                    404
                );
            }

            await TodoModel.destroy({ where: { id: id } });
            return this.responseService.success('Tarefa excluída com sucesso', 200);

        } catch(error) {
            console.log('Erro interno no servidor');
            this.responseService.error('Erro interno no servidor', 500);
            throw new Error('Erro interno no servidor');
        }
    }

    async editTodo(todo: Todo): Promise<ResponseHandler> {

        try {
            const edit = await TodoModel.findByPk(todo.id);

            if(!edit){
                return this.responseService.error(
                    'Tarefa não encontrada',
                    404
                );
            }

            await edit.update({
                title: todo.title ?? edit.title,
                completed: todo.completed ?? edit.completed
            })

            return this.responseService.success(
                'Tarefa editada com sucesso',
                200,
                edit.toJSON()
            );

        } catch(error) {
            console.log('Erro interno no servidor');
            this.responseService.error('Erro interno no servidor', 500);
            throw new Error('Erro interno no servidor');
        }
    }
    
}

export default TodoService;