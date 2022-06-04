const express = require('express');
const articleRouter = require('./routes/articles')
const Article = require("./models/article-model")
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express()

mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// view engine
app.set('view engine', 'ejs' )


app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))



app.get('/', async (req,res)=>{
    const article  = await  Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: article})

})

app.use('/articles',articleRouter)

app.listen(5000, (req,res)=>{
    console.log(`server starting at port 5000.....`);
})