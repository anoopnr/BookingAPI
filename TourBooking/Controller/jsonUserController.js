const users=require('../DB/users.json');
const fs=require('fs');
const getUsers=async(req,res)=>{
    return res.status(200).json({
        'message':'users fetched successfully',
        'users':users
    })
}
const addUser=async(req,res)=>{
    const {name,role}=req.body;
    if(name===undefined||name===''){
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'name is required',
            'field': 'name'
        })
    }
    else if(role===undefined||role===''){
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'role is required',
            'field': 'role'
        })
    }
    else {
        var sameUser=users.filter((f)=> {return f.name==name});
        console.log(sameUser.length);
        if(sameUser.length==0){
            var id=users.length+1;
            let user={
                name:name,
                role:role,
                id:id
            }
            users.push(user);
            console.log(JSON.stringify(users));
            fs.writeFile("./DB/users.json", JSON.stringify(users), err => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'code':'SERVER_ERROR',
                        'description': 'something went wrong, Please try again'
                    })
                }
                else{
                    return res.status(201).json({
                        'message': 'user created successfully',
                        'data': user
                    });
                } 
            });
        }    
        else{
            return res.status(409).json({
                'code': 'Conflict',
                'description': 'user with same name already exists'
            })
        }
    }
}

const deleteUser=(req,res)=>{
    const {id}=req.body;
    if(id===undefined||id===''){
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'id is required',
            'field': 'id'
        })
    }
    else{
        var sameUser=users.filter((f)=> {return f.id==id});
        console.log(sameUser.length);
        if(sameUser.length>0){
            var newUsers=users.filter((f)=>f.id!=id);
            fs.writeFile("./DB/users.json", JSON.stringify(newUsers), err => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'code':'SERVER_ERROR',
                        'description': 'something went wrong, Please try again'
                    })
                }
                else{
                    return res.status(200).json({
                        'message': 'user deleted successfully'
                    });
                } 
            });
        }
        else{
            return res.status(200).json({
                'code': 'NO_CONTENT',
                'message': 'No matching user found'
            });
        }
    }
}

const updateUser=(req,res)=>{
    const {name,role,id}=req.body;
    if(name===undefined||name===''){
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'name is required',
            'field': 'name'
        })
    }
    else if(role===undefined||role===''){
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'role is required',
            'field': 'role'
        })
    }
    else if(id===undefined||id===''){
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'id is required',
            'field': 'id'
        })
    }
    else{
        let user={};
        users.forEach((f)=>{
            if(f.id==id){
                f.name=name;
                f.role=role;
                user=f;
            }
        })
        console.log(JSON.stringify(users));
        fs.writeFile("./DB/users.json", JSON.stringify(users), err => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'code':'SERVER_ERROR',
                    'description': 'something went wrong, Please try again'
                })
            }
            else{
                return res.status(200).json({
                    'message': 'user updated successfully',
                    'data': user
                });
            } 
        });
    }
}

module.exports={
    getUsers:getUsers,
    addUser:addUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}