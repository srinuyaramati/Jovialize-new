import { Col, Container, Row } from "react-bootstrap";
import HeaderComponent from "../../components/HeaderComponent";
import { useContext } from "react";
import { RootContext } from "../../utils/context/RootContextProvider";
import Footer from "../../components/footer/footer";

function AboutUsPage() {

  const { state: { userId } } = useContext(RootContext);

  return (
    <div>
      <HeaderComponent userId={userId} />
      <Container className="mt-3 pt-2">
        <div>
          <Row>
            <Col md={12} className="deal-content pt-0 mb-5">
              <h2 className="header mb-3 pt-4">About Us</h2>
              <div className="">
                Welcome to <a href={(e) => e.preventDefault()} className="anchor-blue-text" onClick={(e) => e.preventDefault()}>Jovialize.com!</a>
                <p>
                  We are all about turning our member's free time into epic experiences filled with laughter, exploration, and unforgettable memories.Whether it’s hiking, brunching, or partying—and we’ll serve up tailored recommendations that fit our members style and budget.
                </p>
                <p>
                  <a href={(e) => e.preventDefault()} className="anchor-blue-text" onClick={(e) => e.preventDefault()}>Jovialize.com</a> is founded by a group of adventure enthusiasts, our mission is simple: to help you discover and experience the joy of fun, no matter where you are or what you love.
                </p>
                <p>
                  <b>Who We Are </b><br />
                  We are a passionate team of explorers, foodies, artists, and thrill-seekers dedicated to curating unforgettable experiences. Our diverse backgrounds allow us to bring a wealth of knowledge and creativity to the table, ensuring that we cater to every kind of fun-lover.
                </p>
                <p>
                  <b>Our Mission</b><br />
                  Life is too short for boring days! We aim to make it easy for everyone—from busy professionals to spontaneous adventurers—to find exciting activities and events tailored to their interests with in their budgets. Whether you're looking for a quiet day at a local art gallery or an adrenaline-pumping outdoor adventure, <a href={(e) => e.preventDefault()} onClick={(e) => e.preventDefault()}>Jovialize.com</a> is here to guide you with some options.
                </p>
                <p>
                  <b>What We Offer </b><br />
                  Value deals: We learn our members location and their preferences to negotiate best deals from service providers and suggests activities that resonate with your unique interests.
                  Local Insights: We uncover hidden gems and local favorites, helping you explore your city like never before.
                  Easy Planning: With our user-friendly tools, planning your next adventure is as simple as a few clicks.Our deal advisors will do the leg work for our members.
                </p>
                <p>
                  <b>Join Us on this fun loving journey!</b><br />
                  We’re excited to be part of your journey toward more fun-filled days. Explore our site, discover new experiences, and let us help you make every moment count!
                </p>
                <p>
                  Thank you for choosing FunFinder—where every day is an opportunity for adventure!
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default AboutUsPage;