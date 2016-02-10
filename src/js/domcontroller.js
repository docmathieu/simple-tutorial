function DomController()
{
    var self = this;
    
    this.moveToTopOfPage = function()
    {
        $('html, body').animate({scrollTop:0}, 0);
    };
    
    /*__________________ LEFT BLOCK ___________________*/
    
    this.initLeftBlock = function()
    {
        $('#insideLeftBlock').hide();
        var width = $('#insideLeftBlock').width() +
                    self.removePx($('#insideLeftBlock').css('padding-left')) + 
                    self.removePx($('#insideLeftBlock').css('padding-right'));
        
        $('#insideLeftBlock').css("margin-left", -width + "px");
    };
    
    this.switchLeftBockVisibility = function()
    {
        if($('#insideLeftBlock').css('display') === 'none'){ 
            self.openLeftBlock();
        }else{
            self.closeLeftBlock();
        }
    };
    
    this.openLeftBlock = function()
    {
        if($('#insideLeftBlock').css('display') !== 'none') return;
        
        $('#insideLeftBlock').css('display', 'block');
        $( "#insideLeftBlock" ).animate({
            marginLeft: 0 + "px"
        }, 100, function() {

        });
    };
    
    this.closeLeftBlock = function()
    {
        if($('#insideLeftBlock').css("margin-left") !== "0px") return;
        
        var width = $('#insideLeftBlock').width() +
                        self.removePx($('#insideLeftBlock').css('padding-left')) +
                        self.removePx($('#insideLeftBlock').css('padding-right'));
                
        $( "#insideLeftBlock" ).animate({
            marginLeft: -width + "px"
        }, 100, function() {
            $('#insideLeftBlock').css('display', 'none');
        });
    };
    
    this.removePx = function(txt)
    {
        return parseInt(txt.replace('px',''));
    };
}