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
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Calendar
} from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock user data - replace with actual API calls
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-03-20",
      interviewsCompleted: 12,
      coursesEnrolled: 3
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      status: "active",
      joinDate: "2024-02-03",
      lastLogin: "2024-03-22",
      interviewsCompleted: 8,
      coursesEnrolled: 2
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      status: "inactive",
      joinDate: "2024-01-28",
      lastLogin: "2024-03-10",
      interviewsCompleted: 5,
      coursesEnrolled: 1
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      status: "active",
      joinDate: "2024-03-01",
      lastLogin: "2024-03-23",
      interviewsCompleted: 15,
      coursesEnrolled: 4
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@email.com",
      status: "pending",
      joinDate: "2024-03-22",
      lastLogin: "Never",
      interviewsCompleted: 0,
      coursesEnrolled: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success-muted text-success border-success">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-warning-muted text-warning border-warning">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-primary-muted text-primary border-primary">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">Manage and monitor user accounts</p>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl transition-all">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-100 border border-gray-200 text-gray-900"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-gray-100 border border-gray-200 text-gray-900">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="bg-white border border-gray-200 rounded-xl transition-all">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-semibold">User</TableHead>
              <TableHead className="text-gray-900 font-semibold">Status</TableHead>
              <TableHead className="text-gray-900 font-semibold">Join Date</TableHead>
              <TableHead className="text-gray-900 font-semibold">Last Login</TableHead>
              <TableHead className="text-gray-900 font-semibold">Activity</TableHead>
              <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-900">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">
                  {user.lastLogin === "Never" ? "Never" : new Date(user.lastLogin).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="text-gray-900">{user.interviewsCompleted} interviews</div>
                    <div className="text-gray-500">{user.coursesEnrolled} courses</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={user.status === 'active' ? 'outline' : 'default'}
                      className="h-8"
                    >
                      {user.status === 'active' ? (
                        <><UserX className="h-3 w-3 mr-1 text-red-600" /> Deactivate</>
                      ) : (
                        <><UserCheck className="h-3 w-3 mr-1 text-green-600" /> Activate</>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 border border-gray-200 text-gray-900">
                      <MoreVertical className="h-3 w-3 text-gray-400" />
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

export default Users;