function FacebookController()
{
    var self = this;
    var timer = null;
    var locale = "";
    var fbID = "";
    
    this.init = function(locale, fbID)
    {
        self.locale = locale;
        self.fbID = fbID;
        
        // Remove FB
        self.removeFB();
        
        // 1- Load facebook-jssdk
        self.initFacebook(document, 'script', 'facebook-jssdk', locale);
        
        // 2- Check load of FB
        self.timer = setInterval(self.whenFBloaded, 100);
    };
    
    this.getBlock = function(url)
    {
        return '<div id="facebookComments"><div class="fb-comments" data-colorscheme="dark" data-order-by="reverse_time" data-width="100%" data-href="' + url + '" data-numposts="10"></div></div>';
    };
    
    this.removeFB = function()
    {
        $('#fb-root').remove();
        $('body').prepend('<div id="fb-root"></div>');
        $('#facebook-jssdk').remove();
        FB = null;
    };
    
    this.initFacebook = function (d, s, id, lang)
    {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.async = true;
        //js.src = '//connect.facebook.net/' + lang + '/sdk.js#xfbml=1&version=v2.5&appId=' + FB_id;
        js.src = '//connect.facebook.net/' + lang + '/all.js';
        fjs.parentNode.insertBefore(js, fjs);
        
        InstanceFactory.getTrace().deb(js.src);
    };
    
    this.whenFBloaded = function()
    {
        if (typeof(FB) != 'undefined' && FB != null ) {
            FB.init({
                appId : self.fbID, version: 2.4, xfbml: true
            });
            self.clearTimer();
        } else {
            // Waiting
        }
    };
    
    this.clearTimer = function()
    {
        clearTimeout(self.timer);
        self.timer = null;
    };
    
    this.refresh = function()
    {
        FB.XFBML.parse($('#facebookComments').get(0));
    };
}