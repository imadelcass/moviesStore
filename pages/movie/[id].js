import movieInfoStyle from '../../styles/movieInfo.module.css';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Movie from '../../components/Movie';
import GenreMovie from '../../components/GenreMovie';
import { ShoppingCardContext } from '../../context/ShoppingCardContext';
import { Container, Grid } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const movieInfo = ({ movie, suggestions }) => {
  // shopping list context
  const { shoppingCard, addToShoppingCard, movieExistInCard, movieExist } =
    useContext(ShoppingCardContext);
  const { data } = suggestions;
  // check if movie exist in shopping card
  useEffect(() => {
    movieExist(movie.id);
  }, [shoppingCard, movie]);

  // full desc into array of strings
  let descMovie = movie.description_intro.split(' ');
  // handle show more or show less of description
  const [showMore, setShowMore] = useState(true);
  return (
    <Container fixed className={movieInfoStyle.container}>
      <Grid container>
        <Grid item md={6} className={movieInfoStyle.grid}>
          <div className={movieInfoStyle.cover}>
            <Image src={movie.medium_cover_image} width={250} height={400} />
          </div>
        </Grid>
        <Grid item md={6} className={movieInfoStyle.grid}>
          <h1 className={movieInfoStyle.name}>
            {movie.title}
            <small> {movie.year}</small>
          </h1>
          <div className={movieInfoStyle.undername}>
            <div>
              <h3>{movie.mpa_rating}</h3>
            </div>
            <div>
              <h3>{movie.rating}</h3>
            </div>
            <div>
              <h3>{movie.runtime}min</h3>
            </div>
            <div>
              <h3>{movie.language}</h3>
            </div>
          </div>
          <div className={movieInfoStyle.genres}>
            {movie.genres.map(genre => {
              return <GenreMovie key={genre} genre={genre} row={true} />;
            })}
          </div>
          <Grid container className={movieInfoStyle.info}>
            <Grid item md={3}>
              <ThumbUpAltIcon />
              <h3>{movie.like_count}</h3>
            </Grid>
            <Grid item md={1}>
              |
            </Grid>
            <Grid item md={3}>
              <CloudDownloadIcon />
              <h3>{movie.download_count}</h3>
            </Grid>
          </Grid>
          <div className={movieInfoStyle.add}>
            <button className={movieInfoStyle.buy}>
              <label>buy now</label>
              <ShoppingBasketIcon />
            </button>
            <button
              disabled={movieExistInCard}
              onClick={() => addToShoppingCard(movie)}
              className={movieInfoStyle.tolist}
            >
              <label>add to list</label>
              <ShoppingCartIcon />
            </button>
          </div>
          <div className={movieInfoStyle.screenshots}>
            <Grid container spacing={1}>
              <Grid item md={4}>
                <Image
                  src={movie.large_screenshot_image1}
                  width={150}
                  height={100}
                />
              </Grid>
              <Grid item md={4}>
                <Image
                  src={movie.large_screenshot_image2}
                  width={150}
                  height={100}
                />
              </Grid>
              <Grid item md={4}>
                <Image
                  src={movie.large_screenshot_image3}
                  width={150}
                  height={100}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={6} className={movieInfoStyle.grid}>
          <div className={movieInfoStyle.description}>
            <h2>description</h2>

            {descMovie.length <= 1 ? (
              <p>{'Not found'}</p>
            ) : descMovie.length <= 25 ? (
              <p>
                {[...Array(descMovie.length)].map((x, i) => {
                  return <span key={i}>{`${descMovie[i]} `}</span>;
                })}
              </p>
            ) : (
              <p>
                {[...Array(showMore ? 25 : descMovie.length)].map((x, i) => {
                  return <span key={i}>{`${descMovie[i]} `}</span>;
                })}
                <span
                  onClick={() => setShowMore(!showMore)}
                  className={movieInfoStyle.showMore}
                >
                  {showMore ? 'show more...' : 'show less.'}
                </span>
              </p>
            )}
            {/* {descMovie.length <= 25 ? (
              <p>
                {[...Array(descMovie.length)].map((x, i) => {
                  return <span key={i}>{`${descMovie[i]} `}</span>;
                })}
              </p>
            ) : (
              <p>
                {[...Array(showMore ? 25 : descMovie.length)].map((x, i) => {
                  return <span key={i}>{`${descMovie[i]} `}</span>;
                })}
                <span
                  onClick={() => setShowMore(!showMore)}
                  className={movieInfoStyle.showMore}
                >
                  {showMore ? 'show more...' : 'show less.'}
                </span>
              </p>
            )} */}
          </div>
          <div className={movieInfoStyle.castsWrapper}>
            <h2>casts</h2>
            <div className={movieInfoStyle.casts}>
              {movie.cast == undefined
                ? 'not found'
                : movie.cast.map(cast => {
                    return (
                      <div key={cast.imdb_code} className={movieInfoStyle.cast}>
                        <img
                          src={
                            cast.url_small_image == undefined
                              ? 'https://joyonlineschool.com/static/emptyuserphoto.png'
                              : cast.url_small_image
                          }
                        />
                        <h4>{cast.name}</h4>
                      </div>
                    );
                  })}
            </div>
          </div>
        </Grid>
        <Grid item md={6} className={movieInfoStyle.recommended}>
          <Grid container>
            {data.movies.map(movie => {
              return (
                <Grid key={movie.id} item md={6}>
                  <Movie movie={movie} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default movieInfo;
// the func it will rendred this page on each request     :
export const getServerSideProps = async context => {
  const res = await fetch(
    `https://yts.mx/api/v2/movie_details.json?movie_id=${context.params.id}&with_images=true&with_cast=true`
  );
  const data = await res.json();
  const movie = data.data.movie;
  const res1 = await fetch(
    `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${context.params.id}`
  );
  const suggestions = await res1.json();
  return {
    props: {
      movie,
      suggestions,
    },
  };
};
