
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.sedeschuquisaca.gob.bo">
              SEDES CHUQUISACA
            </NavLink>
          </NavItem>

        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} PROG. Chagas Chuquisaca{" "}
          <i className="tim-icons icon-heart-2" /> {"  "}
          <a
            href="https://www.sedeschuquisaca.gob.bo/chagas"
            target="_blank"
          >
            SItio web
          </a>{" "}
          {new Date().getFullYear()+ '.'}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
