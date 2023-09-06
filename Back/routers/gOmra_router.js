const express = require("express")
const gomra_Controller = require("../controllers/gOmra_controller")
const route = express.Router()
route.post("/create",gomra_Controller .create)
route.get("/getall",gomra_Controller.getall)
route.put("/update/:id",gomra_Controller.update)
route.get("/getbyname",gomra_Controller.getbyname)
route.get("/getbyid/:id",gomra_Controller.getbyid)
route.delete("/delete/:id",gomra_Controller.delete)
module.exports= route