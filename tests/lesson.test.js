const mongoose = require("mongoose");
const lessonService = require('../services/lessonService')

beforeEach(async () => {
  await mongoose.connect('mongodb://localhost:27017/music-page');
});

afterEach(async () => {
await mongoose.connection.close();

});



describe('Lessons ',  () => {
  it('should return all booked lessons', async () => {
    const lessons = await lessonService.bookedClasses('656cd50c9c2d692ff554a1d6')
    expect(lessons.length).toBeGreaterThan(0);
  });

  it('should cancel the lesson', async () => {
    await lessonService.cancelLesson('6629223bb43f1db735f342bb')
    const lesson = await lessonService.getLesson('6629223bb43f1db735f342bb')
    expect(lesson).toHaveProperty('status', 'Canceled');
  });
  
})








