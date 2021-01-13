const router=require('express').Router();
const userController=require('./Controller/userController');
router.get('/',(req,res)=>{
    res.send("API Working fine");
});
router.route('/users')
        .get(userController.getUsers)
        .post(userController.createUser);

module.exports=router;