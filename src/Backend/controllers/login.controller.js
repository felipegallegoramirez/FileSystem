
const boom = require('@hapi/boom');

const { encrypt, compare } = require("../utils/encript");
const { messageLogin } = require("../utils/emailprefabs/authemail");
const { tokenSign,verifyToken } = require("../utils/token");


const User = require("../models/user");

const loginCtrl = async (req, res, next) => {
  try {
    const body = req.body;
    var user = await User.findOne({ email: body.email });
    if (!user) {
      next(boom.notFound("User Not Found"))

    }
    const checkPassword = await compare(body.password, user.password);

    if (!checkPassword) {
      next(boom.unauthorized("Incorret Password"));
    }

    var x = Math.floor(Math.random() * 100000);
    user.verified.state = 0
    user.verified.code = x

    user = await User.findByIdAndUpdate(user._id, user)
    console.log(x)
    await messageLogin(user.email, user._id, x)
    res.status(200).json({ message: "enviado",_id:user._id})

  } catch (e) {
    next(boom.badRequest(e));
  }
};

const message = async (req, res, next) => {
  try {


    const { id } = req.params;

    var user = await User.findById(id);
    var ipguard = req.header('x-forwarded-for') || req.connection.remoteAddress;
    if (user.verified.state == 0 && user.verified.code == req.body.code) {

      console.log("No ip")
      if (!user.ips.find(x => x === ipguard)) {
        console.log("No ip")
        user.ips.push(ipguard)
      }

      user.verified.state = 1
      user = await User.findByIdAndUpdate(user._id, user)
      const tokenJwt = await tokenSign(user);

      const data = {
        token: tokenJwt,
        id: user._id,
      };


      res.json(data);
    } else {
      next(boom.clientTimeout("Bad Time"))
    }
  }catch(e){
    console.log(e)
  }
  };


  const checklogin = async (req, res, next) => {
      try {
        if (!req.headers.authorization) {
          res.json({ status: "Notlogin" });
          return;
        }
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);
        if(tokenData==null){
          res.json({ status: "Notlogin" });
          console.log(tokenData)
        }else{
        if (tokenData._id) {
          const user = await User.findById(tokenData._id);
          if(!user){
            res.json({ status: "Notlogin" });
          }
          var ipguard = req.header('x-forwarded-for') || req.connection.remoteAddress;
  
            if (user.ips.includes(ipguard)) {
              res.json({ status: "login" });
            } else {
              res.json({ status: "Notlogin" });
            }
  
        } else {
          res.json({ status: "Notlogin" });
        }
      }
      } catch (e) {
        next(boom.badRequest(e));
      }
    
    }
  

  const admon = async (req, res, next) => {
      try {
        if (!req.headers.authorization) {
          res.json({ status: "Notadmon" });
          return;
        }
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);
        if(tokenData==null){
          res.json({ status: "Notlogin" });
        }
        
        if (tokenData._id) {
          const user = await User.findById(tokenData._id);
          if(!user){
            res.json({ status: "Notadmon" });
          }
          var ipguard = req.header('x-forwarded-for') || req.connection.remoteAddress;
  
            if (user.ips.includes(ipguard)) {
              if (user.permissions.includes(0)) {
                res.json({ status: "admon" });
              }else{
                res.json({ status: "Notadmon" });
              }
  
            } else {
              res.json({ status: "Notadmon" });
            }
  
        } else {
          res.json({ status: "Notadmon" });
        }
      } catch (e) {
        next(boom.badRequest(e));
      }
    }
  




module.exports = { loginCtrl, message,checklogin,admon };