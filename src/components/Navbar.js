import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Function to check if a path is active
  const isActive = (path) => location.pathname === path;

  
  return (
    <AppBar position="static" sx={{ background: "#2E3B55" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MedShield
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color={isActive("/") ? "secondary" : "inherit"} component={Link} to="/">
            Home
          </Button>

          {user ? (
            <>
              {user.role === "user" && (
                <>
                  <Button
                    color={isActive("/medicine-verification") ? "secondary" : "inherit"}
                    component={Link}
                    to="/medicine-verification"
                  >
                    Scan Medicine
                  </Button>
                  <Button
                    color={isActive("/my-prescriptions") ? "secondary" : "inherit"}
                    component={Link}
                    to="/my-prescriptions"
                  >
                    My Prescriptions
                  </Button>
                  <Button
                    color={isActive("/report-fraud") ? "secondary" : "inherit"}
                    component={Link}
                    to="/report-fraud"
                  >
                    Report Fraud
                  </Button>
                  <Button
                    color={isActive("/top-stores") ? "secondary" : "inherit"}
                    component={Link}
                    to="/top-stores"
                  >
                    Best Stores
                  </Button>
                </>
              )}

              {user.role === "doctor" && (
                <Button
                  color={isActive("/add-prescription") ? "secondary" : "inherit"}
                  component={Link}
                  to="/upload-prescription"
                >
                  Add Prescription
                </Button>
              )}

              {user.role === "pharmacist" && (
                <>
                <Button
                  color={isActive("/pharmacy-access") ? "secondary" : "inherit"}
                  component={Link}
                  to="/pharmacy-access"
                >
                  View Prescriptions
                </Button>
                 <Button
                 color={isActive("/medicine-verification") ? "secondary" : "inherit"}
                 component={Link}
                 to="/medicine-verification"
               >
                 Scan Medicine
               </Button>
               <Button
                 color={isActive("/purchase-register") ? "secondary" : "inherit"}
                 component={Link}
                 to="/purchase-register"
               >
                 Purchase
               </Button>
               <Button
                 color={isActive("/stock-register") ? "secondary" : "inherit"}
                 component={Link}
                 to="/stock-register"
               >
                 Stock
               </Button>
              
               </>
              )}

              {user.role === "rootuser" && (
                <>
                  <Button
                    color={isActive("/validate-complaints") ? "secondary" : "inherit"}
                    component={Link}
                    to="/validate-complaints"
                  >
                    Validate Complaints
                  </Button>
                  <Button
                    color={isActive("/generate-barcodes") ? "secondary" : "inherit"}
                    component={Link}
                    to="/generate-barcodes"
                  >
                    Generate Barcode
                  </Button>
                  <Button
                    color={isActive("/issue-licenses") ? "secondary" : "inherit"}
                    component={Link}
                    to="/issue-licenses"
                  >
                    Issue License
                  </Button>
                </>
              )}

              {user.role === "manufacturer" && (
                <>
                  <Button
                    color={isActive("/view-barcodes") ? "secondary" : "inherit"}
                    component={Link}
                    to="/view-barcodes"
                  >
                    My Barcodes
                  </Button>
                  <Button
                    color={isActive("/manage-production") ? "secondary" : "inherit"}
                    component={Link}
                    to="/manage-production"
                  >
                    Manage Production
                  </Button>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <Button
                    color={isActive("/manage-users") ? "secondary" : "inherit"}
                    component={Link}
                    to="/manage-users"
                  >
                    Manage Users
                  </Button>
                  <Button
                    color={isActive("/system-reports") ? "secondary" : "inherit"}
                    component={Link}
                    to="/system-reports"
                  >
                    System Reports
                  </Button>
                </>
              )}

              <Button color="error" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color={isActive("/auth") ? "secondary" : "inherit"} component={Link} to="/auth">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
