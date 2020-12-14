import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { create as xmlbuilder } from 'xmlbuilder2'
import fileDownload from 'js-file-download'
import logo from '../assets/images/DataPassportsLogo.svg'

function XMLForm() {
  const [validated, setValidated] = useState(false)
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const { formFirstName, formLastName, formEmail, formPassword } = event.target.elements
      const xml = xmlbuilder({ version: '1.0' })
        .ele('user')
          .ele('firstName').txt(formFirstName.value).up()
          .ele('lastName').txt(formLastName.value).up()
          .ele('email').txt(formEmail.value).up()
          .ele('password').txt(formPassword.value).up()
        .up()
      const xmlDoc = xml.end({ prettyPrint: true })
      fileDownload(xmlDoc, 'download.xml')
    }
    setValidated(true);
  };

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" style={{ padding: '1rem' }} src={logo} />
      <Card.Body>
        <Card.Title>Technical Challenge</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="xml-form">
          <Form.Group controlId="formFirstName">
            <Form.Control type="text" placeholder="Enter first name" required data-testid="required-firstName"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Control type="text" placeholder="Enter last name" required data-testid="required-lastName"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" placeholder="Enter email" required data-testid="required-email"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control type="password" placeholder="Enter password" required data-testid="required-password" pattern=".{8,}"/>
            <Form.Text className="text-muted" style={{ fontSize: '0.75rem'}} >Must contain at least 8 or more characters</Form.Text>
          </Form.Group>
          <Button type="submit">Download XML</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default XMLForm