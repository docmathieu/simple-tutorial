function Page(data)
{
    var self = this;
    
    this.name = "";
    this.title = "";
    
    this.init = function (data)
    {
        self.name = data.name;
        self.title = data.title;
    };
    
    self.init(data);
}