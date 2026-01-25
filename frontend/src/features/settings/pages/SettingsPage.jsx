import { VisualSettings } from "../components/VisualSettings";
import { CardSettings } from "../components/CardSettings";
import { DensitySettings } from "../components/DensitySettings";
import { BackgroundSettings } from "../components/BackgroundSettings";
import { PerformanceSettings } from "../components/PerformanceSettings";

export const SettingsPage = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-20">
      <header>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-base-content to-primary/60 mb-2">
          Settings
        </h1>
        <p className="text-zinc-500 font-light">
          Customize your workspace appearance and preferences.
        </p>
      </header>

      <VisualSettings />
      <PerformanceSettings />
      <CardSettings />
      <DensitySettings />
      <BackgroundSettings />

    </div>
  );
};
