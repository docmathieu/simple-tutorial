function DataLoader()
{
    var self = this;
    this.callBack;
    this.tutorialList;
    this.localeList;
    
    this.init = function(callBack)
    {
        self.callBack = callBack;
        self.loadData();
    };
    
    this.loadData = function()
    {
        var jsonFile = "/src/php/tutorials.php";
        
        $.getJSON(jsonFile)
            .done(function(result) {
                self.processData(result);
            })
            .fail(function(d, textStatus, error) {
                InstanceFactory.getTrace().err(error);
            })
            .always(function() {
                self.loadLocales();
            });
    };
    
    this.loadLocales = function()
    {
        var jsonFile = "/data/locales.json";
        
        $.getJSON(jsonFile)
            .done(function(result) {
                self.processLocales(result);
            })
            .fail(function(d, textStatus, error) {
                InstanceFactory.getTrace().err(error);
            })
            .always(function() {
                if (self.callBack) self.callBack();
            });
    };
    
    this.processLocales = function(jsonData)
    {
        self.localeList = new Array();
        $.each(jsonData, function(i) {
            self.localeList.push(
                new Locale(jsonData[i])
            );
        });
    };
    
    this.processData = function(jsonData)
    {
        self.tutorialList = new Array();
        $.each(jsonData, function(i) {
            self.tutorialList.push(
                new Tutorial(jsonData[i])
            );
        });
    };
    
    this.isTuto = function (str)
    {
        for (var i = 0; i < self.tutorialList.length; i++) {
            if (self.tutorialList[i].folder === str) return true;
        }
        InstanceFactory.getTrace().err("This tutorial does not exist");
        return false;
    };
    
    this.getTutorial = function (str)
    {
        if (!self.isTuto) return null;
        for (var i = 0; i < self.tutorialList.length; i++) {
            if (self.tutorialList[i].folder === str) return self.tutorialList[i];
        }
        return null;
    };
    
    this.getLocaleCodeByLang = function(lang)
    {
        for (var i = 0; i < self.localeList.length; i++) {
            if (self.localeList[i].folder === lang) return self.localeList[i].code;
        }
        return null;
    };
}

