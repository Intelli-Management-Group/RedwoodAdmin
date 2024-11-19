import React, { useEffect } from "react";
import Footer from '../Component/Footer/Footer';
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import OurMissionBanner from "../../Assetes/images/about-slider.jpg"
import Image from "../Component/ImagesComponets/ImagesComponets";
import { Link } from "react-router-dom";
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";
const ManagedAccount = () => {
    useEffect(() => {
        console.log('component mounted');
    }, []);
    return (
        <div id="page">
            <HeaderComponents />
            <MetaTitle pageTitle={'Managed Account'} />
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
                    <h1 className="header-post-title-class">Managed Account</h1>

                    <div class="mt-3">
                        <p>
                            Leveraging on our research and investment capabilities, we provide managed account services. We partner with our clients and customize the investment strategy to achieve their unique investment goals. Our platform allows us to offer high quality and tailored investment and advisory services. Investors have engaged us to manage a combination of these portfolios:
                        </p>
                        <ol>
                            <li>
                                China Portfolio – A concentrated China-focused portfolio of up to 15
                                high-quality companies which have long-term capital appreciation potential.
                            </li>
                            <li>
                                Sequoia Portfolio – A concentrated global portfolio of up to 25 high-quality
                                companies which have long-term capital appreciation potential.
                            </li>
                            <li>
                                Sprout Portfolio – A&nbsp;diversified global portfolio of up to 30 high
                                return small cap companies which have the potential for capital appreciation.
                            </li>
                            <li>
                                Offshore Dividend Income Portfolio – A diversified global portfolio of up
                                to 30 income producing, steady cash flow and dividend generating companies
                                providing an average gross yield (before taxes) of&nbsp;greater than 5%.
                            </li>
                        </ol>
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

export default ManagedAccount;
