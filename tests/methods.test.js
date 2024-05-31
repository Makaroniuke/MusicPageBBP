
const lessonService = require('../services/lessonService')


describe('Lesson date: valid or not', () => {
    it('should be NOT valid date',  () => {
      const isValid =  lessonService.IsDateValid('2024-04-22');
      expect(isValid).toBe(false);
    });
    it('should be NOT valid date',  () => {
      const isValid =  lessonService.IsDateValid('');
      expect(isValid).toBe(false);
    });
    it('should be NOT valid date',  () => {
      const isValid =  lessonService.IsDateValid('aaaa55');
      expect(isValid).toBe(false);
    });
    it('should be NOT valid date',  () => {
        const isValid =  lessonService.IsDateValid('2024-07-22');
        expect(isValid).toBe(false);
      });
    it('should be valid date',  () => {
        const isValid =  lessonService.IsDateValid('2024-05-17');
        expect(isValid).toBe(true);
    });
})