import React, { useState, useEffect } from 'react'
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

import { addClass, getClassById, editClass } from "../../services/api.service";






const AddClass = ({match}) => {

    const history = useHistory();
    const [intitule, setIntitule] = useState("");
    const [classe, setClasse] = useState(null);
    

    const getClass = async (id) => {
      const result = await getClassById(id);
      setClasse(result);
    }

    useEffect(() => {
      if(match.params.id)
        getClass(match.params.id)
    }, [])

    useEffect(() => {
      if(classe) {
        console.log("yoooo")
        setIntitule(classe.intitule);
      }
    }, [classe])

    const handleSubmit = async (e) => {
        e.preventDefault();


        if(!intitule )
            alert("missing fields");

        const body = {
            intitule
        }
        console.log("ya sayed");
        let result = null;
        if(match.params.id) {
          result = await editClass(match.params.id, body);
        } else {
          result = await addClass(body);
        }
        console.log(result);
        history.push("/class");
    }
    

  return (
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post" onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel htmlFor="intitule">Intitulé</CLabel>
              <CInput
                type="text"
                id="intitule"
                name="intitle"
                placeholder="Enter Intitule.."
                autoComplete="intitule"
                onChange={(e) => setIntitule(e.target.value)}
                value={intitule}
              />
              <CFormText className="help-block">Please enter the class name</CFormText>
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

export default AddClass;
