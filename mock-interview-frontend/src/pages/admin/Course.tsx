import { useEffect, useState } from "react";
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
  Clock,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import LoadingComponent from "@/components/ui/LoadingComponent";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    course: "",
    category: "",
    difficulty: "",
    status: "",
    description: "",
  });

  const { course, category, difficulty, status, description } = formData;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://mockinterview-ymzx.onrender.com/api/admin/get-courses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          toast({
            description: data.message || "Failed to fetch courses",
            variant: "destructive",
          });
          return;
        }

        setCourses(data || []);

      } catch (error) {
        toast({
          description: "Failed to fetch courses",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getAllCourses();

  }, [isDialogOpen]);


  const handleAddCourse = async () => {
    try {
      setAddLoading(true);

      const response = await fetch("https://mockinterview-ymzx.onrender.com/api/admin/add-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },

        body: JSON.stringify({ course, category, status, description }),

      });

      if (!response.ok) {
        toast({ description: "Failed to add course", variant: "destructive" });
        return;
      }
      toast({ description: "Course added successfully" });
      setFormData({
        course: "",
        category: "",
        difficulty: "",
        status: "",
        description: "",
      });

    } catch (error) {
      toast({ description: "An error occurred", variant: "destructive" });
    } finally {
      setAddLoading(false);
    }
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-success-muted text-success border-success w-20 flex justify-center">Published</Badge>;
      case 'draft':
        return <Badge className="bg-primary-muted text-primary border-primary w-20 flex justify-center">Draft</Badge>;
      case 'review':
        return <Badge className="bg-warning-muted text-warning border-warning w-20 flex justify-center">In Review</Badge>;
      default:
        return <Badge >{status}</Badge>;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 text-white hover:shadow-lg flex items-center" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6">
              {addLoading ? (
                <LoadingComponent msg={"Saving to database..."} />
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Add New Course</DialogTitle>
                    <DialogDescription className="text-gray-500">
                      Create a new interview course.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Course */}
                      <div>
                        <Label className="text-gray-900">Course</Label>
                        <Select
                          value={formData.course}
                          onValueChange={(val) => handleChange("course", val)}
                        >
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

                      {/* Category */}
                      <div>
                        <Label className="text-gray-900">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(val) => handleChange("category", val)}
                        >
                          <SelectTrigger className="bg-gray-100 border border-gray-200 text-gray-900">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technical">Technical</SelectItem>
                            <SelectItem value="Behavioral">Behavioral</SelectItem>
                            <SelectItem value="Development">Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Status */}
                      <div>
                        <Label className="text-gray-900">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(val) => handleChange("status", val)}
                        >
                          <SelectTrigger className="bg-gray-100 border border-gray-200 text-gray-900">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="review">In Review</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label className="text-gray-900">Description</Label>
                      <Input
                        placeholder="Enter the description of the course..."
                        className="bg-gray-100 border border-gray-200 text-gray-900"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="border border-gray-200 text-gray-900"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>

                      <Button
                        className="bg-green-500 text-white hover:shadow-lg flex items-center justify-center"
                        onClick={handleAddCourse}
                        disabled={addLoading}
                      >
                        Add Course
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
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
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Published Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((sum, course) => sum + (course.status === "published" ? 1 : 0), 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Review Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((sum, course) => sum + (course.status === "review" ? 1 : 0), 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Draft Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((sum, course) => sum + (course.status === "draft" ? 1 : 0), 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl transition-all">
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
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Behavioral">Behavioral</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
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
      <Card className="bg-white border border-gray-200 rounded-xl transition-all">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-semibold">Course</TableHead>
              <TableHead className="text-gray-900 font-semibold">Category</TableHead>
              <TableHead className="text-gray-900 font-semibold">Questions</TableHead>
              <TableHead className="text-gray-900 font-semibold">Status</TableHead>
              <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No records found.
                </TableCell>
              </TableRow>
            )}
            {filteredCourses.map((course) => (
              <TableRow key={course.id} className="border-b border-gray-200 hover:bg-gray-100">
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{course.name}</div>
                    <div className="text-sm text-gray-500">{course.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{course.category}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      Created {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-gray-900">10</div>
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
