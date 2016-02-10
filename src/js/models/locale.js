function Locale(data)
{
    var self = this;
    
    this.folder = "";
    this.code;
    
    this.init = function (data)
    {
        self.folder = data.folder;
        self.code = data.code;
    };
    
    self.init(data);
}