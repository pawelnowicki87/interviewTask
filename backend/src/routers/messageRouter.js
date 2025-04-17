import express from 'express';
import { messageController } from '../controllers/messageController.js';


export const messageRouter = express.Router();

messageRouter.get('/', messageController.addMessage);
messageRouter.put('/:id', messageController.editMessage);
messageRouter.delete('/:id', messageController.removeMessage);