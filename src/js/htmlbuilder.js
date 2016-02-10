function HtmlBuilder()
{
    this.VERSION = "1.0";
    
    this.TUTORIAL = "tutorial";
    this.TUTORIAL_LIST = "tutorialList";
    this.ERROR = "error";
    
    var self = this;
    this.getHTML_callBack;
    this.setPage_callBack;
    
    this.currentLang;
    this.currentTutorialName;
    this.currentPageNumber;
    this.currentTutorial;
    this.currentLanguage;
    
    this.loadedFileNumber = 0;
    this.HTMLFilesArray = [
        {name:self.TUTORIAL,        file:"/src/html/tutorial.html",              data:null},
        {name:self.TUTORIAL_LIST,   file:"/src/html/tutorialList.html",          data:null},
        {name:self.ERROR,           file:"/src/html/error.html",                 data:null}
    ];
    
    this.init = function (callBack)
    {
        self.getHTML_callBack = callBack;
        self.getHMLTFiles();
    };
    
    this.getHMLTFiles = function()
    {
        for (var i = 0; i < self.HTMLFilesArray.length; i++) {
            (function(i) {
                $.ajax(self.HTMLFilesArray[i].file)
                    .done(function(data, textStatus, jqXHR) {

                        self.loadedFileNumber++;
                        self.HTMLFilesArray[i].data = data;
                        InstanceFactory.getTrace().deb(self.HTMLFilesArray[i].name + " File loaded");
                        if (self.loadedFileNumber >= self.HTMLFilesArray.length){
                            if (self.getHTML_callBack) self.getHTML_callBack();
                        }
                    })
                    .fail(function() {
                        InstanceFactory.getTrace().err(self.HTMLFilesArray[i].name + " file does not exist");
                    });
            })(i);
        }
    };
    
    this.getHTML = function(fileName)
    {
        for (var i = 0; i < self.HTMLFilesArray.length; i++) {
            if (self.HTMLFilesArray[i].name === fileName) return self.HTMLFilesArray[i].data;
        }
        InstanceFactory.getTrace().err("Get HTML");
        return null;
    };
    
    this.setPage = function(lang, tutorial, page, callBack)
    {
        self.setPage_callBack = callBack;
        
        if (tutorial === ""){
            self.setTutorialListPage();
        }else{
            self.setTutorialPage(lang, tutorial, page);
        }
    };
    
    this.setTutorialListPage = function()
    {
        var tutorialList = InstanceFactory.getDataLoader().tutorialList;
        var list = "<ul>";
        
        for (var i = 0; i < tutorialList.length; i++) {
            list += '<li><a href="/' + tutorialList[i].defaultLanguage + '/' + tutorialList[i].folder + '">' + tutorialList[i].getDefaultTitle() + '</a></li>';
        }
        list += "</ul>";
        
        var html = self.getHTML(self.TUTORIAL_LIST);
        html = self.replace(html, "DATA", list);
        $('#contentbody').html(html);
        self.setTitle("List of tutorials - Simple Tutorial");
        
        if (self.setPage_callBack) self.setPage_callBack();
    };
    
    this.setTutorialPage = function(lang, tutorialFolder, pageNumber)
    {
        var error = "";
        if (!isNaN(parseInt(tutorialFolder))) error = "Tutorial name must be String";
        if (isNaN(pageNumber)) error = "Page must be integer";
        if (!InstanceFactory.getDataLoader().isTuto(tutorialFolder)) error = "This tutorial does not exist";
        if (error !== ""){
            self.setErrorPage(error);
            return;
        }
        
        var tutorial = InstanceFactory.getDataLoader().getTutorial(tutorialFolder);
        if (lang === "default") lang = tutorial.defaultLanguage;
        
        var page = tutorial.getPage(lang, pageNumber);
        
        if (page === null){
            self.setErrorPage("This page is not available");
            return;
        }
        
        self.addCustomStyle(tutorialFolder);
        
        var timestamp = Math.floor(Date.now() / 1000);
        var containerURL = "/data/" + tutorialFolder + "/" + lang + "/container.html?t=" + timestamp;
        var pageURL = "/data/" + tutorialFolder + "/" + lang + "/pages/" + page.name + "?t=" + timestamp;
        
        InstanceFactory.getTrace().deb(pageURL);
        var language = tutorial.getLanguage(lang);

        var summary = '<span id="openLeftBock">≡</span><h1><a href="/">' + language.title + '</a></h1>';
        var leftBlock = tutorial.getHTMLLanguageList(lang) + language.getSummary(page.name) + self.getBottomLeftBlock();
        var pageTitle = language.getPage(pageNumber).title + " - " + language.title + " - " + "Simple Tutorial";
        
        var footer = tutorial.getFooter(lang, pageNumber);
        
        // Get container
        $.ajax(containerURL)
            .done(function(containerData, textStatus, jqXHR) {
                // Get page
                $.ajax(pageURL)
                    .done(function(data, textStatus, jqXHR) {

                        var newUrl = '/' + lang + '/' + tutorialFolder + '/' + pageNumber;

                        // Facebook
                        var facebookComments = "";
                        var locale = InstanceFactory.getDataLoader().getLocaleCodeByLang(lang);
                        if (tutorial.facebookComments){
                            InstanceFactory.getFacebookController().init(locale, tutorial.facebookID);
                            facebookComments = InstanceFactory.getFacebookController().getBlock(document.domain + newUrl);
                        }
                        
                        //data = self.replaceImage(data, lang, tutorialFolder);
                        InstanceFactory.getDomController().moveToTopOfPage();
                        self.writeTutorialPage(summary, leftBlock, containerData, data, footer, facebookComments);
                        self.currentLang = lang;
                        self.currentTutorialName = tutorialFolder;
                        self.currentPageNumber = pageNumber;
                        self.currentTutorial = tutorial;
                        self.currentLanguage = language;
                        self.replacePreformattedTag(data);
                        self.replaceImage(lang, tutorialFolder);
                        InstanceFactory.getDomController().initLeftBlock();

                        // URL rewriting
                        if (newUrl !== window.location.pathname) {
                            window.history.pushState({ path: newUrl }, '', newUrl);
                        }
                        
                        // Title & description
                        self.setTitle(pageTitle);
                        
                        if (self.setPage_callBack) self.setPage_callBack();
                    })
                    .fail(function() {
                        InstanceFactory.getTrace().err("Failed to load " + pageURL);
                    });
            })
        .fail(function() {
            InstanceFactory.getTrace().err("Failed to load " + containerURL);
        });
    };
    
    this.addCustomStyle = function(tutorialFolder)
    {
        var timestamp = Math.floor(Date.now() / 1000);
        var href = '/data/' + tutorialFolder + '/style.css' + "?t=" + timestamp;
        var link = '<link id="customstyle" type="text/css" rel="stylesheet" href="' + href + '">';
        var customStyle = $('#customstyle');
        if (customStyle.attr('href') === href) return;
        if (customStyle.length > 0) customStyle.remove();
        $('head').append(link);
    };
    
    this.previousPage = function()
    {
        var min = 0;
        var newNumber = self.currentPageNumber - 1;
        if (newNumber <= min) return;
        
        self.setTutorialPage(
            self.currentLang,
            self.currentTutorialName,
            newNumber
        );
    };
    
    this.nextPage = function()
    {
        var max = self.currentLanguage.getPagesNumber;
        var newNumber = self.currentPageNumber + 1;
        if (newNumber >= max) return;
        
        self.setTutorialPage(
            self.currentLang,
            self.currentTutorialName,
            newNumber
        );
    };
    
    this.changePageByTitle = function(pageTitle)
    {
        self.setTutorialPage(
            self.currentLang,
            self.currentTutorialName,
            self.currentTutorial.getPageNumberByLangAndTitle(self.currentLang, pageTitle)
        );
    };
    
    this.changePageByLang = function(lang)
    {
        self.setTutorialPage(
            lang,
            self.currentTutorialName,
            self.currentPageNumber
        );
    };
    
    this.writeTutorialPage = function(summary, leftBlock, container, content, footer, facebookComments)
    {
        var html = self.getHTML(self.TUTORIAL);
        html = self.replace(html, "SUMMARY", summary);
        html = self.replace(html, "LEFT-BLOCK", leftBlock);
        html = self.replace(html, "FOOTER", footer);
        container = self.replace(container, "DATA", content);
        html = self.replace(html, "CONTENT", container);
        html = html + facebookComments;
        $('#contentbody').html(html);
    };
    
    this.replaceImage = function(lang, tutorialFolder)
    {
        regex_target = /^(.*)\/image\/([^\/]*)/g;
        
        $("img").each(function() {
            var src = $(this).prop('src');
            var local = regex_target.exec(src);
            
            if (local){
                var imageName = local[2];
                var imageURL = "/data/" + tutorialFolder + "/" + lang + "/images/" + imageName;
                var test  =$(this).prop('src', imageURL);
            }
        });
    };
    
    this.replacePreformattedTag = function(html)
    {
        regex_target = /^(.*)\/image\/([^\/]*)/g;
        
        $("pre").each(function() {
            var html = $(this).html();
            html = html.replace(/\</g, '&lt;');
            html = html.replace(/\>/g, '&gt;');
            html = html.replace(/\[\[/g, '<');
            html = html.replace(/\]\]/g, '>');
            $(this).html(html);
        });
    };
    
    this.setErrorPage = function(msg)
    {
        var html = self.getHTML(self.ERROR);
        html = self.replace(html, "DATA", msg);
        $('#contentbody').html(html);
        self.setTitle("Error - Simple Tutorial");
    };
    
    this.replace = function(htmlFile, tag, replace)
    {
        fullTag = "[" + tag + "]";
        htmlFile = htmlFile.split(fullTag).join(replace);
        return htmlFile;
    };
    
    this.setTitle = function(txt)
    {
        $('title').html(txt);
        //$('meta[name=description]').attr('content', txt);
    };
    
    this.getBottomLeftBlock = function()
    {
        return '<div id="leftInfo"><a href="https://github.com/docmathieu/Simple-Tutorial" target="_blank">Simple Tutorial v' + self.VERSION + '</a></div>';
    };
    
}