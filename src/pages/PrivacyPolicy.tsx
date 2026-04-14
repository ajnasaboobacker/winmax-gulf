import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy | Winmax Gulf L.L.C." 
        description="Winmax Gulf Privacy Policy. We are committed to protecting your personal data in compliance with UAE Data Protection Laws."
      />
      <div className="bg-[#050505] text-white min-h-screen">
        <Header />
        
        <main className="container mx-auto px-6 py-32 max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12">
              Privacy <span className="text-white/30">Policy.</span>
            </h1>
          </Reveal>

          <article className="prose prose-invert max-w-none text-white/70 font-light leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Winmax Gulf L.L.C. ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation in the United Arab Emirates.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. For technical security inquiries, please refer to our <Link to="/.well-known/security.txt" className="text-winmax-orange hover:underline">security.txt</Link> file.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your personal data.
              </p>
            </section>

            <section className="pt-12 border-t border-white/10">
              <p className="text-sm italic">Last updated: April 13, 2026</p>
              <p className="text-sm">Contact: info@winmaxgulf.com</p>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
