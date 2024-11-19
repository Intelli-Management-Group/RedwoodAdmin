import React, { useEffect } from "react";
import Footer from '../Component/Footer/Footer';
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import OurMissionBanner from "../../Assetes/images/about-slider.jpg"
import Image from "../Component/ImagesComponets/ImagesComponets";
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";
const OurApproach = () => {
    useEffect(() => {
        console.log('component mounted');
    }, []);
    return (
        <div id="page">
            <HeaderComponents />
            <MetaTitle pageTitle={'Our Approach – Redwood Peak Limited'}/>
            <div>
                <Image
                    src={OurMissionBanner}
                    className="w-100 bannerHeight"
                    alt="OverView Banner"
                />
            </div>

            {/* Main Content */}
            <div className="container">
                <div className="container-custom mt-1 mb-5 p-4">
                    <h1 className="header-post-title-class">Our Approach</h1>

                    <div class="mt-3">
                        <p>
                            Our investment process begins with identifying mispriced companies relative to their intrinsic value. The investment team internally generates research ideas by identifying high quality companies through meetings and screening securities. Using our extensive local network we meet managements, industry experts and assess a company’s ability to generate superior returns. We look for high quality managements who know how to run their companies well, and understand how to generate a cash return on capital above their cost of capital. We look for businesses which demonstrate strong competitive advantages through high barriers to entry, including technological, cost, brand or distribution advantages. Finally, we like to buy companies at a discount and we aim to invest in companies where we can see 50% upside to their intrinsic value. Analysts make written and oral recommendations which the portfolio manager weighs based on the level of conviction and risk to the overall portfolio. The investment team continues to monitor progress in portfolio companies while the portfolio manager in conjunction with the risk manager monitors overall portfolio risk.
                        </p>
                        <p class="text-center mt-5 mb-5">
                             <Image
                                // decoding="async" 
                                className="aligncenter size-full wp-image-2037 w-100" 
                                src={`https://www.redwoodpeak.com/wp-content/uploads/2015/04/risk_management.png`}
                                alt="investment-approach" />
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default OurApproach;
