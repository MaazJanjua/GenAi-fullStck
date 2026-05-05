"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Brain, Code2, Map } from "lucide-react";

const data = {
  technicalQuestions: [
    {
      question: "What is the difference between let, const and var?",
      answer: "var is function scoped, while let and const are block scoped. const cannot be reassigned.",
      intention: "Check understanding of JavaScript fundamentals and scope."
    },
    {
      question: "What is a REST API?",
      answer: "REST API is an architectural style that uses HTTP methods like GET, POST, PUT, DELETE.",
      intention: "Evaluate backend and API knowledge."
    },
    {
      question: "Explain React Virtual DOM",
      answer: "Virtual DOM is a lightweight copy of real DOM. React updates it first, then efficiently updates real DOM.",
      intention: "Check React performance understanding."
    }, {
      question: "What is the difference between let, const and var?",
      answer: "var is function scoped, while let and const are block scoped. const cannot be reassigned.",
      intention: "Check understanding of JavaScript fundamentals and scope."
    },
    {
      question: "What is a REST API?",
      answer: "REST API is an architectural style that uses HTTP methods like GET, POST, PUT, DELETE.",
      intention: "Evaluate backend and API knowledge."
    },
    {
      question: "Explain React Virtual DOM",
      answer: "Virtual DOM is a lightweight copy of real DOM. React updates it first, then efficiently updates real DOM.",
      intention: "Check React performance understanding."
    }, {
      question: "What is the difference between let, const and var?",
      answer: "var is function scoped, while let and const are block scoped. const cannot be reassigned.",
      intention: "Check understanding of JavaScript fundamentals and scope."
    },
    {
      question: "What is a REST API?",
      answer: "REST API is an architectural style that uses HTTP methods like GET, POST, PUT, DELETE.",
      intention: "Evaluate backend and API knowledge."
    },
    {
      question: "Explain React Virtual DOM",
      answer: "Virtual DOM is a lightweight copy of real DOM. React updates it first, then efficiently updates real DOM.",
      intention: "Check React performance understanding."
    }, {
      question: "What is the difference between let, const and var?",
      answer: "var is function scoped, while let and const are block scoped. const cannot be reassigned.",
      intention: "Check understanding of JavaScript fundamentals and scope."
    },
    {
      question: "What is a REST API?",
      answer: "REST API is an architectural style that uses HTTP methods like GET, POST, PUT, DELETE.",
      intention: "Evaluate backend and API knowledge."
    },
    {
      question: "Explain React Virtual DOM",
      answer: "Virtual DOM is a lightweight copy of real DOM. React updates it first, then efficiently updates real DOM.",
      intention: "Check React performance understanding."
    }
  ],

  behavioralQuestions: [
    {
      question: "Tell me about a challenging project you worked on.",
      answer: "I built a full-stack app with authentication and faced issues in JWT handling which I solved.",
      intention: "Assess problem-solving and real-world experience."
    },
    {
      question: "How do you handle tight deadlines?",
      answer: "I prioritize tasks, break them into smaller parts, and focus on critical features first.",
      intention: "Evaluate time management skills."
    },
    {
      question: "Why should we hire you?",
      answer: "I have strong MERN stack skills and real project experience with deployment.",
      intention: "Check confidence and self-awareness."
    }
  ],

  preparationPlan: [
    {
      day: 1,
      focus: "JavaScript Basics",
      tasks: [
        "Revise let, const, var",
        "Practice closures",
        "Solve 5 JS questions"
      ]
    },
    {
      day: 2,
      focus: "React Fundamentals",
      tasks: [
        "Understand hooks",
        "Build small component",
        "Revise state management"
      ]
    },
    {
      day: 3,
      focus: "Backend APIs",
      tasks: [
        "Create Express server",
        "Build REST API",
        "Test using Postman"
      ]
    }
  ],

  skillsGap: [
    { skill: "System Design" },
    { skill: "Redis" },
    { skill: "Testing (Jest)" },
    { skill: "DevOps Basics" }
  ]
};

