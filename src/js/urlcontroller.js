function UrlController()
{
    var self = this;
    var callBack;
        
    this.getHTMLPage = function (url, callBack)
    {
        self.callBack = callBack;
        
        var dataArray = url.split("/");
        var dataSize = dataArray.length;
        var tutorial = "";
        var lang = "default";
        var page = Language.defaultPage;
        
        switch (dataSize){
            
            case 0:
                break;
                
            case 1:
                if (Tutorial.prototype.isAvailableLang(dataArray[0])){
                    lang = dataArray[0];
                }else{
                    tutorial = dataArray[0];
                }
                break;
                
            case 2:
                if (Tutorial.prototype.isAvailableLang(dataArray[0])){
                    lang = dataArray[0];
                    tutorial = dataArray[1];
                }else{
                    tutorial = dataArray[0];
                    page = dataArray[1];
                }
                break;
                
            case 3:
                if (Tutorial.prototype.isAvailableLang(dataArray[0])){
                    lang = dataArray[0];
                    tutorial = dataArray[1];
                    page = dataArray[2];
                }else{
                    error = "wrong parameters";
                }
                break;
            
            default:
                error = "wrong parameters";
        }
        
        InstanceFactory.getHtmlBuilder().setPage(lang, tutorial, page, self.HTMLReady);
    };
    
    this.HTMLReady = function ()
    {
        if (self.callBack) self.callBack();
    };
}