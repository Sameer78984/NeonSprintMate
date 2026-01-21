import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useToastStore } from "../../../stores/useToastStore";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  BoltIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      if (result.success) {
        addToast("Identity Verified. Access Granted.", "cyan");
        navigate("/dashboard");
      } else {
        addToast(result.error || "Access Denied.", "error");
      }
    } catch (err) {
      addToast("Network Error: Backend Link Severed.", "error");
    }
  };

  return (
    <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden bg-black/40 backdrop-blur-2xl">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60 animate-pulse" />
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/30 mb-6 shadow-neon-cyan/30 shadow-lg">
          <BoltIcon className="h-8 w-8 text-neon-cyan" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          Access Terminal
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Credential: Email"
          icon={EnvelopeIcon}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Keyphrase: Password"
          icon={LockClosedIcon}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="cyan"
          loading={loading}
          className="w-full"
        >
          Initialize Link
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
