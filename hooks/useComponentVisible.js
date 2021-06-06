import { useState, useRef, useEffect } from 'react';

const useComponentVisible = () => {
  const [toggle, setToggle] = useState(true);
  const ref = useRef(null);

  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) setToggle(true);
  };

  useEffect(() => {
    //add click event listener to document
    if (!toggle) {
      document.addEventListener('click', handleClick);
    }
    //remove click event listener from the document
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return { ref, toggle, setToggle };
};
export default useComponentVisible;
