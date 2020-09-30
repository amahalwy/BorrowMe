import React from 'react';

const HomeFooter = (props) => {

return (
   <div className="footer-container">
          <h3 className="meet-the-engineers">Meet the team!</h3>

          <div className="engineer-info">
            <p className="engineer-name">
              Ahmed El Mahallawy <br /> Team Lead
            </p>
            <div className="links-image-container">
              <div className="links">
                <a className="links" href="https://github.com/amahalwy">
                  GitHub
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.linkedin.com/in/ahmed-elmahallawy-11a87191/"
                >
                  LinkedIn
                </a>
              </div>
              <div className="engineer-image">
                <img
                  src="https://borrowme-pro.s3.us-east-2.amazonaws.com/ahmed.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="engineer-quotes">
              <p className="italicize-quote">
                “Aside from working and leading a great group of people, I
                really enjoyed building the auto-updating search functionality;
                it’s so awesome!!”
              </p>
              <span>- Ahmed</span>
            </div>
          </div>

          <div className="engineer-info">
            <p className="engineer-name">
              Ayce Lacap <br /> Backend Operations
            </p>
            <div className="links-image-container">
              <div className="links">
                <a className="links" href="https://github.com/aycelacap">
                  GitHub
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.linkedin.com/in/ayce-lacap-00/"
                >
                  LinkedIn
                </a>
              </div>
              <div className="engineer-image">
                <img
                  src="https://borrowme-pro.s3.us-east-2.amazonaws.com/ayce-pp.png"
                  alt=""
                />
              </div>
            </div>
            <div className="engineer-quotes">
              <p className="italicize-quote">
                “I enjoyed working with implementing the CRUD features, namely,
                update and delete. I am most proud of working collaboratively
                with our team.”
              </p>
              <span> - Ayce</span>
            </div>
          </div>

          <div className="engineer-info">
            <p className="engineer-name">
              Nate Gallagher <br /> Frontend Operations
            </p>
            <div className="links-image-container">
              <div className="links">
                <a className="links" href="https://github.com/n8gallagher">
                  GitHub
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.linkedin.com/in/n8gallagher/"
                >
                  LinkedIn
                </a>
              </div>
              <div className="engineer-image">
                <img
                  src="https://borrowme-pro.s3.us-east-2.amazonaws.com/nate.png"
                  alt=""
                />
              </div>
            </div>
            <div className="engineer-quotes">
              <p className="italicize-quote">
                "I sharpened my frontend and styling abilities on this project.
                I'm proud of our workflow improvements over the course of the
                project"
              </p>
              <span>- Nate</span>
            </div>
          </div>

          <div className="engineer-info">
            <p className="engineer-name">
              Sean Scott <br /> Frontend Operations
            </p>
            <div className="links-image-container">
              <div className="links">
                <a className="links" href="https://github.com/seanscott23">
                  GitHub
                </a>
                <br />
                <a
                  className="links"
                  href="https://www.linkedin.com/in/sean-scott-708821b7/"
                >
                  LinkedIn
                </a>
              </div>
              <div className="engineer-image">
                <img
                  src="https://borrowme-pro.s3.us-east-2.amazonaws.com/sean.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="engineer-quotes">
              <p className="italicize-quote">
                "I’m most proud of my work on the frontend. More specifically,
                my work on the index page as well as the different modals we
                used in the project."
              </p>
              <span> - Sean </span>
            </div>
          </div>
        </div> 
)
}

export default HomeFooter;