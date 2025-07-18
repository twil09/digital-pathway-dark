import { useState } from "react";
import { CourseBlock } from "./CourseBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Shield, 
  Palette, 
  Briefcase, 
  Settings, 
  User,
  Crown,
  GraduationCap
} from "lucide-react";

interface DashboardProps {
  userRole: "student" | "teacher";
  userName: string;
  subscriptionTier: "free" | "student" | "teacher" | "personal";
}

const sampleCourses = [
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    description: "Learn the basics of Python programming with hands-on projects",
    progress: 65,
    duration: "8 weeks",
    difficulty: "Beginner" as const,
    students: 12450,
    rating: 4.8,
    category: "coding" as const,
    isLocked: false
  },
  {
    id: "machine-learning",
    title: "Machine Learning Basics",
    description: "Introduction to ML algorithms and practical applications",
    progress: 30,
    duration: "12 weeks", 
    difficulty: "Intermediate" as const,
    students: 8230,
    rating: 4.9,
    category: "ai" as const,
    isLocked: false
  },
  {
    id: "ethical-hacking",
    title: "Cybersecurity Fundamentals",
    description: "Essential security concepts and ethical hacking techniques",
    duration: "10 weeks",
    difficulty: "Beginner" as const,
    students: 5670,
    rating: 4.7,
    category: "cybersecurity" as const,
    isLocked: true
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Principles",
    description: "Create beautiful and user-friendly interfaces",
    duration: "6 weeks",
    difficulty: "Beginner" as const,
    students: 9840,
    rating: 4.6,
    category: "design" as const,
    isLocked: true
  },
  {
    id: "business-strategy",
    title: "Business Strategy",
    description: "Strategic thinking and business model development",
    duration: "8 weeks",
    difficulty: "Advanced" as const,
    students: 3250,
    rating: 4.5,
    category: "business" as const,
    isLocked: true
  },
  {
    id: "advanced-react",
    title: "Advanced React Development",
    description: "Deep dive into React patterns and performance optimization",
    duration: "10 weeks",
    difficulty: "Advanced" as const,
    students: 6780,
    rating: 4.9,
    category: "coding" as const,
    isLocked: true
  }
];

const subscriptionBadges = {
  free: { label: "Free", color: "bg-muted text-muted-foreground" },
  student: { label: "Student", color: "bg-student-accent text-white" },
  teacher: { label: "Teacher", color: "bg-teacher-accent text-white" },
  personal: { label: "Personal", color: "bg-primary text-primary-foreground" }
};

export function Dashboard({ userRole, userName, subscriptionTier }: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "coding", name: "Coding", icon: BookOpen, color: "text-blue-400" },
    { id: "ai", name: "AI & ML", icon: Brain, color: "text-purple-400" },
    { id: "cybersecurity", name: "Cybersecurity", icon: Shield, color: "text-red-400" },
    { id: "design", name: "Design", icon: Palette, color: "text-green-400" },
    { id: "business", name: "Business", icon: Briefcase, color: "text-orange-400" }
  ];

  const filteredCourses = selectedCategory 
    ? sampleCourses.filter(course => course.category === selectedCategory)
    : sampleCourses;

  const roleIcon = userRole === "student" ? GraduationCap : User;
  const RoleIcon = roleIcon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <RoleIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Welcome back, {userName}</h1>
                  <div className="flex items-center gap-2">
                    <Badge className={subscriptionBadges[subscriptionTier].color}>
                      {subscriptionBadges[subscriptionTier].label}
                    </Badge>
                    <Badge variant="outline" className={userRole === "student" ? "border-student-accent text-student-accent" : "border-teacher-accent text-teacher-accent"}>
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="premium" className="gap-2">
                <Crown className="w-4 h-4" />
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Courses in Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Study Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47h</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Certificates Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Python & Machine Learning</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Explore Subjects</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              onClick={() => setSelectedCategory(null)}
              className="gap-2"
            >
              All Subjects
            </Button>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2"
                >
                  <Icon className={`w-4 h-4 ${category.color}`} />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseBlock
              key={index}
              {...course}
            />
          ))}
        </div>

        {subscriptionTier === "free" && (
          <Card className="mt-8 border-primary/20 bg-premium-gradient/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Unlock Full Access</h3>
                  <p className="text-muted-foreground">Get unlimited access to all courses and premium features</p>
                </div>
                <Button variant="premium" size="lg" className="gap-2">
                  <Crown className="w-4 h-4" />
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}