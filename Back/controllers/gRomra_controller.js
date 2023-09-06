const gRomraModel = require ("../models/gRomra_model")
const User = require('../models/user_model')


module.exports={

    create: async (req, res) => {
        try{
            const gOmra = new gRomraModel(req.body)
            let reservation = await gOmra.save(req.body)
            await User.findByIdAndUpdate({_id:req.body.user},{
              $push:{
                gRomra:gOmra
              }
            }) 
            return  res.status(201).json({success:true, message:"  is created successfully",data:reservation})
           
          }catch(err){
            res.status(406).json({success:false,message:"failed to created ",data:err})    
        
           } 
    },

     
     
    getall: async(req,res)=>{
        try {  
        await gRomraModel.find({}).populate({path:'user',model:'Users'}).exec((err,items)=>{
        if(err){
            res.status(406).json({success:false,message:"failed cration ",data:null})
        }else{
            res.status(201).json({success:true,message:"created with success",data:items})
        } 
        })   
    } catch (error) {
       res.status(500).json(error)     
    }
    
    }, 
         update:function(req,res){

            gRomraModel.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,item){
                if(err){
                    res.status(406).json({success:false,message:"cannot update",data:null}) 
                }else{
                    res.status(201).json({success:true, message:"the car is updated ",data:item})
                }
            })    
            },
         getbyname: async (req, res) => {
            try {
                await gRomraModel.find({ name:req.query.name }).exec((err,item) => {
                    if (err) {
                        res.status(406).json({ success: false, message: "failed  ", data: null })
                    } else {
                        res.status(201).json({ success: true, message: " success", data:item })
                    }
    
                })
            } catch (error) {
                res.status(500).json(error.err)
    
            }
         },
         getbyid:function(req,res){
            gRomraModel.findById(req.params.id,function(err,item){
          
                 if(err){
                     res.status(406).json({success:false,message:"cannot founded id  ",data:null}) 
                 }else{
                     res.status(201).json({success:true, message:"the car with id ",data:item})    
                 }
             })
         },
         delete:function(req,res){
            gRomraModel.findByIdAndRemove(req.params.id,function(err,item){
                 if(err){
                     res.status(406).json({success:false,message:"failed deleted car  by id ",data:null}) 
                 }else{
                     res.status(201).json({success:true, message:"the car  deleted ",data:item})    
                 }   
             })
         }



}