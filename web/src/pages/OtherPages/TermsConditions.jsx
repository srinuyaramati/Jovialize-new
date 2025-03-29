import { useContext } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { RootContext } from "../../utils/context/RootContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/footer/footer";

function TermsConditionsPage() {

  const { state: { userId } } = useContext(RootContext);

  return (
    <div>
      <HeaderComponent userId={userId} />
      <Container className="mt-3 pt-2">
        <Row className="mb-4">
          <Col md={12} className="deal-content pt-0">
            <h2 className="header mb-3 pt-4">Terms & Conditions</h2>
            <div className="terms-conditions">
              <ul className="decimal-list-style">
                <li>
                  <b>Agreement to Terms</b><br />
                  By accessing and using <a href={(e) => e.preventDefault()} className="anchor-blue-text" onClick={(e) => e.preventDefault() }>Jovialise.com</a> (the "Site"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Site.
                </li>
                <li>
                    <b>Description of Service</b><br />
                    <a href={(e) => e.preventDefault()} className="anchor-blue-text" onClick={(e) => e.preventDefault() }>Jovialise.com</a> is a platform that provides group or personalized recommendations for activities and events based on user location and travel preferences. We do not organize or host these activities ourselves.
                </li>
                <li>
                    <b>User Accounts</b><br />
                    To use certain features of the Site, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </li>
                <li>
                    <b>User Content</b><br />
                    Users may be able to post content on the Site. By posting content, you grant <a href={(e) => e.preventDefault()} onClick={(e) => e.preventDefault() }>Jovialise.com</a> a non-exclusive, worldwide, royalty-free license to use, modify, and display that content.
                </li>
                <li>
                    <b>Intellectual Property</b><br />
                    All content on the Site, including text, graphics, logos, and software, is the property of either <a href={(e) => e.preventDefault()} onClick={(e) => e.preventDefault() }>Jovialise.com</a>, partner organisations and protected by copyright laws.
                </li>
                <li>
                    <b>Disclaimer of Warranties</b><br />
                    <a href={(e) => e.preventDefault()} className="anchor-blue-text" onClick={(e) => e.preventDefault() }>Jovialise.com</a> provides its services "as is" and "as available" without any warranties, express or implied.
                </li>
                <li>
                    <b>Limitation of Liability</b><br />
                    <a href={(e) => e.preventDefault()} className="anchor-blue-text" onClick={(e) => e.preventDefault() }>Jovialise.com</a> shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Site.
                </li>
                <li>
                    <b>Third-Party Links</b><br />
                    The Site may contain links to third-party websites. <a href={(e) => e.preventDefault()} className="anchor-blue-text" onClick={(e) => e.preventDefault() }>Jovialise.com</a> is not responsible for the content or practices of these sites.
                </li>
                <li>
                    <b>Termination</b><br />
                    We reserve the right to terminate or suspend your account and access to the Site at our sole discretion, without notice, for any reason.
                </li>
                <li>
                    <b>Changes to Terms</b><br />
                    We may modify these Terms at any time. Continued use of the Site after changes constitutes acceptance of the new Terms.
                </li>
                <li>
                    <b>Governing Law</b><br />
                    These Terms shall be governed by and construed in accordance with the laws of India.
                </li>
                <li>
                    <b>Contact Information</b><br />
                    For any questions regarding these Terms, please contact us at <a href="mainto:contactus@Jovialise.com">contactus@Jovialise.com.</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default TermsConditionsPage;