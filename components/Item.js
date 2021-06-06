import Image from 'next/image';
import { useContext, useState } from 'react';
import style from '../styles/Item.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ShoppingCardContext } from '../context/ShoppingCardContext';
const Item = ({ movie }) => {
  const { removeFromShoppingCard } = useContext(ShoppingCardContext);
  return (
    <div className={style.item}>
      <div>
        <Image
          src={movie.large_cover_image}
          alt='Picture of the movie'
          width={140}
          height={200}
        />{' '}
      </div>
      <div className={style.itemInfo}>
        <h3>{movie.title}</h3>
        <ul>
          <li>runtime : {movie.runtime} min.</li>
          <li>download number : {movie.download_count}</li>
        </ul>
        <ul>
          <li onClick={() => removeFromShoppingCard(movie)}>
            <DeleteIcon />
            <p>remove movie</p>
          </li>
          <li>
            <FavoriteIcon />
            <p>move to wish list</p>
          </li>
        </ul>
      </div>
      <div>
        <h3>${movie.download_count / 50}</h3>
      </div>
    </div>
  );
};

export default Item;
