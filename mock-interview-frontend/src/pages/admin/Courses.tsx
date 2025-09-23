import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Search, 
  Plus, 
  Filter, 
  Edit3,
  Trash2,
  Users,
  BookOpen,
  Clock
} from "lucide-react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Mock course data - replace with actual API calls
  const courses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      category: "Frontend",
      difficulty: "Beginner",
      duration: "4 weeks",
      studentsEnrolled: 245,
      totalQuestions: 45,
      status: "active",
      createdDate: "2024-01-15",
      description: "Complete JavaScript course covering ES6+ features"
    },
    {
      id: 2,
      title: "React Development",
      category: "Frontend", 
      difficulty: "Intermediate",
      duration: "6 weeks",
      studentsEnrolled: 189,
      totalQuestions: 62,
      status: "active",
      createdDate: "2024-02-01",
      description: "Modern React development with hooks and context"
    },
    {
      id: 3,
      title: "Node.js Backend",
      category: "Backend",
      difficulty: "Intermediate", 
      duration: "5 weeks",
      studentsEnrolled: 156,
      totalQuestions: 38,
      status: "active",
      createdDate: "2024-01-20",
      description: "Server-side development with Node.js and Express"
    },
    {
      id: 4,
      title: "Python Data Science",
      category: "Data Science",
      difficulty: "Advanced",
      duration: "8 weeks", 
      studentsEnrolled: 98,
      totalQuestions: 72,
      status: "draft",
      createdDate: "2024-03-01",
      description: "Data analysis and machine learning with Python"
    },
    {
      id: 5,
      title: "System Design",
      category: "Architecture",
      difficulty: "Advanced",
      duration: "6 weeks",
      studentsEnrolled: 134,
      totalQuestions: 28,
      status: "active", 
      createdDate: "2024-02-15",
      description: "Scalable system design principles and patterns"
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success-muted text-success border-success">Active</Badge>;
      case 'draft':
        return <Badge className="bg-primary-muted text-primary border-primary">Draft</Badge>;
      case 'archived':
        return <Badge className="bg-warning-muted text-warning border-warning">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
  {/* Header */}
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
      <p className="text-gray-500">Create and manage interview courses</p>
    </div>
    <Button className="bg-green-500 text-white hover:shadow-lg flex items-center">
      <Plus className="h-4 w-4 mr-2" />
      Create New Course
    </Button>
  </div>

  {/* Stats Cards */}
  <div className="grid gap-4 md:grid-cols-4">
    <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-gray-900" />
        <div>
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
        </div>
      </div>
    </Card>

    <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-green-600" />
        <div>
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">
            {courses.reduce((sum, course) => sum + course.studentsEnrolled, 0)}
          </p>
        </div>
      </div>
    </Card>

    <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
          <span className="text-sm font-bold text-green-600">Q</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Questions</p>
          <p className="text-2xl font-bold text-gray-900">
            {courses.reduce((sum, course) => sum + course.totalQuestions, 0)}
          </p>
        </div>
      </div>
    </Card>

    <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <Clock className="h-8 w-8 text-amber-600" />
        <div>
          <p className="text-sm text-gray-500">Active Courses</p>
          <p className="text-2xl font-bold text-gray-900">
            {courses.filter(c => c.status === 'active').length}
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
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border border-gray-200 text-gray-900"
          />
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48 bg-gray-100 border border-gray-200 text-gray-900">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Architecture">Architecture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-gray-500">
        Showing {filteredCourses.length} of {courses.length} courses
      </div>
    </div>
  </Card>

  {/* Courses Table */}
  <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gray-200">
          <TableHead className="text-gray-900 font-semibold">Course</TableHead>
          <TableHead className="text-gray-900 font-semibold">Category</TableHead>
          <TableHead className="text-gray-900 font-semibold">Difficulty</TableHead>
          <TableHead className="text-gray-900 font-semibold">Students</TableHead>
          <TableHead className="text-gray-900 font-semibold">Questions</TableHead>
          <TableHead className="text-gray-900 font-semibold">Status</TableHead>
          <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCourses.map((course) => (
          <TableRow key={course.id} className="border-b border-gray-200 hover:bg-gray-100">
            <TableCell>
              <div>
                <div className="font-medium text-gray-900">{course.title}</div>
                <div className="text-sm text-gray-500">{course.description}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {course.duration} • Created {new Date(course.createdDate).toLocaleDateString()}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="text-gray-900 border border-gray-200">
                {course.category}
              </Badge>
            </TableCell>
            <TableCell>{getDifficultyBadge(course.difficulty)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-gray-900">
                <Users className="h-3 w-3" />
                {course.studentsEnrolled}
              </div>
            </TableCell>
            <TableCell>
              <div className="text-gray-900">{course.totalQuestions}</div>
            </TableCell>
            <TableCell>{getStatusBadge(course.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-gray-900 border border-gray-200">
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-red-600 border border-red-600 hover:bg-red-100"
                >
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

export default Courses;