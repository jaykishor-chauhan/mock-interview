import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Calendar, Trophy, Target, TrendingUp, Edit3, Camera, BarChart3, Clock } from "lucide-react";
import {  useState } from "react";

const Profile = () => {
  const userString = localStorage.getItem("user");
  const profileDetails = JSON.parse(userString);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    totalInterviews: 24,
    averageScore: 87,
    bestCategory: "Technical Interviews"
  });

  const getInitials = (fullName: "Jaykishor Chauhan") => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return (
      parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
    );
  };

  const recentInterviews = [
    { id: 1, type: "Technical", score: 92, date: "2024-01-15", feedback: "Excellent problem-solving approach" },
    { id: 2, type: "Behavioral", score: 85, date: "2024-01-12", feedback: "Good communication skills" },
    { id: 3, type: "HR", score: 88, date: "2024-01-10", feedback: "Professional and well-prepared" },
    { id: 4, type: "Technical", score: 79, date: "2024-01-08", feedback: "Room for improvement in algorithms" },
  ];

  const achievements = [
    { title: "Interview Master", description: "Completed 20+ interviews", icon: Trophy, earned: true },
    { title: "High Scorer", description: "Achieved 90+ score", icon: Target, earned: true },
    { title: "Consistent Performer", description: "Maintained 80+ average", icon: TrendingUp, earned: true },
    { title: "Technical Expert", description: "Excelled in technical interviews", icon: BarChart3, earned: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-8 bg-gradient-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileDetails.avatar} />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                      {getInitials(profileDetails.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    onClick={() => setIsEditing(true)}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{profileDetails.name.toUpperCase()}</h1>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        {profileDetails.email}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Member since {profileDetails.created_at}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(!isEditing)}
                      className="mt-4 md:mt-0"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProfile.totalInterviews}</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProfile.averageScore}%</div>
                <Progress value={userProfile.averageScore} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Category</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{userProfile.bestCategory}</div>
                <p className="text-xs text-muted-foreground">92% average score</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Interviews</CardTitle>
                  <CardDescription>Your latest interview performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInterviews.map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{interview.type}</Badge>
                          <div>
                            <p className="font-medium">Score: {interview.score}%</p>
                            <p className="text-sm text-muted-foreground">{interview.date}</p>
                          </div>
                        </div>
                        <div className="text-right max-w-xs">
                          <p className="text-sm text-muted-foreground italic">"{interview.feedback}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Track your progress and unlock new badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className={`p-4 border rounded-lg ${achievement.earned ? 'bg-success/10 border-success/20' : 'bg-muted/30'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <achievement.icon className={`w-8 h-8 ${achievement.earned ? 'text-success' : 'text-muted-foreground'}`} />
                          <div>
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          {achievement.earned && (
                            <Badge className="ml-auto bg-success text-success-foreground">Earned</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileDetails.name}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileDetails.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex space-x-4">
                      <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;