function Trace()
{
    this.MODE_DEBUG = "MODE_DEBUG";
    this.MODE_PRODUCTION = "MODE_PRODUCTION";
    
    this.mode = this.MODE_DEBUG;
    
    this.err = function (txt)
    {
        if (this.mode === this.MODE_DEBUG) console.log(InstanceFactory.getDatetime().getFormatTime() + " <ERROR> " + txt);
    };
    
    this.deb = function(txt)
    {
        if (this.mode === this.MODE_DEBUG) console.log(InstanceFactory.getDatetime().getFormatTime() + " > " + txt);
    };
}