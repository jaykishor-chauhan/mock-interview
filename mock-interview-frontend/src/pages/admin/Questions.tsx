import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  MessageSquare,
  Bot,
  User,
  Eye
} from "lucide-react";

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock question data - replace with actual API calls
  const questions = [
    {
      id: 1,
      question: "What is the difference between let, const, and var in JavaScript?",
      course: "JavaScript Fundamentals",
      category: "Frontend",
      difficulty: "Beginner",
      type: "ai-generated",
      createdDate: "2024-02-15",
      expectedAnswer: "let and const are block-scoped, var is function-scoped. const cannot be reassigned.",
      tags: ["variables", "scope", "ES6"]
    },
    {
      id: 2,
      question: "Explain the concept of React hooks and their benefits.",
      course: "React Development",
      category: "Frontend",
      difficulty: "Intermediate",
      type: "manual",
      createdDate: "2024-02-18",
      expectedAnswer: "Hooks allow functional components to use state and lifecycle features...",
      tags: ["react", "hooks", "functional-components"]
    },
    {
      id: 3,
      question: "How would you implement user authentication in a Node.js application?",
      course: "Node.js Backend",
      category: "Backend",
      difficulty: "Intermediate",
      type: "ai-generated",
      createdDate: "2024-02-20",
      expectedAnswer: "Using JWT tokens, bcrypt for password hashing, middleware for protection...",
      tags: ["authentication", "jwt", "security"]
    },
    {
      id: 4,
      question: "What is the time complexity of common sorting algorithms?",
      course: "System Design",
      category: "Architecture",
      difficulty: "Advanced",
      type: "manual",
      createdDate: "2024-02-22",
      expectedAnswer: "Quick sort O(n log n) average, Merge sort O(n log n) worst case...",
      tags: ["algorithms", "complexity", "sorting"]
    },
    {
      id: 5,
      question: "Explain the difference between supervised and unsupervised learning.",
      course: "Python Data Science",
      category: "Data Science",
      difficulty: "Advanced",
      type: "ai-generated",
      createdDate: "2024-02-25",
      expectedAnswer: "Supervised learning uses labeled data, unsupervised finds patterns...",
      tags: ["machine-learning", "supervised", "unsupervised"]
    }
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <Badge className="bg-success-muted text-success border-success">{difficulty}</Badge>;
      case 'Intermediate':
        return <Badge className="bg-warning-muted text-warning border-warning">{difficulty}</Badge>;
      case 'Advanced':
        return <Badge className="bg-destructive-muted text-destructive border-destructive">{difficulty}</Badge>;
      default:
        return <Badge>{difficulty}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'ai-generated':
        return (
          <Badge className="bg-primary-muted text-primary border-primary flex items-center gap-1">
            <Bot className="h-3 w-3" />
            AI Generated
          </Badge>
        );
      case 'manual':
        return (
          <Badge className="bg-secondary text-secondary-foreground border-border flex items-center gap-1">
            <User className="h-3 w-3" />
            Manual
          </Badge>
        );
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCourse = filterCourse === "all" || question.course === filterCourse;
    const matchesType = filterType === "all" || question.type === filterType;
    return matchesSearch && matchesCourse && matchesType;
  });

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Question Management</h1>
          <p className="text-gray-500">Manage interview questions and add new ones</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 text-white hover:shadow-lg flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Add New Question</DialogTitle>
                <DialogDescription className="text-gray-500">
                  Create a new interview question for your courses.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="course" className="text-gray-900">Course</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-100 border border-gray-200 text-gray-900">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="js">JavaScript Fundamentals</SelectItem>
                        <SelectItem value="react">React Development</SelectItem>
                        <SelectItem value="node">Node.js Backend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty" className="text-gray-900">Difficulty</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-100 border border-gray-200 text-gray-900">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="question" className="text-gray-900">Question</Label>
                  <Textarea
                    placeholder="Enter your interview question..."
                    className="bg-gray-100 border border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="answer" className="text-gray-900">Expected Answer</Label>
                  <Textarea
                    placeholder="Enter the expected answer or key points..."
                    className="bg-gray-100 border border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="tags" className="text-gray-900">Tags</Label>
                  <Input
                    placeholder="Enter tags separated by commas..."
                    className="bg-gray-100 border border-gray-200 text-gray-900"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="border border-gray-200 text-gray-900">Cancel</Button>
                  <Button className="bg-green-500 text-white hover:shadow-lg">Add Question</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-gray-900" />
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">AI Generated</p>
              <p className="text-2xl font-bold text-gray-900">
                {questions.filter(q => q.type === 'ai-generated').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-amber-600" />
            <div>
              <p className="text-sm text-gray-500">Manual</p>
              <p className="text-2xl font-bold text-gray-900">
                {questions.filter(q => q.type === 'manual').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center">
              <span className="text-sm font-bold text-red-600">A</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Advanced</p>
              <p className="text-2xl font-bold text-gray-900">
                {questions.filter(q => q.difficulty === 'Advanced').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search questions or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-100 border border-gray-200 text-gray-900"
              />
            </div>

            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-48 bg-gray-100 border border-gray-200 text-gray-900">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="JavaScript Fundamentals">JavaScript Fundamentals</SelectItem>
                <SelectItem value="React Development">React Development</SelectItem>
                <SelectItem value="Node.js Backend">Node.js Backend</SelectItem>
                <SelectItem value="System Design">System Design</SelectItem>
                <SelectItem value="Python Data Science">Python Data Science</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 bg-gray-100 border border-gray-200 text-gray-900">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ai-generated">AI Generated</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-500">
            Showing {filteredQuestions.length} of {questions.length} questions
          </div>
        </div>
      </Card>

      {/* Questions Table */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-semibold">Question</TableHead>
              <TableHead className="text-gray-900 font-semibold">Course</TableHead>
              <TableHead className="text-gray-900 font-semibold">Difficulty</TableHead>
              <TableHead className="text-gray-900 font-semibold">Type</TableHead>
              <TableHead className="text-gray-900 font-semibold">Tags</TableHead>
              <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.id} className="border-b border-gray-200 hover:bg-gray-100">
                <TableCell className="max-w-md">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900 line-clamp-2">{question.question}</div>
                    <div className="text-xs text-gray-400">
                      Created: {new Date(question.createdDate).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="text-gray-900">{question.course}</div>
                    <div className="text-gray-400">{question.category}</div>
                  </div>
                </TableCell>
                <TableCell>{getDifficultyBadge(question.difficulty)}</TableCell>
                <TableCell>{getTypeBadge(question.type)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {question.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border border-gray-200 text-gray-900">
                        {tag}
                      </Badge>
                    ))}
                    {question.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs border border-gray-200 text-gray-900">
                        +{question.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 text-gray-900 border border-gray-200">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-gray-900 border border-gray-200">
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-red-600 border border-red-600 hover:bg-red-100">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>

  );
};

export default Questions;