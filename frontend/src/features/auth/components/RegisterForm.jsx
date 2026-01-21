import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useToastStore } from "../../../stores/useToastStore";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { register, loading, errorField, clearAuthErrors } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errorField === field) clearAuthErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);

    if (res.success) {
      addToast(`Identity Verified. Welcome @${formData.username}`, "purple");
      navigate("/dashboard");
    } else {
      addToast(res.error, "error");
    }
  };

  return (
    <div className="glass-panel p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-60 animate-pulse" />

      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/30 mb-5 shadow-lg">
          <UserPlusIcon className="h-8 w-8 text-neon-purple" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter italic">
          Initialization
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          icon={UserIcon}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          autoComplete="name" // tells browser this is a real name
        />
        <Input
          label="Operative Username"
          icon={UserCircleIcon}
          value={formData.username}
          isErrorField={errorField === "username"}
          error={errorField === "username" ? "Identity Conflict" : null}
          onChange={(e) => handleChange("username", e.target.value)}
          required
          // KEY FIX: Explicitly tells Chrome "This is a username, not an email"
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
          autoComplete="email" // explicitly marks this as the email field
        />
        <Input
          label="Keyphrase"
          icon={LockClosedIcon}
          type="password"
          value={formData.password}
          isErrorField={errorField === "password"}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          // Using 'new-password' prevents Chrome from autofilling an old saved password here
          autoComplete="new-password"
        />
        <Button type="submit" loading={loading} className="w-full py-4 mt-2">
          Establish Identity
        </Button>
      </form>

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
    </div>
  );
};

export default RegisterForm;
