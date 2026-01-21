import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useToastStore } from "../../../stores/useToastStore";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  UserIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "", // New required field
    email: "",
    password: "",
  });

  const { register, loading } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      if (res.success) {
        addToast(`Welcome, ${formData.username}. Identity Verified.`, "purple");
        navigate("/dashboard");
      } else {
        addToast(res.error || "Enrollment Failed.", "error");
      }
    } catch (err) {
      addToast("Network Error: Gateway Unreachable.", "error");
    }
  };

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-[2.5rem] border border-white/5 bg-black/40 backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-60 animate-pulse" />

      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/30 mb-5 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <UserPlusIcon className="h-8 w-8 text-neon-purple" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter uppercase">
          Initialization
        </h1>
        <p className="text-zinc-500 text-[10px] tracking-[0.2em] mt-2 uppercase font-mono">
          Operative Enrollment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          icon={UserIcon}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Sam Smith"
          required
        />

        {/* New Required Username Input */}
        <Input
          label="Operative Username"
          icon={UserCircleIcon}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="e.g., samsmith_01"
          required
        />

        <Input
          label="Neural Link (Email)"
          icon={EnvelopeIcon}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="sam@nexus.sys"
          required
        />

        <Input
          label="Keyphrase"
          icon={LockClosedIcon}
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="••••••••"
          required
        />

        <Button type="submit" loading={loading} className="w-full">
          Begin Integration
        </Button>
      </form>

      <p className="mt-8 text-center text-zinc-500 text-[10px] uppercase tracking-widest">
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

export default RegisterForm;
