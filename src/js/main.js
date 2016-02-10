function Main()
{
    var self = this;
    var callNumber = 0;
    var initCallArray = [
        InstanceFactory.getDataLoader().init,
        InstanceFactory.getHtmlBuilder().init
    ];
    
    /*
     * Load all datas before get HTML page
     */
    this.init = function ()
    {
        window.onpopstate = function(event) {
            if(event && event.state) {
                location.reload(); 
            }
        }
        
        for (var i = 0; i < initCallArray.length; i++) {
            initCallArray[i](self.buildHTML);
        }
    };
    
    /*
     * Call HTML Builder
     */
    this.buildHTML = function ()
    {
        callNumber++;
        if (callNumber < initCallArray.length) return;
        
        var url = GET.param.replace(/\/$/, "");                         // Remove last /
        InstanceFactory.getUrlController().getHTMLPage(url, self.addListeners);
    };
    
    /*
     * Add listeners
     */
    this.addListeners = function ()
    {
        var eventListener = new EventListener();
    };

    self.init();
}

var main = new Main();