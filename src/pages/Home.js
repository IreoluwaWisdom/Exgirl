import React from "react";
import Headline from "../comp/Headline";
import SwallowMenu from "../comp/SwallowMenu";
import ModernMenu from "../comp/ModernMenu";
import ProteinMenu from "../comp/ProteinMenu";
import FavoriteMenu from "../comp/FavoriteMenu";
import Showed from "../comp/Showed";
import TestimonialCarousel from "../comp/TestimonialCarousel";
import OrderNowButton from "../comp/OrderNowButton";
import HowItWorks from "../comp/HowItWorks";
import Footer from "../comp/Footer";
import Connect from "../comp/Connect";
import { useAuth } from "../context/AuthContext";
import Typing from "../Texts/Typing.js";
import FeedbackForm from "../comp/FeedbackForm";
import ScrollToTopButton from "../comp/ScrollToTopButton";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Headline />
      {!currentUser && <Showed />}
      <Typing phrase="Swallows" className="menu" />
      <SwallowMenu name="restaurant-menu" />
      <Typing phrase="Modern Fusion " />
      <ModernMenu />
      <Typing phrase="Proteins" />
      <ProteinMenu />

      {/* <FavoriteMenu /> */}

      <OrderNowButton />
      <TestimonialCarousel />
      <HowItWorks />
      <Connect />
      <FeedbackForm />
      <div>
        {" "}
        <a
          style={{ color: "black" }}
          href="http://www.google.com/policies/privacy/partners/"
        >
          Our privacy policy{" "}
        </a>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};
export default Home;
