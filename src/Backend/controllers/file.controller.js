const File = require("../models/file");
const Folder = require("../models/folder");

const FileCtrl = {};


FileCtrl.getFiles = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await File.find();
        const folder = await Folder.findById(id);
        let data = save.filter(x=> folder.files_id.includes(x._id))
        res.status(200).send(data)
    }catch(err){
        res.status(400).send(err)

    }
};

FileCtrl.createFile = async (req, res, next) => {
    try{
        const body = {
            name:req.body.name,
            url:req.body.url,
            owner:req.body.owner,
        }
        var save= await File.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }


};

FileCtrl.getFile = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await File.findById(id);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

FileCtrl.editFile = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await File.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

FileCtrl.deleteFile = async (req, res, next) => {
    try{
        await File.findByIdAndRemove(req.params.id);
        res.json({ status: "File Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = FileCtrl;