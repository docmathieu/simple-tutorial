InstanceFactory =
{
    util : null,
    getUtil : function ()
    {
        if (!this.util) this.util = new Util();
        return this.util;
    },
    
    urlController : null,
    getUrlController : function ()
    {
        if (!this.urlController) this.urlController = new UrlController();
        return this.urlController;
    },
    
    htmlBuilder : null,
    getHtmlBuilder : function ()
    {
        if (!this.htmlBuilder) this.htmlBuilder = new HtmlBuilder();
        return this.htmlBuilder;
    },
    
    trace : null,
    getTrace : function ()
    {
        if (!this.trace) this.trace = new Trace();
        return this.trace;
    },
    
    datetime : null,
    getDatetime : function ()
    {
        if (!this.datetime) this.datetime = new DateTime();
        return this.datetime;
    },
    
    dataLoader : null,
    getDataLoader : function ()
    {
        if (!this.dataLoader) this.dataLoader = new DataLoader();
        return this.dataLoader;
    },
        
    domController : null,
    getDomController : function ()
    {
        if (!this.domController) this.domController = new DomController();
        return this.domController;
    },
    
    facebookController : null,
    getFacebookController : function ()
    {
        if (!this.facebookController) this.facebookController = new FacebookController();
        return this.facebookController;
    },
};