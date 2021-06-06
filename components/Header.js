import HeaderStyle from '../styles/Header.module.css';
import Link from 'next/link';
import { PaginationContext } from '../context/PaginationContext';
import { createRef, useContext, useEffect, useRef, useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { ShoppingCardContext } from '../context/ShoppingCardContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useComponentVisible from '../hooks/useComponentVisible';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Avatar } from '@material-ui/core';

function Header() {
  const { pageNumber, setPageNumber } = useContext(PaginationContext);
  const { shoppingCard } = useContext(ShoppingCardContext);
  const [session] = useSession();
  const resetPageNumber = () => {
    setPageNumber(2);
  };
  // import custom hook useComponentVisible :
  const { ref, toggle, setToggle } = useComponentVisible();
  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.logo}>
        <Link href='/'>
          <h2 onClick={resetPageNumber}>MovieStore</h2>
        </Link>
      </div>
      <ul className={HeaderStyle.nav}>
        <Link href='/'>Home</Link>
        <Link href='/servises'>Servises</Link>
        {session ? (
          <>
            {`hello, ${session.user.name.substr(
              0,
              session.user.name.indexOf(' ')
            )}`}
          </>
        ) : (
          <li onClick={signIn}>Login</li>
        )}
        <Link href='/shopping'>
          <Badge badgeContent={shoppingCard.length} color='primary'>
            <ShoppingCartIcon style={{ cursor: 'pointer' }} />
          </Badge>
        </Link>
        {session && (
          <li onClick={() => setToggle(prev => !prev)}>
            <MoreHorizIcon />
          </li>
        )}
      </ul>
      <ul
        ref={ref}
        className={toggle ? HeaderStyle.sidehide : HeaderStyle.sideshow}
      >
        <li className={HeaderStyle.signOut} onClick={signOut}>
          sign out
        </li>
      </ul>
    </div>
  );
}

export default Header;
