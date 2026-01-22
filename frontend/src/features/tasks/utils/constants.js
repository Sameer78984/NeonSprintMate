/**
 * Task Status Options
 * 
 * Available status options for task filtering and selection.
 */
export const TASK_STATUS_OPTIONS = [
  { label: "ALL_STATUS", value: "all" },
  { label: "TODO", value: "todo" },
  { label: "IN_PROGRESS", value: "in_progress" },
  { label: "COMPLETED", value: "done" },
];

/**
 * Task Status Options for Forms
 * 
 * Status options formatted for form dropdowns.
 */
export const TASK_STATUS_FORM_OPTIONS = [
  { label: "Todo / Queue", value: "todo" },
  { label: "In Progress / Active", value: "in_progress" },
  { label: "Completed / Terminated", value: "done" },
];

/**
 * Maps team members to select option format
 * 
 * @param {Array} members - Array of member objects
 * @param {boolean} includeUnassigned - Whether to include unassigned option
 * @param {string} unassignedLabel - Label for unassigned option
 * @returns {Array} Array of option objects for NeonSelect
 */
export const mapMembersToOptions = (
  members = [],
  includeUnassigned = true,
  unassignedLabel = "Unassigned"
) => {
  const options = includeUnassigned
    ? [{ label: unassignedLabel, value: "" }]
    : [];
  return [
    ...options,
    ...members.map((member) => ({
      label: `${member.name}${member.email ? ` (${member.email})` : ""}`,
      value: member.id,
    })),
  ];
};
