import StyleMovies from '../styles/Movies.module.css';
import Movie from './Movie';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

export default function Movies({ movies }) {
  return (
    <Container fixed className={StyleMovies.container}>
      <div className={StyleMovies.movies}>
        <Grid container>
          {movies.map(movie => {
            return (
              <Grid key={movie.id} item md={3} className={StyleMovies.item}>
                <Movie movie={movie} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Container>
  );
}
