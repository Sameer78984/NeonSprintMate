import { useEffect, useRef } from "react";
import { useThemeStore } from "../stores/useThemeStore";

export const GlobalBackground = () => {
  const { 
    bgStyle, 
    bgAnimationSpeed, 
    enableParticles, 
    primaryColor,
    rainAmount,
    rainSpeed,
    snowAmount,

    snowSpeed,
    mode 
  } = useThemeStore();
  const canvasRef = useRef(null);

  // Particles System
  useEffect(() => {
    if (!enableParticles) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    
    // Resize
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * bgAnimationSpeed * 0.5;
            this.speedY = (Math.random() - 0.5) * bgAnimationSpeed * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = primaryColor;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particlesArray = Array.from({ length: 50 }, () => new Particle());

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, [enableParticles, bgAnimationSpeed, primaryColor]);

  // Styles CSS
  const getBackgroundLayer = () => {
    switch(bgStyle) {
        case "grid":
            return (
                <div className={`absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] animate-grid-move ${mode === 'light' ? 'text-black' : 'text-white'}`} 
                     style={{ animationDuration: `${40 / bgAnimationSpeed}s` }} />
            );
        case "aurora":
             return (
                 <div className="absolute inset-0 overflow-hidden">
                     <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-cyan/20 animate-pulse-slow" 
                          style={{ animationDuration: `${10 / bgAnimationSpeed}s` }} />
                     <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-neon-pink/10 to-transparent mix-blend-screen" />
                 </div>
             );
        case "nebula":
             return (
                 <div className="absolute inset-0 overflow-hidden">
                     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-float"
                           style={{ animationDuration: `${15 / bgAnimationSpeed}s` }} />
                     <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[120px] animate-float" 
                           style={{ animationDuration: `${20 / bgAnimationSpeed}s`, animationDelay: '2s' }} />
                 </div>
             );
        case "cyber_rain":
             return (
                 <div className="absolute inset-0 overflow-hidden opacity-30">
                     {[...Array(Number(rainAmount))].map((_, i) => (
                         <div 
                             key={i}
                             className="absolute top-[-100px] w-[1px] h-[100px] bg-gradient-to-b from-transparent to-neon-cyan"
                             style={{
                                 left: `${Math.random() * 100}%`,
                                 animation: `fall ${Math.random() * 2 + (5 / rainSpeed)}s linear infinite`,
                                 animationDelay: `${Math.random() * 5}s`
                             }}
                         />
                     ))}
                     <style>{`
                        @keyframes fall {
                            to { transform: translateY(110vh); }
                        }
                     `}</style>
                 </div>
             );
        case "snow":
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(Number(snowAmount))].map((_, i) => {
                        const size = Math.random() * 3 + 2;
                        const left = Math.random() * 100;
                        const duration = Math.random() * 5 + (10 / snowSpeed);
                        const swayDuration = Math.random() * 3 + 2;
                        const delay = Math.random() * 5;
                        
                        return (
                            <div
                                key={i}
                                className="absolute rounded-full opacity-80"
                                style={{
                                    backgroundColor: mode === 'light' ? '#94a3b8' : 'white', // Slate-400 for light mode
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    left: `${left}%`,
                                    top: `-10px`,
                                    animation: `snowFall ${duration}s linear infinite, snowSway ${swayDuration}s ease-in-out infinite alternate`,
                                    animationDelay: `${delay}s`
                                }}
                            />
                        );
                    })}
                    <style>{`
                        @keyframes snowFall {
                            to { transform: translateY(110vh); }
                        }
                        @keyframes snowSway {
                            from { transform: translateX(0); }
                            to { transform: translateX(20px); }
                        }
                    `}</style>
                </div>
            );
        case "cherry_blossoms":
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => {
                        const left = Math.random() * 100;
                        const fallDuration = Math.random() * 8 + (15 / bgAnimationSpeed);
                        const rotateDuration = Math.random() * 4 + 2;
                        const delay = Math.random() * 5;
                        
                        return (
                            <div
                                key={i}
                                className="absolute"
                                style={{
                                    left: `${left}%`,
                                    top: `-20px`,
                                    animation: `cherryFall ${fallDuration}s linear infinite, cherryRotate ${rotateDuration}s linear infinite`,
                                    animationDelay: `${delay}s`
                                }}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" className="opacity-90">
                                    <path d="M6 0 L7 4 L9 2 L7 6 L12 6 L7 7 L9 10 L6 7 L3 10 L5 7 L0 6 L5 6 L3 2 L5 4 Z" fill={mode === 'light' ? '#be185d' : '#f472b6'} />
                                </svg>
                            </div>
                        );
                    })}
                    <style>{`
                        @keyframes cherryFall {
                            to { transform: translateY(110vh); }
                        }
                        @keyframes cherryRotate {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            );

        case "fireflies":
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-[2px]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `firefly ${Math.random() * 3 + (5 / bgAnimationSpeed)}s ease-in-out infinite alternate, glow ${Math.random() * 2 + 1}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        />
                    ))}
                    <style>{`
                        @keyframes firefly {
                            0% { transform: translate(0, 0); }
                            100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
                        }
                        @keyframes glow {
                            0%, 100% { opacity: 0.2; box-shadow: 0 0 3px #fef08a; }
                            50% { opacity: 0.8; box-shadow: 0 0 15px #fef08a; }
                        }
                    `}</style>
                </div>
            );
        case "matrix":
            return (
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-[-100px] w-[2px] font-mono text-neon-green text-xs whitespace-nowrap"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animation: `matrixFall ${Math.random() * 3 + (8 / bgAnimationSpeed)}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        >
                            {Array.from({ length: 20 }, () => 
                                String.fromCharCode(0x30A0 + Math.random() * 96)
                            ).join('')}
                        </div>
                    ))}
                    <style>{`
                        @keyframes matrixFall {
                            to { transform: translateY(110vh); }
                        }
                    `}</style>
                </div>
            );
        default: return null;
    }
  };

  return (
    <div className="fixed inset-0 -z-50 bg-bg-primary overflow-hidden pointer-events-none">
        {/* Base Layer */}
        {getBackgroundLayer()}
        
        {/* Particles Layer */}
        {enableParticles && <canvas ref={canvasRef} className="absolute inset-0" />}
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
    </div>
  );
};
