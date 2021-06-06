import StyleUser from '../styles/User.module.css';
import Image from 'next/image';
import Link from 'next/link';
function User({ user }) {
  return (
    <Link href={`/items/${user._id}`}>
      <div className={StyleUser.user}>
        <img className={StyleUser.image} src={user.image} />
        <div className={StyleUser.userInfo}>
          <h3>{user.name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default User;
