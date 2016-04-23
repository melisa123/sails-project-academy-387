module.exports = {
    attributes: {
        brand: {
            type: 'string',
            required: true
        },
        manufacturer: {
            type: 'string',
            required: true
        },
        color: {
            type: 'string',
            required: true
        },
        seatNumber: {
            type: 'string',
            min: 2,
            integer: true,
            required: true
        },
        engineVolume: {
            type: 'string',
            required: true,
            integer: true,
        },
        
        buyPrice: {
            type: 'float',
            required:true,
        },
        
        rentPrice: {
            type: 'float',
            required:true,
        },

        transmission: {
            type: 'string',
            enum: ['Auto', 'Manual'],
            required: true
        },
        ownerUser: {
            model: 'user'
        },
        ownerShop: {
            model: 'shop'
        },
        rentUser: {
            model: 'user'
        }
    }
};