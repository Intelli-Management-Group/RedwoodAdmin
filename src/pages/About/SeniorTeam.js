import React, { useEffect } from "react";
import Footer from '../Component/Footer/Footer';
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import SeniorTeams from "../../Assetes/images/about-slider.jpg"
import Image from "../Component/ImagesComponets/ImagesComponets";
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";

const SeniorTeam = () => {
  useEffect(() => {
        console.log('component mounted');
    }, []);
  return (
    <div id="page">
      <HeaderComponents />
      <MetaTitle pageTitle={'Senior Team – Redwood Peak Limited'} />
      <div>
        <Image
          src={SeniorTeams}
          className="w-100 bannerHeight"
          alt="Senior Teams Banner"
        />
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="container-custom mt-1 mb-5 p-4">
          <h1 className="header-post-title-class">Senior Team</h1>
          <div className="mt-3">
            <p>
              <strong>
                <span style={{ color: '#823535' }}>
                  Kenneth Chiang, CFA – Managing Partner &amp; Chief Investment Officer
                </span>
              </strong>
              <br />
              Mr. Chiang is the Managing Partner, Chief Investment Officer, and founder of Redwood Peak.
              On July 1, 2014, Redwood Peak purchased 100% of Chilton Investment Company’s interest in
              its wholly-owned Hong Kong Subsidiary, Chilton Investment Company (HK) Ltd., where Mr. Chiang
              was Managing Director and Portfolio Manager of the Chilton China Opportunities Fund since 2007.
              Mr. Chiang has over 20 years of investment experience, with a proven record of outperformance
              in the industry. He has received numerous prestigious nominations and awards and has been
              recognized as a leading global investor. Before joining Chilton, Mr. Chiang spent 7 years at
              Merrill Lynch as a Managing Director and Portfolio Manager of the Merrill Lynch Global Small
              Cap Fund. Prior to that, Mr. Chiang was a Managing Partner at Samuel Asset Management for one
              year, and before that worked for 6 years at Merrill Lynch as the Co-Manager of the Emerging
              Market Fund. Mr. Chiang received a B.A. in Political Science from Stanford University and an
              M.B.A. from the Wharton School.
            </p>

            <p>
              <strong>
                <span style={{ color: '#823535' }}>
                  David Lee – Managing Director, Research
                </span>
              </strong>
              <br />
              David Lee is a Managing Director - Research at Redwood Peak. Mr. Lee has over 20 years of
              investing in Global EM &amp; Asia equity markets. Before joining Redwood Peak, Mr. Lee was the
              CIO at Samsung Asset Management HK. He was also the Asia Equity PM at The Rohatyn Group (TRG)
              in New York, an EM multi-asset hedge fund in NYC. Prior to that, Mr. Lee was the Lead PM for
              Lazard Asset Management’s Global EM fund in NYC. Mr. Lee received his BSE from the Wharton School
              at the University of Pennsylvania, and an M.B.A. from UCLA Anderson School of Management.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default SeniorTeam;
