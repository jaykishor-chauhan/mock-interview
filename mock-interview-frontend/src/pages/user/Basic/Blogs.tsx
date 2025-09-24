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
  Filter
} from "lucide-react";
import { useState } from "react";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technical", "Behavioral", "Career Tips", "Industry Insights", "Success Stories"];

  const featuredPosts = [
    {
      id: 1,
      title: "10 Most Common Technical Interview Questions in 2024",
      excerpt: "Master these essential technical questions that top companies are asking...",
      author: "Sarah Chen",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      category: "Technical",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      featured: true,
      views: "12.5K"
    },
    {
      id: 2,
      title: "How to Answer 'Tell Me About Yourself' Perfectly",
      excerpt: "The ultimate guide to crafting a compelling response to this crucial question...",
      author: "Mike Johnson",
      date: "Jan 12, 2024",
      readTime: "6 min read",
      category: "Behavioral",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop",
      featured: true,
      views: "8.3K"
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: "System Design Interview: Building a Chat Application",
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

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Insights Blog</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Expert tips, success stories, and industry insights to help you ace your interviews
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border border-gray-200"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedCategory === category
                      ? "bg-green-500 text-white hover:shadow-md"
                      : "border border-gray-200 text-gray-900"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {selectedCategory === "All" && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-amber-500" />
                Featured Articles
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-md hover:-translate-y-1 transition-all border border-gray-200">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-gray-100 text-gray-900 border border-gray-200">{post.category}</Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {post.views} views
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {post.author.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs text-gray-500">
                            <p className="font-medium text-gray-900">{post.author}</p>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.date}
                              <Clock className="w-3 h-3 ml-3 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-green-500 text-white hover:shadow-md flex items-center">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredPosts.length} articles)
              </span>
            </h2>

            {filteredPosts.length === 0 ? (
              <Card className="text-center py-12 border border-gray-200">
                <CardContent>
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="bg-green-500 text-white"
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
                    className="group hover:shadow-md hover:-translate-y-1 transition-all border border-gray-200"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-gray-100 text-gray-900 border border-gray-200">{post.category}</Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                      </div>
                      <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {post.author.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs text-gray-500">
                            <p className="text-gray-900">{post.author}</p>
                            <p>{post.date} • {post.readTime}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border border-gray-200 text-gray-900">
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

          {/* Newsletter Signup */}
          <Card className="mt-12 bg-green-500 text-white rounded-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">Stay Updated</CardTitle>
              <CardDescription className="text-sm text-white/80">
                Get the latest interview tips and career insights delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default Blogs;