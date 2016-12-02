function DataClass(name){
    this.name = name;
    this.attributes = {};
    this.addAttribute = function(name, type){

        var attribute = {
            name: name,
            type: type
        };

        this.attributes[name] = attribute;
    }

    this.parse = function (data){
        var csv = Papa.parse(data, {}).data;

        var parsed = csv.splice(1).map(line=>{
            var obj = {};
            
            line.map((data, index)=>{
                var title = csv[0][index];
                var content = data;
                var attr = this.attributes[title];
                if(attr!=null && attr.type=="number") content = +content;
                obj[title] = content;
            });

            return obj;
        });

        return parsed;
    }
}