import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/layout/AppLogo';
import { ArrowRight, Check, BarChart3, MessageSquare, Clock, ArrowUpRight, Building2, Phone, PhoneOff, Menu, X, SquareArrowOutUpRight, Mail } from 'lucide-react';
import { FaPhone } from "react-icons/fa6";
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [phoneState, setPhoneState] = useState('contact');
  const [callTime, setCallTime] = useState(0);
  const [showClock, setShowClock] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  
  // Preload all phone screen images on component mount
  useEffect(() => {
    const imageUrls = [
      '/phone_screens/contact_screen.png',
      '/phone_screens/calling_screen.png',
      '/phone_screens/in_call_screen.png'
    ];
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    const preloadImages = () => {
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${url}`);
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
      });
    };
    
    preloadImages();
    
    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);
  
  const startCallSimulation = () => {
    // First transition to calling screen
    setPhoneState('calling');
    
    // After 2 seconds, transition to in-call and start the clock
    setTimeout(() => {
      setPhoneState('in-call');
      
      // Small delay to ensure the in-call screen is rendered before showing the clock
      setTimeout(() => {
        setShowClock(true);
        
        // Start the call timer
        timerRef.current = setInterval(() => {
          setCallTime(prev => prev + 1);
        }, 1000);
      }, 100);
      
      // Handle desktop video playback
      if (videoRef.current && window.innerWidth >= 768) {
        videoRef.current.play().catch(error => {
          console.error("Video play error:", error);
        });
      }
      
      // Handle mobile audio playback
      if (audioRef.current && window.innerWidth < 768) {
        // Create a user interaction context for mobile browsers
        const playPromise = audioRef.current.play();
        
        // Handle potential play() promise rejection (common on mobile)
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback error (likely autoplay restriction):", error);
            // Try playing again with muted setting which is more permissive on mobile
            audioRef.current.muted = true;
            audioRef.current.play().catch(err => {
              console.error("Even muted audio failed to play:", err);
            });
          });
        }
      }
    }, 2000);
  };
  
  const endCallSimulation = () => {
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset the call state
    setPhoneState('contact');
    setCallTime(0);
    setShowClock(false);
    
    // Pause and reset the video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    // Pause and reset the audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const renderPhoneScreen = () => {
    // Common transition class for smooth fade between images
    const transitionClass = "w-full rounded-lg transition-opacity duration-300";
    
    switch (phoneState) {
      case 'contact':
        return <img src="/phone_screens/contact_screen.png" alt="Contact screen" className={transitionClass} />;
      case 'calling':
        return <img src="/phone_screens/calling_screen.png" alt="Calling screen" className={transitionClass} />;
      case 'in-call':
        return (
          <div className="relative">
            <img 
              src="/phone_screens/in_call_screen.png" 
              alt="In-call screen" 
              className={transitionClass} 
            />
            {showClock && (
              <div 
                className="absolute top-20 sm:top-20 md:top-20 left-1/2 transform -translate-x-1/2 text-white text-base sm:text-xl md:text-lg font-semibold transition-opacity duration-300"
              >
                {formatCallTime(callTime)}
              </div>
            )}
          </div>
        );
      default:
        return <img src="/phone_screens/contact_screen.png" alt="Contact screen" className={transitionClass} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
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
            className="flex items-center text-xs md:text-sm px-2 py-1 h-8 md:h-9"
            variant="default"
          >
            <span className="hidden sm:inline">Try Demo</span>
            <span className="sm:hidden">Try Demo</span>
            <ArrowRight className="ml-1 h-3 w-3 hidden sm:block" />
            <SquareArrowOutUpRight className="ml-1 h-3 w-3 sm:hidden" />
          </Button>

          {/* Mobile menu button */}
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

      {/* Mobile menu overlay */}
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
          </nav>
        </div>
      )}
      
      {/* Hero Section */}
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
              <p className="mt-2 text-lg sm:text-xl md:text-2xl text-gray-600 font-bold">
                Demo For Brandywine Homes USA and Lafayette RE
              </p>
              
              <p className="text-lg sm:text-xl text-gray-600">
                We transform SFR property management with AI agents that automate operations, enhance tenant experiences, and drive better business outcomes.
              </p>
              
              <div className="flex flex-col gap-4 pt-6 items-center md:items-start">
                <Button 
                  size="lg" 
                  className="text-lg px-6 py-6 h-auto w-full sm:w-auto font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate('/login')}
                >
                  Property Manager Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
      
      {/* Key Features Section */}
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
            {/* Feature 1 */}
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
            
            {/* Feature 2 */}
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
            
            {/* Feature 3 */}
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
      
      {/* Benefits Section */}
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
      
      {/* Tool Preview Section */}
      <section id="demo" className="py-12 sm:py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
              Interactive Demo
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">See Our AI Call Assistant in Action</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience how our AI handles property inquiries, providing instant, professional responses to potential tenants.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex justify-center items-center">
              {phoneState === 'contact' ? (
                <button 
                  onClick={startCallSimulation}
                  className="flex items-center gap-3 group"
                  disabled={!imagesLoaded}
                >
                  <div className={`${imagesLoaded ? 'w-16 h-16 rounded-full bg-green-500 hover:bg-green-600' : 'w-16 h-16 rounded-full bg-gray-400'} flex items-center justify-center shadow-lg transition-all`}>
                    <Phone className="h-8 w-8 text-white" stroke="white" />
                  </div>
                  <span className="text-xl font-medium text-gray-800">
                    {imagesLoaded ? 'Call Homm' : 'Loading...'}
                  </span>
                </button>
              ) : (
                <button 
                  onClick={endCallSimulation}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg transition-all hover:bg-red-600">
                    <PhoneOff className="h-8 w-8 text-white" stroke="white" />
                  </div>
                  <span className="text-xl font-medium text-gray-800">End Call</span>
                </button>
              )}
            </div>
            
            <Card className="bg-white shadow-lg border rounded-2xl overflow-hidden">
              <CardContent className="p-6 md:p-10">
                {/* Mobile layout (hidden on md and up) */}
                <div className="flex flex-col items-center md:hidden">
                  <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto relative">
                    {renderPhoneScreen()}
                    
                    {/* Transparent button overlay */}
                    <button 
                      onClick={phoneState === 'contact' ? startCallSimulation : endCallSimulation}
                      className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
                      aria-label={phoneState === 'contact' ? "Call Homm" : "End Call"}
                      disabled={!imagesLoaded && phoneState === 'contact'}
                    />
                    
                    {/* Hidden audio element for mobile - improved for mobile */}
                    <audio 
                      ref={audioRef}
                      src="/phone_calls/leasing/lead.m4a" 
                      preload="auto"
                      playsInline
                      muted={false}
                      loop
                    />
                  </div>
                </div>
                
                {/* Desktop layout (hidden on small screens, visible on md and up) */}
                <div className="hidden md:flex flex-row gap-8 items-center">
                  <div className="md:w-[45%] flex justify-center items-center">
                    <div className="max-w-[280px] mx-auto">
                      {renderPhoneScreen()}
                    </div>
                  </div>
                  
                  <div className="md:w-[55%] flex items-center">
                    <video 
                      ref={videoRef}
                      src="/phone_calls/leasing/lead.mp4" 
                      className="w-full rounded-lg" 
                      preload="auto"
                      controls={false}
                    />
                  </div>
                </div>
                
                {/* Hidden images for preloading */}
                <div className="hidden">
                  <img src="/phone_screens/contact_screen.png" alt="Preload" />
                  <img src="/phone_screens/calling_screen.png" alt="Preload" />
                  <img src="/phone_screens/in_call_screen.png" alt="Preload" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section (NEW) */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
              Flexible Pricing
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Solutions Tailored to Your Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our pricing is customized to fit the unique needs and scale of your property management business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="rounded-xl shadow-lg overflow-hidden border-0 transform transition-transform duration-300 hover:scale-105 bg-white">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-4">
                <h3 className="text-xl font-bold text-blue-800">Starter</h3>
                <p className="text-blue-700 mt-1">For small portfolios</p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 50 properties</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>AI tenant communication</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Basic analytics dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Maintenance request handling</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md flex items-center justify-center"
                      variant="default"
                      onClick={() => window.location.href = 'mailto:rozenblum.eytan@gmail.com?subject=Homm%20Pricing%20-%20Starter%20Plan%20Inquiry'}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Talk to Sales
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Growth Plan */}
            <Card className="rounded-xl shadow-xl overflow-hidden border-0 transform transition-transform duration-300 hover:scale-105 relative bg-white">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                Popular
              </div>
              <div className="bg-gradient-to-r from-primary/80 to-accent/80 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Growth</h3>
                <p className="text-white/90 mt-1">For growing businesses</p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 200 properties</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced AI communication suite</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Full analytics & reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Predictive maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Tenant portal integration</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium shadow-md flex items-center justify-center"
                      variant="default"
                      onClick={() => window.location.href = 'mailto:rozenblum.eytan@gmail.com?subject=Homm%20Pricing%20-%20Growth%20Plan%20Inquiry'}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Talk to Sales
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="rounded-xl shadow-lg overflow-hidden border-0 transform transition-transform duration-300 hover:scale-105 bg-white">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-4">
                <h3 className="text-xl font-bold text-indigo-800">Enterprise</h3>
                <p className="text-indigo-700 mt-1">For large portfolios</p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited properties</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Custom AI models & training</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced business intelligence</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Full API integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dedicated support team</span>
                    </li>
                  </ul>
                  
                  <
