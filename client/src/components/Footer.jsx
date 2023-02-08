import React from 'react';
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col md={12} className="text-center">
                    <span className="text-center">
                        Copyright &copy; All Rights Reserved 2023.
                    </span>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer