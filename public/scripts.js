async function displayData(){
    
    try{
    const trainData = await fetch('/trains');
    const formatData = await trainData.json();
    } catch (e){
        console.log(e + " probably cause of error is no services available due to christmas or boxing day or system outage");

        let noService = document.createElement('div');
        noService.className = "no-service";
        noService.textContent  = "No services available due to Christmas or Boxing day holidays - or System outage";
        document.querySelector('.wrapper').appendChild(noService);
        return;
    }

    

    try{
    let arrayLength = formatData.departures.all.length;
    let dataArray = [];

    } catch (e){
        console.log(e + " probably cause of error is no services available due to christmas or boxing day or system outage");

        let noService = document.createElement('div');
        noService.className = "no-service";
        noService.textContent  = "No services available due to Christmas or Boxing day holidays - or System outage";
        document.querySelector('.wrapper').appendChild(noService);
        return;
    }
    //pluck the relevent values from the departures array in the JSON data and turn into an object called service
    for(i = 0; i < arrayLength ;i++){
    let service = {destination: `${formatData.departures.all[i].destination_name}`
    , departureTime: `${formatData.departures.all[i].aimed_departure_time}`
    , statusValue: `${formatData.departures.all[i].status}`
    , expectedDeparture: `${formatData.departures.all[i].expected_departure_time}`}
        
        //add the service object to the dataArray
        dataArray.push(service);
    }
    
    //this loop is to view the data in the console for convienience. 
    for(i = 0; i < dataArray.length; i++){
        console.log(dataArray[i]);
    }


    for(train in dataArray){

        let trainNode = document.createElement('div');
        trainNode.className="service-wrapper";

            let destinationNode = document.createElement('div');
            destinationNode.innerHTML = dataArray[train].destination;
            destinationNode.className="destination-div";
            trainNode.appendChild(destinationNode);

            let departureNode = document.createElement('div');
            departureNode.innerHTML = dataArray[train].departureTime;
            departureNode.className="departure-div";
            trainNode.appendChild(departureNode);


            let statusNode = document.createElement('div');
            statusNode.innerHTML = dataArray[train].statusValue;
            statusNode.className="status-div";
            trainNode.appendChild(statusNode);
        
            let expectedDepartureNode = document.createElement('div');
            expectedDepartureNode.innerHTML = `Expected: ${dataArray[train].expectedDeparture}`;
            expectedDepartureNode.className="expected-div";
            trainNode.appendChild(expectedDepartureNode);

            document.querySelector('.wrapper').appendChild(trainNode);

            if(statusNode.innerHTML != "ON TIME" && statusNode.innerHTML != "STARTS HERE" && statusNode.innerHTML != "EARLY"){
                statusNode.style.color = "red";
            }


    }



    
    


} 


displayData();


