import { useAuthStore } from "../../stores/useAuthStore";
import { useTaskStore } from "../../stores/useTaskStore";

const StoreDebugger = () => {
  // Pull everything from both stores
  const auth = useAuthStore();
  const task = useTaskStore();

  return (
    <div className="p-6 bg-gray-900 text-green-400 font-mono text-sm space-y-8">
      <h2 className="text-xl border-b border-green-900 pb-2">
        🛠️ Store Logic Lab
      </h2>

      {/* Auth Testing Section */}
      <section className="space-y-2">
        <h3 className="text-white">Auth Store State</h3>
        <pre className="bg-black p-3 rounded">
          {JSON.stringify(
            {
              isAuthenticated: auth.isAuthenticated,
              user: auth.user,
              loading: auth.loading,
            },
            null,
            2,
          )}
        </pre>
        <div className="flex gap-2">
          <button
            onClick={() =>
              auth.register({
                username: "NewUser",
                email: "new@example.com",
                password: "Password1234$",
                name: "New Tester",
              })
            }
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Test Register
          </button>
          <button
            onClick={() =>
              auth.login({
                email: "test@example.com",
                password: "Password1234$",
              })
            }
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Test Login
          </button>
          <button
            onClick={auth.logout}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
          <button
            onClick={auth.checkAuth}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          >
            Verify Session
          </button>
        </div>
      </section>

      {/* Task Testing Section */}
      <section className="space-y-2">
        <h3 className="text-white">Task Store (Optimistic Update Test)</h3>
        <p className="text-xs text-gray-400">
          Total Tasks: {task.tasks.length}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => task.fetchTasks("team_1")}
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            Fetch Team Tasks
          </button>
          <button
            onClick={() => task.updateTaskStatus("task_1", "completed")}
            className="bg-yellow-600 text-black px-3 py-1 rounded"
          >
            Move Task to Completed
          </button>
        </div>
      </section>
    </div>
  );
};

export default StoreDebugger;
