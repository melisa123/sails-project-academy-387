module.exports = {
    
    createUser: function(req, res) {
        sails.log.info(req.body);
        User.create(req.params.all()).exec(function(err, data) {
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
