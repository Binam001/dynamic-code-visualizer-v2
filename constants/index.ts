import {
  Code,
  Bug,
  Zap,
  Eye,
  BookOpen,
  Monitor,
  Cpu,
  GitBranch,
  Play,
} from "lucide-react"

export const features = [
    {
      icon: Code,
      title: "Multi-Language Support",
      description:
        "Write and execute code in JavaScript, Python, C, C++, and Java with syntax highlighting and error detection.",
      image: "/images/feature-1.png",
    },
    {
      icon: Eye,
      title: "Visual Execution Timeline",
      description: "See your code execution flow with an interactive timeline showing each step of the process.",
      image: "/images/feature-2.png",
    },
    {
      icon: Bug,
      title: "Step-by-Step Debugging",
      description: "Debug your code line by line, set breakpoints, and watch variables change in real-time.",
      image: "/images/feature-3.png",
    },
    {
      icon: Zap,
      title: "Real-time Code Analysis",
      description: "Get instant feedback on time complexity, algorithm analysis, and performance insights.",
      image: "/images/feature-4.png",
    },
  ]

  export  const benefits = [
    {
      icon: BookOpen,
      title: "Learn Programming Concepts",
      description: "Understand how algorithms work by visualizing each step of execution.",
    },
    {
      icon: Monitor,
      title: "Debug More Effectively",
      description: "Find and fix bugs faster with our interactive debugging tools.",
    },
    {
      icon: Cpu,
      title: "Analyze Performance",
      description: "Get insights into time and space complexity of your algorithms.",
    },
    {
      icon: GitBranch,
      title: "Understand Control Flow",
      description: "See how loops, conditions, and function calls execute in real-time.",
    },
  ]

  export const howItWork = [
    {
      icon: Code,
      title: "1. Write Your Code",
      description: "Use our Monaco editor to write code in JavaScript, Python, C, C++, or Java. Choose from sample algorithms or write your own.",
    },
    {
      icon: Play,
      title: "2. Run or Debug",
      description: "Execute your code normally or enter debug mode to step through execution. Set breakpoints and control the flow.",
    },
    {
      icon: Eye,
      title: "3. Visualize & Learn",
      description: "Watch the execution timeline, see variable changes, and understand how your algorithm works step by step.",
    },

  ]