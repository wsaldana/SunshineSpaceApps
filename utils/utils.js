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

        // Split data by year
        if(labels.includes(year)){
            values[count].append(data.date)
        }else{
            labels.append(year);
            values.append([data.date]);
            count++;
        }

        if(time_resolution == 'SEMESTER'){
            temp_labels = [];
            temp_values = [];
            for(var i = 0; i < labels.length; i++){
                if(values.length>6){
                    temp_values.append(values[i].slice(0, 6));
                    temp_values.append(values[i].slice(6, values[i].length));
                    temp_labels.append(labels[i]+" S1");
                    temp_labels.append(labels[i]+" S2");
                }else {
                    temp_labels.append(labels[i]+" S1");
                    temp_values.append(values[i].slice(0, values[i].length));
                }
            }
        }else if(time_resolution == 'TRIMESTER'){
            // TODO
        }else if(time_resolution == 'MONTH'){
            // TODO
        }else{
            return {
                "labels": [], 
                "values": []
            }
        }
    })

    // Reduce grouped data to period average
    values.map((item) => {
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
