function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

var card_collection = [{
    _id: 0,
    location_id: 0,
    name: 'Watch TV',
    location: 'Home',
    description: 'Catch up on a series!'
},
{
    _id: 1,
    location_id: 1,
    name: 'Go for a walk',
    location: 'Town',
    description: 'Check out the area'
},
{
    _id: 2,
    location_id: 2,
    name: 'Jog in the park',
    location: 'Park',
    description: 'Get that blood pumpin'
},
{
    _id: 3,
    location_id: 1,
    name: 'Go to the gym',
    location: 'Town',
    description: 'Pump some iron'
},
{
    _id: 4,
    location_id: 1,
    name: '3v3 Basketball',
    location: 'Town',
    description: 'Claim the court!'
},
{
    _id: 5,
    location_id: 0,
    name: 'Host a LAN Party',
    location: 'Home',
    description: 'rek sum n00bs'
}
];

var location_collection = [
    {
        _id: 0,
        _parent: 0,
        name: 'Home',
        description: 'A Cozy little nook'
    },
    {
        _id: 1,
        _parent: 0,
        name: 'Town',
        description: 'A lively little town'
    },
    {
        _id: 2,
        _parent: 1,
        name: 'Park',
        description: 'A lush, green space'
    },
    {
        _id: 3,
        _parent: 1,
        name: 'Library',
        description: 'A trove of knowledge'
    },
    {
        _id: 2,
        _parent: 1,
        name: 'Market',
        description: 'A bustling atmosphere'
    }
]

var event_collection = [
    {
        _id: 0,
        location_id: 0,
        name: 'Host',
        description: 'Invite some friends over'
    },
    {
        _id: 0,
        location_id: 1,
        name: 'Visit',
        description: 'Go see a sight'
    },
    {
        _id: 0,
        location_id: 2,
        name: 'Sports',
        description: 'Play in a tournament'
    },
    {
        _id: 0,
        location_id: 1,
        name: 'Concert',
        description: 'Watch a concert'
    },
    {
        _id: 0,
        location_id: 2,
        name: 'Volunteering',
        description: 'Help people'
    }
]

var player_collection = [
    {
        _id: 0,
        name: 'Raul',
        description: 'I like pizzas'
    },
    {
        _id: 1,
        name: 'Pedro',
        description: 'I like pies'
    },
    {
        _id: 2,
        name: 'Noddy',
        description: 'I like diamonds'
    },
    {
        _id: 3,
        name: 'Freddy',
        description: 'I like knives'
    }
]






