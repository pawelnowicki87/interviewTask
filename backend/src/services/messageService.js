import { Message } from "../models/messageModel.js"

export const getAll = async () => {
    return await Message.findAll();
}

export const createNewMessage = async (content) => {
    return await Message.create({content});
}

export const updateMessage = async (id, content) => {
    const message = await Message.findByPk(id);

    if(!message) {
        throw new Error("Message by ID doesnt exist");
    }

    message.content = content;
    await message.save();

    return message
}

export const deleteMessage = async (id) => {
    const message = await Message.findByPk(id);

    if(!message) {
        throw new Error("Message by ID doesnt exist");
    }

    await message.destroy();

}
