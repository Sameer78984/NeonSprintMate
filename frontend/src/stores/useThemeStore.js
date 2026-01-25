import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      mode: "dark", // 'dark' | 'light'
      density: 1,
      primaryColor: "#06b6d4", // Default Neon Cyan
      cardStyle: "outline", // 'glass' | 'solid' | 'outline' | 'cyber' | 'soft' | 'gradient'
      borderStyle: "full", // 'full' | 'minimal'
      shadowIntensity: 1, // 0 (off) to 3 (max)
      textShadow: 0, // 0 (off) to 2 (strong)
      textShadowColor: "", // Custom shadow color
      fontFamily: "Inter", // 'Inter', 'Roboto Mono', 'Orbitron'
      customTextColor: "", // Hex override
      siteStyle: "glass", // 'glass' | 'solid' | 'minimal'
      enableGlobalNeon: false,
      globalNeonColor: "", // If empty, uses primaryColor
      
      // Feature Flags (Frontend enhancements)
      showPomodoro: false,
      showStats: false,
      showStats: false,
      showNotes: false,
      
      // Performance Optimization
      performanceMode: "balanced", // 'high' | 'balanced' | 'low'
      setPerformanceMode: (mode) => set({ performanceMode: mode }),

      // Global Background Settings
      bgStyle: "cyber_rain", // 'grid' | 'aurora' | 'nebula' | 'cyber_rain' | 'snow' | 'minimal'
      bgAnimationSpeed: 1, // 0.1 to 5
      enableParticles: true,
      
      // Detailed Background Control
      rainSpeed: 1, // Multiplier
      rainAmount: 20, // Count
      snowSpeed: 1, // Multiplier
      snowAmount: 50, // Count
      
      // Welcome Flow
      hasSeenWelcome: false,
      
      setMode: (mode) => set({ mode }),
      setDensity: (density) => set({ density }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      
      // Card Customization
      setCardStyle: (style) => set({ cardStyle: style }),
      setCardOpacity: (opacity) => set({ cardOpacity: opacity }),
      setCardBlur: (blur) => set({ cardBlur: blur }),
      
      setBorderStyle: (style) => set({ borderStyle: style }),
      setShadowIntensity: (val) => set({ shadowIntensity: val }),
      setTextShadow: (val) => set({ textShadow: val }),
      setTextShadowColor: (color) => set({ textShadowColor: color }),
      setFontFamily: (font) => set({ fontFamily: font }),
      setCustomTextColor: (color) => set({ customTextColor: color }),
      toggleFeature: (feature) => set((state) => ({ [feature]: !state[feature] })),
      
      // Background Separation
      bgScene: "grid", // 'grid' | 'aurora' | 'nebula' | 'galaxy' | 'ocean' | 'greenery' | 'minimal'
      bgEffect: "particles", // 'none' | 'particles' | 'rain_real' | 'rain_cyber' | 'snow' | 'fireflies' | 'matrix'
      
      setBgScene: (scene) => set({ bgScene: scene }),
      setBgEffect: (effect) => set({ bgEffect: effect }),

      // Legacy support helper (mapped to new system)
      setBgStyle: (style) => {
          // Map old combined styles to new Scene + Effect combo
          if(style === 'real_rain') set({ bgScene: 'minimal', bgEffect: 'rain_real' });
          else if(style === 'cyber_rain') set({ bgScene: 'grid', bgEffect: 'rain_cyber' });
          else if(style === 'snow') set({ bgScene: 'minimal', bgEffect: 'snow' });
          else if(style === 'fireflies') set({ bgScene: 'greenery', bgEffect: 'fireflies' });
          else if(style === 'matrix') set({ bgScene: 'grid', bgEffect: 'matrix' });
          else set({ bgScene: style, bgEffect: 'particles' });
      },
      setBgAnimationSpeed: (speed) => set({ bgAnimationSpeed: speed }),
      setEnableParticles: (enable) => set({ enableParticles: enable }),
      
      // Detailed Setters
      setRainSpeed: (speed) => set({ rainSpeed: speed }),
      setRainAmount: (amount) => set({ rainAmount: amount }),
      rainCollision: true,
      rainThickness: 1, // New state
      setRainCollision: (enable) => set({ rainCollision: enable }),
      setRainThickness: (thickness) => set({ rainThickness: thickness }),
      setSnowSpeed: (speed) => set({ snowSpeed: speed }),
      setSnowAmount: (amount) => set({ snowAmount: amount }),
      setSiteStyle: (style) => set({ siteStyle: style }),
      setEnableGlobalNeon: (enable) => set({ enableGlobalNeon: enable }),
      setGlobalNeonColor: (color) => set({ globalNeonColor: color }),
      setHasSeenWelcome: (hasSeen) => set({ hasSeenWelcome: hasSeen }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
