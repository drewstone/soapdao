import './Body.css';
import React from 'react';

const Body = ({ children }: BodyProps): JSX.Element => (
  <>
    {children}
  </>
);

type BodyProps = {
  children: React.ReactNode;
};

export default Body;