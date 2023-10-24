const { delet } = require("../utils/imgdelete");

const DataCtrl = {};


DataCtrl.saveData = async (req, res, next) => {
    try{
        res.status(200).send({url:req.file.filename})
    }catch(err){
        res.status(400).send(err)

    }
};

DataCtrl.putData = async (req, res, next) => {
    try{
        const { act } = req.params;
        delet(act)
        res.status(200).send({url:req.file.filename})
    }catch(err){
        res.status(400).send(err)

    }
};


module.exports = DataCtrl;