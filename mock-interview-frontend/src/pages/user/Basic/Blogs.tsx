import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Star,
  Filter,
  Sparkles,
  Settings,
  UserCircle,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Blogs = () => {
  const nav = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const userToken = localStorage.getItem("authToken");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (fullName?: string) => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getNameInOne = (fullName?: string) => {
    if (!fullName) return "User";
    const parts = fullName.trim().split(/\s+/);
    const first = parts[0] || "";
    const last = parts[parts.length - 1] || "";
    return `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`.trim();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setShowProfileMenu(false);
    nav("/blogs");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technical", "Behavioral", "Career Tips", "Industry Insights", "Success Stories"];

  const featuredPosts = [
    {
      id: 1,
      title: "Java Technical Interview Questions",
      excerpt: "Master these essential technical questions that top companies are asking...",
      author: "Sarah Chen",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      category: "Technical",
      image: "https://www.vectorlogo.zone/logos/java/java-ar21.svg",
      featured: true,
      views: "12.5K",
      page: "Java"
    },
    {
      id: 2,
      title: "Operating Systems Interview Questions",
      excerpt: "The ultimate guide to OS questions asked in software engineering interviews...",
      author: "Mike Johnson",
      date: "Jan 12, 2024",
      readTime: "6 min read",
      category: "Technical",
      image: "https://www.svgrepo.com/show/339512/server-operating-systems.svg",
      featured: true,
      views: "8.3K",
      page: "operating-systems"
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: "System Design Interview",
      excerpt: "Learn how to approach system design questions with a real-world example...",
      author: "David Kim",
      date: "Jan 10, 2024",
      readTime: "12 min read",
      category: "Technical",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop",
      views: "6.7K"
    },
    {
      id: 4,
      title: "From Rejection to Success: My FAANG Interview Journey",
      excerpt: "How I turned multiple rejections into valuable learning experiences...",
      author: "Emily Rodriguez",
      date: "Jan 8, 2024",
      readTime: "10 min read",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      views: "15.2K"
    },
    {
      id: 5,
      title: "Salary Negotiation Tips for Software Engineers",
      excerpt: "Master the art of negotiating your worth in the competitive tech market...",
      author: "Alex Thompson",
      date: "Jan 5, 2024",
      readTime: "7 min read",
      category: "Career Tips",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop",
      views: "9.1K"
    },
    {
      id: 6,
      title: "Remote Interview Best Practices",
      excerpt: "Essential tips for acing your virtual interviews in the remote work era...",
      author: "Lisa Park",
      date: "Jan 3, 2024",
      readTime: "5 min read",
      category: "Career Tips",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=200&fit=crop",
      views: "4.8K"
    },
    {
      id: 7,
      title: "AI and the Future of Technical Interviews",
      excerpt: "How artificial intelligence is reshaping the interview landscape...",
      author: "Dr. Jennifer Wu",
      date: "Dec 28, 2023",
      readTime: "9 min read",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop",
      views: "7.4K"
    },
    {
      id: 8,
      title: "Behavioral Questions: The STAR Method Explained",
      excerpt: "Master the STAR technique for structured, compelling behavioral responses...",
      author: "Robert Martinez",
      date: "Dec 25, 2023",
      readTime: "6 min read",
      category: "Behavioral",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      views: "11.6K"
    }
  ];

  const handleClick = (page) => {
    nav(`/blogs/${page.toLowerCase()}`);
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/40">

      {/* Enhanced Page-level Header with Theme Matching */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => nav('/blogs')}
                className="flex items-center gap-2 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Mock Interview
                  </span>
                  <span className="text-xs text-purple-600 font-medium -mt-1">Blog Portal</span>
                </div>
              </button>


              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => nav('/')}
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => nav('/contact')}
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* User Profile Section */}
            {userToken && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-50 transition-colors group"
                >
                  <Avatar className="w-9 h-9 ring-2 ring-purple-200 ring-offset-2">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-semibold text-sm">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-gray-900">{getNameInOne(user.name)}</div>
                    <div className="text-xs text-gray-500">View Profile</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu - Fixed Positioning */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-purple-100 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden z-50">
                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          nav('/profile');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 rounded-xl transition-colors group"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <UserCircle className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900">Profile</div>
                          <div className="text-xs text-gray-500">View and edit profile</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          nav('/settings');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 rounded-xl transition-colors group"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <Settings className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900">Settings</div>
                          <div className="text-xs text-gray-500">Account preferences</div>
                        </div>
                      </button>

                      <div className="my-2 border-t border-gray-100"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-red-600">Log Out</div>
                          <div className="text-xs text-red-400">Sign out of your account</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => nav('/login')}
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => nav('/signup')}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Header Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
          {/* Main Header */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200 bg-clip-text text-transparent">
                Interview Skills
              </span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Expert insights, success stories, and proven strategies to help you land your dream job with confidence
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Search & Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-purple-200/50 focus:border-purple-400 rounded-xl bg-white shadow-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="lg"
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30 rounded-xl whitespace-nowrap"
                      : "border-2 border-purple-200/50 text-gray-700 hover:bg-purple-50 rounded-xl whitespace-nowrap"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Articles Section - Minimal & Clean */}
          {selectedCategory === "All" && (
            <div className="mb-16">
              {/* Section Header */}
              <div className="flex items-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-full border border-amber-200/50">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-amber-700 font-semibold text-sm tracking-wide uppercase">Featured Articles</span>
                </div>
              </div>

              {/* Featured Cards Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-lg cursor-pointer"
                    onClick={() => handleClick(post.page)}
                  >
                    {/* Image Container - Fixed Aspect Ratio */}
                    <div className="relative aspect-[2/1] overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-contain p-6"
                      />
                      {/* Subtle Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>

                    {/* Content */}
                    <CardHeader className="p-5 pb-3">
                      {/* Category Badge & Views */}
                      <div className="flex items-center justify-between mb-2.5">
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-2.5 py-0.5 rounded-md text-xs font-medium border-0">
                          {post.category}
                        </Badge>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </CardTitle>

                      {/* Description */}
                      <CardDescription className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    {/* Footer */}
                    <CardContent className="px-5 pb-4 pt-0">
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {/* Author Info */}
                        {/*<div className="flex items-center gap-2.5">
                          <Avatar className="w-9 h-9 border-2 border-purple-100">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-xs font-semibold">
                              {post.author.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-semibold text-gray-900">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.date} • {post.readTime}</p>
                          </div>
                        </div>*/}

                        {/* Read More Button */}
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 rounded-lg font-medium shadow-sm text-xs px-3 py-1.5 h-auto"
                        >
                          Read More
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Posts Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              </h2>
              <span className="text-sm font-medium text-gray-500 bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
                {filteredPosts.length} articles
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <Card className="text-center py-16 border-2 border-dashed border-purple-200 rounded-2xl bg-white">
                <CardContent>
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg rounded-xl"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-lg cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-2 py-0.5 rounded-md text-xs font-medium border-0">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500 font-medium">
                          <TrendingUp className="w-3 h-3 mr-1 text-purple-500" />
                          {post.views}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug mb-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 pt-0">
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {/*<div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 border-2 border-purple-100">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-semibold">
                              {post.author.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-semibold text-gray-900">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.date}</p>
                          </div>
                        </div>*/}
                        <Button size="sm" variant="ghost" className="text-purple-600 hover:bg-purple-50 font-medium">
                          Read
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
