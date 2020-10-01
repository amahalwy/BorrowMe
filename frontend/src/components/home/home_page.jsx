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
    // <div>
      <div className="home-container">
        <Modal show={openModal} handleClose={hideModal}>
          <PostingShow posting={posting} hideModal={hideModal} />
        </Modal>
        {renderErrors()}
        <div className="search-container">
          <div className='title-container'>
            <SearchBar input={input} setKeyword={updateInput} />
          </div>
          <div className="tag-container">
            <HomeTagSearchBar input={tagInput} setKeyword={updateTagInput} />
          </div>
        </div>
        <div className="home-index">
          <div>
            <PostingsIndex
              filterList={filterList}
              hideModal={hideModal}
              showModal={showModal}
            />
          </div>
          
        </div>
      </div>
  );
}