import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { AuthFormHeader } from "./AuthFormHeader";
import { AuthFormFooter } from "./AuthFormFooter";
import { useAuthForm } from "../hooks/useAuthForm";
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

/**
 * RegisterForm Component
 * 
 * Handles new user registration with name, username, email, and password.
 * Validates input and displays appropriate error messages.
 * 
 * @returns {JSX.Element} Registration form component
 */
export const RegisterForm = () => {
  const { formData, handleChange, handleSubmit, loading, errorField } =
    useAuthForm(
      {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      "register"
    );

  return (
    <div className="glass-panel p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/5 relative overflow-hidden">
      <AuthFormHeader icon={UserPlusIcon} title="Initialization" color="purple" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          icon={UserIcon}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          autoComplete="name"
        />
        <Input
          label="Operative Username"
          icon={UserCircleIcon}
          value={formData.username}
          isErrorField={errorField === "username"}
          error={errorField === "username" ? "Identity Conflict" : null}
          onChange={(e) => handleChange("username", e.target.value)}
          required
          autoComplete="username"
        />
        <Input
          label="Neural Link (Email)"
          icon={EnvelopeIcon}
          type="email"
          value={formData.email}
          isErrorField={errorField === "email"}
          error={errorField === "email" ? "Link Conflict" : null}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Keyphrase"
          icon={LockClosedIcon}
          type="password"
          value={formData.password}
          isErrorField={errorField === "password"}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          autoComplete="new-password"
        />
        <Button type="submit" loading={loading} className="w-full py-4 mt-2">
          Establish Identity
        </Button>
      </form>

      <AuthFormFooter type="register" />
    </div>
  );
};
