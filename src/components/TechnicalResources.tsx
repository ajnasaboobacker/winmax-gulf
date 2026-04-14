import React from 'react';
import Reveal from './Reveal';
import { FileText, Download, ShieldCheck, Cpu, Database } from 'lucide-react';

interface Resource {
  title: string;
  type: string;
  size: string;
  description: string;
  icon: React.ElementType;
}

interface TechnicalResourcesProps {
  resources: Resource[];
  title?: string;
  subtitle?: string;
}

const TechnicalResources = ({ 
  resources, 
  title = "Technical Whitepapers", 
  subtitle = "Engineering Resources" 
}: TechnicalResourcesProps) => {
  return (
    <section className="py-32 bg-[#080808] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-winmax-orange/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="mb-20">
            <span className="text-winmax-orange font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">{subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">{title}</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, i) => {
            const Icon = res.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-winmax-orange/30 transition-all duration-500 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-winmax-orange/10 group-hover:text-winmax-orange transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold tracking-tight">{res.title}</h3>
                       <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{res.type} / {res.size}</span>
                    </div>
                    <p className="text-sm text-white/40 font-light leading-relaxed mb-6">
                      {res.description}
                    </p>
                    
                    <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-winmax-orange hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download Technical PDF</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-20 p-10 rounded-[2.5rem] bg-winmax-orange/5 border border-winmax-orange/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-full bg-winmax-orange/20 flex items-center justify-center text-winmax-orange">
                  <ShieldCheck className="w-7 h-7" />
               </div>
               <div>
                  <h4 className="text-lg font-bold">Standard Compliance Document</h4>
                  <p className="text-sm text-white/50 font-light">Direct access to manufacturer warranty, ISO certifications, and safety data sheets.</p>
               </div>
            </div>
            <button className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-winmax-orange hover:text-white transition-all duration-300">
               Access Vault
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TechnicalResources;
