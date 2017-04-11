// my linq methods
Array.prototype.groupBy = function (selector) {

    var dictionary = {};

    this.forEach(function (element) {

        var consist = false;
        // key value
        var value = selector(element);

        for (key in dictionary) {
            if (key == value) { consist = true; break; }
        }

        // add value to array
        if (consist) {
            dictionary[value].push(element)
        }
        // or create new key
        else {
            dictionary[value] = [element];
        }
    });

    for (key in dictionary)
    {
        dictionary[key].sort(function (a, b) {
            return b.IMDB - a.IMDB;
        });
    }
    return dictionary;
}
Array.prototype.intersect = function (arr) {

    return this.reduce(function (resultArray, current) {    
        
        if (resultArray.indexOf(current) == -1 && arr.indexOf(current) != -1)
        {
            resultArray.push(current)
        }
    
        return resultArray;
    }, [])
}

// help function for load data
function getData(url) {
    var xr = new XMLHttpRequest();
    xr.open("GET", url, false);
    xr.send();
    if (xr.status == 200)
    {
        return xr.responseText;
    }
}

// load data
var genres = JSON.parse(getData('genres.json'));

