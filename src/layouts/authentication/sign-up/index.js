import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import CircularProgress from '@mui/material/CircularProgress';

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useMaterialUIController, setLoading, setGlobal, setError } from "context";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";
import { register } from "../../../networking/api";

function Cover() {
  const [controller, dispatch] = useMaterialUIController();
  const [email, setEmail] = useState(() => undefined);
  const [name, setName] = useState(() => undefined);
  const [password, setPassword] = useState(() => undefined);
  const [showAlert, setAlert] = useState(false);
  const registerMe = () => {
    if (email !== undefined && password !== undefined && name !== undefined) {
      register(dispatch, name, email, password).then(() => {
        setAlert(true);
      })
    }
    else {
      setError(dispatch, "Please Fill All Details Correctly!")
      setAlert(true);
    }
  }
  return (
    <CoverLayout image={bgImage}>
      <MDSnackbar
        color={!controller.global?.success ? "error" : "success"}
        icon={!controller.global?.success ? "error" : "check"}
        title={!controller.global?.success ? "Signup Error!" : "Signup Success!"}
        content={controller.global?.message ?? controller.errorData}
        open={showAlert}
        onClose={() => setAlert(false)}
        close={() => setAlert(false)}
        bgWhite
      />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth onChange={(e) => {
                setName(() => e.target.value);
              }} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={(e) => {
                setEmail(() => e.target.value);
              }} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth onChange={(e) => {
                setPassword(() => e.target.value);
              }} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" fullWidth onClick={registerMe} color={controller.isError ? "error" : "info"}>
              {controller.loading && <CircularProgress style={{ height: 30, width: 30, color: "white", padding: 4 }} />}
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
