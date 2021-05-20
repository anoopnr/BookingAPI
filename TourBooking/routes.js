const router=require('express').Router();
const userController=require('./Controller/userController');
const jsonUser=require('./Controller/jsonUserController');
router.get('/',(req,res)=>{
    res.send("Hi Anoop and Jesmi");
});
router.route('/users')
        .get(userController.getUsers)
        .post(userController.createUser);
router.route('/users/:id')
        .get(userController.getUser);
router.route('/jsonUsers/')
        .post(jsonUser.addUser)
        .put(jsonUser.updateUser)
        .delete(jsonUser.deleteUser)
        .get(jsonUser.getUsers);
module.exports=router;