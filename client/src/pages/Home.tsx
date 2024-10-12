import { useEffect, useState, useRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

type AnimatedElementProps = {
  children: ReactNode;
  className?: string;
};

const AnimatedElement = ({
  children,
  className = "",
}: AnimatedElementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 bg-opacity-50 p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-blue-400 text-2xl font-bold transition-all duration-300 hover:scale-105"
          >
            ChatLink
          </Link>
          <div className="space-x-4">
            <Button
              variant="secondary"
              className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              Sign up
            </Button>
            <Button
              variant="outline"
              className="text-gray-500 border-gray-300  transition-all duration-300 hover:scale-105"
            >
              Sign in
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col justify-center items-center">
        <section className="text-center mb-8 max-w-4xl">
          <AnimatedElement>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-400 mb-6">
              Connect Instantly with ChatLink
            </h1>
          </AnimatedElement>
          <AnimatedElement className="delay-300">
            <p className="text-xl text-gray-300 mb-8">
              Experience seamless communication with our lightning-fast, secure,
              and feature-rich chat application.
            </p>
          </AnimatedElement>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center max-w-4xl w-full">
          <AnimatedElement className="bg-gray-800 bg-opacity-50 rounded-2xl p-8 shadow-xl">
            <div className="w-full h-64 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-inner flex items-center justify-center">
              <MessageCircle size={100} className="text-white" />
            </div>
          </AnimatedElement>
          <div className="space-y-6">
            <AnimatedElement>
              <h2 className="text-3xl font-bold text-blue-400">
                Why Choose ChatLink?
              </h2>
            </AnimatedElement>
            <ul className="space-y-4">
              {[
                { icon: Zap, text: "Lightning-fast messaging" },
                { icon: Shield, text: "Stay connected with confidence" },
                { icon: Smartphone, text: "Access ChatLink anytime, anywhere" },
              ].map((item, index) => (
                <AnimatedElement
                  key={index}
                  className={`delay-${(index + 1) * 200}`}
                >
                  <li className="flex items-center space-x-3 text-gray-300">
                    <item.icon className="flex-shrink-0 w-6 h-6 text-blue-400" />
                    <span>{item.text}</span>
                  </li>
                </AnimatedElement>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 text-center max-w-4xl">
          <AnimatedElement>
            <h2 className="text-3xl font-bold text-blue-400 mb-8">
              Ready to get started?
            </h2>
          </AnimatedElement>
          <AnimatedElement className="delay-300">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-3 transition-all duration-300 hover:scale-105">
              Join ChatLink Today
            </Button>
          </AnimatedElement>
        </section>
      </main>

      <footer className="mt-auto py-8 bg-gray-800 bg-opacity-50">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 ChatLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
