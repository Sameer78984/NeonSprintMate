export const LandingFooter = () => {
    return (
      <footer className="border-t border-base-content/5 bg-base-200/50 backdrop-blur-sm pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <h2 className="text-2xl font-black italic tracking-tighter text-base-content">
                NEONSPRINTMATE
              </h2>
              <p className="text-base-content/60 text-sm max-w-sm leading-relaxed">
                The next-generation project management interface for high-velocity teams. 
                Built for speed, designed for clarity.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-base-content uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm text-base-content/60 font-mono">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>
  
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-base-content uppercase tracking-widest">Connect</h4>
              <ul className="space-y-4 text-sm text-base-content/60 font-mono">
                <li><a href="#" className="hover:text-secondary transition-colors">Twitter</a></li>
                <li><a href="https://github.com/Sameer78984" className="hover:text-secondary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
  
          <div className="pt-8 border-t border-base-content/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-base-content/40 uppercase tracking-widest">
              © 2026 NeonSprintMate Inc.
            </p>
            <div className="flex gap-6 text-[10px] text-base-content/40 uppercase tracking-widest">
              <a href="#" className="hover:text-base-content transition-colors">Privacy</a>
              <a href="#" className="hover:text-base-content transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
