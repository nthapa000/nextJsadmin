import {Product, User} from './model'
import {connectToDB} from './util'

export const fetchUsers = async (q,page) =>{
// so that we can searh from each word into query i means it is case insensitive
    const regex = new RegExp(q,"i")
    const ITEM_PER_PAGE = 3;
    try{
        connectToDB()
        const count = await User.find({username:{$regex:regex}}).count();
        const users = await User.find({username:{$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page -1));
        return {count,users};
    }catch(err){
        console.log(err);
        throw new Error("failed to fetch users")
    }
}


export const fetchProducts = async (q,page) =>{
    // so that we can searh from each word into query i means it is case insensitive
        const regex = new RegExp(q,"i")
        const ITEM_PER_PAGE = 3;
        try{
            connectToDB()
            const count = await Product.find({title:{$regex:regex}}).count();
            const products = await Product.find({title:{$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page -1));
            console.log(products)
            return {count,products};
        }catch(err){
            console.log(err);
            throw new Error("failed to fetch products")
        }
    }