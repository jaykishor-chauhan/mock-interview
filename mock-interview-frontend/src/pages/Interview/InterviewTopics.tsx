import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Users, Building, Clock, Star, Play, ArrowRight, CircleCheck, Turtle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal"
import { verify } from "crypto";

const InterviewTopics = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    course: "",
    difficulty: [],
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (type === 'checkbox') {
        // For checkbox, manage array of difficulties
        let newDifficulties;
        if (checked) {
          newDifficulties = [...(prev.difficulty || []), value];
        } else {
          newDifficulties = (prev.difficulty || []).filter((level) => level !== value);
        }
        return {
          ...prev,
          difficulty: newDifficulties,
        };
      } else {
        // For dropdown/select or other inputs
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.difficulty.length === 0) {
      alert("Please select at least one difficulty level.");
      return;
    }
    console.log('Form data:', formData);
    navigate('/check-permissions', {
      state: {
        active: true,
        url: `/interview/session?type=${selectedCategory.id}`,
        formData: formData,
      }

    });
  };


  const categories = [
    {
      id: "technical",
      title: "Technical Interviews",
      description: "Coding challenges, algorithms, data structures, and system design questions",
      icon: Code,
      difficulty: "Medium to Hard",
      duration: "45-60 min",
      level: ["Basic", "Medium", "Advanced"],
      questions: 25,
      color: "bg-blue-500",
      popular: true
    },
    {
      id: "hr",
      title: "HR Interviews",
      description: "Company culture fit, motivation, career goals, and general questions",
      icon: Building,
      difficulty: "Easy",
      duration: "20-30 min",
      level: ["casual"],
      questions: 15,
      color: "bg-purple-500",
      popular: false
    },
    {
      id: "behavioral",
      title: "Behavioral Interviews",
      description: "Situational questions, teamwork, leadership, and soft skills assessment",
      icon: Users,
      difficulty: "Easy to Medium",
      level: ["casual"],
      duration: "30-45 min",
      questions: 20,
      color: "bg-green-500",
      popular: true
    },
  ];

  const quickStart = [
    {
      title: "Quick Technical",
      description: "Short coding challenges",
      duration: "20 min",
      questions: 5
    },
    {
      title: "Behavioral Focus",
      description: "Common behavioral questions",
      duration: "25 min",
      questions: 5
    },
    {
      title: "Mixed Practice",
      description: "Random questions from all categories",
      duration: "45 min",
      questions: 10
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4 text-gray-900">
              Select Your Interview Type
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Choose the interview format that best suits your goals. Each option is designed to prepare you for success in specific professional scenarios.
            </p>
          </div>

          {/* Quick Start Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Quick Start</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickStart.map((option, index) => (
                <Card key={index} >
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-800">{option.title}</CardTitle>
                    <CardDescription className="text-gray-600">{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {option.duration}
                      </div>
                      <Badge variant="outline">{option.questions} questions</Badge>
                    </div>
                    <Link to="/interview/session">
                      <Button className="w-full flex items-center justify-center group">
                        <Play className="w-4 h-4 mr-2 block group-hover:hidden" />
                        <CircleCheck className="w-4 h-4 mr-2 hidden group-hover:block text-green-500" />
                        Start Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Interview Categories</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Card key={category.id} >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 truncate">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className="group text-primary hover:text-primary-hover font-semibold transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                </Card>
              ))}
            </div>

            {/* Modal for showing expanded details */}
            <Modal
              isOpen={!!selectedCategory}
              onClose={() => setSelectedCategory(null)}
            >
              {selectedCategory && (
                <>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center space-x-3">
                    <div
                      className={`${selectedCategory.color} w-10 h-10 rounded-lg flex items-center justify-center`}
                    >
                      <selectedCategory.icon className="w-6 h-6 text-white" />
                    </div>
                    <span>{selectedCategory.title}</span>
                    {selectedCategory.popular && (
                      <Badge className="bg-yellow-400 text-yellow-900 flex items-center px-2 py-0.5 rounded">
                        <Star className="w-4 h-4 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </h3>
                  <p className="mb-6 text-gray-700">{selectedCategory.description}</p>

                  <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg p-6 shadow-sm space-y-6 text-sm text-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label
                            htmlFor="course"
                            className="block uppercase tracking-wide text-xs font-semibold text-gray-500 mb-1"
                          >
                            Select Course
                          </label>
                          <select
                            id="course"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                          >
                            <option value="" disabled>
                              Select a course
                            </option>
                            <option value="java">Java</option>
                            <option value="networking">Networking</option>
                            <option value="os">OS</option>
                            <option value="system-design">System Design</option>
                          </select>
                        </div>
                        <div>
                          <p className="uppercase tracking-wide text-xs font-semibold text-gray-500 mb-1">
                            Duration
                          </p>
                          <p className="font-medium text-gray-800">{selectedCategory.duration}</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-wide text-xs font-semibold text-gray-500 mb-1">
                            Questions
                          </p>
                          <p className="font-medium text-gray-800">{selectedCategory.questions}+</p>
                        </div>
                      </div>
                      <div>
                        <p className="uppercase tracking-wide text-xs font-semibold text-gray-500 mb-2">
                          Difficulty
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-800">
                          {selectedCategory.level.map((level) => (
                            <label
                              key={level}
                              className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                name="difficulty"
                                value={level}
                                checked={formData.difficulty.includes(level)}
                                onChange={handleChange}
                                className="form-checkbox text-indigo-600"
                              />
                              <span className="capitalize">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center"
                    >
                      Start {selectedCategory.title}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </>
              )}
            </Modal>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InterviewTopics;