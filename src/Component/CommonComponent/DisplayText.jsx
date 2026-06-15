import React from 'react';

function DisplayText({ text, highchartClick }) {
  return (

    <div dangerouslySetInnerHTML={{ __html: text }} onClick={highchartClick}></div>
  );
}

export default DisplayText;
