import { Link } from "react-router-dom";

/**
 * AuthFormFooter Component
 * 
 * Reusable footer for authentication forms with navigation links.
 * 
 * @param {Object} props - Component props
 * @param {'login'|'register'} props.type - Form type to determine link text
 * @returns {JSX.Element} Auth form footer component
 */
export const AuthFormFooter = ({ type = "login" }) => {
  if (type === "login") {
    return (
      <div className="mt-10 pt-8 border-t border-white/5 text-center">
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">
          New Operative?{" "}
          <Link
            to="/register"
            className="text-neon-cyan font-bold hover:text-white transition-colors"
          >
            Begin Enrollment
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 text-center">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
        Found identity?{" "}
        <Link
          to="/login"
          className="text-neon-purple font-bold hover:text-white transition-colors"
        >
          Establish Link
        </Link>
      </p>
    </div>
  );
};
