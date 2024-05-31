

const blogService = require('../services/blogService')


module.exports.index = async (req, res) => {
    const blogs = await blogService.getAllBlogs(req.query.type)
    res.render('blog', { blogs })
    // res.status(200).json(blogs);
}

module.exports.newForm = async (req, res) => {
    
        // res.status(200);
        return res.render('blog/new')

    // res.redirect('/blog')
}

module.exports.new =  async (req, res) => {
    try {
        const { topic,type, article } = req.body
        const url = req.file.path
        const filename = req.file.filename
        const blog = await blogService.addNewBlog( req.user.id, topic,type, url, filename, article)

        if (!blog) {
            req.flash('error', 'Some value is missing')
            return res.redirect('/blog')
        }
        req.flash('success', 'Blog successfully created')
        res.redirect('/blog')
        // res.status(201).send(blog);
    }
    catch (e) {
        req.flash('error', e.message)
        return res.redirect(`/blog`)
    }
}

module.exports.edit = async (req, res) => {
    try{
        const { topic, article, type } = req.body
        await blogService.editBlog(req.params.id, topic, article, type)
        return res.redirect(`/blog`)
    }catch(e){
        req.flash('error', 'Something went wrong')
        res.send(e)
        // return res.redirect(`/blog`)
    }
}

module.exports.editForm = async (req, res) => {
    try{
        const blog = await blogService.getBlog(req.params.id)
        if (!blog) {
            req.flash('error', 'Cannot find this blog')
            return res.redirect(`/blog`)
        }
        res.render('blog/edit', { blog })
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/blog`)
    }
}

module.exports.blogDetails = async (req, res) => {
    try{
        const blog = await blogService.getBlog(req.params.id)
        if (!blog) {
            req.flash('error', 'Cannot find this blog')
            return res.redirect(`/blog`)
        }
        res.render('blog/details', { blog })
    }catch(e){
        console.log(e)
        req.flash('error', 'Something went wrong')
        return res.redirect(`/blog`)
    }
}

module.exports.delete = async (req, res) => {
    try{
        const { id } = req.params;
        const blog = await blogService.getBlog(id)
        if (!blog) {
            req.flash('error', 'Cannot find this blog')
            return res.redirect(`/blog`)
        }
        await blogService.deleteBlog(id)
        req.flash('success', 'Blog deleted successfully')
        res.redirect('/blog')
    }catch(e){
        req.flash('error', 'Something went wrong')
        res.send(e)
        // return res.redirect(`/blog`)?\
    }
}