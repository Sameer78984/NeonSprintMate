/**
 * AuthFormHeader Component
 * 
 * Reusable header component for authentication forms.
 * Displays icon, title, and optional accent line.
 * 
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Icon component to display
 * @param {string} props.title - Form title
 * @param {'cyan'|'purple'} props.color - Color theme (cyan for login, purple for register)
 * @returns {JSX.Element} Form header component
 */
export const AuthFormHeader = ({ icon: Icon, title, color = "cyan" }) => {
  const colorConfig = {
    cyan: {
      gradient: "via-neon-cyan",
      bg: "bg-neon-cyan/10",
      border: "border-neon-cyan/30",
      text: "text-neon-cyan",
    },
    purple: {
      gradient: "via-neon-purple",
      bg: "bg-neon-purple/10",
      border: "border-neon-purple/30",
      text: "text-neon-purple",
    },
  };

  const config = colorConfig[color] || colorConfig.cyan;

  return (
    <>
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${config.gradient} to-transparent opacity-60 animate-pulse`} />
      <div className="flex flex-col items-center mb-10">
        <div className={`w-16 h-16 rounded-2xl ${config.bg} flex items-center justify-center border ${config.border} mb-6 shadow-lg`}>
          <Icon className={`h-8 w-8 ${config.text}`} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">
          {title}
        </h1>
      </div>
    </>
  );
};
