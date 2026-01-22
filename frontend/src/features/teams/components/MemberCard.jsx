import { ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";

/**
 * MemberCard Component
 * 
 * Displays a single team member with their role, name, and email.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.member - Member object to display
 * @param {Object} props.currentUser - Current authenticated user object
 * @returns {JSX.Element} Member card component
 */
export const MemberCard = ({ member, currentUser }) => {
  const isAdmin = member.role === "admin";
  const isCurrentUser = member.id === currentUser?.id;

  return (
    <div className="glass-panel p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center border ${
            isAdmin
              ? "border-neon-cyan/50 bg-neon-cyan/10"
              : "border-zinc-700 bg-zinc-800"
          }`}
        >
          {isAdmin ? (
            <ShieldCheckIcon className="h-5 w-5 text-neon-cyan" />
          ) : (
            <UserIcon className="h-5 w-5 text-zinc-400" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-white">{member.name}</p>
            {isCurrentUser && (
              <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 rounded-full uppercase tracking-wider">
                You
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 font-mono">{member.email}</p>
        </div>
      </div>

      <span
        className={`text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${
          isAdmin
            ? "border-neon-cyan/20 text-neon-cyan bg-neon-cyan/5"
            : "border-zinc-700 text-zinc-500"
        }`}
      >
        {member.role}
      </span>
    </div>
  );
};
