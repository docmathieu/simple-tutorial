function Loader()
{
    var self = this;
    var styleArray = [
        "/src/css/global.css"
    ];
    
    var scriptArray = [
        "/src/js/instancefactory.js",
        "/src/js/trace.js",
        "/src/js/datetime.js",
        "/src/js/urlcontroller.js",
        "/src/js/htmlbuilder.js",
        "/src/js/facebookcontroller.js",
        "/src/js/dataloader.js",
        "/src/js/eventlistener.js",
        "/src/js/domcontroller.js",
        "/src/js/models/tutorial.js",
        "/src/js/models/language.js",
        "/src/js/models/page.js",
        "/src/js/models/locale.js"
    ];
    
    var nbScriptsLoaded = 0;
    var startScript = "/src/js/main.js";
    
    this.init = function ()
    {
        self.loadStyles();
        self.loadScripts();
    };
    
    this.loadStyles = function ()
    {
        for (var i = 0; i < styleArray.length; i++) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', styleArray[i]) );
        }
    };
    
    this.loadScripts = function ()
    {
        for (var i = 0; i < scriptArray.length; i++) {
            $.getScript(scriptArray[i])
                .done(function(script, textStatus) {
                    nbScriptsLoaded ++;
                    if(nbScriptsLoaded >= scriptArray.length) self.start();
                })
                .fail(function(jqxhr, settings, exception) {
                    InstanceFactory.getTrace().err("script load, " + settings + ": " + exception);
                }
            );
        }
    };
    
    this.start = function ()
    {
        $.getScript(startScript)
            .done(function(script, textStatus) {
                
            })
            .fail(function(jqxhr, settings, exception) {
                InstanceFactory.getTrace().err("main script load, " + startScript + ": " + exception);
            }
        );
    };
    
    self.init();
}

$(document).ready(function() {
    var loader = new Loader();
});