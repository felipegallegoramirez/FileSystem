

const DataCtrl = {};


DataCtrl.saveData = async (req, res, next) => {
    try{
        res.status(200).send({url:req.image})
    }catch(err){
        res.status(400).send(err)

    }
};

module.exports = DataCtrl;