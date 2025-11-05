import { Router } from "express";
import TodoController from "../controllers/TodoController";

const router = Router();

router.post('/todo', (req, res) => new TodoController(req, res).create());
router.get('/todo', (req, res) => new TodoController(req, res).getAll());
router.get('/todo/:id', (req, res) => new TodoController(req, res).getById());
router.delete('/todo/:id', (req, res) => new TodoController(req, res).delete());
router.put('/todo/:id', (req, res) => new TodoController(req, res).edit());

export default router;