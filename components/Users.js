import User from './User';
import StyleUsers from '../styles/Users.module.css';

export default function Users({ users }) {
  return (
    <div className={StyleUsers.users}>
      {users.map(user => (
        <User user={user} />
      ))}
    </div>
  );
}
