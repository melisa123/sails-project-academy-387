module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        location: {
            type: 'string'
        },
        cars: {
            collection: 'car',
            via: 'ownerShop'
        },
        balance: {
            model: 'balance',
            required: true
        }
    }

};