module.exports=function(){
	return {
		getMonthFromTimeStamp:function(timeStamp){
			let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
			let year = (new Date(timeStamp)).getFullYear();
			return month[(new Date(timeStamp)).getMonth()]+' '+year;
		},
		discountAmount:function(regularPrice,offerPrice){
			return regularPrice-offerPrice;
		},
		offerDiscountPercent:function(originalPrice, discountedPrice){
			return Math.floor( ((originalPrice - discountedPrice)/ originalPrice) * 100 );
		},
		fileMTime:function(path){
            var mtime = Math.floor(Math.random() * 1000);;
            try{
                var fs = require('fs');
                var stats = fs.statSync("public"+path);
                mtime = (new Date(stats.mtime)).getTime();
            }catch(e){

            }
			return mtime;
		},
		isEquals:function(arg1,arg2){
			return (arg1 === arg2);
		},
		toString:function(str){
			return str+"";
		},
		naturalCount:function(value, options){
			return +value + 1;
		},
		ddmmyy : function(timestamp){
			if(timestamp == 0){
				return "Not";
			}else{
				var selectedDate = new Date(Number(timestamp));
				var month=selectedDate.getMonth()+1;
				return selectedDate.getDate() + "/" + month + "/" + selectedDate.getFullYear();
			}
		},
		
		jsonStringify: param => JSON.stringify(param),

		longDate : function(timestamp){
			if(timestamp == 0){
				return "Not";
			}else{
				var opts = { day: "numeric", year: "numeric", month: "short", time: "short", hour12: true, hour: "2-digit", minute: "2-digit" };
				var selectedDate = new Date(Number(timestamp));
				return selectedDate.toLocaleString('en-GB',opts);
			}
		},
		img:function(isAmp,src,alt,height,width,ampHeight,ampWidth){
			height=(height?' height="'+height+'"':'');
			width=(width?' width="'+width+'"':'');
			alt=(alt?' alt="'+alt+'"':'');
			src=(src?'src="'+src+'"':'');
			var tag='<img ';
			var endingTag='/>';
			if(isAmp){
				height='';
				width='';
				ampHeight=(ampHeight?' height="'+ampHeight+'"':'');
				ampWidth=(ampWidth?' width="'+ampWidth+'"':'');
			
				tag='<amp-img ';
				endingTag=' '+ampHeight+ampWidth+'></amp-img>';
			}else{
				src="data-"+src;
			}
			return tag+' '+src+alt+height+width+endingTag;
		},
		imgt:function(isAmp,src,alt,title,height,width,ampHeight,ampWidth){
			height=(height?' height="'+height+'"':'');
			width=(width?' width="'+width+'"':'');
			alt=(alt?' alt="'+alt+'"':'');
			title=(title?' title="'+title+'"':'');
			src=(src?'src="'+src+'"':'');
			var tag='<img ';
			var endingTag='/>';
			if(isAmp){
				height='';
				width='';
				ampHeight=(ampHeight?' height="'+ampHeight+'"':'');
				ampWidth=(ampWidth?' width="'+ampWidth+'"':'');
			
				tag='<amp-img ';
				endingTag=' '+ampHeight+ampWidth+'></amp-img>';
			}else{
				src="data-"+src;
			}
			return tag+' '+src+alt+title+height+width+endingTag;
		},
		times:(n, block)=>{
			let accum = '';
			for(let i = 1; i <= n; ++i)
				accum += block.fn(i);
			return accum;
		},


		hhmm : function(timestamp){
			if(timestamp == 0){
				return "Not";
			}else{
				var selectedDate = new Date(Number(timestamp));
				let hours = selectedDate.getHours() > 12 ? selectedDate.getHours()-12:selectedDate.getHours();
				let am_pm = selectedDate.getHours() >= 12 ? "PM" : "AM";
				return String(hours).padStart(2, '0')  + ":" + String(selectedDate.getMinutes()).padStart(2, '0') + ' ' + am_pm;
			}
		},

		DaysSinceTimeDifferenceFrom1To8:function(differenceTimeStamp){
			if(differenceTimeStamp===0) return 'Not';
			let delta = (Math.abs(differenceTimeStamp / 1000)/86400)|0;
			return delta<1?1:(delta>8)?8:delta;
		},
		timeDifference : function (differenceTimeStamp){
			if(differenceTimeStamp===0) return 'Not';
			else {
				let delta = Math.abs(differenceTimeStamp / 1000);
				let days = Math.floor(delta / 86400);
				delta -= days * 86400;
				// calculate (and subtract) whole hours
				let hours = Math.floor(delta / 3600) % 24;
				delta -= hours * 3600;

				// calculate (and subtract) whole minutes
				let minutes = Math.floor(delta / 60) % 60;
				delta -= minutes * 60;

				// what's left is seconds
				// let seconds = (delta % 60) | 0; 
				let a='';
				if(days) a+= String(days).padStart(2, '0')  + " Days : ";
				if(hours) a+= String (hours).padStart(2, '0')  + " Hours : ";
				if(minutes) a+= String (minutes).padStart(2, '0') + " Mins ";
				// if(seconds) a+= String (seconds).padStart(2, '0')+" secs";
				return a;
			}
		},
		incremented: num => num+1,
		statusActiveDeactive: p => p ? 'Active' : 'Deactive' ,

	}	
};

