import { SparklesIcon } from "@heroicons/react/24/outline";
import { UnifiedThemeControls } from "../../../components/UnifiedThemeControls";

export const BackgroundSettings = () => {
    return (
        <section className="space-y-8">
            <div className="flex items-center gap-3 text-base-content border-b border-base-content/10 pb-4">
              <SparklesIcon className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold uppercase tracking-widest">Environment & Atmosphere</h2>
            </div>
            
            <UnifiedThemeControls />
        </section>
    );
};
