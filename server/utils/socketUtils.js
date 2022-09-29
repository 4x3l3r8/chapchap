const { Server } = require("socket.io");

exports.sio = server => {
    return new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL
        }
    })
};

exports.connection = io => {
    io.on("connection", socket => {
        console.log("A user connected".green.underline.italic);

        socket.emit("hey", "brother");

        socket.on("disconnect", () => {
            console.log(`socket ${socket.id} disconnected`)
        });
        socket.on("hello", (arg) => {
            console.log(arg)
        });
    });
}