const express = require('express');
const router = express.Router();

router.post('/data', (req, res)=>{
    try{
        //console.log(global.categoryData)
        res.send([global.categoryData, global.category])
    }catch(error){
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports = router;