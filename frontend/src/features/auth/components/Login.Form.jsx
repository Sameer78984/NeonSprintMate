import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useToastStore } from "../../../stores/useToastStore";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  EnvelopeIcon,
  LockClosedIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Pull global state
  const { login, loading, errorField, clearAuthErrors } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear red border immediately when typing
    if (errorField === field) clearAuthErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);

    if (res.success) {
      addToast("Access Granted.", "cyan");
      navigate("/dashboard");
    } else {
      // res.error now contains the DETAILED message from the backend
      addToast(res.error, "error");
      // res.field triggers the red border automatically via store state
    }
  };

  return (
    <div className="glass-panel p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60 animate-pulse" />

      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/30 mb-6 shadow-lg">
          <BoltIcon className="h-8 w-8 text-neon-cyan" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">
          Access Terminal
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Credential: Email"
          icon={EnvelopeIcon}
          type="email"
          value={formData.email}
          isErrorField={errorField === "email"}
          // Dynamic error text: If this field is errored, show "Check Credential", else null
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

      {/* --- ADDED REGISTRATION LINK SECTION --- */}
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
    </div>
  );
};

export default LoginForm;
