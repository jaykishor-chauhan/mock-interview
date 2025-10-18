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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LoginInfo = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [actionUser, setActionUser] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [active, setActive] = useState("");
  const [details, setDetails] = useState([]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state");
    setActive(state);
    fetchDetails(state);
  }, [location.search]);

  const fetchDetails = async (state) => {
    setLoading(true);
    const _state = state === "admins" ? "admin" : "user";
    setActive(_state);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${_state}/getall${_state}s`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      const details = await response.json();
      if (!response.ok) {
        toast({
          variant: "destructive",
          description: details.message || "Failed to fetch user details.",
        })
      }
      setDetails(details);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occurred while fetching user details.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async () => {
    if (!actionUser) return;
    setLoading(true);
    const { _id } = actionUser;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/account-activation-deactivation`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({ id: _id, active })
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: result.message || `Failed to update ${active} status.`,
        });
      }

       toast({
          description: result.message,
        });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `An error occurred while updating ${active} status.`,
      });
    } finally {
      setLoading(false);
      setIsAlertOpen(false);
      setActionUser(null);
      fetchDetails(active);
    }
  };


  const getStatusBadge = (verified: boolean, emailVerified: boolean) => {
    let status = "pending"; // default

    if (verified && emailVerified) status = "active";
    else if (!verified && !emailVerified) status = "inactive";

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

  const filteredUsers = details.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || user.verified === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left side */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{`${active.charAt(0).toUpperCase() + active.slice(1)}`} Management</h1>
          <p className="text-gray-500">Manage and monitor {`${active}s`} accounts</p>
        </div>

        {/* Right side toggle */}
        <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden">
          <button
            className={`px-4 py-2 text-sm font-medium ${active === "user"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            onClick={() => navigate("/get-registered?state=users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${active === "admin"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            onClick={() => navigate("/get-registered?state=admins")}
          >
            Admins
          </button>
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
            Showing {filteredUsers.length} of {details.length} users
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="bg-white border border-gray-200 rounded-xl transition-all">
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will {actionUser?.verified && actionUser?.emailVerified ? 'deactivate' : 'activate'} the user account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setActionUser(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpdateStatus} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-semibold">S. No.</TableHead>
              <TableHead className="text-gray-900 font-semibold">User</TableHead>
              <TableHead className="text-gray-900 font-semibold">Status</TableHead>
              <TableHead className="text-gray-900 font-semibold">Join Date</TableHead>
              <TableHead className="text-gray-900 font-semibold">Last Login</TableHead>
              <TableHead className="text-gray-900 font-semibold">Activity</TableHead>
              <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No records found.
                </TableCell>
              </TableRow>
            )}
            {filteredUsers.map((user, index) => (
              <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <TableCell>
                  <div className="text-gray-500">{index + 1}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(user.verified, user.emailVerified)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">
                  {user.lastLogin === "Never" ? "Never" : new Date(user.updatedAt).toLocaleDateString()}
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
                      variant="outline"
                      className="h-8 w-32 p-0"
                      onClick={() => {
                        setActionUser(user);
                        setIsAlertOpen(true);
                      }}
                      disabled={(!user.verified && user.emailVerified) || loading}
                    >
                      {user.verified && user.emailVerified ? (
                        <>
                          <UserX className="h-3 w-3 mr-1 text-red-600" /> Deactivate
                        </>
                      ) : !user.verified && !user.emailVerified ? (
                        <>
                          <UserCheck className="h-3 w-3 mr-1 text-green-600" /> Activate
                        </>
                      ) : (
                        "Email Not Verified"
                      )}
                    </Button>

                    {/* <Button size="sm" variant="outline" className="h-8 w-8 p-0 border border-gray-200 text-gray-900">
                      <MoreVertical className="h-3 w-3 text-gray-400" />
                    </Button> */}
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

export default LoginInfo;
