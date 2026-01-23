import { useAuthStore } from "../../../stores/useAuthStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import { UserCircleIcon, UserGroupIcon, EnvelopeIcon, IdentificationIcon } from "@heroicons/react/24/outline";

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const { teams } = useTeamStore();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 mb-2">
          Agent Profile
        </h1>
        <p className="text-zinc-500 font-light">
          Manage your identity and team affiliations.
        </p>
      </header>

      {/* User Info Card */}
      <div className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px]">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
              <UserCircleIcon className="h-12 w-12 text-zinc-400" />
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
              <p className="text-neon-cyan text-xs font-mono uppercase tracking-widest border border-neon-cyan/20 bg-neon-cyan/5 px-2 py-1 rounded-md inline-block">
                Active Member
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-zinc-400 bg-white/5 p-3 rounded-xl border border-white/5">
                <EnvelopeIcon className="h-5 w-5 text-neon-purple" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 bg-white/5 p-3 rounded-xl border border-white/5">
                <IdentificationIcon className="h-5 w-5 text-neon-lime" />
                <span className="text-sm font-mono">ID: {user?.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teams List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <UserGroupIcon className="h-6 w-6 text-neon-purple" />
          Affiliated Teams
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div key={team.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-neon-purple/50 transition-colors group">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                  {team.name}
                </h3>
                <div className="flex justify-between items-center text-xs text-zinc-500 font-mono mt-4 pt-4 border-t border-white/5">
                  <span>ROLE: {team.role || "MEMBER"}</span>
                  <span className="text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity">
                    ACTIVE
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center border border-dashed border-zinc-800 rounded-2xl text-zinc-600">
              No active team affiliations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
