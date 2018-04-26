module.exports = function (app) {
    if (typeof app.channel !== 'function') return;

    app.on('connection', connection => {
        app.channel('anonymous').join(connection);
    });

    app.on('login', (authResult, { connection }) => {
        if (connection) {
            const user = connection.user;

            app.channel('anonymous').leave(connection);
            app.channel('authenticated').join(connection);

            if (user.isAdmin) {
                app.channel('admins').join(connection);
            }

            if (Array.isArray(user.rooms)) {
                user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));
            }

            app.channel(`emails/${user.email}`).join(channel);
            app.channel(`userIds/${user.id}`).join(channel);
        }
    });

    app.publish((data, hook) => {
        console.log('Publishing all events to all authenticated users.');
        return app.channel('authenticated');
    });

    app.publish((data, hook) => {
        console.log('Publishing all events to all anonymous users.');
        return app.channel('anonymous');
    });
};

