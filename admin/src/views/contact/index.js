import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { getContact } from "../../services/api.service";

const User = ({}) => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const result = await getContact();
    setMessages(result.data);
    console.log(messages);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <CRow className="justify-content-center">
      <CCol sm={10}>
        <CCard>
          <CCardHeader>Les messages</CCardHeader>
          <CCardBody>
            <CRow>
              {messages.map((e) => {
                return <CCol md={4} key={e._id}>
                  <a href={`mailto: ${e.email}`} style={{ color: "black" }}>
                    <CCard>
                      <CCardHeader>
                        {e.author}
                        <CCardBody>
                          <strong>{e.subject}</strong>
                          <p>{e.message}</p>
                        </CCardBody>
                      </CCardHeader>
                    </CCard>
                  </a>
                </CCol>;
              })}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
