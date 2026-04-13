import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "tutor">("user");
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem("pendingRole", role);
      // 🔐 Firebase signup
      await signup(email, password, role);

      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={handleRegister}
        className="card w-full max-w-md shadow-xl bg-base-100 p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Role Selection */}
        <div className="form-control">
          <label className="label font-semibold">Select Role</label>

          <select
            className="select select-bordered"
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "tutor")}
          >
            <option value="user">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <button
          type="button"
          className="btn btn-outline w-full"
          onClick={loginWithGoogle}
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
