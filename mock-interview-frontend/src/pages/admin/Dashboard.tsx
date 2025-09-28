import { Card } from "@/components/ui/card";
import { Users, BookOpen, Plus, FileText } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "2,543", change: "+12.5%", trend: "up", icon: Users, description: "Active users this month" },
    { title: "Total Courses", value: "89", change: "+3", trend: "up", icon: BookOpen, description: "Available courses" }
  ];

  const recentActivity = [
    { id: 1, user: "John Smith", action: "Completed JavaScript Interview", time: "2 hours ago", status: "success" },
    { id: 2, user: "Sarah Johnson", action: "Started React Course", time: "4 hours ago", status: "info" },
  ];

  const quickActions = [
    { title: "Add New Course", desc: "Create a new interview course", icon: Plus },
    { title: "Add Questions", desc: "Add interview questions", icon: FileText },
  ];

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-end mb-4">
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${stat.trend === 'up'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                    }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <stat.icon className="h-6 w-6 text-gray-700" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-gray-700 hover:underline">View all</button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>

          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <button key={idx} className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
                <action.icon className="h-5 w-5 text-gray-700" />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                  <p className="text-xs text-gray-500">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
