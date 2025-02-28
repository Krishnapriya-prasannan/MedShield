import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Avatar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import authentication context

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Getting logged-in user details

  // If user is not logged in, show welcome screen
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to MedShield 🏥
        </Typography>
        <Typography variant="body1" color="textSecondary">
          MedShield helps you verify medicines, manage prescriptions, report counterfeit drugs, and find the best pharmacies.
          Sign up or log in to access all features.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" component={Link} to="/auth" sx={{ mx: 1 }}>
            Login
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/signup" sx={{ mx: 1 }}>
            Sign Up
          </Button>
        </Box>
      </Container>
    );
  }

  const role = user?.role || "user"; // Default role is "user" if not specified

  // Define dashboard items based on roles
  const dashboardItems = {
    user: [
      { title: "🩺 MediScan", link: "/medicine-verification" },
      { title: "📜 My Prescription", link: "/my-prescriptions" },
      { title: "🚨 Report Fraud", link: "/report-fraud" },
      { title: "🏬 Best Store #1", link: "/top-stores" },
      { title: "🏬 Best Store #2", link: "/top-stores" },
      { title: "🏬 Best Store #3", link: "/top-stores" },
    ],
    doctor: [
      { title: "📋 Add Prescription", link: "/upload-prescription" },
      { title: "🔍 Verify Medicines", link: "/medicine-verification" },
      { title: "🩺 Patient Reports", link: "/patient-reports" },
    ],
    pharmacist: [
      { title: "📜 View Prescriptions", link: "/pharmacy-access" },
      {title: " 🩺 Verify Medicines", link: "/medicine-verification" },
      { title: "🛒 Purchase Register", link: "/purchase-register" }, // New
      { title: "📦 Stock Register", link: "/stock-register" }, // New
    ],
    rootuser: [
      { title: "✔️ Validate Complaints", link: "/validate-complaints" },
      { title: "📜 Generate Barcodes", link: "/generate-barcodes" },
      { title: "🏭 Issue Licenses", link: "/issue-licenses" },
    ],
    manufacturer: [
      { title: "🏭 View Barcodes", link: "/view-barcodes" },
      { title: "📝 Manage Production", link: "/manage-production" },
    ],
    admin: [
      { title: "👥 Manage Users", link: "/manage-users" },
      { title: "📊 System Reports", link: "/system-reports" },
    ],
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Profile Banner */}
      <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: "#2E3B55" }}>{role.charAt(0).toUpperCase()}</Avatar>
        <Box>
          <Typography variant="h6">Welcome, {user?.name || "User"}</Typography>
          <Typography variant="body2" color="textSecondary">
            Role: {role.charAt(0).toUpperCase() + role.slice(1)}
          </Typography>
        </Box>
      </Paper>

      {/* Feature Boxes (Dynamic Based on Role) */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {dashboardItems[role].map((item, index) => (
          <Grid item xs={6} md={4} key={index}>
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <Paper elevation={3} sx={boxStyle}>
                <Typography variant="h6">{item.title}</Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Box styling
const boxStyle = {
  p: 3,
  textAlign: "center",
  bgcolor: "#f5f5f5",
  "&:hover": { bgcolor: "#e0e0e0", cursor: "pointer" },
};

export default Dashboard;
