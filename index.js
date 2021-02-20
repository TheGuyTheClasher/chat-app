const app = require('express')();
const http = require('http').Server(app);
// initialised the new instance of socket.io by passing http object.
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    var users = {};
    socket.on('new_name', (person) => {
        users[socket.id] = person;

        socket.broadcast.emit("new_join", `${person} JOINED`);

    });


    // a socket.id is assigned to each new connection bt default. one the socket attributes.
    // console.log(socket.id);
    socket.on('chat message', (id, msg) => {
        var today = new Date();
        // console.log("toString--->", today.toString());
        // console.log("today--->", today)
        console.log("hours--> ", today.getHours());
        console.log("minutes--->", today.getMinutes());

        let time = today.getHours() + ":" + today.getMinutes()
        console.log("time-->", time);


        io.emit('chat message', users[id], time, msg);
    });



    // socket.on("ping", (count) => {
    //     console.log("count--> ", count);
    // });

});




http.listen(3000, () => {
    console.log("listening on port: 3000");
});
