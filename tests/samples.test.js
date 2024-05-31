const samplesService = require('../services/samplesService')
const mongoose = require("mongoose");

beforeEach(async () => {
  await mongoose.connect('mongodb://localhost:27017/music-page');
});

afterEach(async () => {
await mongoose.connection.close();

});

describe('checking if data valid or not', () => {
    it('should accept data',  () => {
      const isValid =  samplesService.isSampleDataValid('aaa', 'aaaa');
      expect(isValid).toBe(true);
    });
    it('should NOT accept data',  () => {
        const isValid =  samplesService.isSampleDataValid('', 'aaaaaa');
        expect(isValid).toBe(false);
    });
    it('should NOT accept data',  () => {
      const isValid =  samplesService.isSampleDataValid('aaa', 'aaaaaaaaaaa');
      expect(isValid).toBe(false);
    });
  
    
})

describe('Samples', () => {
  it('should return EMPTY list', async () => {
    const samples = await samplesService.getSamples('Synth');
    expect(samples).toHaveLength(0);
  });
  it('should return list', async () => {
    const samples = await samplesService.getSamples('Drums');
    expect(samples.length).toBeGreaterThan(0);
  });
  

  

})