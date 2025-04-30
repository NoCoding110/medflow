
import React from "react";
import { Shield, Lock, FileCheck, Server, UserCheck, History, Globe, Eye, AlertTriangle, Database, FileSearch, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Compliance = () => {
  const complianceFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "HIPAA Compliant",
      description: "Fully compliant with all HIPAA regulations and guidelines for protected health information (PHI), with regular compliance audits.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "GDPR Ready",
      description: "Built with privacy by design principles to meet European GDPR requirements for data processing and patient rights.",
    },
    {
      icon: <Lock className="h-8 w-8 text-purple-500" />,
      title: "Enterprise Security",
      description: "AES-256 encryption at rest and in transit, with regular security audits, penetration testing, and SOC 2 Type II certification.",
    },
    {
      icon: <FileCheck className="h-8 w-8 text-emerald-500" />,
      title: "Comprehensive Audit Trails",
      description: "Immutable logging of all system access and changes, with detailed user activity tracking for complete accountability.",
    },
    {
      icon: <Server className="h-8 w-8 text-blue-500" />,
      title: "Secure Cloud Infrastructure",
      description: "Hosted on HIPAA-compliant cloud infrastructure with 99.9% uptime guarantee and redundant disaster recovery systems.",
    },
    {
      icon: <UserCheck className="h-8 w-8 text-amber-500" />,
      title: "Granular Access Controls",
      description: "Role-based access with custom permission sets and contextual access restrictions based on user role and relationship to data.",
    },
    {
      icon: <Eye className="h-8 w-8 text-cyan-500" />,
      title: "Privacy-Preserving Analytics",
      description: "De-identification and anonymization techniques for research data that exceeds HIPAA Safe Harbor requirements.",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
      title: "Security Incident Response",
      description: "24/7 security monitoring with automated threat detection and comprehensive incident response procedures.",
    },
    {
      icon: <History className="h-8 w-8 text-rose-500" />,
      title: "Advanced Backup & Recovery",
      description: "Automated point-in-time backups with rapid recovery capabilities and regular recovery testing protocols.",
    },
    {
      icon: <Database className="h-8 w-8 text-indigo-500" />,
      title: "Data Sovereignty",
      description: "Regional data storage options to meet local regulatory requirements for healthcare data residency.",
    },
    {
      icon: <FileSearch className="h-8 w-8 text-teal-500" />,
      title: "Compliance Management",
      description: "Built-in tools for ongoing compliance monitoring, documentation, and reporting to simplify regulatory audits.",
    },
    {
      icon: <Cloud className="h-8 w-8 text-pink-500" />,
      title: "Secure API Gateway",
      description: "Controlled API access with authentication, authorization, and encryption for third-party integrations.",
    },
  ];

  return (
    <section id="compliance" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-[58rem] mx-auto text-center space-y-6 mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-primary via-purple-500 to-emerald-500 bg-clip-text text-transparent">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-xl text-muted-foreground">
            Your data security is our top priority. MedFlow Connect exceeds industry standards for healthcare data protection,
            with comprehensive security measures designed for even the most sensitive healthcare information.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">HIPAA</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full">
              <Globe className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">GDPR</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full">
              <FileCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">SOC 2</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full">
              <Lock className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {complianceFeatures.map((feature, index) => (
            <Card 
              key={feature.title}
              className="transition-all hover:scale-105 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-muted w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">Ready to see our security in action?</h3>
              <p className="text-muted-foreground">Schedule a demo with our security experts to learn more about our enterprise-grade protection.</p>
            </div>
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Book Security Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compliance;
