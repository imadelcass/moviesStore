import { createContext, useState } from 'react';

export const ShoppingCardContext = createContext();

export const ShoppingCardProvider = ({ children }) => {
  const [shoppingCard, setShoppingCard] = useState([]);
  const [moviesids, setMoviesIds] = useState([]);

  const [movieExistInCard, setMovieExistInCard] = useState(false);
  const [totalNet, setTotalNet] = useState(0);
  const [totalTTC, setTotalTTC] = useState(0);
  // add to shopping card
  function addToShoppingCard(movie) {
    setShoppingCard(prev => {
      return [movie, ...prev];
    });
    setMoviesIds(prev => {
      return [movie.id, ...prev];
    });
    // add price of movie to the total
    setTotalNet(prev => {
      return prev + movie.download_count / 50;
    });
    setTotalTTC(prev => {
      return prev + movie.download_count / 50;
    });
  }
  // remove from shopping card
  function removeFromShoppingCard(movie) {
    setShoppingCard(prev => prev.filter(item => item != movie));
    setMoviesIds(prev => prev.filter(item => item != movie.id));
    //remove price of that's movie from total Net
    setTotalNet(prev => {
      if (prev - movie.download_count / 50 <= 0) {
        return 0;
      } else {
        return prev - movie.download_count / 50;
      }
    });
    setTotalTTC(prev => {
      if (prev - movie.download_count / 50 <= 0) {
        return 0;
      } else {
        return prev - movie.download_count / 50;
      }
    });
  }
  // add shipping price to total
  function handleShipingSelect(value) {
    setTotalTTC(totalNet + value);
  }
  // check if movie exist
  const movieExist = id => {
    setMovieExistInCard(moviesids.includes(id));
    // setMovieExistInCard(shoppingCard.includes(id));
  };
  return (
    <ShoppingCardContext.Provider
      value={{
        shoppingCard,
        setShoppingCard,
        addToShoppingCard,
        movieExist,
        movieExistInCard,
        totalNet,
        totalTTC,
        handleShipingSelect,
        removeFromShoppingCard,
      }}
    >
      {children}
    </ShoppingCardContext.Provider>
  );
};

// some data
// [
//   {
//     id: 89,
//     title: 'A Good Marriage',
//     title_english: 'A Good Marriage',
//     slug: 'a-good-marriage-2014',
//     year: 2014,
//     rating: 5.3,
//     runtime: 102,
//     download_count: 102298,
//     like_count: 68,
//     description_intro:
//       "After 25 years of a good marriage, what will Darcy do once she discovers her husband's sinister secret?",
//     description_full:
//       "After 25 years of a good marriage, what will Darcy do once she discovers her husband's sinister secret?",
//     language: 'en',
//     mpa_rating: 'R',
//     background_image:
//       'https://yts.mx/assets/images/movies/a_good_marriage_2014/background.jpg',
//     background_image_original:
//       'https://yts.mx/assets/images/movies/a_good_marriage_2014/background.jpg',
//     small_cover_image:
//       'https://yts.mx/assets/images/movies/a_good_marriage_2014/small-cover.jpg',
//     medium_cover_image:
//       'https://yts.mx/assets/images/movies/a_good_marriage_2014/medium-cover.jpg',
//     large_cover_image:
//       'https://yts.mx/assets/images/movies/a_good_marriage_2014/large-cover.jpg',
//   },
//   {
//     id: 79,
//     title: 'biggles adventures',
//     title_english: 'A Good Marriage',
//     slug: 'biggles_adventures',
//     year: 2016,
//     rating: 5.3,
//     runtime: 1082,
//     download_count: 108298,
//     like_count: 8,
//     description_intro:
//       "After 25 years of a good marriage, what will Darcy do once she discovers her husband's sinister secret?",
//     description_full:
//       "After 25 years of a good marriage, what will Darcy do once she discovers her husband's sinister secret?",
//     language: 'en',
//     mpa_rating: 'R',
//     background_image:
//       'https://yts.mx/assets/images/movies/a_good_marriage_2014/background.jpg',
//     background_image_original:
//       'https://yts.mx/assets/images/movies/a_good_marriage_2014/background.jpg',
//     small_cover_image:
//       'https://yts.mx/assets/images/movies/biggles_adventures_in_time_1986/small-cover.jpg',
//     medium_cover_image:
//       'https://yts.mx/assets/images/movies/biggles_adventures_in_time_1986/medium-cover.jpg',
//     large_cover_image:
//       'https://yts.mx/assets/images/movies/biggles_adventures_in_time_1986/large-cover.jpg',
//   },
// ]
