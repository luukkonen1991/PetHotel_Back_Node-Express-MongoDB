const locations = require('../../controllers/locations');
const Location = require('../../models/Location');
const httpMocks = require('node-mocks-http');
const newLocation = require('../mockData/new-location.json');

jest.mock('../../models/Location');

let req, res, next;
let locationId = '5d713995b721c3bb38c1f5d0';
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

// Unit test for GET locations
describe('locations.getLocations', () => {
  it('should have a getLocations function', () => {
    expect(typeof locations.getLocations).toBe('function');
  });
  it('should call findLocations', async () => {
    await locations.getLocations(req, res, next);
    expect(locations.getLocations).toHaveBeenCalledWith();
  });
  it('should return a response 200 and locations', async () => {
    location.getLocations
  });
});