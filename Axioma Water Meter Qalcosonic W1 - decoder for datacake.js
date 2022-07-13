function Decoder(raw64,port) {
        var epoch, state, volume, logEpoch, logVolume;
    	var deltaVolumes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    	var i = 17;
    	var error;
        var payload_size = raw64.length;
        var hex = [];
        
    if (port === 100){
        // Converting the payload from base64 to hex
        for (var num = 0 ; num < raw64.length; num++) {
            if(raw64[num].toString(16).length < 2) {   hex[num]=(['0'+raw64[num].toString(16)].join());
            } else {hex[num]=(raw64[num].toString(16));}
            
        }
        // Converting the first four hexes to string from left to right to get the epoch of the transfer
        epoch =['0x' , hex[3] , hex[2] , hex[1] , hex[0]].join('');
        epoch = (epoch<<32)*1000;
        epoch = new Date(epoch).toISOString();
        
        // Getting the state of the water meter
        state = ['0x' , hex[4] ].join('');
        
    	// Getting the Current volume
        volume=['0x' , hex[8] , hex[7] , hex[6] , hex[5]].join('');
        volume = volume<<32;
        volume = volume / 1000.0;
        
        // The time of the first log volume 
        logEpoch = ['0x' , hex[12] , hex[11] , hex[10] , hex[9]].join('');
        logEpoch = (logEpoch<<32)*1000;
        logEpoch = new Date(logEpoch).toISOString();
    
        // The current volume of the firt Log
        logVolume = ['0x' , hex[16] , hex[15] , hex[14] , hex[13]].join('');
        logVolume = logVolume<<32;
        logVolume = logVolume / 1000.0;
        
        // Getting the hourly water usage difference 
        if (payload_size >i){
            var vol=0;
            while (i+2 <= payload_size)
            {    
                var volumeI = ((['0x' , hex[i+1] , hex[i]].join(''))<<32)/1000.0;
               
                deltaVolumes[vol]=(volumeI);
                i+=2;
                vol+=1;
            }
            
        }
    
        // Converting the state code to the the state 
        var messages=[];
    	if (state == 0x00) {
    		messages='OK';	//No error; Normal work; normal
    	} 
        else {
    		if (state & 0x04) messages='Low battery';	//Power low
    		if (state & 0x08) messages='Permanent error';	//Hardware error; tamper; manipulation
    		if (state & 0x10) messages='Temporary error';	//Dry; Empty spool; negative flow; leakage; burst; freeze
    		if (state === 0x10) messages='Dry';	//Empty spool;
    		if ((state & 0x60) === 0x60) messages='Backflow';	//Negative flow
    		if ((state & 0xA0) === 0xA0) messages='Burst';
    		if ((state & 0x20) && !(state & 0x40) && !(state & 0x80)) messages='Leakage';	//Leak
    		if ((state & 0x80) && !(state & 0x20)) messages='Low temperature';	//Freeze
    	}
    
    // Getting the RSSI of the data 
    if (normalizedPayload.gateways[0].rssi) {
        var RSSI = normalizedPayload.gateways[0].rssi;
    }
    
    // Getting the SNR of the data 
    if (normalizedPayload.gateways[0].snr) {
        var SNR = normalizedPayload.gateways[0].snr;
    }
    
    // Getting the DATARATE of the data 
    if (normalizedPayload.data_rate) {
        var DATARATE = normalizedPayload.data_rate;
    }    
       
     
    return [
    	{
            
            field: "DATE",
            value: epoch,            
        },
        {
            field: "STATEMESSAGES",
            value: messages,            
        },
        {
            field: "VOLUME",
            value: volume,            
        },
        {
            field: "DELTAVOLUMES",
            value: deltaVolumes[0],
        },
        {
            field: "DELTAVOLUMES1",
            value: deltaVolumes[1],
        },
        {
            field: "DELTAVOLUMES2",
            value: deltaVolumes[2],
        },
        {
            field: "DELTAVOLUMES3",
            value: deltaVolumes[3],
        },
        {
            field: "DELTAVOLUMES4",
            value: deltaVolumes[4],
        },
        {
            field: "DELTAVOLUMES5",
            value: deltaVolumes[5],
        },
        {
            field: "DELTAVOLUMES6",
            value: deltaVolumes[6],
        },
        {
            field: "DELTAVOLUMES7",
            value: deltaVolumes[7],
        },
        {
            field: "DELTAVOLUMES8",
            value: deltaVolumes[8],
        },
        {
            field: "DELTAVOLUMES9",
            value: deltaVolumes[9],
        },
        {
            field: "DELTAVOLUMES10",
            value: deltaVolumes[10],
        },
        {
            field: "DELTAVOLUMES11",
            value: deltaVolumes[11],
        },
        {
            field: "DELTAVOLUMES12",
            value: deltaVolumes[12],
        },
       {
            field: "DELTAVOLUMES13",
            value: deltaVolumes[13],
        },
        {
            field: "DELTAVOLUMES14",
            value: deltaVolumes[14],
        },
        {
            field: "DELTAVOLUMES15",
            value: deltaVolumes[15],
        },
        {
            field: "RSSI",
            value: RSSI,   
        },
        {
            field: "SNR",
            value: SNR,   
        },
        {
            field: "DATARATE",
            value: DATARATE,            
        },
        ]
        
    };
          // Alarms
    if (port === 103){
        
        // Converting the payload from base64 to hex
        for (var num = 0 ; num < raw64.length; num++) {
            if(raw64[num].toString(16).length < 2) {   hex[num]=(['0'+raw64[num].toString(16)].join());
            } else {hex[num]=(raw64[num].toString(16));}
        }
         // Getting the time of the payload 
        epoch =['0x' , hex[3] , hex[2] , hex[1] , hex[0] ].join('');
        epoch = (epoch<<32)*1000;
        epoch = new Date(epoch).toISOString();
        // Gtting the alarm code
        state = ['0x' , hex[4] ].join('');
        
        // Converting the alarm code to Message 
        var messages=[];
    	if (state == 0x00) {
    		messages='OK';	//No error; Normal work; normal
    	} 
        else {
    		if (state & 0x04) messages='Low battery';	//Power low
    		if (state & 0x08) messages='Permanent error';	//Hardware error; tamper; manipulation
    		if (state & 0x10) messages='Temporary error';	//Dry; Empty spool; negative flow; leakage; burst; freeze
    		if (state === 0x10) messages='Dry';	//Empty spool;
    		if ((state & 0x60) === 0x60) messages='Backflow';	//Negative flow
    		if ((state & 0xA0) === 0xA0) messages='Burst';
    		if ((state & 0x20) && !(state & 0x40) && !(state & 0x80)) messages='Leakage';	//Leak
    		if ((state & 0x80) && !(state & 0x20)) messages='Low temperature';	//Freeze
    	}
    	
    	return[
            {
            field: "STATEMESSAGES",
            value: messages,
            
            },
        ]
        
        
    };
    	
}
