import React, { useEffect } from "react";
import Footer from '../Component/Footer/Footer';
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import OurMissionBanner from "../../Assetes/images/about-slider.jpg"
import Image from "../Component/ImagesComponets/ImagesComponets";
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";
const OverView = () => {
    useEffect(() => {
        console.log('component mounted');
    }, []);
    return (
        <div id="page">
            <HeaderComponents />
            <MetaTitle pageTitle={'Overview – Redwood Peak Limited'} />
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
                    <h1 className="header-post-title-class">Overview</h1>

                    <div class="mt-3">
                        <p>
                            Redwood Peak is a Hong Kong-based asset manager focused on fund management and separate account management for high net worth individuals, family offices, and institutions. Redwood Peak Limited was founded in 2007 as the Chilton Investment Company (HK) Limited and was spun off in a management buyout on 1st July 2014. Redwood Peak is regulated by the Securities and Futures Commission of Hong Kong (Type 4 Advising on securities and Type 9 Asset Management license). We invest capital for clients through a Hedge Fund and Managed Account platforms.
                        </p>
                        <p>
                                Our investment process begins with identifying mispriced companies relative to their intrinsic value. In addition, we evaluate the quality and durability of a company’s business, the track record of a management team, and the underlying industry and macroeconomic trends. Redwood Peak’s investment edge is our extensive local network of relationships built over 45 years of combined investment experience. Our approach to portfolio construction involves risk assessment balanced with portfolio concentration versus diversification.
                        </p>
                        <h3 class="fancytitle">
                            <em>“Our paramount objective is to serve our client’s investment goals.”</em>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default OverView;
