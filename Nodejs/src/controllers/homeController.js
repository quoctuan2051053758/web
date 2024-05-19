import db from '../models/index'
import CRUDService from '../services/CRUDService';

let getHomePage=(req,res)=>{
    res.send("hello home page")
}
let getHome= async(req,res)=>{
    let data = await db.User.findAll();
    res.render("homepage.ejs",{data:JSON.stringify(data)});
}
let getCRUD = async(req,res)=>{
    return res.render('crud.ejs');
}


let postCRUD = async(req,res)=>{
    let message=  await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server')
}
let displayGetCRUD = async(req,res)=>{
    let data= await CRUDService.getAllUser();
    // console.log('.........');
    // console.log(data)
    return res.render('displayCRUD.ejs',{dataTable:data});
}
let getEditCRUD =async (req,res)=>{
    let userId=req.query.id;
    if(userId){
        let userData=await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs',{user:userData});
    }
    return res.send('users not found');
}
let putCRUD = async(req,res)=>{
    let data=req.body;
    await CRUDService.UpdateUserData(data);
    return res.redirect('/get-crud')
}
let deleteCRUD = async(req,res)=>{
    let id = req.query.id;
    await CRUDService.deleteUserById(id);
    return res.redirect('/get-crud');
}
module.exports={
    getHomePage,
    getHome,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,putCRUD,deleteCRUD
}