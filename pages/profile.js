import { useSession } from 'next-auth/client';

const profile = () => {
  const [session] = useSession();
  console.log(session);

  return <div>{session ? `hello, ${session.user.name}` : 'login first'}</div>;
};

export default profile;
