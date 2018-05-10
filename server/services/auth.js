const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const KnexService = require('feathers-knex');
const UserModel = require('../models/users.model');

module.exports = function (app) {
    const paginate = app.get('paginate');

    app.use('/users', KnexService({
        Model: UserModel(app),
        name: 'users',
        paginate
    }));

    const service = app.service('users');
    service.hooks({
        before: {
            all: [],
            find: [ authenticate('jwt') ],
            get: [ authenticate('jwt') ],
            create: [ hashPassword() ],
            update: [ hashPassword(),  authenticate('jwt') ],
            patch: [ hashPassword(),  authenticate('jwt') ],
            remove: [ authenticate('jwt') ]
        },
        after: {
            all: [ 
            // Always remove password, must be the last hook
                protect('password')
            ],
        }
    });
};
