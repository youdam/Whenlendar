import { React } from "react";
import { useLocation } from "react-router-dom";

const SearchingFunction = () => {


  const location = useLocation();
  console.log('내가 뭐로 받았더라? results', location.state.results );
  console.log('으어어', location.state); 

  const one = location.state;
  const two = location.state.results;
  console.log('근데 저거 리스트 일건데 ont ,' , one);
  console.log('근데 저거 리스트 일건데 tow ', two);

  

  //<BoardList data = {data} />

  const resultsElements = two.map((result, index) => {
    return (
      <div key={index}>
        <h1>{result.title}</h1>
        <p>{result.content}</p>
      </div>
    );
  });
  
  return (
    <>
      <div>
        {resultsElements}
      </div>
    </>
  );
}

export default SearchingFunction;