import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  loginAdmin,
  resetPassword,
  resetPasswordRequest,
} from "../../../services/api.service";
import { useHistory } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = ({ setToken }) => {
  let history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [requestPasswordReset, setRequestPasswordReset] = useState(false);
  const query = useQuery();
  const token = query.get("token");
  const id = query.get("id");
  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPasswordRequest(email);
      if (res.success) {
        alert(res.message);
        history.push("/");
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert(e.message)
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("La confirmation de votre mot de passe ne correspond pas !");
      return;
    }
    try {
      const res = await resetPassword({
        userId: id,
        token,
        password: password,
      });
      if (res.success) {
        alert(res.message);
        setEmail(null)
        setPassword(null)
        history.push("/");
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginAdmin({
      email,
      password,
    });
    if (data.success) setToken(data.data);
    else {
      alert(data.message);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {token && id ? (
                    <>
                      <CForm onSubmit={handlePasswordReset}>
                        <h1>Reset Password</h1>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Confirm password"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="primary"
                              className="px-4"
                            >
                              Reset Password
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </>
                  ) : requestPasswordReset ? (
                    <>
                      <CForm onSubmit={handlePasswordResetRequest}>
                        <h1>Password reset</h1>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="email"
                            required
                            placeholder="Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="primary"
                              className="px-4"
                            >
                              Send Email
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </>
                  ) : (
                    <>
                      <CForm onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="email"
                            required
                            placeholder="Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </CInputGroup>
                        <p
                          className="text-muted"
                          onClick={() => setRequestPasswordReset(true)}
                          style={{ cursor: "pointer" }}
                        >
                          forgot password?
                        </p>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="primary"
                              className="px-4"
                            >
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </>
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
