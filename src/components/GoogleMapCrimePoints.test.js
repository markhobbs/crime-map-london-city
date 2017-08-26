import React from 'react';
import { shallow } from 'enzyme';
import GoogleMapCrimePoints from './GoogleMapCrimePoints';

describe('GoogleMapCrimePoints component', () => {

  it('Renders without crashing', () => {
    shallow(<GoogleMapCrimePoints />);
  });  


});