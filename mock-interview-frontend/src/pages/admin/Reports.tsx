import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileText,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react";

const Reports = () => {
  const [dateRange, setDateRange] = useState("7days");
  const [reportType, setReportType] = useState("all");

  // Mock analytics data - replace with actual API calls
  const analyticsData = {
    totalInterviews: 1247,
    completionRate: 87.3,
    averageScore: 78.5,
    totalUsers: 2543,
    activeUsers: 1892,
    topCategories: [
      { name: "Frontend", interviews: 456, percentage: 36.6 },
      { name: "Backend", interviews: 321, percentage: 25.7 },
      { name: "Data Science", interviews: 284, percentage: 22.8 },
      { name: "System Design", interviews: 186, percentage: 14.9 }
    ]
  };

  // Mock recent activity logs
  const activityLogs = [
    {
      id: 1,
      user: "John Smith",
      action: "Completed JavaScript Interview",
      course: "JavaScript Fundamentals",
      score: 85,
      duration: "25 mins",
      timestamp: "2024-03-23 14:30:00",
      status: "completed"
    },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "Started React Course",
      course: "React Development",
      score: null,
      duration: "In Progress",
      timestamp: "2024-03-23 13:45:00",
      status: "in-progress"
    },
    {
      id: 3,
      user: "Mike Chen",
      action: "Failed Python Interview",
      course: "Python Data Science",
      score: 45,
      duration: "18 mins",
      timestamp: "2024-03-23 12:20:00",
      status: "failed"
    },
    {
      id: 4,
      user: "Emma Wilson",
      action: "Completed System Design Interview",
      course: "System Design",
      score: 92,
      duration: "35 mins",
      timestamp: "2024-03-23 11:15:00",
      status: "completed"
    },
    {
      id: 5,
      user: "David Brown",
      action: "Registered Account",
      course: "N/A",
      score: null,
      duration: "N/A",
      timestamp: "2024-03-23 10:30:00",
      status: "registered"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-success-muted text-success border-success flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-destructive-muted text-destructive border-destructive flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-warning-muted text-warning border-warning flex items-center gap-1">
            <Clock className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case 'registered':
        return (
          <Badge className="bg-primary-muted text-primary border-primary flex items-center gap-1">
            <Users className="h-3 w-3" />
            New User
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "User,Action,Course,Score,Duration,Timestamp,Status\n" +
      activityLogs.map(log =>
        `"${log.user}","${log.action}","${log.course}","${log.score || 'N/A'}","${log.duration}","${log.timestamp}","${log.status}"`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `activity_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">Monitor performance and generate reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV} className="border border-gray-200 text-gray-900">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-green-500 text-white hover:shadow-lg flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalInterviews.toLocaleString()}</p>
              <p className="text-xs text-green-600">+18.2% from last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-900" />
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.completionRate}%</p>
              <p className="text-xs text-green-600">+2.1% from last month</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.averageScore}%</p>
              <p className="text-xs text-amber-500">-1.3% from last month</p>
            </div>
            <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center">
              <span className="text-sm font-bold text-amber-500">%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.activeUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+12.5% from last month</p>
            </div>
            <Users className="h-8 w-8 text-gray-900" />
          </div>
        </Card>
      </div>

      {/* Category Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Categories</h2>
            <Badge className="bg-gray-100 text-gray-900">Last 30 days</Badge>
          </div>
          <div className="space-y-4">
            {analyticsData.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-gray-900' :
                      index === 1 ? 'bg-green-600' :
                        index === 2 ? 'bg-amber-500' : 'bg-red-600'
                    }`} />
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{category.interviews}</div>
                  <div className="text-xs text-gray-500">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Export Options</h2>
          <div className="space-y-4">
            {['User Activity Report', 'Performance Analytics', 'Course Statistics'].map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
                <h3 className="font-medium text-gray-900 mb-2">{item}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {item === 'User Activity Report' && 'Complete user activity and interview logs'}
                  {item === 'Performance Analytics' && 'Score trends and completion rates'}
                  {item === 'Course Statistics' && 'Course enrollment and completion data'}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>CSV</Button>
                  <Button size="sm" variant="outline">PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters & Recent Activity */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <div className="flex gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40 bg-gray-100 border border-gray-200 text-gray-900">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hours">Last 24 hours</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-40 bg-gray-100 border border-gray-200 text-gray-900">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="interviews">Interviews Only</SelectItem>
                <SelectItem value="registrations">Registrations</SelectItem>
                <SelectItem value="completions">Completions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activity Table */}
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-semibold">User</TableHead>
              <TableHead className="text-gray-900 font-semibold">Action</TableHead>
              <TableHead className="text-gray-900 font-semibold">Course</TableHead>
              <TableHead className="text-gray-900 font-semibold">Score</TableHead>
              <TableHead className="text-gray-900 font-semibold">Duration</TableHead>
              <TableHead className="text-gray-900 font-semibold">Time</TableHead>
              <TableHead className="text-gray-900 font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityLogs.map((log) => (
              <TableRow key={log.id} className="border-b border-gray-200 hover:bg-gray-100">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-900">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900">{log.action}</TableCell>
                <TableCell className="text-gray-500">{log.course}</TableCell>
                <TableCell>
                  {log.score ? (
                    <span className={`font-medium ${log.score >= 80 ? 'text-green-600' :
                        log.score >= 60 ? 'text-amber-500' : 'text-red-600'
                      }`}>{log.score}%</span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-500">{log.duration}</TableCell>
                <TableCell className="text-gray-400 text-sm">{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(log.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>

  );
};

export default Reports;