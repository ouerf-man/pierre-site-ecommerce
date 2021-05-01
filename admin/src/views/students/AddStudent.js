import React, { useState } from 'react'
import {
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CContainer,
  CFormText,
  CButton

} from '@coreui/react'

import {useHistory} from "react-router-dom";

import { addStudent } from "../../services/api.service";






const AddStudent = () => {

    const history = useHistory();
    const [cin, setCIN] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLasname] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("male");

    const handleSubmit = async (e) => {
        e.preventDefault();


        if(!cin || !name || !lastName || !dob || !email)
            alert("missing fields");

        const body = {
            cin,
            nom: name,
            prenom: lastName,
            date_de_naissance: dob,
            sexe: gender,
            email
        }
        const result = await addStudent(body);
        console.log(result);
        history.push("/students");
    }
    

  return (
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post" onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel htmlFor="cin">Cin</CLabel>
              <CInput
                type="text"
                id="cin"
                name="cin"
                placeholder="Enter Cin.."
                autoComplete="cin"
                onChange={(e) => setCIN(e.target.value)}
              />
              <CFormText className="help-block">Please enter your cin</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="name">Name</CLabel>
              <CInput
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name.."
                autoComplete="current-Name"
                onChange={(e) => setName(e.target.value)}
              />
              <CFormText className="help-block">Please enter your name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="lastName">Last Name</CLabel>
              <CInput
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name.."
                autoComplete="current-LastName"
                onChange={(e) => setLasname(e.target.value)}
              />
              <CFormText className="help-block">Please enter your last name</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="email">Email</CLabel>
              <CInput
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                autoComplete="current-Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CFormText className="help-block">Please enter your Email</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="dob">Date of Birth</CLabel>
              <CInput
                type="date"
                id="dob"
                name="dob"
                placeholder="Enter Date of Birth.."
                autoComplete="current-DateOfBirth"
                onChange={(e) => setDOB(e.target.value)}
              />
              <CFormText className="help-block">Please enter your date of birth</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="gender">Gender</CLabel>
              <CSelect 
                custom 
                name="gender" 
                id="gender" 
                onChange={(e) => setGender(e.target.value)}
              >                   
                      <option value="male">Male</option>
                      <option value="female">Female</option>
              </CSelect>
            </CFormGroup>
            <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="success">Submit</CButton>
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddStudent;
