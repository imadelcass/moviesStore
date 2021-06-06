import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Movies from '../../components/Movies';
import { PaginationContext } from '../../context/PaginationContext';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import style from '../../styles/page.module.css';

export default function Page_number({ movies, id }) {
  const [pageNumber, setPageNumber] = useState(id);
  const [disableBefore, setDisableBefore] = useState(false);
  // const [num , setNum] = useState(0);
  //each time the page_number change
  useEffect(() => {
    Number(id) == 1 ? setDisableBefore(true) : setDisableBefore(false);
  }, [id]);
  return (
    <div>
      <Movies movies={movies} />
      <div className={style.nextLast}>
        <Link href={`/page/${Number(id) - 1}`}>
          <button className={style.goBtn} disabled={disableBefore}>
            <NavigateBeforeIcon />
          </button>
        </Link>
        <Link href={`/page/${Number(id) + 1}`}>
          <button className={style.goBtn}>
            <NavigateNextIcon />
          </button>
        </Link>
      </div>
    </div>
  );
}
// the func it will rendred for every request :
export const getServerSideProps = async context => {
  const id = context.params.page_number;
  const req = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${id}`);
  const data = await req.json();
  const movies = data.data.movies;

  return {
    props: { movies, id },
  };
};
