import Image from 'next/image';
export const getStaticProps = async () => {
  const res = await fetch('https://creat-api.herokuapp.com/demo/users');
  const items = await res.json();
  return {
    props: { data: items },
  };
};

export default function Items({ data }) {
  return (
    <div>
      <h1>user</h1>

      {data.map(user => (
        <h1>{user.url}</h1>
      ))}
    </div>
  );
}
