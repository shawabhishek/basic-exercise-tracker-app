const exercise=require('../model/exercise_model')
const express = require("express");
const router = new express.Router();

router.post('/exercise/add',(req,res)=>{
    var newexercise=new exercise(req.body);
    newexercise.save((err,Exer)=>{
        if(err)
        res.status(400).send(err);

        res.status(201).send(Exer);
    })
})

router.get('/exercise/',(req,res)=>{
    exercise.find({},(err,Exer)=>{
        if (err) 
        res.status(500).send(err);
        
        res.json(Exer);
    })
})

router.route('/exercise/:id').get((req, res) => {
    exercise.findById(req.params.id)
      .then(exer => res.json(exer))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/exercise/:id').delete((req, res) => {
    exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/exercise/update/:id').post((req, res) => {
    exercise.findById(req.params.id)
      .then(exer => {
        exer.username = req.body.username;
        exer.description = req.body.description;
        exer.duration = Number(req.body.duration);
        exer.date = Date.parse(req.body.date);
  
        exer.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports=router;