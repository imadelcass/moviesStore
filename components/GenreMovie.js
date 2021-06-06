import StyleGenre from '../styles/Genre.module.css';
const GenreMovie = ({ genre, row }) => {
  return (
    <div
      className={!row ? StyleGenre.movie__genre : StyleGenre.movie__genreRow}
    >
      <h4>{genre}</h4>
    </div>
  );
};

export default GenreMovie;
