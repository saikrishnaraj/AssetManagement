const router = require('express').Router();
let Good = require('../models/good.model');
let Storage = require('../models/storage.model');

router.get('/', async (req, res) => {
  try {
    goods = await Good.find();
    for (i = 0; i < goods.length; i++) {
      goods[i] = await Good.findOne({
        goodid: goods[i].goodid,
      }).populate('storid', ['_id', 'temp', 'humid', 'location']);
      console.log(goods[i]);
    }
    res.json(goods);
  } catch (err) {
    res.status(400).json('Error:' + err);
  }
});

router.get('/:id', async (req, res) => {
  var id = req.params.id;
  console.log(id);
  try {
    goods = await Good.findOne({ goodid: id });
    let x = await Storage.find({ storageid: goods.storageid });

    goods = await Good.findOne({
      goodid: goods.goodid,
    }).populate('storid', ['_id', 'temp', 'humid', 'location']);
    console.log(goods);

    res.json(goods);
  } catch (err) {
    res.status(400).json('Error:' + err);
  }
});

router.post('/add', async (req, res) => {
  const goodid = req.body.goodid;
  const gpsval = req.body.gpsval;
  const storageid = req.body.storageid;
  const update = { goodid, gpsval, storageid };

  let x = await Storage.find({ storageid: storageid });
  if (x.length == 1) {
    storid = x[0];
    const newGood = new Good({ storid, goodid, gpsval, storageid });
    newGood
      .save()
      .then(() => res.json('Value added'))
      .catch((err) => res.status(400).json('Error:' + err));
  } else {
    res.status(400).json('Error: Storage unavailable');
  } /*
    try {
        let good = await Good.findOneAndUpdate(
            { storid: x._id },
            update,
            {
              new: true,
            }
          );
          await good.save();
          res.json(good);
        } 
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg:"server error"});
    }*/
});

module.exports = router;
