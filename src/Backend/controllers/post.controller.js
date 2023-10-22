const Post = require("../models/post");

const PostCtrl = {};


PostCtrl.getPosts = async (req, res, next) => {
    try{
        const save = await Post.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

PostCtrl.createPost = async (req, res, next) => {
    try{
        const body = {
            title:req.body.title,
            description:req.body.description,
            images:req.body.images,
            text:req.body.text,
            order:req.body.order,
            owner:req.body.owner,
        }
        var save= await Post.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }


};

PostCtrl.getPost = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Post.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

PostCtrl.editPost = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Post.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

PostCtrl.deletePost = async (req, res, next) => {
    try{
        await Post.findByIdAndRemove(req.params.id);
        res.json({ status: "Post Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = PostCtrl;