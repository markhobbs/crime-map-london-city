import React from 'react';
import { shallow } from 'enzyme';
import AsyncGoogleMap from './AsyncGoogleMap';

describe('AsyncGoogleMap component', () => {
  
    it('Renders without crashing', () => {
      shallow(<AsyncGoogleMap />);
    });  
  
});