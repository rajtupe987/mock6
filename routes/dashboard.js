
const express = require("express");

const {quezModal} = require("../modals/quez.modal")
require("dotenv").config()

const quezeRouter=express.Router()
// for register part

//http://localhost:9800/dashboard
//http://localhost:9800/register
quezeRouter.get("/",async(req,res)=>{
  try {
    const data= await quezModal.find();
    res.send(data)
 } catch (error) {
   res.send({"msg":"error"})
 }
})

quezeRouter.post("/create_quiz", async (req, res) => {
    const {creator, title, description, questions } = req.body;
  
    try {
      const newQuiz = new quezModal({
        creator,
         title,
         description,
         questions });

      await newQuiz.save();
  
      res.status(200).json({ "msg": "Quiz created successfully" ,data:newQuiz});
    } catch (error) {
      res.status(500).json({ "msg": error.message });
    }
  });
  



  quezeRouter.get("/create_quiz/:id",async(req,res)=>{
    const userid=req.params.id;
    try {
       const data= await quezModal.findById({_id:userid});
       
       res.status(200).send({"msg":"success",data})
    } catch (error) {
        res.status(400).send({"msg":error.messge})
    }
})


quezeRouter.post("/:quizId/add-question", async (req, res) => {
  const { quizId } = req.params;
  const { title, answerOptions, correctOptions } = req.body;

  try {

    const quiz = await quezModal.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }
    const newQuestion = {
      title,
      answerOptions,
      correctOptions
    };

    quiz.questions.push(newQuestion);

    await quiz.save();

    res.status(200).json({ msg: "Question added successfully", question: newQuestion });
  } catch (error) {
    res.status(500).json({ msg: "Failed to add question", error: error.message });
  }
});



  module.exports={quezeRouter}