import React, { useEffect } from "react";
import Footer from '../Component/Footer/Footer';
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import OurMissionBanner from "../../Assetes/images/about-slider.jpg"
import Image from "../Component/ImagesComponets/ImagesComponets";
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";
const OurMission = () => {
  useEffect(() => {
        console.log('component mounted');
    }, []);
  return (
    <div id="page">
      <HeaderComponents />
      <MetaTitle pageTitle="Our Mission – Redwood Peak Limited"/>
      <div>
        <Image
          src={OurMissionBanner}
          className="w-100 bannerHeight"
          alt="Our Mission Banner"
        />
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="container-custom mt-1 mb-5 p-4">
          <h1 className="header-post-title-class">Our Mission</h1>

          <div className="mt-3">
            <h3 className="fancytitle">
              <em>
                “Our mission is to achieve investment excellence for our clients through a
              </em>
              <br />
              <em>
                results-oriented partnership between our clients, employees, and constituents.”
              </em>
            </h3>

            <p>
              Redwood Peak is run for the benefit of its investors and employees whose objectives are
              completely aligned. Profit without performance, size for its own sake, socially irresponsible
              investing, and the unilateral prosperity of employees without investors are to be rejected.
              Our firm should be successful if we work hard to attain investment excellence and integrity
              while placing the interests of our clients first.
            </p>

            <p>
              <span className="highlight-text">To serve the clients</span><br />
              • To align our success with the objectives and success of our client<br />
              • To place the interests of our clients first
            </p>

            <p>
              <span className="highlight-text">Respect for the individual</span><br />
              • To deal fairly and honestly with our business partners and associates<br />
              • To communicate openly and to be transparent with our partners, clients, and employees
            </p>

            <p>
              <span className="highlight-text">To strive for excellence</span><br />
              • To measure performance contribution<br />
              • To be a good corporate citizen by contributing to the community and making socially
              responsible investments
            </p>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default OurMission;
