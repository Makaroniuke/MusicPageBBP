const mongoose = require("mongoose");
const userService = require('../services/userService')

beforeEach(async () => {
  await mongoose.connect('mongodb://localhost:27017/music-page');
});

afterEach(async () => {
await mongoose.connection.close();

});

describe('Users ',  () => {
    it('should create new user', async () => {
      const result = await userService.addUser('as@gmail.com', 'aaa', 'as')
      expect(result).toBe(true);
    });
  
    it('should NOT create new user', async () => {
        const result = await userService.addUser('aa@gmail.com', '', 'as')
        expect(result).toBe(false);
    });

    it('should NOT create new user', async () => {
        const result = await userService.addUser('aa@gmail.com', 'aaaaaaaaaaaaaaaaaaaaa', 'as')
        expect(result).toBe(false);
    });
    
  })