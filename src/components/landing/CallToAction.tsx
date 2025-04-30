
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="border-t bg-navy-700 py-16 text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight text-beige-50 sm:text-4xl">
          Ready to Transform Your Practice?
        </h2>
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-orange-400"></div>
        <p className="mx-auto mt-6 max-w-[42rem] text-lg font-light text-beige-100">
          Join the growing community of healthcare providers enhancing patient care with MedFlow Connect.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="outline" className="btn-hover-glow bg-lightblue-500 text-white hover:bg-lightblue-600 hover:text-white border-lightblue-400" asChild>
            <Link to="/login">Log In Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="btn-hover-glow bg-orange-400 text-navy-800 hover:bg-orange-500 hover:text-navy-900 border-orange-300" asChild>
            <Link to="/patients/new">Register as Patient</Link>
          </Button>
          <Button size="lg" variant="ghost" className="text-beige-100 hover:bg-white/10 hover:text-beige-50 flex items-center gap-2" asChild>
            <a href="#features">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <p className="mt-12 text-sm text-beige-200">
          For demo purposes, you can use the following credentials:
          <br />
          <strong className="text-orange-300">Doctor:</strong> sarah@medflow.com / password123
          <br />
          <strong className="text-orange-300">Admin:</strong> admin@medflow.com / admin123
          <br />
          <strong className="text-orange-300">Patient:</strong> patient@medflow.com / patient123
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
