const mongoose = require("mongoose");
const feedbackService = require('../services/feedbackService')

beforeEach(async () => {
  await mongoose.connect('mongodb://localhost:27017/music-page');
});

afterEach(async () => {
await mongoose.connection.close();

});

describe('Feedback ',  () => {
    it('should return track with feedback', async () => {
      const track = await feedbackService.getTrackWithFeedback('66293452cd694ab890207ca1')
      expect(track).toHaveProperty('name', 'name');
    });
  
  })
