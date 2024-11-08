import React from 'react';
import useGetApi from '../customHooks/useGetApi';

const UsingCustomHook: React.FC = () => {
  const { error, isLoading, data }: any = useGetApi(
    'https://jsonplaceholder.typicode.com/comments'
  );

  if (error) {
    return <p>Error: {error && error.meassage}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data?.map((comment: any) => (
        <div key={comment.id}>{comment.nameg}</div>
      ))}
    </>
  );
};

export default UsingCustomHook;
