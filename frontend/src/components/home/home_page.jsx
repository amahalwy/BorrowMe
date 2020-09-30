import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import SearchBar from './home_search_bar';
import PostingsIndex from '../postings/postings_index';
import HomeTagSearchBar from './home_tag_search_bar';
import {clearPostings, fetchPostings} from '../../actions/posting_actions';
import Modal from '../modal/modal';
import PostingShow from '../postings/posting_show';
import EditPosting from "../postings/edit_posting";
import { clearModal } from "../../actions/posting_actions";


export default props => {
  const errors = useSelector((state) => state.errors.session);
  const posting = useSelector(state => state.entities.modal);

  const [input, setInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [postingList, setPostingList] = useState();
  const [filterList, setFilterList] = useState();

  const dispatch = useDispatch();

  const updateInput = (input) => {
    const filtered = postingList.filter((posting) => {
      if (input === "") {
        return posting;
      } else {
        return posting.title.toLowerCase().includes(input.toLowerCase());
      }
    });
    setInput(input);
    setFilterList(filtered);
  };

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>{errors[error]}</li>
        ))}
      </ul>
    );
  };

  const updateTagInput = (input) => {
    const filtered = postingList.filter((posting) => {
      if (input === "") {
        return posting;
      } else {
        return posting.tags.some((tag) =>
          tag.toLowerCase().includes(input.toLowerCase())
        );
      }
    });
    setTagInput(input);
    setFilterList(filtered);
  };

  const fetchData = () => {
    return fetch("/api/postings")
      .then((response) => response.json())
      .then((data) => {
        setFilterList(data);
        setPostingList(data);
      });
  };

  useEffect(() => {
    dispatch(clearPostings());
    fetchData();
    dispatch(fetchPostings());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [openModal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    dispatch(clearModal());
  };
 
  if (!posting) return '';
  return (
    <div>
    <div className="home-container">
      <Modal show={openModal} handleClose={hideModal}>
            <PostingShow posting={posting} hideModal={hideModal} />
      </Modal>
      
      {renderErrors()}
      {/* <div className="home-filter"> */}
      <div className="home-tag-search-bar"></div>
      {/* <div className="side-engineers-container">
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
        </div> */}
      {/* </div> */}

      <div className="home-index">
        <div className="search-container">
          <div>
            <SearchBar input={input} setKeyword={updateInput} />
          </div>
          <div className="tag-container">
            <HomeTagSearchBar input={tagInput} setKeyword={updateTagInput} />
          </div>
        </div>
        <div>
          <PostingsIndex
            filterList={filterList}
            hideModal={hideModal}
            showModal={showModal}
          />
        </div>
        
      </div>
    </div>
  </div>
  );
}