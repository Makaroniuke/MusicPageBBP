const Lesson = require('../models/lesson')
const User = require('../models/user')

module.exports.getLessonsDates = async ()=>{
    const lessons = await Lesson.find({}).populate('author').populate('feedbackTrack').sort('date')
    return lessons 
}

module.exports.getLesson= async (id)=>{
    const lesson = await Lesson.findById(id)    
    return lesson
}

module.exports.IsDateValid =  (date)=>{
    const lessons =  this.getLessonsDates()
     var currentDate = new Date();
     var finalDate = new Date();
     finalDate.setDate(currentDate.getDate() + 28);
    if(date === '' || new Date(date) === 'Invalid Date') return false

    if (new Date(date) >= currentDate && new Date(date) <= finalDate) {
        for(let i = 0; i < lessons.length; i++){
            if(lessons[i].date === date){
                return false
            }
        }
    } else{
        return false
    } 
    return true
}

module.exports.bookLesson = async (id, date, preferences)=>{
    const isValid = this.IsDateValid(date)
    if(isValid){
        const user = await User.findById(id)
        const lesson = new Lesson({ date: date, preferences: preferences.toString(), author: user })
        await lesson.save()
    }  
}

module.exports.bookedClasses = async (id)=>{
    const user = await User.findById(id)
    const lessons = await Lesson.find({author: user}).populate('feedbackTrack').sort('date')
    return lessons
}

module.exports.changeDate = async(id, date) =>{
    const isValid = this.IsDateValid(date)
    if(isValid){
        const lesson = await Lesson.findByIdAndUpdate(id, {date: date, status: 'Changed'})
        await lesson.save()
    } 
}

module.exports.cancelLesson = async(id) =>{
    const lesson = await Lesson.findByIdAndUpdate(id, {status: 'Canceled'})
    await lesson.save()
}