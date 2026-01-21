import React, { useEffect, useState } from "react";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useToastStore } from "../../../stores/useToastStore";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import {
  UserPlusIcon,
  ShieldCheckIcon,
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const TeamSettings = () => {
  const { currentTeam, members, fetchMembers, addMember, loading } =
    useTeamStore();
  const { user: currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [inviteEmail, setInviteEmail] = useState("");

  // Sync members when the component loads or team changes
  useEffect(() => {
    fetchMembers();
  }, [currentTeam, fetchMembers]);

  const handleInvite = async (e) => {
    e.preventDefault();
    const res = await addMember(inviteEmail);

    if (res.success) {
      addToast("Operative recruited successfully.", "purple");
      setInviteEmail("");
    } else {
      addToast(res.error, "error");
    }
  };

  if (!currentTeam) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-zinc-500 font-mono text-sm uppercase tracking-widest">
        <p>No Active Unit Selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-white">
          Team_Nexus
        </h2>
        <p className="text-zinc-500 text-[10px] font-mono uppercase mt-2 tracking-[0.3em]">
          Unit Configuration // {currentTeam.name}
        </p>
      </div>

      {/* Invite Section (Only visible if you want) */}
      <div className="glass-panel p-8 rounded-[2rem] border border-neon-purple/20 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-neon-purple/10 rounded-xl">
            <UserPlusIcon className="h-6 w-6 text-neon-purple" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Recruit Operative</h3>
            <p className="text-xs text-zinc-500">
              Add existing users to this unit via email.
            </p>
          </div>
        </div>

        <form onSubmit={handleInvite} className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              icon={EnvelopeIcon}
              placeholder="operative@nexus.sys"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            variant="purple"
            loading={loading}
            className="mb-[2px]"
          >
            Send Invite
          </Button>
        </form>
      </div>

      {/* Member List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-4">
          Active Roster ({members.length})
        </h3>

        <div className="grid gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="glass-panel p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center border ${
                    member.role === "admin"
                      ? "border-neon-cyan/50 bg-neon-cyan/10"
                      : "border-zinc-700 bg-zinc-800"
                  }`}
                >
                  {member.role === "admin" ? (
                    <ShieldCheckIcon className="h-5 w-5 text-neon-cyan" />
                  ) : (
                    <UserIcon className="h-5 w-5 text-zinc-400" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-white">
                      {member.name}
                    </p>
                    {member.id === currentUser?.id && (
                      <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 rounded-full uppercase tracking-wider">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 font-mono">
                    {member.email}
                  </p>
                </div>
              </div>

              <span
                className={`text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${
                  member.role === "admin"
                    ? "border-neon-cyan/20 text-neon-cyan bg-neon-cyan/5"
                    : "border-zinc-700 text-zinc-500"
                }`}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSettings;
