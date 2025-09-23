import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";

function AddQuestionForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        interviewType: "", // category
        subType: "",       // subcategory
        difficulty: "",    // single level
        question: "",
        expectedDuration: "",
    });

    // Category and SubCategory mapping
    const categories = [
        { id: "technical", name: "Technical" },
        { id: "behavioral", name: "Behavioral" },
        { id: "hr", name: "HR" },
    ];

    const subCategoryMap = {
        technical: [
            { id: "java", name: "Java" },
            { id: "javascript", name: "JavaScript" },
            { id: "restapi", name: "REST API" },
            { id: "sql", name: "SQL" },
        ],
        behavioral: [
            { id: "teamwork", name: "Teamwork" },
            { id: "leadership", name: "Leadership" },
            { id: "adaptability", name: "Adaptability" },
        ],
        hr: [
            { id: "benefits", name: "Benefits" },
            { id: "culture", name: "Work Culture" },
        ],
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleDifficultyChange = (level) => {
        setFormData((prev) => ({
            ...prev,
            difficulty: level,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.difficulty) {
            toast({
                variant: "destructive",
                description: "Please select at least one difficulty level."
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://mock-interview-backend-nyby.onrender.com/api/mock-interview/admin/add-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    interviewType: formData.interviewType,
                    subType: formData.subType,
                    difficulty: formData.difficulty,
                    question: formData.question,
                    expectedDuration: formData.expectedDuration,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    description: data.message || "Error saving question"
                });
                return;
            }

            toast({
                description: "Question saved successfully!"
            });

            setFormData({
                interviewType: "",
                subType: "",
                difficulty: "",
                question: "",
                expectedDuration: "",
            });

        } catch (err) {
            toast({
                variant: "destructive",
                description: "Server error. Could not connect to the server."
            });
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "text-green-600 bg-green-50";
            case "Medium":
                return "text-yellow-600 bg-yellow-50";
            case "Hard":
                return "text-red-600 bg-red-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    // SubCategories to show based on selected category
    const subCategories = formData.interviewType
        ? subCategoryMap[formData.interviewType]
        : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Add Interview Question
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl">
                    {/* Interview Type */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Interview Type
                        </label>
                        <select
                            name="interviewType"
                            value={formData.interviewType}
                            onChange={(e) => {
                                handleChange(e);
                                setFormData((prev) => ({ ...prev, subType: "" })); // reset subType
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                            required
                        >
                            <option value="">Select</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SubType */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            SubType
                        </label>
                        <select
                            name="subType"
                            value={formData.subType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                            required
                            disabled={!formData.interviewType}
                        >
                            <option value="">Select</option>
                            {subCategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulty Level
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {["Easy", "Medium", "Hard"].map((level) => (
                                <label key={level} className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value={level}
                                        checked={formData.difficulty === level}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                difficulty: e.target.value,
                                            }))
                                        }
                                        className="sr-only"
                                    />
                                    <div
                                        className={`px-4 py-3 border-2 rounded-lg text-center font-medium transition-all duration-200
                    ${formData.difficulty === level
                                                ? `${getDifficultyColor(level)} border-current`
                                                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        {level}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>


                    {/* Question */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Question
                        </label>
                        <textarea
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            placeholder="Enter your question"
                            rows={4}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Expected Duration
                        </label>
                        <input
                            type="text"
                            name="expectedDuration"
                            value={formData.expectedDuration}
                            onChange={handleChange}
                            placeholder="e.g., 10 minutes"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Question"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddQuestionForm;
