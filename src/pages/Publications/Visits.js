import React, { useEffect, useState } from 'react';
import NewsBanner from "../../Assetes/images/banner_news.png"
import Image from "../Component/ImagesComponets/ImagesComponets";
import HeaderComponents from '../Component/HeaderComponents/HeaderComponents';
import Footer from '../Component/Footer/Footer';
import News2 from "../../Assetes/images/news2.png";
import News3 from "../../Assetes/images/news3.jpeg";
import MetaTitle from '../Component/MetaTitleComponents/MetaTitleComponents';

const Visits = () => {
  // Define content for each news article in a map
  const contentMap = {
    '2023-1': '<h2>Sunshine Action for Elderly People</h2><p>This program focuses on providing assistance and companionship to elderly individuals in our community.</p>',
    '2023-2': '<h2>Sunshine Action for the Homeless</h2><p>This initiative aims to provide meals and shelter to hundreds of homeless individuals.</p>',
    '2022-1': '<h2>Redwood Peak Volunteers</h2><p>This organization collaborates with Sunshine Action to distribute food to the homeless, ensuring no one goes hungry.</p>',
  };

  // State to track which content is currently displayed
  const [selectedContent, setSelectedContent] = useState(contentMap['2023-1']); // Default content is for '2023-1'

  useEffect(() => {
        console.log('component mounted');
    }, []);
  // Function to update content based on selected key
  const updateContent = (key) => {
    setSelectedContent(contentMap[key] || '<p>No content available.</p>');
  };

  return (
    <div>
        <HeaderComponents/>
        <MetaTitle pageTitle={'Visits – Redwood Peak Limited'} />
      <div>
        <Image
          src={NewsBanner}
          className="w-100 bannerHeight"
          alt="News Banner"
        />
      </div>

      <div className="container">
        <div className="container-custom mt-1 mb-5 p-4">
          <h1 className="header-post-title-class" style={{ top: 0 }}>
            Visits
          </h1>

          <div className="row">
            <div className="col-md-3">
              <div>
                {/* Year 2023 */}
                <div id="year-2023" className="mt-3 mb-4">
                  <div
                    className="year-header"
                    onClick={() => updateContent('2023-1')}
                    style={{ cursor: 'pointer' }}
                  >
                    2023
                  </div>
                  <div className="mt-4">
                    <div
                      className="pdf-row mb-3"
                      onClick={() => updateContent('2023-1')}
                    >
                      <div className="pdf-title row">
                        
                        <div className="col-md-12">
                          Sunshine Action for elderly people
                        </div>
                      </div>
                    </div>
                    <div
                      className="pdf-row mb-3"
                      onClick={() => updateContent('2023-2')}
                    >
                      <div className="pdf-title row">
                        <div className="col-md-3">
                           <Image
                           src={News2}
                           alt="News1"
                           style={{ width: '50px' }}
                           />
                        </div>
                        <div className="col-md-9">
                          Sunshine Action for hundreds of homeless people
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Year 2022 */}
                <div id="year-2022" className="mt-3 mb-3">
                  <div
                    className="year-header"
                    onClick={() => updateContent('2022-1')}
                    style={{ cursor: 'pointer' }}
                  >
                    2022
                  </div>
                  <div className="mt-4">
                    <div
                      className="pdf-row mb-3"
                      onClick={() => updateContent('2022-1')}
                    >
                      <div className="pdf-title row">
                        <div className="col-md-3">
                        <Image
                           src={News3}
                           alt="News 3"
                           style={{ width: '50px' }}
                           />
                        </div>
                        <div className="col-md-9">
                          Redwood Peak Volunteers with Sunshine Action to Distribute Food to the Homeless
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="mt-5">
                <div
                  id="contentDisplay"
                  dangerouslySetInnerHTML={{ __html: selectedContent }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Visits;
