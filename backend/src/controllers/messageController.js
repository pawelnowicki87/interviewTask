import {
    createNewMessage,
    updateMessage,
    deleteMessage,
    getAll
  } from '../services/messageService.js';

const getAllMessages = async (req, res, next) => {
    try{
        const messages = await getAll();
        res.status(200).json(messages);
    }
    catch(error) {
        next(error);
    }
}

const addMessage = async (req, res, next) => {
    const messageContent = req.body;

    try {
        console.log("BODY:", messageContent);
        const newMessage = await createNewMessage(messageContent);

        res.status(201).json({ message: "New message was CREATED successfully", newMessage})
    } 
    catch(error) {
        next(error);
    }
}

const editMessage = async (req, res, next) => {
    const messageId = req.params.id;
    const messageContent = req.body;

    try {
        const message = await updateMessage(messageId, messageContent);
        res.status(200).json({ message: "Message was EDITED successfully", message});
    }
    catch (error) {
        next(error);
    }
}

const removeMessage = async (req, res, next) => {
    const messageId = req.params.id;

    try {
        await deleteMessage(messageId);
        res.status(200).json({ message: "Message was DELETED successfully"})
    }
    catch (error) {
        next(error);
    }

}

export const messageController = {
    addMessage,
    editMessage,
    removeMessage,
    getAllMessages
}

