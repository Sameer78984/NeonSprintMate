import { useState, useEffect, useMemo } from 'react';
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useTaskFilters } from "./useTaskFilters";
import { arrayMove } from "@dnd-kit/sortable";

export const useTaskBoardLogic = () => {
    const {
        tasks,
        loading: tasksLoading,
        fetchTasks,
        clearTasks,
        updateTaskStatus,
    } = useTaskStore();
    
    const { currentTeam, fetchTeams, loading: teamsLoading } = useTeamStore();

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [assigneeFilter, setAssigneeFilter] = useState("all");
    const [viewMode, setViewMode] = useState("board"); 

    // Local Order Persistence
    const [taskOrder, setTaskOrder] = useState(() => {
        try {
            const saved = localStorage.getItem("sprintmate_task_order");
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    useEffect(() => {
        if (taskOrder.length > 0) {
            localStorage.setItem("sprintmate_task_order", JSON.stringify(taskOrder));
        }
    }, [taskOrder]);

    // Initial Team Sync
    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    // Fetch tasks
    useEffect(() => {
        if (currentTeam?.id) {
            fetchTasks(currentTeam.id);
        } else {
            clearTasks();
        }
    }, [currentTeam?.id, fetchTasks, clearTasks]);

    // Sort tasks based on local order
    const sortedTasks = useMemo(() => {
        if (!taskOrder.length) return tasks;
        const orderMap = new Map(taskOrder.map((id, index) => [id, index]));
        return [...tasks].sort((a, b) => {
            const indexA = orderMap.has(a.id) ? orderMap.get(a.id) : 999999;
            const indexB = orderMap.has(b.id) ? orderMap.get(b.id) : 999999;
            return indexA - indexB;
        });
    }, [tasks, taskOrder]);

    // Filter tasks
    const filteredTasks = useTaskFilters(sortedTasks, searchQuery, statusFilter, assigneeFilter);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        // 1. Handle Status Change
        const isOverTask = tasks.some((t) => t.id === over.id);
        let newStatus = over.id; 
        
        if (isOverTask) {
           const overTask = tasks.find((t) => t.id === over.id);
           if (overTask) newStatus = overTask.status;
        }

        const task = tasks.find((t) => t.id === active.id);
        if (task && task.status !== newStatus && !['todo','in_progress','done'].includes(active.id)) {
           updateTaskStatus(active.id, newStatus);
        }

        // 2. Handle Reordering (Visual)
        if (active.id !== over.id) {
            const oldIndex = sortedTasks.findIndex((t) => t.id === active.id);
            const newIndex = sortedTasks.findIndex((t) => t.id === over.id);
            
            if (oldIndex !== -1 && newIndex !== -1) {
                const newOrder = arrayMove(sortedTasks.map(t => t.id), oldIndex, newIndex);
                setTaskOrder(newOrder);
            }
        }
    };

    return {
        // Data
        currentTeam,
        tasksLoading,
        teamsLoading,
        filteredTasks,
        
        // UI State
        isTaskModalOpen, setIsTaskModalOpen,
        isTeamModalOpen, setIsTeamModalOpen,
        isEditModalOpen, setIsEditModalOpen,
        selectedTask, setSelectedTask,
        searchQuery, setSearchQuery,
        statusFilter, setStatusFilter,
        assigneeFilter, setAssigneeFilter,
        viewMode, setViewMode,

        // Handlers
        handleDragEnd
    };
};
