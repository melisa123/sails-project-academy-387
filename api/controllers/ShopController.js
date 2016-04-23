/**
 * ShopController
 *
 * @description :: Server-side logic for managing shops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    createShop: function(req, res) {
        sails.log.info(req.body);
        Shop.create(req.params.all()).exec(function(err, data) {
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
    }
	
};