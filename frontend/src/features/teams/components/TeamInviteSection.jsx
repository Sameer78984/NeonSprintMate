import { UserPlusIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

/**
 * TeamInviteSection Component
 * 
 * Section for inviting new members to the team via email.
 * 
 * @param {Object} props - Component props
 * @param {string} props.inviteEmail - Current invite email value
 * @param {Function} props.setInviteEmail - Function to update invite email
 * @param {Function} props.onInvite - Handler function for form submission
 * @param {boolean} props.loading - Whether the invite request is loading
 * @returns {JSX.Element} Team invite section component
 */
export const TeamInviteSection = ({
  inviteEmail,
  setInviteEmail,
  onInvite,
  loading,
}) => {
  return (
    <div className="glass-panel p-8 rounded-[2rem] border border-neon-purple/20 bg-black/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />

      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-neon-purple/10 rounded-xl">
          <UserPlusIcon className="h-6 w-6 text-neon-purple" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Invite Member</h3>
          <p className="text-xs text-zinc-500">
            Add existing users to this team via email.
          </p>
        </div>
      </div>

      <form onSubmit={onInvite} className="flex gap-4 items-end">
        <div className="flex-1">
          <Input
            icon={EnvelopeIcon}
            placeholder="user@example.com"
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
  );
};
