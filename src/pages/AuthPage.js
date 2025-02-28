import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");  // New state for role selection
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          ...(isSignup && { name, role }),  // Include role for signup
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || data.errors?.[0]?.msg || "An error occurred.");
      }

      login({ email, token: data.token, role: data.role });  // Store role in context
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <Box sx={{ width: "300px", margin: "auto", mt: 5, textAlign: "center" }}>
      <Typography variant="h5">{isSignup ? "Signup" : "Login"}</Typography>

      {isSignup && (
        <>
          <TextField
            label="Name"
            fullWidth
            sx={{ mt: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="pharmacist">Pharmacist</MenuItem>
              <MenuItem value="rootuser">Root User</MenuItem>
              <MenuItem value="manufacturer">Manufacturer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </>
      )}

      <TextField
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleAuth}>
        {isSignup ? "Signup" : "Login"}
      </Button>
      <Button sx={{ mt: 2 }} onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "New user? Signup"}
      </Button>
    </Box>
  );
};

export default AuthPage;