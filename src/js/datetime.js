function DateTime()
{
    this.getFormatFull = function ()
    {
        var now = new Date();
        var annee   = now.getFullYear();
        var mois    = now.getMonth() + 1;
        var jour    = now.getDate();
        var heure   = now.getHours();
        var minute  = now.getMinutes();
        var seconde = now.getSeconds();
    };
    
    this.getFormatTime = function()
    {
        var now = new Date();
        var heure   = now.getHours();
        var minute  = now.getMinutes();
        return heure + ":" + minute;
    };
}

