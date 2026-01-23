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
      
      // Feature Flags (Frontend enhancements)
      showPomodoro: false,
      showStats: false,
      showNotes: false,

      // Global Background Settings
      bgStyle: "cyber_rain", // 'grid' | 'aurora' | 'nebula' | 'cyber_rain' | 'snow' | 'minimal'
      bgAnimationSpeed: 1, // 0.1 to 5
      enableParticles: true,
      
      // Detailed Background Control
      rainSpeed: 1, // Multiplier
      rainAmount: 20, // Count
      snowSpeed: 1, // Multiplier
      snowAmount: 50, // Count
      
      setMode: (mode) => set({ mode }),
      setDensity: (density) => set({ density }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setCardStyle: (style) => set({ cardStyle: style }),
      setBorderStyle: (style) => set({ borderStyle: style }),
      setShadowIntensity: (val) => set({ shadowIntensity: val }),
      setTextShadow: (val) => set({ textShadow: val }),
      setTextShadowColor: (color) => set({ textShadowColor: color }),
      setFontFamily: (font) => set({ fontFamily: font }),
      setCustomTextColor: (color) => set({ customTextColor: color }),
      toggleFeature: (feature) => set((state) => ({ [feature]: !state[feature] })),
      setBgStyle: (style) => set({ bgStyle: style }),
      setBgAnimationSpeed: (speed) => set({ bgAnimationSpeed: speed }),
      setEnableParticles: (enable) => set({ enableParticles: enable }),
      
      // Detailed Setters
      setRainSpeed: (speed) => set({ rainSpeed: speed }),
      setRainAmount: (amount) => set({ rainAmount: amount }),
      setSnowSpeed: (speed) => set({ snowSpeed: speed }),
      setSnowAmount: (amount) => set({ snowAmount: amount }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
