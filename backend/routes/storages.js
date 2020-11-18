const router = require('express').Router();
let Storage = require('../models/storage.model');

let Store = require('../models/store.model');

router.get('/',async(req,res) => {

    Storage.find()
    .then(storages => res.json(storages))
    .catch(err => res.status(400).json('Error:'+ err));
}
);

router.get('/:id',async(req,res) => {
    var id =req.params.id
    const storages = await Storage.findOne({storageid:id})
   
    .then(storages => res.json(storages))
    .catch(err => res.status(400).json('Error:'+ err));
}
);

router.post('/add',async(req,res) => {
    let temp = req.body.temp;
    const humid = req.body.humid;
    const storageid = req.body.storageid;
    const location = req.body.location;
    let x = await Store.find({place : location});
   
    if (x.length==1){
        
            const newStorage = new Storage({temp,humid,storageid,location});
            newStorage.save()
            .then(() => res.json('Value added'))
            .catch (err => res.status(400).json('Error:'+ err));
    
    }
    else{
        res.status(400).json('Error: No location available');
    }
}
);

router.post('/update',async(req,res) => {
    let temp = req.body.temp;
    let humid = req.body.humid;
    const storageid = req.body.storageid;
    const location = req.body.location;
        let y = await Storage.find({storageid:storageid});
        if(y.length==0){
            res.json("No Storage found")
        }
        else{
            if(y[0].temp.length==15 ){
            temp1=y[0].temp
            temp1.shift();
            temp=temp1.concat(temp);
            }
            else{
                temp1 = y[0].temp.concat(temp);
                temp=temp1;
            }
            if(y[0].humid.length==15 ){
                humid1=y[0].humid
                humid1.shift();
                humid=humid1.concat(humid);
                }
                else{
                    humid1 = y[0].humid.concat(humid);
                    humid=humid1;
                }
            console.log(humid);
            let storage = await Storage.findOneAndUpdate({storageid:storageid},{temp,humid,storageid,location})
            await storage.save();
            res.json("Updated");
            
        }
}
);

module.exports = router;