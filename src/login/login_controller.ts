import * as express from 'express';
const loginRouter = express.Router();


loginRouter.post('/',function(req :any ,res: any){
 res.send("Hello from login")
});


module.exports = loginRouter
