import Link from 'next/link';
import Image from 'next/image';
import StyleMovie from '../styles/Movie.module.css';
import GenreMovie from './GenreMovie';
function Movie({ movie }) {
  return (
    <div className={StyleMovie.movie} key={movie.id}>
      <Link href={`/movie/${movie.id}`}>
        <div className={StyleMovie.movie__imgWrapper}>
          <Image
            src={movie.medium_cover_image}
            alt='Picture of the movie'
            width={200}
            height={280}
          />
          <div className={StyleMovie.movie__genres}>
            {movie.genres == undefined
              ? ''
              : movie.genres.length <= 3
              ? movie.genres.map(genre => {
                  return <GenreMovie key={genre} genre={genre} row={false} />;
                })
              : [...Array(3)].map((x, i) => (
                  <GenreMovie
                    key={movie.genres[i]}
                    genre={movie.genres[i]}
                    row={false}
                  />
                ))}
          </div>
        </div>
      </Link>
      <div className={StyleMovie.movie__title}>
        <h5>
          {movie.title_english == '' ? 'Title not found' : movie.title_english}
          <span>{' (' + movie.language + ' ' + movie.year + ')'}</span>
        </h5>
      </div>
    </div>
  );
}

export default Movie;
