const messages = [];
const MAX_LENGTH = 1000;

export const addMessage = ({room, user, text, date, isService}) => {
    messages.push({room, user, text, date, isService});
    clearFirstMessages()
};

export const getMessagesByRoom = (room) => (
    messages.filter((message) => message.room === room)
);

const clearFirstMessages = () => {
    if (messages.length > MAX_LENGTH) {
        messages.slice(MAX_LENGTH - Math.floor(MAX_LENGTH/3), MAX_LENGTH);
    }
};