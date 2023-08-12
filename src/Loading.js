// Loading.js
import React from 'react';
import './App.css'; // if you have separate CSS file

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      {/* Add any additional loading text or graphics here */}
    </div>
  );
};

export default Loading;

// import React from 'react';
// import './App.css'; // Assuming the loading styles are here

// function Loading() {
//   return (
//     <div className="loading-overlay">
//       <div className="loading-spinner">
//         {/* You can place your spinner or loading animation here */}
//         Loading...
//       </div>
//     </div>
//   );
// }

// export default Loading;
