/**
 * CarController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createCarWithOwner: function(req, res) {
        sails.log.info(req.body);
        Car.create(req.params.all()).exec(function(err, data) {
            if (err) {
                sails.log.error(err);
                res.json(err);
                return;
            }
            else {
                res.json(data);
                return;
            }
        });
    },

    getCarsFromUser: function(req, res) {
        Car.find({ where: { ownerUser: req.param('user_id') } }, function(err, data) {
            if (err) {
                sails.log.error(err);
                res.json(req.param("user_id"));
            }
            else {
                sails.log.info(data);
                res.json(data);
            }
        })
    },

    buyCar: function (req, res) {
        Car.findOne({ id: Number(req.param("car_id")) }).exec(function (err, car) {
            //XOR funkcija unutar if ispod -> samo jedan parametar prolazi 
            if ((req.param('user_id') && !req.param('shop_id')) || (!req.param('user_id') && req.param('shop_id'))) {
                if (req.param('user_id')) {
                    User.findOne({ id: req.param("user_id")}).exec(function(err, user) {
                        if (err) {
                            res.json(err);
                            return;
                        }
                        
                        if (user.balance.amount < car.buyPrice) {
                            res.json({"errorMessage" : "Insufficient funds to buy this car"});
                            return;
                        }
                                        
                        Car.update({ id: Number(req.param('car_id')) }, { ownerShop: null, ownerUser: req.param('user_id') }).exec(function (err, data) {
                            if (err) {
                                res.json(err);
                            }
                            else {
                                res.json(data);
                            }
                        });
                    });
                }
                else if (req.param('shop_id')) {
                    Shop.findOne({ id: req.param("shop_id")}).exec(function(err, shop) {
                        if (err) {
                            res.json(err);
                            return;
                        }
                        
                        if (shop.balance.amount < car.buyPrice) {
                            res.json({"errorMessage" : "Insufficient funds to buy this car"});
                            return;
                        }
                        
                        Car.update({ id: Number(req.param('car_id')) }, { ownerShop: req.param('shop_id'), ownerUser: null }).exec(function (err, data) {
                            if (err) {
                                res.json(err);
                            }
                            else {
                                res.json(data);
                            }
                        });
                    });
                }
            }
            else {
                res.json({ errorMessage: 'Something is not right.' });
            }
        });
    },

    rentCar: function (req, res) {
        Car.findOne({ id: Number(req.param("car_id")) }).exec(function (err, car) {
            if (err)
                res.json(err);
            else {
                sails.log.info("Owned by shop: ", car.ownerShop);
                sails.log.info("Rented: ", car.rented);
                sails.log.info("car: ", car ); 
                
                User.findOne({ id: req.param("user_id")}).exec(function(err, user) {
                    if (err) {
                        res.json(err);
                        return;
                    }
                        
                    if (car.ownerShop != null && car.rented  == null) {
                        // Compare amount of user balance and rent price 
                        if (user.balance.amount < car.rentPrice) {
                            res.json({"errorMessage" : "Insufficient funds to rent this car"});
                            return;
                        }
                        
                        Car.update({ id: Number(req.param('car_id')) }, { rented: req.param("user_id") }).exec(function (err, data) {
                            if (err) {
                                res.json(err);
                            }
                            else {
                                res.json(data);
                            }
                        });
                    }
                    else{
                        res.json({"errorMessage" : "Car rented or not owned by shop!!!"});
                    }
                });
            }
        })
    },
    
    returnCar: function(req, res) {
        Car.findOne({id: Number(req.param("car_id"))}).exec(function (err, car) {
           if(err){
               res.json(err);
           }
           else{
               if(car.rented != null){
                   Car.update({id: Number(req.param("car_id"))}, {rented: null}).exec(function (err, data) {
                       if(err){
                           res.json(err);
                       }
                       else{
                           res.json(data);
                       }
                   })
               }
               else{
                   res.json({"errorMessage" : "Car is not rented!!!"});
               }
           }
        })
    }

};
