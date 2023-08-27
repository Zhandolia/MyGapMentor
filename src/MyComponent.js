// import React, { useState } from 'react';
// import axios from 'axios';

// const MyComponent = () => {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevents the default form submission behavior

//     try {
//       const result = await axios.post('/api/generate-activities', {
//         userInput: prompt,
//       });

//       setResponse(result.data.activities);
//     } catch (error) {
//       console.error('An error occurred while fetching data:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Enter your prompt:
//         <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
//       </label>
//       <button type="submit">Submit</button>
//       {response && <div>Response: {response}</div>}
//     </form>
//   );
// };

// export default MyComponent;
