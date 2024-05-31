const Blog = require('../models/blog')
const User = require('../models/user')
const { cloudinary } = require('../cloudinary')

module.exports.getAllBlogs = async (type)=>{
    if(type && type !== 'All'){    
        return await Blog.find({type: type}).populate('author')
    }
    return await Blog.find({}).populate('author')
}

module.exports.addNewBlog = async (id, topic,type, url, filename, article)=>{
    if (!topic || !article || !url || !filename || !type) {
        return undefined
    }
    const user = await User.findById(id)
    const blog = new Blog({ topic: topic, type: type, imageUrl: url, filename:filename, article: article, author: user })
    await blog.save()
    return blog
}

module.exports.getBlog = async (id)=>{
    return await Blog.findById(id).populate('author');
}

module.exports.editBlog = async (id, topic, article, type)=>{
    const blog = await Blog.findByIdAndUpdate(id, {topic: topic, article:article, type: type})
    await blog.save()
}

module.exports.deleteBlog = async (id)=>{
    const blog = await this.getBlog(id)
    await cloudinary.uploader.destroy(blog.filename)
    await Blog.findByIdAndDelete(id)
    // await Blog.deleteMany({_id: id})
}

