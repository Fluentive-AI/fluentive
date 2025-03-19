import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/layout/AppLogo';
import { ArrowRight, Check, BarChart3, MessageSquare, Clock, ArrowUpRight, Building2, Phone, PhoneOff, Menu, X, SquareArrowOutUpRight, Sparkles, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DemoAssistantTabs from '@/components/landing/DemoAssistantTabs';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      <header className="w-full py-0 px-4 sm:px-8 border-b flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-20 shadow-sm">
        <div>
          <AppLogo />
        </div>
        
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#features" className="text-gray-700 hover:text-primary transition-colors font-medium">Features</a>
          <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors font-medium">Benefits</a>
          <a href="#demo" className="text-gray-700 hover:text-primary transition-colors font-medium">Demo</a>
          <a href="#pricing" className="text-gray-700 hover:text-primary transition-colors font-medium">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            onClick={() => navigate('/login')}
            className="hidden sm:flex items-center text-xs md:text-sm px-2 py-1 h-8 md:h-9"
            variant="outline"
          >
            <User className="mr-1 h-3 w-3" />
            Login
          </Button>
          
          <a 
            href="https://calendly.com/homm-ai/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Button 
              size="sm"
              className="flex items-center text-xs md:text-sm px-2 py-1 h-8 md:h-9"
              variant="default"
            >
              <span>Book a Demo</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </a>

          <Button 
            size="sm"
            onClick={() => navigate('/login')}
            className="sm:hidden"
            variant="outline"
          >
            <User className="mr-1 h-3 w-3" />
            Login
          </Button>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-8 w-8 p-1"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-10 md:hidden pt-16 px-4">
          <nav className="flex flex-col items-center space-y-6 mt-10">
            <a 
              href="#features" 
              className="text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#benefits" 
              className="text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <a 
              href="#demo" 
              className="text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </a>
            <a 
              href="#pricing" 
              className="text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="https://calendly.com/homm-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button 
                className="flex items-center gap-2 text-lg"
                variant="default"
              >
                Book a Demo
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </nav>
        </div>
      )}
      
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-2">
                AI-Powered Property Management
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                AI Agents for SFR Property Managers
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600">
                We transform SFR property management with AI agents that automate operations, enhance tenant experiences, and drive better business outcomes.
              </p>
              
              <div className="flex flex-col gap-4 pt-6 items-center md:items-center">
                <a 
                  href="https://calendly.com/homm-ai/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    className="text-lg px-6 py-6 h-auto w-full sm:w-auto font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Try our Property Management Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-10 md:mt-0 md:pl-2">
              <div className="bg-white rounded-xl border shadow-2xl overflow-hidden transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                  alt="Property management dashboard preview" 
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="features" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
              Powerful Features
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Streamline Your Property Operations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform revolutionizes property management workflows and enhances tenant communication.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-200 group hover:bg-blue-50">
              <div className="bg-blue-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Analytics</h3>
              <p className="text-gray-600 mb-5">
                Real-time insights into property performance, occupancy rates, and financial metrics to make data-driven decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Customizable dashboards</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Predictive maintenance</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>ROI tracking</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-200 group hover:bg-indigo-50">
              <div className="bg-indigo-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-indigo-200 transition-colors">
                <MessageSquare className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Communication</h3>
              <p className="text-gray-600 mb-5">
                Intelligent virtual assistants handle routine tenant inquiries, maintenance requests, and lease renewals.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>24/7 tenant support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Multi-channel communication</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Automated follow-ups</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-200 group hover:bg-emerald-50">
              <div className="bg-emerald-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-emerald-200 transition-colors">
                <Clock className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Streamlined Operations</h3>
              <p className="text-gray-600 mb-5">
                Automate repetitive tasks and workflows to save time and reduce operational costs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Work order management</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Lease lifecycle automation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Vendor coordination</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-14">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="font-medium shadow-md hover:shadow-lg transition-all"
            >
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <section id="benefits" className="py-20 px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              Why Choose Homm
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transform Your Property Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help property managers save time, reduce costs, and improve tenant satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                alt="Property manager using Homm" 
                className="rounded-xl shadow-xl w-full transform hover:scale-[1.02] transition-all duration-300"
              />
            </div>
            
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">1</span>
                  Increased Efficiency
                </h3>
                <p className="text-gray-600 pl-14">
                  Reduce manual tasks with our AI-powered automation, allowing your team to focus on high-value activities.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">2</span>
                  Enhanced Tenant Experience
                </h3>
                <p className="text-gray-600 pl-14">
                  Provide 24/7 support and instant resolution to tenant inquiries, leading to higher satisfaction and retention rates.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">3</span>
                  Data-Driven Decisions
                </h3>
                <p className="text-gray-600 pl-14">
                  Make informed decisions with real-time analytics and predictive insights about your property portfolio.
                </p>
              </div>
              
              <div className="pt-4 pl-14">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="font-medium shadow-md hover:shadow-lg transition-all"
                >
                  See Demo Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="demo" className="py-12 sm:py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
              Interactive Demo
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Experience Our AI Assistants</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              See how our specialized AI assistants handle different property management scenarios, providing instant, professional responses.
            </p>
          </div>
          
          <DemoAssistantTabs onCallEnd={() => console.log('Call ended')} />
        </div>
      </section>
      
      <section id="pricing" className="py-20 px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
              Enterprise Solutions
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transform Your Property Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored AI solutions for property management companies of all sizes.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Card className="w-full max-w-xl border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-8">
                <CardTitle className="text-2xl md:text-3xl font-bold">Enterprise</CardTitle>
                <CardDescription className="text-blue-100 text-lg">Custom AI Solutions</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 px-8">
                <div className="text-center mb-6">
                  <span className="text-gray-600 text-lg font-medium">Tailored to your needs</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Full AI communication suite for leasing, property operations, and maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Custom AI agents trained on your processes and brand voice</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Dedicated integration support with your existing property management software</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>24/7 phone and chat support for your team</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Unlimited AI interactions with tenants and prospects</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Custom analytics dashboard for your portfolio</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-8 pb-8">
                <a 
                  href="https://calendly.com/homm-ai/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button 
                    className="w-full py-6 text-lg shadow-md hover:shadow-xl transition-all bg-gradient-to-r from-blue-500 to-indigo-600"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-gradient-to-br from-primary to-accent text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
            Transform Your Property Management Today
          </h2>
          
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto opacity-90">
            Join forward-thinking property managers who use AI to streamline operations, reduce costs, and enhance tenant satisfaction.
          </p>
          
          <ul className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12">
            <li className="flex items-center justify-center bg-white/10 px-4 sm:px-6 py-3 rounded-full backdrop-blur-sm text-sm sm:text-base">
              <Check className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-green-300 flex-shrink-0" />
              <span>Save tens of hours per week</span>
            </li>
            <li className="flex items-center justify-center bg-white/10 px-4 sm:px-6 py-3 rounded-full backdrop-blur-sm text-sm sm:text-base">
              <Check className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-green-300 flex-shrink-0" />
              <span>Reduce operational costs</span>
            </li>
            <li className="flex items-center justify-center bg-white/10 px-4 sm:px-6 py-3 rounded-full backdrop-blur-sm text-sm sm:text-base">
              <Check className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-green-300 flex-shrink-0" />
              <span>Improve tenant satisfaction</span>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-primary text-lg px-6 sm:px-10 py-6 sm:py-7 h-auto font-medium shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
              onClick={() => navigate('/login')}
            >
              Try Demo Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <footer className="py-12 sm:py-16 px-4 sm:px-8 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/logo/logo_white_horizontal_no_border.png" 
                  alt="Homm Logo" 
                  className="h-8" 
                />
              </div>
              <p className="mb-4 text-gray-400">AI-powered property management solution.</p>
              <p className="text-sm text-gray-500">© 2025 Homm. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:rozenblum.eytan@gmail.com" className="hover:text-white transition-colors flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" />rozenblum.eytan@gmail.com</a></li>
                <li><a href="tel:+1234567890" className="hover:text-white transition-colors flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" />+1 (646) 250-3816</a></li>
                <li><address className="not-italic">1E Loop Road, New York, NY 10044</address></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
