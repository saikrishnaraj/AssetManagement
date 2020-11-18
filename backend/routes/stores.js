const router = require('express').Router();
let Store = require('../models/store.model');

router.route('/').get((req,res) => {
    Store.find()
    .then(stores => res.json(stores))
    .catch(err => res.status(400).json('Error:'+ err));
}
);

router.route('/add').post((req,res) => {
    const place = req.body.place;
    const newStore = new Store({place,});
    newStore.save()
    .then(() => res.json('Value added'))
    .catch (err => res.status(400).json('Error:'+ err));
}
);

module.exports = router;