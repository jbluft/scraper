var fetching = require('../controllers/fetch');
var stories = require('../controllers/headline');
var notesies = require('../controllers/note');

module.exports = function(app) {

    app.get('/', fetching.HelloWorld);
    app.get('/scrape', fetching.HelloScrape);
    app.get('/articles', stories.HelloArticles);
    app.get('/articles/:id', notesies.HelloArticlesID);
    app.post('/articles/:id', notesies.HelloArticlesNote);

}
