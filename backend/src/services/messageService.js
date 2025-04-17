import Message from "../models/messageModel"

const createNewMessage = async (content) => {
    return await Message.create({content});
}

const updateMessage = async (id, content) => {
    const message = await Message.findByPk(id);

    if(!message) {
        throw new Error("Message by ID doesnt exist");
    }

    message.content = content;
    await message.save();

    return message
}

const deleteMessage = async (id) => {
    const message = await Message.findByPk(id);

    if(!message) {
        throw new Error("Message by ID doesnt exist");
    }

    await message.destroy();

}

module.exports = {
    createNewMessage,
    updateMessage,
    deleteMessage
}
