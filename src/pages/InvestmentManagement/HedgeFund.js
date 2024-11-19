import React, { useEffect } from "react";
import Footer from '../Component/Footer/Footer';
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import OurMissionBanner from "../../Assetes/images/about-slider.jpg"
import Image from "../Component/ImagesComponets/ImagesComponets";
import { Link } from "react-router-dom";
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";
const HedgeFund = () => {
    useEffect(() => {
        console.log('component mounted');
    }, []);
    return (
        <div id="page">
            <HeaderComponents />
            <MetaTitle pageTitle={'Hedge Fund'}/>

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
                    <h1 className="header-post-title-class">Hedge Fund</h1>

                    <div class="mt-3">
                        <p>
                            Redwood Peak Opportunities Fund (the “Fund”)* is an Equity, Long-Short Fund launched in January 2007, formerly known as the Chilton China Opportunities Fund.  The Fund aims to produce superior investment returns throughout various market cycles by investing in companies located in or with exposure to the China region.  Redwood Peak seeks capital appreciation during favorable market conditions while preserving capital in times of financial duress.  The Fund uses a value approach and has a net long bias, but utilizes shorts for both alpha generation and hedging purposes.
                        </p>
                        <p>
                            The Fund’s research process is based upon bottom-up, fundamental analysis that typically targets companies with four main characteristics: high-quality management teams, strong business franchises, high barriers to entry through brand, scale or technology, and reasonable valuations. The Fund primarily invests in publicly traded equities but has the flexibility to invest in derivatives and other securities.
                        </p>
                        <p>
                            The Fund is only available to institutions, family offices and high net worth individuals who qualify as Professional Investors as defined by the Securities and Futures Commission.
                        </p>
                        <p>
                            <em>
                                * Please
                                <Link
                                   className="ps-2 pe-2"
                                   to="/contact-us"
                                    style={{
                                        textDecoration: 'none',
                                        padding: '0',
                                        color: '#823535',
                                        margin: '0',
                                    }}
                                >
                                    contact us
                                </Link>
                                or register for further details on the fund.
                            </em>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default HedgeFund;
