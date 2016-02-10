function Tutorial(data)
{
    var self = this;
    
    this.folder = "";
    this.languagesList;
    this.defaultLanguage = "en";                        // static
    this.facebookComments = false;
    this.facebookID = "";
    
    this.init = function (data)
    {
        self.folder = data.folder;
        self.defaultLanguage = data.defaultLanguage;
        self.facebookComments = (data.facebookComments === 'true');
        self.facebookID = (data.facebookID);
        self.languagesList = self.getLanguages(data.languages);
    };
    
    this.getDefaultTitle = function()
    {
        var lang = self.getLanguage(self.defaultLanguage);
        return lang.title;
    };
    
    this.getLanguages = function(jsonData)
    {
        var languagesList = new Array();
        $.each(jsonData, function(i) {
            languagesList.push(
                new Language(jsonData[i])
            );
        });
        return languagesList;
    };
    
    this.getLanguage = function(lang)
    {
        for (var i = 0; i < self.languagesList.length; i++) {
            if (self.languagesList[i].lang === lang) return self.languagesList[i];
        }
        
        return null;
    };
    
    this.getPage = function(lang, pageNumber)
    {
        var language = self.getLanguage(lang);
        var page = language.getPage(pageNumber);
        return page;
        
    };
    
    this.getHTMLLanguageList = function(lang)
    {
        if (self.languagesList.length < 2) return "";
        
        var html = '<ul class="language-list">';
        for (var i = 0; i < self.languagesList.length; i++) {
            var selected = '';
            if (self.languagesList[i].lang === lang) selected = 'class="selectedLanguage"';
            html += '<li ' + selected + '>' + self.languagesList[i].lang + '</li>';
        }
        html += '</ul>';
        return html;
    };
    
    this.getFooter = function(lang, pageNumber)
    {
        var language = self.getLanguage(lang);
        var previousPageNumber = parseInt(pageNumber) - 1;
        var nextPageNumber = parseInt(pageNumber) + 1;
        var previousPageName = '';
        var nextPageName = '';
        
        if (previousPageNumber > 0) previousPageName = language.getPage(previousPageNumber).title;
        if (nextPageNumber <= language.pagesList.length) nextPageName = language.getPage(nextPageNumber).title;
        
        var html = '';
        if (previousPageName !== '') html += '<span id="previousPage">' + previousPageName + '</span>';
        if (nextPageName !== '') html += '<span id="nextPage">' + nextPageName + '</span>';
        
        return html;
    };
    
    this.getPageNumberByLangAndTitle = function (lang, title)
    {
        var language = self.getLanguage(lang);
        var pageNumber = language.getPageNumberByTitle(title);
        return pageNumber;
    };
    
    Tutorial.prototype.isAvailableLang = function (str)
    {
        for (var i = 0; i < self.languagesList.length; i++) {
            if (self.languagesList[i].lang === str) return true;
        }
        return false;
    };
    
    self.init(data);
}