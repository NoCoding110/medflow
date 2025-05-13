import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-navy-50 py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Join thousands of healthcare providers and patients who are already using MedFlow to improve their healthcare journey.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/patient/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 