import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { AuthFormHeader } from "./AuthFormHeader";
import { AuthFormFooter } from "./AuthFormFooter";
import { useAuthForm } from "../hooks/useAuthForm";
import {
  EnvelopeIcon,
  LockClosedIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

/**
 * LoginForm Component
 * 
 * Handles user authentication with email and password.
 * Displays error states and redirects on successful login.
 * 
 * @returns {JSX.Element} Login form component
 */
export const LoginForm = () => {
  const { formData, handleChange, handleSubmit, loading, errorField } =
    useAuthForm({ email: "", password: "" }, "login");

  return (
    <div className="glass-panel p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/5 relative overflow-hidden">
      <AuthFormHeader icon={BoltIcon} title="Access Terminal" color="cyan" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Credential: Email"
          icon={EnvelopeIcon}
          type="email"
          value={formData.email}
          isErrorField={errorField === "email"}
          error={errorField === "email" ? "Check Credential" : null}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <Input
          label="Keyphrase: Password"
          icon={LockClosedIcon}
          type="password"
          value={formData.password}
          isErrorField={errorField === "password"}
          error={errorField === "password" ? "Check Keyphrase" : null}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        <Button type="submit" loading={loading} className="w-full py-4 mt-4">
          Initialize Link
        </Button>
      </form>

      <AuthFormFooter type="login" />
    </div>
  );
};
