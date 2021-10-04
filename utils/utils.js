const groupByTimeResolution = (data, time_resolution) => {
    const dates = Object.keys(data);
    const start = dates[0];
    const end = dates[dates.length-1];

    var labels = [];
    var values = [];

    // Group
    dates.forEach((date) => {
        
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        var count = 0;

        if(time_resolution == 'MONTH'){
            if(labels.includes(year+"/"+month)){
                values[values.length -1].push(data[date])
            }else{
                labels.push(year+"/"+month);
                values.push([data[date]]);
            }
        }else{
            // Split data by year
            if(labels.includes(year)){
                values[values.length -1].push(data[date])
            }else{
                labels.push(year);
                values.push([data[date]]);
            }

            if(time_resolution == 'SEMESTER'){
                temp_labels = [];
                temp_values = [];
                for(var i = 0; i < labels.length; i++){
                    if(values.length>6){
                        temp_values.push(values[i].slice(0, 6));
                        temp_values.push(values[i].slice(6, values[i].length));
                        temp_labels.push(labels[i]+" S1");
                        temp_labels.push(labels[i]+" S2");
                    }else {
                        temp_labels.push(labels[i]+" S1");
                        temp_values.push(values[i].slice(0, values[i].length));
                    }
                }
                labels = temp_labels;
                values = temp_values;
            }else if(time_resolution == 'TRIMESTER'){
                // TODO
            }else{
                // TODO
            }
        }
    })

    // Reduce grouped data to period average
    values = values.map((item) => {
        var sum = 0;
        for(var i = 0; i <item.length; i++){
            sum += item[i];
        }
        return sum / item.length;
    })

    return {
        "labels": labels, 
        "values": values
    }
}

module.exports = { groupByTimeResolution }
