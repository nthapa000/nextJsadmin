import {User} from './model'
import {connectToDB} from './util'

export const fetchUsers = async () =>{
    try{
        connectToDB()
        const users = await User.find();
        return users;
    }catch(err){
        console.log(err);
        throw new Error("failed to fetch users")
    }
}