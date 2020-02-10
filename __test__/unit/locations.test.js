const locations = require('../../controllers/locations');
const Location = require('../../models/Location');
const httpMocks = require('node-mocks-http');
const newLocation = require('../mockData/new-location.json');

jest.mock('../../models/Location');

let req, res, next;
let locationId = '5d713995b721c3bb35c1f5d0';
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

// Unit test for GET locations
describe('locations.getLocations', () => {
  it('should have a getLocations function', () => {
    expect(typeof locations.getLocations).toBe('function')
  });
});