import { useState, useEffect } from "react";
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
  Bot,
  User,
  Eye,
} from "lucide-react";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { toast } from "@/components/ui/use-toast";

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    course: "",
    question: "",
    difficulty: "",
    tags: "",
  });

  const { course, question, difficulty, tags } = formData;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setAddLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/add-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ course, question, difficulty, tags }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast({ description: data.message || "Failed to add question", variant: "destructive" });
        return;
      }

      toast({ description: "Question added successfully" });

      setFormData({
        course: "",
        question: "",
        difficulty: "",
        tags: "",
      });
      setIsDialogOpen(false);
      fetchQuestions(); // refresh table after adding
    } catch (error) {
      toast({ description: "An error occurred", variant: "destructive" });
    } finally {
      setAddLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/get-question`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast({ description: data.message || "Failed to fetch questions", variant: "destructive" });
        return;
      }

      setAllQuestions(data.questions || []);
    } catch (error) {
      toast({ description: "Failed to fetch questions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Basic":
        return <Badge className="bg-white text-gray-500 border-gray-500 w-20 flex justify-center">{difficulty}</Badge>;
      case "Easy":
        return <Badge className="bg-white text-success border-success w-20 flex justify-center">{difficulty}</Badge>;
      case "Medium":
        return <Badge className="bg-white text-blue-600 border-blue-600 w-20 flex justify-center">{difficulty}</Badge>;

      case "Hard":
        return <Badge className="bg-destructive-muted text-destructive border-destructive w-20 flex justify-center">{difficulty}</Badge>;
      case "Advanced":
        return <Badge className="bg-white text-orange-700 border-orange-700 w-20 flex justify-center">{difficulty}</Badge>;
      default:
        return <Badge>{difficulty}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "ai-generated":
        return (
          <Badge className="bg-primary-muted text-primary border-primary flex items-center gap-1">
            <Bot className="h-3 w-3" /> AI Generated
          </Badge>
        );
      case "manual":
        return (
          <Badge className="bg-secondary text-secondary-foreground border-border flex items-center gap-1">
            <User className="h-3 w-3" /> Manual
          </Badge>
        );
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const filteredQuestions = allQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.tags &&
        q.tags.split(',').some((tag: string) =>
          tag.trim().toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesCourse =
      filterCourse === "all" || q.course.name === filterCourse;

    const matchesType = filterType === "all" || q.type === filterType;

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 text-white hover:shadow-lg flex items-center">
                <Plus className="h-4 w-4 mr-2" /> Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6">
              {addLoading ? (
                <LoadingComponent msg={"Saving question to database..."} />
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Add New Question</DialogTitle>
                    <DialogDescription className="text-gray-500">Create a new interview question for your courses.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-gray-900">Course</Label>
                        <Select value={formData.course} onValueChange={(val) => handleChange("course", val)}>
                          <SelectTrigger className="bg-gray-100 border border-gray-200 text-gray-900">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Java">Java</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="ReactJS">React Development</SelectItem>
                            <SelectItem value="NodeJs">Node.js Backend</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="difficulty" className="text-gray-900">Difficulty</Label>
                        <Select value={formData.difficulty} onValueChange={(val) => handleChange("difficulty", val)}>
                          <SelectTrigger className="bg-gray-100 border border-gray-200 text-gray-900">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="question" className="text-gray-900">Question</Label>
                      <Textarea
                        value={formData.question}
                        onChange={(e) => handleChange("question", e.target.value)}
                        placeholder="Enter your interview question..."
                        className="bg-gray-100 border border-gray-200 text-gray-900"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags" className="text-gray-900">Tags</Label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => handleChange("tags", e.target.value)}
                        placeholder="Enter tags separated by commas..."
                        className="bg-gray-100 border border-gray-200 text-gray-900"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" className="border border-gray-200 text-gray-900" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleSubmit} disabled={addLoading} className="bg-green-500 text-white hover:shadow-lg">Add Question</Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl transition-all">
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
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="React Development">React Development</SelectItem>
                <SelectItem value="Node.js Backend">Node.js Backend</SelectItem>
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
            Showing {filteredQuestions.length} of {allQuestions.length} questions
          </div>
        </div>
      </Card>

      {/* Questions Table */}
      <Card className="bg-white border border-gray-200 rounded-xl transition-all">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-semibold">Question</TableHead>
              <TableHead className="text-gray-900 font-semibold">Course</TableHead>
              <TableHead className="text-gray-900 font-semibold">Difficulty</TableHead>
              <TableHead className="text-gray-900 font-semibold">Tags</TableHead>
              <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No records found.
                </TableCell>
              </TableRow>
            )}

            {filteredQuestions.map((q) => (
              <TableRow key={q._id} className="border-b border-gray-200 hover:bg-gray-100">
                <TableCell className="max-w-md">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900 line-clamp-2">{q.question}</div>
                    <div className="text-xs text-gray-400">
                      Created: {new Date(q.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="text-gray-900">{q.course?.name}</div>
                    <div className="text-gray-400">{q.course?.category}</div>
                  </div>
                </TableCell>
                <TableCell>{getDifficultyBadge(q.difficulty)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {q.tags &&
                      q.tags.split(',').map(tag => tag.trim()).slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border border-gray-200 text-gray-900">
                          {tag}
                        </Badge>
                      ))
                    }
                    {q.tags && q.tags.split(',').length > 3 && (
                      <Badge variant="outline" className="text-xs border border-gray-200 text-gray-900">
                        +{q.tags.split(',').length - 3} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 text-gray-900 border border-gray-200">
                      <Eye className="h-3 w-3 mr-1" /> View
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
