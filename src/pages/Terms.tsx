import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/Reveal";

const Terms = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Service | Winmax Gulf L.L.C." 
        description="Terms and Conditions for using Winmax Gulf services and website. Governed by the laws of the United Arab Emirates."
      />
      <div className="bg-[#050505] text-white min-h-screen">
        <Header />
        
        <main className="container mx-auto px-6 py-32 max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12">
              Terms & <span className="text-white/30">Conditions.</span>
            </h1>
          </Reveal>

          <article className="prose prose-invert max-w-none text-white/70 font-light leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Professional Services</h2>
              <p>
                Winmax Gulf L.L.C. provides specialist engineering services including but not limited to PDLC Smart Glass, LED Displays, and Smart Automation. All technical specifications provided on the website are for informational purposes and may be subject to site-specific verification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p>
                The website and its original content, features, and functionality are owned by Winmax Gulf L.L.C. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
              <p>
                Winmax Gulf L.L.C. and its components are offered for informational purposes; this site shall not be responsible or liable for the accuracy, usefulness or availability of any information transmitted or made available via the site, and shall not be responsible or liable for any error or omissions in that information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Dubai and the federal laws of the United Arab Emirates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>

            <section className="pt-12 border-t border-white/10">
              <p className="text-sm italic">Last updated: April 13, 2026</p>
              <p className="text-sm">Winmax Gulf L.L.C. | NBQ Building, Dubai, UAE</p>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Terms;
