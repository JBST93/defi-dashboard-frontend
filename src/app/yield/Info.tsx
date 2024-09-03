import React from 'react';

interface props {
  value: number;
  title: string;
}

export default function Info(props: any) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.value}</p>
    </>
  );
}
