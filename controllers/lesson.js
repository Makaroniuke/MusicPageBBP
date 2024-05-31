
const lessonService = require('../services/lessonService')



module.exports.index = async (req, res)=>{
    const lessons = await lessonService.getLessonsDates()
    res.render('reservation/bookSession', {lessons})
}

module.exports.bookedClasses = async (req,res)=>{
    try{
        const lessons = await lessonService.bookedClasses(req.user.id)
        res.render('reservation/bookedClasses', {lessons})
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/lesson`)
    }
}

module.exports.allClasses = async (req,res)=>{
    try{
        const lessons = await lessonService.getLessonsDates()
        res.render('reservation/allClasses', {lessons})
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/lesson`)
    }
}

module.exports.changeDateForm = async (req,res)=>{
    try{
        const lesson = await lessonService.getLesson(req.params.id)
        const lessons = await lessonService.getLessonsDates()
        res.render('reservation/changeDate', {lesson, lessons})
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/lesson`)
    }
}

module.exports.changeDate = async (req, res) => {
    try{
        const { date } = req.body
        await lessonService.changeDate(req.params.id, date)
        req.flash('success', 'Lesson canceled successfully')
        res.redirect('/lesson')
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/lesson`)
    }
}

module.exports.cancelLesson = async (req, res) => {
    try{
        await lessonService.cancelLesson(req.params.id)
        req.flash('success', 'Lesson date changed successfully')
        res.redirect('/lesson')
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/lesson`)
    }
}


module.exports.webhook = async (req, res) => {
    let event = req.body
    if (event.type === 'checkout.session.completed') {
        const date = event.data.object.metadata.date;
        const pref = event.data.object.metadata.pref;
        const id = event.data.object.metadata.user_id;

        await lessonService.bookLesson(id, date, pref) 
    }
    res.send();
}