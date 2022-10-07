const { Server } = require("socket.io");

exports.sio = server => {
    return new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            pingTimeout: 7000,
            pingInterval: 3000
        }
    })
};

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

exports.connection = io => {
    io.on("connect", socket => {
        console.log("A user connected".green.underline.italic);

        // take userId and socketId from user
        socket.on("addUser", userId => {
            addUser(userId, socket.id);

            // append the users list as property of the IO object to be able to access it in the messages controller
            io.usersList = users
            io.emit("getUsers", users);
        });



        socket.on("disconnect", () => {
            console.log(`socket ${socket.id} disconnected`);
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
}