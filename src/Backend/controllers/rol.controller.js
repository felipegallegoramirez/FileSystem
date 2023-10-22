const Rol = require("../models/rol");

const RolCtrl = {};


RolCtrl.getRols = async (req, res, next) => {
    try{
        const save = await Rol.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

RolCtrl.createRol = async (req, res, next) => {
    try{
        const body = {
            name:req.body.name,
            users:req.body.url,
        }
        var save= await Rol.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }


};

RolCtrl.getRol = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Rol.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

RolCtrl.editRol = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Rol.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

RolCtrl.deleteRol = async (req, res, next) => {
    try{
        await Rol.findByIdAndRemove(req.params.id);
        res.json({ status: "Rol Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = RolCtrl;