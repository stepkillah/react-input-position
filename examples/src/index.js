import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import ImageExample from './ImageExample';
import ExampleContainer from './ExampleContainer';
import PropsExample from './PropsExample';
import Header from './Header';

import './style.css';

const DemoApp = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="app">
        <ExampleContainer title="Basic Demo">
          <PropsExample />
        </ExampleContainer>
        <ExampleContainer title="Example Usage">
          <ImageExample />
        </ExampleContainer>
      </div>
    </React.Fragment>
  );
};
const root = createRoot(document.getElementById('root'));
root.render(<DemoApp />);
