export const getStaticPaths = async () => {
  const res = await fetch('https://creat-api.herokuapp.com/demo/users');
  const data = await res.json();

  const paths = data.map(item => {
    return {
      params: { profile: item._id.toString() },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};
export const getStaticProps = async context => {
  const id = context.params.profile;
  const res = await fetch('https://creat-api.herokuapp.com/demo/users/' + id);
  const data = await res.json();
  return {
    props: {
      user: data,
    },
  };
};

function profile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  );
}
export default profile;
