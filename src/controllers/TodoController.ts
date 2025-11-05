import HttpController from "./HttpController";
import TodoService from "../services/TodoService";

class TodoController extends HttpController{

    private todoService: TodoService = new TodoService();

    async create() {
        try {
            const title: string = this.req.body.title;
            const create = await this.todoService.createTodo(title);
            return this.res.status(create.statusCode).json(create.data);
        } catch(error) {
            console.error(error);
            return this.res.status(500).json({ error: "Erro ao criar tarefa" });
        }
    }

    async getAll(){
        const page: number = Number(this.req.query.page as string) || 1;
        const pageSize: number = Number(this.req.query.pageSize as string) || 12;

        try {
            const getAll = await this.todoService.getAllTodo(page, pageSize);
            return this.res.status(getAll.statusCode).json(getAll.data);
        } catch(error) {
            console.error(error);
            return this.res.status(500).json({ error: "Erro ao buscar lista de tarefas" });
        }
    }

    async getById(){
        const id: number = Number(this.req.params.id as string);

        try{
            const getTodoById = await this.todoService.getByIdTodo(id);
            return this.res.status(getTodoById.statusCode).json(getTodoById.data)
        } catch(error) {
            console.error(error);
            return this.res.status(500).json({ error: "Erro ao buscar tarefa" });
        }
    }

    async delete() {
        const id: number = Number(this.req.params.id as string);

        try{
            const todo = await this.todoService.deleteTodo(id);
            return this.res.status(todo.statusCode).json({message: todo.message})
        } catch(error) {
            console.error(error);
            return this.res.status(500).json({ error: "Erro ao deletar tarefa" });
        }
    }

    async edit() {
        const id: number = Number(this.req.params.id as string);
        const title: string = this.req.body.title;
        const completed: boolean = String(this.req.body.completed).toLowerCase() === "true";

        try{
            const todo = { id, title, completed }
            const edit = await this.todoService.editTodo(todo);
            return this.res.status(edit.statusCode).json(edit.data)
        } catch(error) {
            console.error(error);
            return this.res.status(500).json({ error: "Erro ao editar tarefa" });
        }
    }




}

export default TodoController;