export default function Interview() {
  const [activeTab, setActiveTab] = useState("technical");
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getQuestions = () => {
    if (!data) return [];
    if (activeTab === "technical") return data.technicalQuestions;
    if (activeTab === "behavioral") return data.behavioralQuestions;
    return data.preparationPlan;
  };

  const questions = getQuestions();

  // Tab buttons data for easy mapping
  const tabs = [
    { id: "technical", label: "Technical Questions", icon: Code2 },
    { id: "behavioral", label: "Behavioral Questions", icon: Brain },
    { id: "roadmap", label: "Road Map", icon: Map },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="max-w-400 mx-auto ">
        {/* Header / Mobile Top Bar */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between bg-gray-900/80 backdrop-blur-sm rounded-2xl p-3 border border-gray-800 ">
            <h1 className="text-lg font-bold bg-linear-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Interview Prep
            </h1>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Main Container - Responsive Grid Layout */}
        <div className="bg-gray-900/40  backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden shadow-2xl ">

          {/* Responsive Layout: Stack on mobile, grid on large screens */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:h-[90vh]">

            {/* LEFT SIDEBAR - Mobile Drawer Style / Desktop Sidebar */}
            <div className={`
              ${mobileMenuOpen ? 'flex' : 'hidden'} 
              lg:flex lg:col-span-3 
              flex-col gap-2 p-4 bg-gray-900/95 border-b lg:border-b-0 lg:border-r border-gray-800
              transition-all duration-300
            `}>
              {/* Mobile close button inside sidebar */}
              <div className="lg:hidden flex justify-end mb-2">
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false); // Close mobile menu on selection
                      setOpenIndex(null); // Reset open accordion when switching tabs
                    }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${activeTab === tab.id
                        ? "bg-linear-to-r from-sky-950 to-sky-900/50 border border-sky-700/50 shadow-lg"
                        : "hover:bg-gray-800/70 border border-transparent"}
                    `}
                  >
                    <Icon size={20} className={activeTab === tab.id ? "text-sky-400" : "text-gray-400"} />
                    <span className={`font-medium ${activeTab === tab.id ? "text-sky-300" : "text-gray-200"}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}

              {/* Skills Gap Section - Shown in sidebar on desktop, separate on mobile */}
              <div className="mt-4 pt-4 border-t border-gray-800 lg:mt-auto lg:pt-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">Skill Gaps to Fill</h3>
                <div className="flex flex-wrap gap-2 px-2">
                  {data?.skillsGap?.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 text-xs rounded-full bg-linear-to-r from-sky-950/80 to-sky-900/50 border border-sky-700/40 text-sky-300 font-medium">
                      {s.skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MIDDLE CONTENT - Main Area */}
            <div className="flex-1 lg:col-span-6 bg-gray-950/50 min-h-[60vh] lg:min-h-0 ">
              <div className="p-4 sm:p-5 md:p-6 overflow-y-auto h-full max-h-[70vh] lg:max-h-[85vh] 
            
              ">
                {!data ? (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-center text-gray-400">Loading content...</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Header for current section */}
                    <div className="mb-4 pb-2 border-b border-gray-800">
                      <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                        {activeTab === "technical" && "💻 Technical Questions"}
                        {activeTab === "behavioral" && "🧠 Behavioral Questions"}
                        {activeTab === "roadmap" && "🗺️ 7-Day Preparation Roadmap"}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {activeTab === "technical" && "Master core concepts & technical skills"}
                        {activeTab === "behavioral" && "Prepare for HR & behavioral rounds"}
                        {activeTab === "roadmap" && "Structured plan to ace your interview"}
                      </p>
                    </div>

                    {/* Questions Accordion (Technical & Behavioral) */}
                    {activeTab !== "roadmap" &&
                      questions.map((q, i) => (
                        <div key={i} className="bg-gray-900/80 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-200">
                          <button
                            onClick={() => toggle(i)}
                            className="w-full flex justify-between items-center p-4 sm:p-5 text-left group"
                          >
                            <span className="text-sm sm:text-base font-medium text-gray-100 pr-3">
                              {q.question}
                            </span>
                            {openIndex === i ?
                              <ChevronUp size={18} className="text-sky-400 shrink-0" /> :
                              <ChevronDown size={18} className="text-gray-500 group-hover:text-sky-400 shrink-0" />
                            }
                          </button>

                          {openIndex === i && (
                            <div className="p-4 sm:p-5 border-t border-gray-800 bg-gray-900/50">
                              <p className="mb-3 text-gray-200 text-sm sm:text-base leading-relaxed">
                                <span className="text-sky-400 font-semibold">Answer:</span> {q.answer}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-400 italic">
                                🎯 Intent: {q.intention}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}

                    {/* Roadmap Content */}
                    {activeTab === "roadmap" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                        {questions.map((day, i) => (
                          <div key={i} className="bg-linear-to-br from-gray-900 to-gray-900/80 p-4 sm:p-5 rounded-xl border border-gray-800 hover:border-sky-800/50 transition-all duration-200">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 rounded-full bg-linear-to-r from-sky-600 to-blue-600 flex items-center justify-center text-sm font-bold">
                                {day.day}
                              </span>
                              <h3 className="text-sky-400 font-semibold text-base sm:text-lg">{day.focus}</h3>
                            </div>
                            <ul className="space-y-2">
                              {day.tasks.map((task, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm sm:text-base">
                                  <span className="text-sky-400 mt-1">▹</span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR - Skills Gaps (Desktop only, mobile shown above in drawer) */}
            <div className="hidden lg:block lg:col-span-3 bg-gray-900/50 p-5 border-l border-gray-800 ">
              <div className="sticky top-4 flex flex-col h-full ">
                <h2 className="mb-5 text-xl font-bold bg-linear-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  🎯 Skill Gaps
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {data?.skillsGap?.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm rounded-full bg-linear-to-r from-sky-950 to-sky-900/70 border border-sky-700/50 text-sky-300 font-medium">
                      {s.skill}
                    </span>
                  ))}
                </div>

                {/* Tips Card */}
                <div className="mt-auto p-4 rounded-xl bg-linear-to-br from-sky-950/30 to-gray-900 border border-sky-800/30 top-full left-0 ">
                  <h3 className="text-sm font-semibold text-sky-300 mb-2">💡 Pro Tip</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Focus on these skill gaps first — they're commonly asked in interviews for mid to senior level roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Skills Bar (shown only when menu closed and on mobile) */}
        <div className="lg:hidden mt-3">
          {!mobileMenuOpen && (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 border border-gray-800">
              <h3 className="text-xs font-semibold text-gray-400 mb-2">⚡ Key Skills to Learn</h3>
              <div className="flex flex-wrap gap-1.5">
                {data?.skillsGap?.slice(0, 3).map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs rounded-full bg-sky-950/70 border border-sky-800/50 text-sky-300">
                    {s.skill}
                  </span>
                ))}
                {data?.skillsGap?.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                    +{data.skillsGap.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}