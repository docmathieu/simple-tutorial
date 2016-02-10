function Language(data)
{
    var self = this;
    
    this.title = "";
    this.lang = "";
    this.pagesList;
    Language.defaultPage = "1";                         // static
    
    this.init = function (data)
    {
        self.title = data.title;
        self.lang = data.lang;
        self.pagesList = self.getPages(data.pages);
    };
    
    this.getPages = function(jsonData)
    {
        var pagesList = new Array();
        $.each(jsonData, function(i) {
            pagesList.push(
                new Page(jsonData[i])
            );
        });
        return pagesList;
    };
    
    this.getDefaultPage = function()
    {
        return self.defaultPage;
    };
    
    this.getPage = function(pageNumber)
    {
        if (self.pagesList[(pageNumber - 1)]) return self.pagesList[(pageNumber - 1)];
        return null;
    };
    
    this.getPageNumberByTitle = function(title)
    {
        for (var i = 0; i < self.pagesList.length; i++){
            if (title === self.pagesList[i].title){
                var number = self.pagesList[i].name.split('.html')[0];
                return number;
            }
        }
        return -1;
    };
    
    this.getPagesNumber = function()
    {
        return self.pagesList.length;
    };
    
    this.getSummary = function(pageSelected)
    {
        var summary = '<ul class="summary-list">';
        for (var i = 0; i < self.pagesList.length; i++){
            var selected = "";
            if ((pageSelected) === self.pagesList[i].name) selected = 'class="selectedTitle"';
            summary += '<li ' + selected + '>' + self.pagesList[i].title + '</li>';
        }
        summary += '</ul>';
        
        return summary;
    };
    
    self.init(data);
}