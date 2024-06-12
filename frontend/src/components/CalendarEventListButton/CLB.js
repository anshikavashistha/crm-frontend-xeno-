import React from 'react';
import './CalendarEventListButton.css';

function CalendarEventListButton ({ isListCell, showShortList, showFullList }){
    return (
      <>
        <li
          key='show more'
          className='callender__event-item-wrapper event-item-wrapper_more '
        >
          {isListCell === 'short' ? (
            <button
              className='callender__event callender__event_more'
              onClick={showFullList}
            >
              More
            </button>
          ) : null}

          {isListCell === 'full' ? (
            <button
              className='callender__event callender__event_more'
              onClick={showShortList}
            >
              Collapse
            </button>
          ) : null}
        </li>
      </>
    );
};

export default CalendarEventListButton;