"use client"

import { useState, useEffect } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  ArrowRight,
  Code,
  Play,
  Eye,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { benefits, features, howItWork } from "@/constants"

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  useEffect(() => {
  let isGapAnimationCompleted = false;
  let isFlipAnimationCompleted = false;

  function initAnimation () {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: ".img-container",
        start: 'top 20%',
        end: 'bottom center',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= 0.1) {
            const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
            gsap.set('.img-container', {width: `${widthPercentage}%`});
          } else {
            gsap.set('.img-container', {width: '60%'})
          }

          if (progress >= 0.25 && !isGapAnimationCompleted) {
            gsap.to('.img-container', {
              gap: '20px',
              duration: 0.5,
              ease: 'power3.out',
            });

            gsap.to(['#img1', '#img2', '#img3'], {
              borderRadius: '20px',
              duration: 0.5,
              ease: 'power3.out',
            });

            isFlipAnimationCompleted = true;
          }

          if (progress >= 0.7 && isFlipAnimationCompleted) {
            gsap.to('.img', {
              rotationY: 180,
              duration: 0.75,
              ease: 'power3.inOut',
            });

            gsap.to(['#img1', '#img3'], {
              y: 30,
              rotationZ: (i) => [-15, 15][i],
              duration: 0.75,
              ease: 'power3.inOut',
            })

            isFlipAnimationCompleted = true;
          } else if (progress < 0.7 && isFlipAnimationCompleted) {
            gsap.to('.img-container', {
              gap: '0px',
              duration: 0.5,
              ease: 'power3.out',
            });
            gsap.to('#img1', {
              borderRadius: '20px 0 0 20px',
              duration: 0.5,
              ease: 'power3.out',
            });
            gsap.to('#img2', {
              borderRadius: '0px',
              duration: 0.5,
              ease: 'power3.out',
            });
            gsap.to('#img3', {
              borderRadius: '0 20px 20px 0',
              duration: 0.5,
              ease: 'power3.out',
            });

            gsap.to('.img', {
              rotationY: 0,
              duration: 0.75,
              ease: 'power3.inOut',
              stagger: -0.1,
            });

             gsap.to(['#img1', '#img3'], {
              y: 0,
              rotationZ: 0,
              duration: 0.75,
              ease: 'power3.inOut',
            });

            isFlipAnimationCompleted = false;
          }
        }

      })

    })

  }

  initAnimation();
   })


  const [currentFeature, setCurrentFeature] = useState(0)

  const sampleCodes = [
    "Fibonacci Sequence",
    "Bubble Sort Algorithm",
    "Binary Search",
    "Factorial Calculation",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Logo and Title */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Dynamic Code Visualizer
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Visualize, debug, and understand your code execution step by step. Perfect for learning algorithms and
                debugging complex logic.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/editor">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  To the Code Editor
                </Button>
              </Link>
              <Link href="/new-visualizer">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  To the New Visualizer
                </Button>
              </Link>
            </div>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                No installation required • Works in your browser
              </Badge>

            {/* Hero Image */}
            <div className="img-container relative w-[75%] flex mx-auto" style={{perspective: '1000px', transform: 'translateY(40px)'}}>
              <div className="img relative flex-1 aspect-[5/7]" style={{transformStyle: 'preserve-3d', transformOrigin: 'top', borderRadius: '20px 0 0 20px'}} id="img1">
                <div className="front-img absolute w-full h-full" style={{backfaceVisibility: 'hidden', borderRadius: 'inherit', overflow: 'hidden'}}>
                  <img className="w-full h-full object-cover" src="/images/hero-img-p1.jpg" alt="hero-img-p1" />
                </div>
                <div className="back-img absolute w-full h-full flex justify-center items-center bg-[#203755]" style={{backfaceVisibility: 'hidden', borderRadius: 'inherit', overflow: 'hidden', transform: 'rotateY(180deg)'}}>
                  <img src={features[1]?.image} alt={features[1]?.title} className="w-full h-full object-contain" />
                </div>
              </div>
              
              <div className="img relative flex-1 aspect-[5/7]" style={{transformStyle: 'preserve-3d', transformOrigin: 'top'}} id="img2">
                <div className="front-img absolute w-full h-full" style={{backfaceVisibility: 'hidden', borderRadius: 'inherit', overflow: 'hidden'}}>
                  <img className="w-full h-full object-cover" src="/images/hero-img-p2.jpg" alt="hero-img-p2" />
                </div>
                <div className="back-img absolute w-full h-full flex justify-center items-center bg-[#203755]" style={{backfaceVisibility: 'hidden', borderRadius: 'inherit', overflow: 'hidden', transform: 'rotateY(180deg)'}}>
                  <img src={features[2]?.image} alt={features[2]?.title} className="w-full h-full object-contain" />
                </div>
              </div>
              
              <div className="img relative flex-1 aspect-[5/7]" style={{transformStyle: 'preserve-3d', transformOrigin: 'top', borderRadius: '0 20px 20px 0'}} id="img3">
                <div className="front-img absolute w-full h-full" style={{backfaceVisibility: 'hidden', borderRadius: 'inherit', overflow: 'hidden'}}>
                  <img className="w-full h-full object-cover" src="/images/hero-img-p3.jpg" alt="hero-img-p3" />
                </div>
                <div className="back-img absolute w-full h-full flex justify-center items-center bg-[#203755]" style={{backfaceVisibility: 'hidden', borderRadius: 'inherit', overflow: 'hidden', transform: 'rotateY(180deg)'}}>
                  <img src={features[3]?.image} alt={features[3]?.title} className="w-full h-full object-contain" />
                </div>
              </div>

              
              
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to visualize, understand, and debug your code effectively.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    index === currentFeature ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                       <feature.icon size={64} className={`p-3 rounded-lg ${
                          index === currentFeature ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`} />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="relative">
              <img
                src={features[currentFeature].image || "/placeholder.svg"}
                alt={features[currentFeature].title}
                className="rounded-lg shadow-xl border w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps and start visualizing your code immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWork.map((item) => (
              <div key={item.title} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
           
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Dynamic Code Visualizer?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Perfect for students, educators, and developers who want to understand code execution better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <benefit.icon className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto" />
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Algorithms Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pre-loaded Sample Algorithms</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start learning immediately with our collection of classic algorithms and data structures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleCodes.map((algorithm, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">{algorithm}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/editor">
              <Button variant="outline" size="lg" className="group">
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Try All Samples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Visualize Your Code?</h2>
          <p className="text-xl text-muted-foreground">
            Start debugging and understanding your algorithms like never before. No installation required - everything
            runs in your browser.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/editor">
              <Button size="lg" className="text-lg px-8 py-6 group">
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Launch Code Editor
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Get started in under 30 seconds</span>
            </div>
          </div>
            <p className="text-muted-foreground text-center">
              Built with Next.js, Monaco Editor, and modern web technologies.
            </p>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Dynamic Code Visualizer</span>
            </div>
            <p className="text-muted-foreground text-center">
              Built with Next.js, Monaco Editor, and modern web technologies.
            </p>
          </div>
        </div>
      </footer> */}

    </div>
  )
}
