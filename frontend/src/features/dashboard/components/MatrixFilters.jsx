import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { NeonSelect } from "../../../components/NeonSelect";
import { TASK_STATUS_OPTIONS } from "../../tasks/utils/constants";

/**
 * MatrixFilters Component
 * 
 * Search and status filter controls for the task board.
 * 
 * @param {Object} props - Component props
 * @param {string} props.searchQuery - Current search query
 * @param {Function} props.setSearchQuery - Function to update search query
 * @param {string} props.statusFilter - Current status filter value
 * @param {Function} props.setStatusFilter - Function to update status filter
 * @returns {JSX.Element} Filter controls component
 */
export const MatrixFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 relative group w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-neon-cyan transition-colors">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search Matrix for Objectives..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm glass-panel focus:border-neon-cyan/50 focus:outline-none text-white placeholder:text-zinc-700 transition-all"
        />
      </div>

      <div className="w-full md:w-64">
        <NeonSelect
          options={TASK_STATUS_OPTIONS}
          value={statusFilter}
          onChange={setStatusFilter}
          icon={FunnelIcon}
        />
      </div>
    </div>
  );
};

export default MatrixFilters;
