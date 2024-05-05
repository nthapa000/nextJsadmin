import {User} from './model'
import {connectToDB} from './util'

export const fetchUsers = async (q) =>{
// so that we can searh from each word into query i means it is case insensitive
    const regex = new RegExp(q,"i")
    try{
        connectToDB()
        const users = await User.find({username:{$regex:regex}});
        return users;
    }catch(err){
        console.log(err);
        throw new Error("failed to fetch users")
    }
}