import { useState } from 'react';
import Head from 'next/head';
import Movies from '../components/Movies';
import indexStyle from '../styles/index.module.css';
import { Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import style from '../styles/page.module.css';

export default function Home({ movies }) {
  const [list, setList] = useState(movies);
  const [inputvalue, setInputvalue] = useState('');

  // handle the input from the user
  const handleInput = e => {
    setInputvalue(e.target.value);
    console.log(inputvalue);
    // set the list every time the input value change :
    setList(
      movies.filter(movie => {
        if (movie.title_english.toLowerCase().includes(inputvalue)) {
          return movie;
        }
      })
    );
  };

  return (
    <div>
      <Head>
        <title>next</title>
      </Head>
      <Grid container>
        <Grid item sm={12} className={indexStyle.search}>
          <input value={inputvalue} onChange={handleInput} />
          <SearchIcon className={indexStyle.searchIcon} />
        </Grid>
      </Grid>
      <Movies movies={list} />
      <div className={style.nextLast}>
        <button className={style.goBtn} disabled={true}>
          <NavigateBeforeIcon />
        </button>
        <Link href={`/page/2`}>
          <button className={style.goBtn}>
            <NavigateNextIcon />
          </button>
        </Link>
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const req = await fetch(`https://yts.mx/api/v2/list_movies.json`);
  const data = await req.json();
  const movies = data.data.movies;
  return {
    props: { movies },
  };
};
