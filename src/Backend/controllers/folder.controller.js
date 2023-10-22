const Folder = require("../models/folder");

const FolderCtrl = {};


FolderCtrl.getFolders = async (req, res, next) => {
    try{
        const save = await Folder.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

FolderCtrl.createFolder = async (req, res, next) => {
    try{
        const body = {
            name:req.body.name,
            image:req.body.image,
            rol:req.body.rol,
            users:req.body.users,
            files_id:req.body.files_id,
            owner:req.body.owner,
        }
        var save= await Folder.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }


};

FolderCtrl.getFolder = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Folder.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

FolderCtrl.editFolder = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Folder.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

FolderCtrl.deleteFolder = async (req, res, next) => {
    try{
        await Folder.findByIdAndRemove(req.params.id);
        res.json({ status: "Folder Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = FolderCtrl;