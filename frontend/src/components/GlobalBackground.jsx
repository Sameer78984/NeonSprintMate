import { useEffect, useRef } from "react";
import { useThemeStore } from "../stores/useThemeStore";

export const GlobalBackground = () => {
  const { 
    bgScene,
    bgEffect,
    bgAnimationSpeed, 
    enableParticles, 
    primaryColor,
    rainAmount,
    rainSpeed,
    rainCollision,
    rainThickness, // New prop
    snowAmount,
    snowSpeed,
    mode,
    performanceMode // New prop
  } = useThemeStore();
  const canvasRef = useRef(null);

  // --- CANVAS SYSTEM (Effects) ---
  useEffect(() => {
    // Determine if we need canvas
    if (!['particles', 'rain_real'].includes(bgEffect) && !enableParticles) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // PERFORMANCE TUNING
    let particleCount = 60;
    let rainMultiplier = 1;
    let thicknessMultiplier = 1;
    
    if (performanceMode === 'low') {
        particleCount = 20; 
        rainMultiplier = 0.3; // 30% drops
        thicknessMultiplier = 1.5; // Thicker to compensate visibility
    } else if (performanceMode === 'balanced') {
        particleCount = 40;
        rainMultiplier = 0.7;
        thicknessMultiplier = 1.0;
    }

    // 1. Particle Class
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

    // 2. Real Rain Class (Enhanced Visibility)
    class RainDrop {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; 
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = (Math.random() * 0.5 + 0.5) * thicknessMultiplier; // Performance Adjusted
            this.velocity = Math.random() * 5 + 15; 
            this.length = Math.random() * 20 + 20; 
            this.opacity = Math.random() * 0.4 + 0.3; 
            this.splashed = false;
        }
        update() {
             this.y += this.velocity * (rainSpeed || 1);
             if (this.y > canvas.height) {
                 if (rainCollision && performanceMode !== 'low' && !this.splashed) { // No splash in low mode
                     this.splashed = true;
                     for (let i = 0; i < 4; i++) splashes.push(new Splash(this.x, canvas.height));
                 }
                 this.reset();
             }
        }
        draw() {
            ctx.strokeStyle = mode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)';
            ctx.lineWidth = this.size * (rainThickness || 1); 
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    // 3. Splash Class
    class Splash {
         constructor(x, y) {
             this.x = x;
             this.y = y;
             this.vx = (Math.random() - 0.5) * 6;
             this.vy = -(Math.random() * 4 + 2);
             this.life = 1.0;
         }
         update() {
             this.x += this.vx;
             this.y += this.vy;
             this.vy += 0.3; 
             this.life -= 0.05;
         }
         draw() {
             ctx.fillStyle = mode === 'light' ? `rgba(50,50,50,${this.life})` : `rgba(200,200,255,${this.life})`;
             ctx.beginPath();
             ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
             ctx.fill();
         }
    }

    // Init Arrays
    const particlesArray = (bgEffect === 'particles' || enableParticles) 
        ? Array.from({ length: particleCount }, () => new Particle()) 
        : [];
    
    const rainDrops = [];
    const splashes = [];
    if (bgEffect === 'rain_real') {
         const dropCount = Math.min(rainAmount * 5 * rainMultiplier, 400); // Scaled by Perf Mode
         for (let i = 0; i < dropCount; i++) rainDrops.push(new RainDrop());
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(p => { p.update(); p.draw(); });

        if (bgEffect === 'rain_real') {
             rainDrops.forEach(drop => { drop.update(); drop.draw(); });
             for (let i = splashes.length - 1; i >= 0; i--) {
                 let s = splashes[i];
                 s.update();
                 s.draw();
                 if (s.life <= 0) splashes.splice(i, 1);
             }
        }

        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, [bgEffect, enableParticles, bgAnimationSpeed, primaryColor, rainAmount, rainSpeed, rainCollision, rainThickness, mode, performanceMode]);


  // --- CSS ONLY EFFECTS (Cyber Rain, Snow, etc) ---
  const getEffectLayer = () => {
      switch(bgEffect) {
          case 'rain_cyber':
              return (
                  <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
                     {[...Array(Number(rainAmount))].map((_, i) => (
                         <div key={i} className="absolute top-[-100px] w-[2px] h-[100px] bg-gradient-to-b from-transparent to-neon-cyan"
                             style={{
                                 left: `${Math.random() * 100}%`,
                                 animation: `fall ${Math.random() * 2 + (5 / rainSpeed)}s linear infinite`,
                                 animationDelay: `${Math.random() * 5}s`
                             }}
                         />
                     ))}
                     <style>{`@keyframes fall { to { transform: translateY(110vh); } }`}</style>
                  </div>
              );
          case 'snow':
             return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(Number(snowAmount))].map((_, i) => (
                        <div key={i} className="absolute rounded-full opacity-80 bg-white"
                            style={{
                                width: `${Math.random() * 3 + 2}px`,
                                height: `${Math.random() * 3 + 2}px`,
                                left: `${Math.random() * 100}%`,
                                top: `-10px`,
                                animation: `snowFall ${Math.random() * 5 + (10 / snowSpeed)}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                    <style>{`@keyframes snowFall { to { transform: translateY(110vh); } }`}</style>
                </div>
            );
          case 'fireflies':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(25)].map((_, i) => (
                        <div key={i} className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-[2px]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `firefly 20s infinite alternate`,
                            }}
                        />
                    ))}
                    <style>{`@keyframes firefly { 0% { transform: translate(0,0); } 100% { transform: translate(100px, 100px); } }`}</style>
                </div>
            );
           case 'matrix':
               return (
                  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                      {[...Array(20)].map((_, i) => (
                          <div key={i} className="absolute top-[-200px] text-neon-green font-mono text-xs writing-vertical"
                              style={{
                                  left: `${Math.random() * 100}%`,
                                  animation: `matrix ${Math.random() * 5 + 5}s linear infinite`,
                              }}
                          >
                             {"0101010110"}
                          </div>
                      ))}
                      <style>{`@keyframes matrix { to { transform: translateY(110vh); } }`}</style>
                  </div>
               );
          case 'fog':
                return (
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow blur-3xl" />
                    </div>
                );
          default: return null;
      }
  };


  // --- BACKGROUND SCENES ---
  const getSceneLayer = () => {
    switch(bgScene) {
        case "grid":
            return <div className={`absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20 animate-grid-move ${mode === 'light' ? 'text-black' : 'text-white'}`} style={{ animationDuration: `${40 / bgAnimationSpeed}s` }} />;
        case "aurora":
             return (
                 <div className="absolute inset-0 overflow-hidden">
                     <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-primary/30 to-purple-900/20 animate-spin-slow opacity-50 blur-3xl" style={{ animationDuration: '60s' }} />
                 </div>
             );
        case "galaxy":
             return <div className="absolute inset-0 bg-black"><div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50" /></div>;
        case "ocean":
             return <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black opacity-80" />;
        case "sunset":
             return <div className="absolute inset-0 bg-gradient-to-b from-orange-900/40 via-purple-900/40 to-black" />;
        case "greenery":
             return <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black" />;
        case "minimal":
        default:
             return null; // Just base color
    }
  };

  return (
    <div className="fixed inset-0 -z-50 bg-bg-primary overflow-hidden pointer-events-none">
        {getSceneLayer()}
        {getEffectLayer()}
        {/* Canvas for heavy effects */}
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60" />
    </div>
  );
};
