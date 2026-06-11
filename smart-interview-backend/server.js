const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Answer = require("./models/Answer");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ======================================
// MONGODB CONNECTION
// ======================================
console.log("URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// ======================================
// QUESTIONS DATA
// ======================================

const questions = [
  {
    id: 1,
    category: "Frontend",
    question: "What is React?",
  },
  {
    id: 2,
    category: "Frontend",
    question: "What is Virtual DOM?",
  },
  {
    id: 3,
    category: "HR",
    question: "Tell me about yourself?",
  },
];

// ======================================
// HOME ROUTE
// ======================================

app.get("/", (req, res) => {
  res.send("Interview Simulator API Running");
});

// ======================================
// GET ALL QUESTIONS
// ======================================

app.get("/questions", (req, res) => {
  res.json(questions);
});

// ==============================
//  CREATE ANSWER ROUTE
// ==============================

app.post("/answers", async (req, res) => {
  try {
    const { name, question, answer } = req.body;

    const newAnswer = new Answer({
      name,
      question,
      answer,
    });

    await newAnswer.save();

    res.status(201).json({
      success: true,
      message: "Answer saved successfully",
      data: newAnswer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ======================================
// READ ALL ANSWERS
// ======================================

app.get("/answers", async (req, res) => {
  try {
    const answers = await Answer.find();

    res.status(200).json({
  success: true,
  data: answers,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================
// UPDATE ANSWER
// ======================================

app.put("/answers/:id", async (req, res) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
  success: true,
  message: "Answer updated successfully",
  data: updatedAnswer,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================
// DELETE ANSWER
// ======================================

app.delete("/answers/:id", async (req, res) => {
  try {
    await Answer.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Answer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================
// START SERVER
// ======================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});