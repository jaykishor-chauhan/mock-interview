import { Card } from "@/components/ui/card";
import { Users, BookOpen, Plus, FileText, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentAdmins, setRecentAdmins] = useState<any[]>([]);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [recentQuestions, setRecentQuestions] = useState<any[]>([]);
  const [courseStatusCounts, setCourseStatusCounts] = useState<Record<string, number>>({});
  const [questionDifficultyCounts, setQuestionDifficultyCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!res.ok) throw new Error('Failed to load dashboard');
      const data = await res.json();

      const statsData = data?.stats || {};
      setCourseStatusCounts(data?.courseStatusCounts || {});
      setQuestionDifficultyCounts(data?.questionDifficultyCounts || {});

      setStats([
        { title: 'Total Users', value: (statsData.totalUsers || 0).toLocaleString(), change: '+0', trend: 'up', icon: Users, description: 'Total registered users', active: data?.stats?.userActiveCount || 0, inactive: data?.stats?.userInactiveCount || 0 },
        { title: 'Total Courses', value: (statsData.totalCourses || 0).toLocaleString(), change: '+0', trend: 'up', icon: BookOpen, description: 'Available courses' },
        { title: 'Total Questions', value: (statsData.totalQuestions || 0).toLocaleString(), change: '+0', trend: 'up', icon: BookOpen, description: 'Total questions' },
        { title: 'Total Admins', value: (statsData.totalAdmins || 0).toLocaleString(), change: '+0', trend: 'up', icon: Users, description: 'Admin accounts', active: data?.stats?.adminActiveCount || 0, inactive: data?.stats?.adminInactiveCount || 0 },
      ]);

      // merge recent users and recent questions into a simple activity feed
      // set separate recent lists
      setRecentUsers(data?.recentUsers || []);
      setRecentAdmins(data?.recentAdmins || []);
      setRecentCourses(data?.recentCourses || []);
      setRecentQuestions(data?.recentQuestions || []);

      // keep a combined activity for fallback/legacy UI
      const activities: any[] = [];
      (data?.recentUsers || []).forEach((u: any) => activities.push({ id: `user-${u._id}`, user: u.name, action: `Joined`, time: new Date(u.createdAt).toLocaleString(), status: u.emailVerified || u.verified ? 'success' : 'warning' }));
      (data?.recentQuestions || []).forEach((q: any) => activities.push({ id: `q-${q._id}`, user: q.course?.name || 'Course', action: q.question, time: new Date(q.createdAt).toLocaleString(), status: 'info' }));

      setRecentActivity(activities.slice(0, 8));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

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
        {(loading ? Array.from({ length: 4 }) : stats).map((stat: any, index: number) => (
          <Card key={index} className="relative p-6 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                {loading ? (
                  <>
                    <Skeleton className="h-4 w-40" />
                    <div className="flex items-center gap-2 mt-2">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-32 mt-2" />
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-500">
                      <span className="inline-flex items-center gap-2">
                        <span className="leading-none">{stat.title}</span>

                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <button
                              aria-label={`More info about ${stat?.title}`}
                              className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                            >
                              <Info className="h-3 w-3" />
                              <span className="sr-only">Info</span>
                            </button>
                          </HoverCardTrigger>

                          <HoverCardContent className="w-52 p-3">
                            <div className="text-sm text-gray-700 space-y-2">
                              <div className="font-medium text-gray-900">{stat?.title} breakdown</div>
                              <div className="h-px bg-gray-100" />

                              {stat?.title === 'Total Users' && (
                                <div>
                                  <div>Active: {(stat.active || 0).toLocaleString()}</div>
                                  <div>Inactive: {(stat.inactive || 0).toLocaleString()}</div>
                                </div>
                              )}

                              {stat?.title === 'Total Courses' && (
                                <div className="space-y-1">
                                  {Object.entries(courseStatusCounts).length === 0 ? (
                                    <div className="text-gray-500">No data</div>
                                  ) : (
                                    Object.entries(courseStatusCounts).map(([s, c]) => (
                                      <div key={s} className="capitalize">{s}: {c}</div>
                                    ))
                                  )}
                                </div>
                              )}

                              {stat?.title === 'Total Questions' && (
                                <div className="space-y-1">
                                  {Object.entries(questionDifficultyCounts).length === 0 ? (
                                    <div className="text-gray-500">No data</div>
                                  ) : (
                                    Object.entries(questionDifficultyCounts).map(([d, c]) => (
                                      <div key={d} className="capitalize">{d}: {c}</div>
                                    ))
                                  )}
                                </div>
                              )}

                              {stat?.title === 'Total Admins' && (
                                <div>
                                  <div>Active: {(stat.active || 0).toLocaleString()}</div>
                                  <div>Inactive: {(stat.inactive || 0).toLocaleString()}</div>
                                </div>
                              )}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </span>
                    </p>
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
                  </>
                )}
              </div>
              <div className="p-1">
                {loading ? <Skeleton className="h-6 w-6 rounded" /> : <stat.icon className="h-6 w-6 text-gray-700" />}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity (Tabbed) */}
        <Card className="lg:col-span-2 p-6 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-gray-700 hover:underline" onClick={() => fetchDashboard()}>Refresh</button>
          </div>

          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="space-y-4">
                {(loading ? Array.from({ length: 4 }) : recentUsers).map((u: any, idx: number) => (
                  <div key={u?._id || idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                    {loading ? (
                      <>
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48 mt-1" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                      </>
                    ) : (
                      <>
                        <div className={`w-3 h-3 rounded-full ${u.emailVerified || u.verified ? 'bg-green-500' : 'bg-amber-500'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email} — {u.emailVerified || u.verified ? 'Active' : 'Inactive'}</p>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="space-y-4">
                {(loading ? Array.from({ length: 4 }) : recentCourses).map((c: any, idx: number) => (
                  <div key={c?._id || idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                    {loading ? (
                      <>
                        <Skeleton className="h-8 w-8 rounded" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48 mt-1" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                      </>
                    ) : (
                      <>
                        <div className={`w-3 h-3 rounded-full ${c.status === 'Published' ? 'bg-green-500' : c.status === 'In Review' ? 'bg-amber-500' : 'bg-gray-400'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-500">Status: {c.status}</p>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="questions">
              <div className="space-y-4">
                {(loading ? Array.from({ length: 4 }) : recentQuestions).map((q: any, idx: number) => (
                  <div key={q?._id || idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                    {loading ? (
                      <>
                        <Skeleton className="h-8 w-8 rounded" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48 mt-1" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                      </>
                    ) : (
                      <>
                        <div className={`w-3 h-3 rounded-full ${q.difficulty === 'Hard' ? 'bg-red-500' : q.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{q.question}</p>
                          <p className="text-xs text-gray-500">Course: {q.course?.name || '—'} — Difficulty: {q.difficulty}</p>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(q.createdAt).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
