import { useState, useEffect } from "react";
export default function App() {
const [questions, setQuestions] = useState([]);
const [name, setName] = useState("");
const [selectedQuestion, setSelectedQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [answers, setAnswers] = useState([]);
const [editingId, setEditingId] = useState(null);
useEffect(() => {
  fetch("http://localhost:5000/questions")
    .then((response) => response.json())
    .then((data) => setQuestions(data))
    .catch((error) => console.error(error));

  fetchAnswers();
}, []);
const fetchAnswers = async () => {
  try {
    const response = await fetch("http://localhost:5000/answers");
    const data = await response.json();

    setAnswers(data.data);
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async () => {
  try {
    const url = editingId
      ? `http://localhost:5000/answers/${editingId}`
      : "http://localhost:5000/answers";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        question: selectedQuestion,
        answer,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert(
        editingId
          ? "Answer updated successfully!"
          : "Answer saved successfully!"
      );

      setName("");
      setSelectedQuestion("");
      setAnswer("");
      setEditingId(null);

      fetchAnswers();
    }
  } catch (error) {
    console.error(error);
  }
};
    const handleEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setSelectedQuestion(item.question);
     setAnswer(item.answer);
};
    const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/answers/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      alert("Answer deleted successfully!");
      fetchAnswers();
    }
  } catch (error) {
    console.error(error);
  }
};

  const interviewTypes = [
    {
      title: "Frontend Interview",
      desc: "Practice React, JavaScript, HTML, and CSS questions.",
      icon: "💻",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "HR Interview",
      desc: "Improve communication and confidence skills.",
      icon: "🧠",
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "DSA Challenge",
      desc: "Solve coding and problem-solving interview rounds.",
      icon: "⚡",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    {
      title: "Mock Interviews",
      value: "120+",
    },
    {
      title: "Students Practicing",
      value: "5K+",
    },
    {
      title: "Success Rate",
      value: "92%",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="flex justify-between items-center px-6 md:px-16 py-6 border-b border-slate-800">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          InterviewAI
        </h1>

        <div className="hidden md:flex gap-8 text-lg">

          <a href="#" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Dashboard
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Contact
          </a>

        </div>

      </nav>

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <section className="px-6 md:px-16 py-20 relative">

        {/* BACKGROUND BLUR EFFECTS */}

        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">

          {/* LEFT CONTENT */}

          <div>

            <p className="text-cyan-400 font-semibold text-lg">
              AI POWERED INTERVIEW PLATFORM
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-6">
              Smart Interview
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Simulator
              </span>
            </h1>

            <p className="mt-8 text-slate-300 text-lg leading-8">
              Practice real-world technical and HR interviews with
              futuristic UI, analytics dashboard, and AI-powered
              interview preparation.
            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 mt-10">

              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition duration-300">
                Start Mock Interview
              </button>

              <button className="border border-cyan-400 px-8 py-4 rounded-2xl text-lg hover:bg-cyan-400 hover:text-black transition duration-300">
                Explore Features
              </button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-6 mt-14">

              {stats.map((stat, index) => (

                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center"
                >

                  <h2 className="text-3xl font-bold text-cyan-400">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {stat.title}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT SIDE INTERVIEW CARD */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

            {/* TOP BAR */}

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Live Interview Session
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  Frontend Developer Round
                </h2>

              </div>

              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>

            </div>

            {/* QUESTION CARD */}

            <div className="bg-[#111827] rounded-2xl p-6 mt-8 border border-slate-700">

              <p className="text-cyan-400 font-semibold">
                Question 01
              </p>

              <h3 className="text-2xl font-bold mt-4 leading-10">
                Explain the difference between Virtual DOM and Real DOM in React.
              </h3>

              <div className="mt-8 flex justify-between items-center">

                <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full">
                  Medium Level
                </span>

                <span className="text-red-400 text-lg font-semibold">
                  ⏱ 01:25
                </span>

              </div>

            </div>

            {/* INPUT */}

            <div className="mt-8">

              <input
  type="text"
  placeholder="Enter Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full bg-[#111827] border border-slate-700 rounded-2xl p-4 mb-4"
/>

<select
  value={selectedQuestion}
  onChange={(e) => setSelectedQuestion(e.target.value)}
  className="w-full bg-[#111827] border border-slate-700 rounded-2xl p-4 mb-4"
>
  <option value="">Select Question</option>

  {questions.map((q) => (
    <option key={q.id} value={q.question}>
      {q.question}
    </option>
  ))}
</select>

<textarea
  value={answer}
  onChange={(e) => setAnswer(e.target.value)}
  placeholder="Type your answer here..."
  className="w-full bg-[#111827] border border-slate-700 rounded-2xl p-5 outline-none focus:border-cyan-400 text-white h-36 resize-none"
></textarea>

<button
  onClick={handleSubmit}
  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition duration-300"
>
  {editingId ? "Update Answer" : "Submit Answer"}
</button>
            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* INTERVIEW TYPES */}
      {/* ================================================= */}

      <section className="px-6 md:px-16 py-20">

        <div className="text-center">

          <p className="text-cyan-400 font-semibold text-lg">
            INTERVIEW CATEGORIES
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Choose Your Practice Mode
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {interviewTypes.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 overflow-hidden relative"
            >

              {/* GRADIENT BACKGROUND */}

              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${item.color}`}></div>

              <div className="relative z-10">

                <div className="text-6xl">
                  {item.icon}
                </div>

                <h3 className="text-3xl font-bold mt-6">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-400 leading-8">
                  {item.desc}
                </p>

                <button className="mt-8 bg-white/10 px-6 py-3 rounded-xl hover:bg-cyan-500 hover:text-black transition duration-300">
                  Start Practice
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================================================= */}
      {/* ANALYTICS SECTION */}
      {/* ================================================= */}

      <section className="px-6 md:px-16 py-20">

        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 md:p-16">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <p className="text-cyan-400 font-semibold text-lg">
                PERFORMANCE ANALYTICS
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
                Track Your Interview Growth
              </h2>

              <p className="mt-8 text-slate-400 text-lg leading-8">
                Monitor confidence level, communication skills,
                interview completion rate, and technical performance
                through interactive dashboards.
              </p>

            </div>

            {/* RIGHT ANALYTICS CARD */}

            <div className="bg-[#111827] rounded-3xl p-8 border border-slate-700">

              <div className="space-y-8">

                {/* BAR 1 */}

                <div>

                  <div className="flex justify-between mb-3">
                    <span>Communication Skills</span>
                    <span>85%</span>
                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-4">
                    <div className="bg-cyan-400 h-4 rounded-full w-[85%]"></div>
                  </div>

                </div>

                {/* BAR 2 */}

                <div>

                  <div className="flex justify-between mb-3">
                    <span>Technical Knowledge</span>
                    <span>78%</span>
                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-4">
                    <div className="bg-blue-400 h-4 rounded-full w-[78%]"></div>
                  </div>

                </div>

                {/* BAR 3 */}

                <div>

                  <div className="flex justify-between mb-3">
                    <span>Confidence Level</span>
                    <span>91%</span>
                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-4">
                    <div className="bg-purple-400 h-4 rounded-full w-[91%]"></div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}
      {/* ================================================= */}
{/* INTERVIEW QUESTIONS FROM BACKEND */}
{/* ================================================= */}

<section className="px-6 md:px-16 py-16">

  <h2 className="text-4xl font-bold text-center mb-10">
    Interview Questions
  </h2>

  <div className="grid gap-6">

    {questions.map((question) => (

      <div
        key={question.id}
        className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
      >

        <p className="text-cyan-400 font-semibold">
          {question.category}
        </p>

        <h3 className="text-xl mt-2">
          {question.question}
        </h3>

      </div>

    ))}

  </div>

</section>
      <section className="px-6 md:px-16 py-16">

  <h2 className="text-4xl font-bold text-center mb-10">
    Previous Answers
  </h2>

  <div className="grid gap-6">

    {answers?.map((item) => (

      <div
        key={item._id}
        className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
      >

        <h3 className="text-cyan-400 font-bold">
          {item.name}
        </h3>

        <p className="mt-2">
          <strong>Question:</strong> {item.question}
        </p>

        <p className="mt-2">
  <strong>Answer:</strong> {item.answer}
</p>

<div className="flex gap-4 mt-4">

  <button
    onClick={() => handleEdit(item)}
    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(item._id)}
    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>

      </div>

    ))}

  </div>

</section>
      <footer className="border-t border-slate-800 py-10 text-center">

        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          InterviewAI
        </h2>

        <p className="mt-4 text-slate-400">
          Smart Interview Simulator • React JS • Tailwind CSS
        </p>

      </footer>

    </div>
  );
}

