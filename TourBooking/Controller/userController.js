const user=require('../models/user');

const getUsers= async (req,res)=>{
    try{
        let users= await user.find({});
        if(users.length>0){
            return res.status(200).json({
                'message':'users fetched successfully',
                'users':users
            })
        }
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        })
    }
    catch(ex){
        return res.status(500).json({
            'code':'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        })
    }
}

const createUser=async (req,res)=>{
    try{
        const {name,password}=req.body;
        if(name===undefined||name===''){
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            })
        }
        if(password===undefined||password===''){
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'password is required',
                'field': 'password'
            })
        }

        const newRecord={
            name:name,
            password:password
        }

        let newUser=await user.create(newRecord);
        if(newUser){
            return res.status(201).json({
                'message': 'user created successfully',
                'data': newUser
            });
        }
        else{
            throw new Error('error while user creation');
        }

    }
    catch(ex){
        return res.status(500).json({
            'code':'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        })
    }
}

const getUser=async(req,res)=>{
    let userData=await user.findById(req.params.id);
    if(userData){
        return res.status(200).json({
            data:userData
        })
    }
    return res.status(404).json({
        message:"no user found"
    })
}

const updateUser=async(req,res)=>{

}

module.exports={
    getUsers:getUsers,
    createUser:createUser,
    getUser:getUser,
    updateUser:updateUser
}