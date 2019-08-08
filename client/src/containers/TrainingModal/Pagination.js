import React from 'react';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ length, page, previousPage, nextPage }) => {
  let pageArray = [...Array(length).keys()]; // create an array of numbers based on length of the training array
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Button className="page-link" action="button" aria-label="Previous"><FontAwesomeIcon icon={faAngleLeft}/></Button>
        </li>
        {pageArray.map(pageNum => {
          return <li className="page-item" key={pageNum}>{pageNum + 1}</li>
        })}
        <li className="page-item">
          <Button className="page-link" action="button" aria-label="Next"><FontAwesomeIcon icon={faAngleRight}/></Button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;