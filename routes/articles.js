const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const Article =  require("../models/article-model")



router.get('/', (req,res)=>{
    console.log(`a yo`);
    res.send('kina hero bhako bhai');
})

router.get('/new',  (req,res)=>{
    res.render('articles/new', {article: new Article()})
})

router.get('/edit/:id',  async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})

})

router.post('/', async(req,res, next)=>{
    req.article = new Article()
    next()
}, saveAndRedirect('new'))

router.put('/:id', async(req,res, next)=>{
    req.article = await  Article.findById(req.params.id)
    next()
}, saveAndRedirect('edit'))


// method = "DELETE"
router.delete('/:id', async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveAndRedirect (path){
    return async (req,res)=>{
        let article = req.article
            article.title= req.body.title
            article.description= req.body.description
            article.markdown = req.body.markdown

        try{
    
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }
        catch(err){
                console.log(err);
                res.render(`articles/${path}`, {article: article})
        }

    }
}

module.exports = router