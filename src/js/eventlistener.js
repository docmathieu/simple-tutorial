function EventListener()
{
    var self = this;
       
    this.init = function ()
    {
        $('img').on('dragstart', function(event) {
            event.preventDefault();
        });
        
        $('a').on('dragstart', function(event) {
            event.preventDefault();
        });
        
        self.addSummaryListener();
        self.addLanguageListListener();
        self.addFooterListener();
        self.addLeftBlockListener();
    };
    
    //___________________________________________________________________
    
    this.addSummaryListener = function ()
    {
        $('.summary-list li').on( "click", function() {
            self.clickSummaryLink($(this));
        });
    };
    
    this.clickSummaryLink = function(elem)
    {
        InstanceFactory.getHtmlBuilder().changePageByTitle(elem.text());
    };
    
    //___________________________________________________________________
    
    this.addLanguageListListener = function ()
    {
        $('.language-list li').on( "click", function() {
            self.clickLanguageLink($(this));
        });
    };
    
    this.clickLanguageLink = function(elem)
    {
        InstanceFactory.getHtmlBuilder().changePageByLang(elem.text());
    };
    
    //___________________________________________________________________
    
    this.addFooterListener = function ()
    {
        $('#footer span').on( "click", function() {
            self.clickFooterLink($(this));
        });
    };
    
    this.clickFooterLink = function(elem)
    {
        InstanceFactory.getHtmlBuilder().changePageByTitle(elem.text());
    };
    
    //___________________________________________________________________
    
    this.addLeftBlockListener = function ()
    {
        $('#openLeftBock').on( "click", function() {
            self.clickLeftBlockButton($(this));
        });
        $('#summary #leftBlock').on( {
            'mouseenter':function() { self.summaryMouseOver($(this)); },
            'mouseleave':function() { self.summaryMouseOut($(this)); }
        });
    };
    
    this.clickLeftBlockButton = function(elem)
    {
        InstanceFactory.getDomController().switchLeftBockVisibility();
    };
    
    this.summaryMouseOver = function(elem)
    {
        InstanceFactory.getDomController().openLeftBlock();
    };
    
    this.summaryMouseOut = function(elem)
    {
        InstanceFactory.getDomController().closeLeftBlock();
    };
    
    
    self.init();
}