const Folder = require("../models/folder");
const User = require("../models/user");

const FolderCtrl = {};


FolderCtrl.getFolders = async (req, res, next) => {
    try{
        const { id } = req.params;
        console.log(id)
        const user=await User.findById(id);
        const save = await Folder.find();
        //|| x.users.findIndex(x)!=-1 || x.rol.findIndex(y=>{user.rol.findIndex(y)!=-1})==-1
        let data
        if(user.permissions.includes(0)){
            data=save.filter(x=>x._id!="6540565607a77321ce07e16d")
        }else{
            data=save.filter(x=>(x.owner==id|| x.users.indexOf(id)!=-1|| x.rol.find(y=>user.roles_id.indexOf(y)!=-1)!=null))
        }

        res.status(200).send(data)
    }catch(err){
        console.log(err)
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
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

FolderCtrl.editFolder = async (req, res, next) => {
    try{
        const { id } = req.params;
        console.log(id)
        console.log(await Folder.findById(id))
        save = await Folder.findByIdAndUpdate(id, {$set: req.body}, {new: true});

        res.status(200).send(save)
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