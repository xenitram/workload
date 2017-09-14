//<@workload/lib/d3/v3.5.17/d3@>

var xen_d3_todayline= function(xScale) {
	
	var xScale = xScale;
	var height=80;
	var lineFormat={marginTop: 25, marginBottom: 0, width: 1, color: 'rgba(0,0,255,0.3)' };
	
	var todayline=function(selection){
		selection.each(function(data){
		//todayLine = xScale(new Date());
		var todayLine=xScale(new Date("2017-08-30T17:50:04.000Z"));
		
			var tl=d3.select(this).selectAll('#today').data([data]);
			
			tl.enter().append("line").attr('id','today')
			  tl
			  .style("stroke", lineFormat.color)//"rgb(6,120,155)")
			  .style("stroke-width", lineFormat.width);

			tl.attr("x1", todayLine)
			  .attr("y1", 0)
			  .attr("x2", todayLine)
			  .attr("y2", height - lineFormat.marginBottom)
		
			tl.exit().remove()
		})
	}
	
	  todayline.height = function(value) {
		if (!arguments.length) return height;
		height = value;
		return todayline;
	  };

	  todayline.lineFormat = function(value) {
		if (!arguments.length) return lineFormat;
		lineFormat = value;
		return todayline;
	  };
  	
	return todayline;
}

//<@workload/lib/d3/v3.5.17/d3@>

var xen_d3_bgbar= function(yScale) {
	var x=0,y=0,width=0,barSpacing=15,barPadding=2;
	
	var self=function(selection){
		selection.each(function(data){

			var gbackground=d3.select(this).selectAll('.bgbar').data(function(d,i){
						return d;
					},
					function(d){
					//console.log(d.meta.name);
						return d.meta.name
					})

			var backgroundEnter=gbackground.enter().append('g').attr('class', 'bgbar')
					.attr('transform',function(d,i){
					//console.log('i',i,d);
						return "translate("+0+","+yScale(i)+")"
					})

			//var bgrect=
			backgroundEnter.append('rect').attr('class','rbar')

						.on('mouseover',function(e){d3.select(this).style("fill", "#aaa");})
						.on('mouseout',function(e){d3.select(this).style("fill", "#ddd");})

			var bgrect=gbackground.selectAll('.rbar')//.data(function(d,i){return d;})
			bgrect.attr('x',x)		
						.attr('y',y)
						.attr('width',width)
						.attr('height',barSpacing-barPadding)
						//.transition().duration(2000)
						.attr('fill',function(d,i){
						//console.log('d',d);
						//return d.meta.bar;
						return "#ddd";
						})
		})
	}
	
	  self.x = function(value) {
		if (!arguments.length) return x;
		x = value;
		return self;
	  };
	  self.y = function(value) {
		if (!arguments.length) return y;
		y = value;
		return self;
	  };	
	  self.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return self;
	  };
	  self.barSpacing = function(value) {
		if (!arguments.length) return barSpacing;
		barSpacing = value;
		return self;
	  };
	  self.barPadding = function(value) {
		if (!arguments.length) return barPadding;
		barPadding = value;
		return self;
	  };  	
	return self;
}

//<@workload/lib/d3/v3.5.17/d3@>

var batchdata={}

var lnk="http://sxbatch.silex.se/ProjectPlanning/batch/batchPage.aspx?batchId=";

function getBatchData(d){
		if(batchdata[d.meta.name])
		d3.html(lnk+databybatch[d0]['meta']['id'],function(fragment){
			var stylestr=d3.select(fragment).select('#ctl00_sxBatchContent_SxNormalHeader1_lblHeaderText').attr('style');
			var area=d3.select(fragment).select('#ctl00_sxBatchContent_lblArea').text();
			var started=d3.select(fragment).select('#ctl00_sxBatchContent_btnUnregister')
			//var stylestr="color:red;background-color:lightGreen;"
			var oStyle={}
			var style=(stylestr)?stylestr.match(/(.*?:.*?);/g)//.shift()
			.map(function(str){var v=str.match(/(.*?):(.*?);/);return[v[1],v[2]]}).forEach(function(d){oStyle[d[0]]=d[1]})
			:[];

			//console.log(d0,oStyle,area,started[0][0]);
			d['fontcolor']=oStyle['color'];
			d['fill']=oStyle['background-color'];
			
		})
}

var xen_d3_batch= function(yScale) {
	
	var yScale=yScale;
	var x=0,y=0,width=0,barSpacing=15,barPadding=2;
	
	var self=function(selection){
		selection.each(function(data){
		
			var gbatch=d3.select(this)
			.selectAll('.gbatch').data(function(d,i){
						return d;
					},
					function(d){
					//console.log(d.meta.name);
						return d.meta.name
					})

		var batchEnter=gbatch.enter().append('g').attr('class', 'gbatch')
			.attr('transform',function(d,i){
			//console.log('i',i,d);
				return "translate("+0+","+yScale(i)+")"
			})
			.append('a')
				.attr('xlink:href',function(d){return 'http://sxbatch.silex.se/sxBatch/Operator/batch/batchPage.aspx?batchId='+d.meta.id;})//+'-'+d.name

    batchEnter.append("rect")  
		.attr("x", x)
		.attr("y", x)
		.attr("height",barSpacing-barPadding )
		.attr("width", width)
		.style("fill", function(d,i){return d.meta.fill;})
		//.attr("rx", 10)
		//.attr("ry", 10)
		.style("stroke-width", function(d,i){
			return d.meta.strokewidth
			})		
		.style("stroke", function(d,i){
			return d.meta.stroke
			})		

	gbatch.exit().remove()	
		
		
/*		.on('mouseover',function(d,i){
					var pageX=d3.event.pageX;
					var pageY=d3.event.pageY;
					d3.html(
					//'http://sxbatch.silex.se/sxBatch/Operator/batch/batchPage.aspx?batchId='+d.meta.id
					'http://localhost:9000/Custom.html'
					,function(doc){
						//console.log(doc);
						var q=doc.querySelectorAll('a')
						var r="";
						q.forEach(function(e){
							r+=e.innerHTML;
						})
						div	.html('-'+ r	)
							.style("left", (pageX) + "px")		
							.style("top", (pageY - 28) + "px");	
					})
				})
*/
			.append("rect:title")
			.text(function(d,i){return d.meta.title;})

	batchEnter.append("text").attr('class','batchtext')
    .attr("x", 10)
    .attr("y", 4)
    .style("fill", function(d,i){
		return d.meta.fontcolor
		})
    .style("font-size", function(d,i){
		return d.meta.fontsize //(d.meta.fontstyle==='italic')?'12px':'10px';
		})
    .style("font-style", function(d,i){
		return d.meta.fontstyle
	})
    .attr("dy", ".35em")
    .attr("text-anchor", "left")
    .style("pointer-events", "none")
	.text(function(d,i) {
				//console.log(d.meta)
			  return d.meta.name;
			})		

	gbatch.selectAll('.batchtext')
	    .style("font-size", function(d,i){
			//console.log(d.meta)
			//return "12px";
		return(!d.meta.fontstyle)?'12px':((d.meta.fontstyle==='italic')?'14px':'12px');
		})	
	.style("fill", function(d,i){
		//console.log(d.meta);
		return d.meta.fontcolor
		})
    .style("font-style", function(d,i){
		return d.meta.fontstyle
		})		
	
	})

	}
	
	  self.x = function(value) {
		if (!arguments.length) return x;
		x = value;
		return self;
	  };
	  self.y = function(value) {
		if (!arguments.length) return y;
		y = value;
		return self;
	  };	
	  self.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return self;
	  };
	  self.barSpacing = function(value) {
		if (!arguments.length) return barSpacing;
		barSpacing = value;
		return self;
	  };
	  self.barPadding = function(value) {
		if (!arguments.length) return barPadding;
		barPadding = value;
		return self;
	  };  
  	
	return self;
}

//<@workload/lib/d3/v3.5.17/d3@>
var xen_d3_segment= function(xScale) {
	

	var x=0,y=0,width=0,barSpacing=15,barPadding=2;

	var self=function(selection){
		selection.each(function(data){
	//console.log('segment');		
			var gsegment=d3.select(this)
				.selectAll('.gsegment')
					.data(function(d,i){
						//console.log(data1);
						return d.action;
					},function(d){
					//console.log('sss',d.number);
					return d.number;})
				.attr('transform',function(d,i){
			//console.log('iii',i);
			return "translate("+xScale(d.starttime)+","+0+")"
		})

		var gsegmentEnter=gsegment.enter().append('g').attr('class', 'gsegment')
			.append('rect').attr('class', 'rsegment')
					.attr('x',function(d,i){
						//console.log('segment 1 '+i);
						return 0;})
					.attr('y',0)
					.attr('rx',1)
					.attr('ry',6)
					//.attr('height',barSpacing-barPadding)
					//.attr('width',function(d,i){return xScale(d.endtime)-xScale(d.starttime);})					
					.attr('fill',function(d,i){return d.fill;})
					.style('stroke-width',function(d,i){return d.strokewidth;})
					.style('stroke',function(d,i){return d.stroke;})						
						.append("rect:title")
						.text(function(d){return d.title;})


		gsegment
		//.transition().duration(2000)
		.attr('transform',function(d,i){
			return "translate("+xScale(d.starttime)+","+0+")"
		})
		.select('.rsegment')
		//.transition().delay(1000).duration(2000).ease('linear')
					.attr('height',barSpacing-barPadding)
					.attr('width',function(d,i){
						return xScale(d.endtime)-xScale(d.starttime);
					})		
					
		gsegment.exit()
				//.style("fill-opacity", 1)
				//.transition().duration(2000)
				//.style("fill-opacity", 0)
				.remove();				

			
		})
	}
	
	  self.example = function(value) {
		if (!arguments.length) return example;
		example = value;
		return self;
	  };
 
 	  self.x = function(value) {
		if (!arguments.length) return x;
		x = value;
		return self;
	  };
	  self.y = function(value) {
		if (!arguments.length) return y;
		y = value;
		return self;
	  };	
	  self.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return self;
	  };
	  self.barSpacing = function(value) {
		if (!arguments.length) return barSpacing;
		barSpacing = value;
		return self;
	  };
	  self.barPadding = function(value) {
		if (!arguments.length) return barPadding;
		barPadding = value;
		return self;
	  };  
  	
	return self;
}

//<@workload/lib/d3/v3.5.17/d3@>
var Segment = xen_d3_segment

var xen_d3_bar= function(xScale,yScale) {
	

	var x=0,y=0,width=0,barSpacing=15,barPadding=2;
	
	var self=function(selection){
		selection.each(function(data){
//console.log('!');		
			var gbar=d3.select(this)
				.selectAll('.gbar').data(function(d,i){
						return d;
					},
					function(d){
					//console.log(d.meta.name);
						return d.meta.name
					})

		//var gbarEnter=
		gbar.enter().append('g').attr('class', 'gbar')
				

		gbar
			//.transition().duration(2000)
			.attr('transform',function(d,i){
				//console.log('i',i,d);
				return "translate("+0+","+yScale(i)+")"
			})

		var segment=Segment(xScale,yScale)
		segment.x(0).y(0).width(80).barSpacing(barSpacing).barPadding(barPadding)
		gbar.call(segment)		
		
		gbar.exit()
				//.style("fill-opacity", 1)
				//.transition().duration(2000)
				//.style("fill-opacity", 0)
				.remove();			


		
/*
		var gsegment = gbar.selectAll('.gsegment')
					.data(function(d,i){
						//console.log(data1);
						return d.action;
					},function(d){
					//console.log('sss',d.number);
					return d.number;})
					

		gsegment.enter().append('g').attr('class', 'gsegment')
		
					.append('rect').attr('class', 'rsegment')
					.attr('x',0)
					.attr('y',0)
					.attr('rx',1)
					.attr('ry',6)
					//.attr('height',barSpacing-barPadding)
					//.attr('width',function(d,i){return xScale(d.endtime)-xScale(d.starttime);})					
					.attr('fill',function(d,i){return d.fill;})
					.style('stroke-width',function(d,i){return d.strokewidth;})
					.style('stroke',function(d,i){return d.stroke;})						
						.append("rect:title")
						.text(function(d){return d.title;})
		



		gsegment
		//.transition().duration(2000)
		.attr('transform',function(d,i){
			console.log('iii',i);
			return "translate("+xScale(d.starttime)+","+0+")"
		})
		.select('.rsegment')
		//.transition().delay(1000).duration(2000).ease('linear')
					.attr('height',barSpacing-barPadding)
					.attr('width',function(d,i){
						console.log(d.endtime);
						return xScale(d.endtime)-xScale(d.starttime);
					})		
					
		gsegment.exit()
				//.style("fill-opacity", 1)
				//.transition().duration(2000)
				//.style("fill-opacity", 0)
				.remove();				
			
			
*/			
			
		})
	}
	
	  self.x = function(value) {
		if (!arguments.length) return x;
		x = value;
		return self;
	  };
	  self.y = function(value) {
		if (!arguments.length) return y;
		y = value;
		return self;
	  };	
	  self.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return self;
	  };
	  self.barSpacing = function(value) {
		if (!arguments.length) return barSpacing;
		barSpacing = value;
		return self;
	  };
	  self.barPadding = function(value) {
		if (!arguments.length) return barPadding;
		barPadding = value;
		return self;
	  };  
  	
	return self;
}



//<@workload/lib/d3/v3.5.17/d3@>
var Todayline = xen_d3_todayline
var BackgroundBar = xen_d3_bgbar
var Batch = xen_d3_batch
var Bar = xen_d3_bar

var xen_d3_timeline= function() {
	
	function timeline(selection){

		function getMinMax(data){
			var allTimes=[];			
			  Object.keys(data).forEach(function(key){
				var times=data[key]['action'];
				//var times=batch['times'];
				times.forEach(function(time){
						allTimes.push(time['starttime'])
						allTimes.push(time['endtime']);

				});
			  });
			  
			return d3.extent(allTimes)
		}

		selection.each(function(data){

			var bounding=this.getBoundingClientRect();

			var length=d3.keys(data).length;

			console.log(length);

			var width=bounding.width;
			//var height=bounding.height;
			var barSpacing=14;
			var height=length*barSpacing

			var margin={left:80,right:50,top:20,bottom:5};

			//var barSpacing = height/length;

			var barPadding = 5

			var minMax=getMinMax(data);

			var minValue=minMax[0];
			var maxValue=minMax[1];

			var xScale = d3.time.scale()
					.domain([minValue, maxValue])
					.range([margin.left, width-margin.right]);
			var yScale = d3.scale.linear()
					.domain([0, length])
					.range([margin.top, height-margin.bottom]);							

			// Define the div for the tooltip
	/*		var div = d3.select("body").append("div")	
				.attr("class", "tooltip")				
				.style("opacity", 0.4);
	*/

			var zoom=d3.behavior.zoom()
					.scaleExtent([1, 10])
					.x(xScale)
					//.y(xScale)
					.on("zoom", zoomed)   

				// Select the svg element, if it exists.	
			var svg = d3.select(this).selectAll(".chart")
				.data([d3.values(data)])
				 //https://bl.ocks.org/mbostock/3680999

				// Otherwise, create the skeletal chart.
			var containerEnter=svg.enter().append('svg').attr('class','chart')
			  .attr("xmlns","http://www.w3.org/2000/svg")
			   .attr("xmlns:xlink","http://www.w3.org/1999/xlink")
				.attr("version","1.1")
				.style('width',width)
				.style('height',height)
				.style('border','1px blue solid')
				.append("g").attr('class', 'container')
				.call(zoom)


			var rect = containerEnter.append("rect")
				.attr("width", width)
				.attr("height", height)
				.style("fill", "none")
				.style("pointer-events", "all")
				//.style("background","none !important")


			var bgBar=containerEnter.append('g').attr('class','bgbars')
			var plotChart=containerEnter.append('g').attr('class','timebars')
			var batchList=containerEnter.append('g').attr('class','batches')	


			var container = svg.select('.container')
			var bgbars = container.select('.bgbars')
			var timebars = container.select('.timebars')
			var batches = container.select('.batches')


			svg	//.transition().duration('2000')
				.style('width',width)
				.style('height',height)



			var backgroundBar=BackgroundBar(yScale);
			//console.log(backgroundBar);
			backgroundBar.x(0).y(0).width(width).barSpacing(barSpacing).barPadding(barPadding);
			bgbars.call(backgroundBar)
			
			var batch=Batch(yScale);
			//console.log(batch);
			batch.x(0).y(0).width(xScale(minValue)).barSpacing(barSpacing).barPadding(barPadding);
			batches.call(batch)

			var bar=Bar(xScale,yScale);
			//console.log(batch);
			bar.x(0).y(0).width(xScale(minValue)).barSpacing(barSpacing).barPadding(barPadding);
			timebars.call(bar)

			var todayline=Todayline(xScale)
			todayline.height(height)
			timebars.call(todayline)



			tickFormat = { format: d3.time.format("%H:%M"),
			  tickTime: d3.time.hours,
			  tickInterval: 1,
			  tickSize: 6,
			  tickValues: null
			
			}
			var customTimeFormat = d3.time.format.multi([
			  [".%L", function(d) { return d.getMilliseconds(); }],
			  [":%S", function(d) { return d.getSeconds(); }],
			  ["%I:%M", function(d) { return d.getMinutes(); }],
			  ["%I %p", function(d) { return d.getHours(); }],
			  ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
			  ["%b %d", function(d) { return d.getDate() != 1; }],
			  ["%B", function(d) { return d.getMonth(); }],
			  ["%Y", function() { return true; }]
			]);

			var xAxis = d3.svg.axis()
						  .scale(xScale)
						  .orient("bottom")
						  .ticks(10)
						  //.tickFormat(formatAsPercentage);	
						  //.tickFormat(tickFormat.format);
							.tickFormat(customTimeFormat);

			var axisX=svg.selectAll(".axisx").data([data])

			axisX.enter().append("g")
				.attr("class", "axisx")
			.call(xAxis);			
			
			//axisX.attr("transform", "translate(" + 0 + ","+ pageYOffset +")")
			//axisX.attr("x", 0)
			//.attr("y", 0)
			//axisX			

		
		/*https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js

			svg.call(d3.behavior.zoom().on("zoom", function () {
			svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
			}))
		*/
			
			function zoomed() {
				var e=d3.event
				var t = e.translate,
				s = e.scale;
				
				  //t[0] = Math.min(0, Math.max(e.translate[0], width - width * e.scale)),
				  t[1] = Math.min(0, Math.max(e.translate[1], height - height * e.scale));
	  
			//zoom.translate(t);

			  svg.select(".axisx").call(xAxis);
			  plotChart.attr("transform", "translate(" + t + ")scale(" + s + ")");
			  batchList.attr("transform", "translate(" + [0,t[1]] + ")scale(" + s + ")");
			  bgBar.attr("transform", "translate(" + [0,t[1]] + ")scale(" + s + ")");
			}		
		
		})



	}
	
	return timeline;
};

var xen_utils_extract= function extract(selection){
	var databybatch={};

	selection.forEach(function(row,i){
		//console.log(row);
		var batchid=(row[2])? 
				row[2].innerHTML.match(/tchId=(.+?)">(.+?)</)
				:row[2];
		if(batchid){
			//if(databybatch[batchid[2]]){
				if(! databybatch[batchid[2]] ){
					databybatch[batchid[2]]={'meta':{'id':batchid[1],'name':batchid[2],'product':row[1].innerHTML,},'action':[]}
					//console.log('NEW '+batchid[2]);
					
				}
				//console.log('-------- '+batchid[2]);
				var arr={
					'id':batchid[1],
					'name':batchid[2],
					'product':row[1].innerHTML,
					'state':row[3].innerHTML,
					'number':row[4].innerHTML,
					'step':row[5].innerHTML,
					'layer':row[6].innerHTML,
					'area':row[7].innerHTML,
					'instrument':row[8].innerHTML,
					'instrumentname':row[9].innerHTML,
					'status':row[10].innerHTML,
					'wafers':row[11].innerHTML,
					'starttime':new Date(row[12].innerHTML),
					'endtime':new Date(row[13].innerHTML),
					//'nodate1':new Date(row[14]),
					//'nodate2':new Date(row[15]),
					'next':row[16].innerHTML,
					//'field17'row[17],
					//'startcolor':d3.select(row[12]).style('background-color'),
					'startcolor':row[12].style.backgroundColor,				
					'endcolor':row[13].style.backgroundColor
					}
				arr.title=JSON.stringify(arr);
				//arr=[batchid[1],i];
				databybatch[batchid[2]]['action'].push(arr)
		}		
		//databybatch[]
	});
	return databybatch;	
}

var prodactive='#aa00aa';
var devactive='#00aaaa';
var prodstop='#ffaaff';
var devstop='#aaffff';

var color={
	'Aktiv':prodactive,

	'Aktiv (Utveckling)':devactive,

	'Stopp_PL':prodstop,
	'Stopp_Fab':prodstop,

	'Stopp_PL (Utveckling)':devstop,
	'Stopp_Fab (Utveckling)':devstop
};

var duration=function(starttime,endtime){
	var diffMs=endtime-starttime;
	var diffDays = Math.round(diffMs / 86400000); // days
	var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes	


	return ((diffDays)?((diffDays===1)?' '+diffDays+' day':' '+diffDays+' days'):'')+
	((diffHrs)?((diffHrs===1)?' '+diffHrs+' hour':' '+diffHrs+' hours'):'')+
	((diffMins)?((diffMins===1)?' '+diffMins+' minute':' '+diffMins+' minutes'):'');
}


var xen_utils_transformwork= function transformer(databybatch,container,chart){
	var formatedData={}
	var lnk="http://sxbatch.silex.se/ProjectPlanning/batch/batchPage.aspx?batchId=";

	Object.keys(databybatch).forEach(function(d0,i0){
	//console.log(d0,databybatch[d0]['meta']['id']);
		d3.html(lnk+databybatch[d0]['meta']['id'],function(fragment){
			var stylestr=d3.select(fragment).select('#ctl00_sxBatchContent_SxNormalHeader1_lblHeaderText').attr('style');
			var area=d3.select(fragment).select('#ctl00_sxBatchContent_lblArea').text();
			var started=d3.select(fragment).select('#ctl00_sxBatchContent_btnUnregister')

			//var stylestr="color:red;background-color:lightGreen;"
			var oStyle={}
			var style=(stylestr)?stylestr.match(/(.*?:.*?);/g)//.shift()
			.map(function(str){var v=str.match(/(.*?):(.*?);/);return[v[1],v[2]]}).forEach(function(d){oStyle[d[0]]=d[1]})
			:[];

			//console.log(d0,oStyle,area,started[0][0]);
			formatedData[d0]['meta']['fontcolor']=oStyle['color'];
			formatedData[d0]['meta']['fill']=(oStyle['background-color'])?oStyle['background-color']:'white';
			formatedData[d0]['meta']['fontstyle']=(started[0][0])?'italic' :'normal';
			formatedData[d0]['meta']['stroke']='lightGreen';//(area==='Plasma-8"')
			formatedData[d0]['meta']['strokewidth']=2;
			update(container,formatedData,chart);

			
		})

		formatedData[d0]={'action':{},'meta':[]}
		formatedData[d0]['meta']=databybatch[d0]['meta'];
		formatedData[d0]['meta']['title']=	"ID: "+databybatch[d0]['meta'].name+"\n"+"Product: "+databybatch[d0]['meta'].product+"\n";	
		formatedData[d0]['meta']['fill']="rgba(255,100,100,0.6)";
		formatedData[d0]['meta']['fontcolor']='';
		formatedData[d0]['meta']['fontstyle']='normal';
		formatedData[d0]['meta']['stroke']='lightGreen';
		formatedData[d0]['meta']['strokewidth']=2;
		
		formatedData[d0]['action']=databybatch[d0]['action'].map(function(d1,i1){

		//console.log(d1.starttime)
		var starttime=new Date(d1.starttime)
		var endtime=new Date(d1.endtime)
		var format = d3.time.format("%Y-%m-%d");

		d1.starttime=(starttime<=new Date("1955-10-28 00:00:00"))? endtime:starttime;
		d1.endtime=endtime
		//d1.nodate1=new Date(d1.nodate1)
		//d1.nodate2=new Date(d1.nodate2)	
		d1.title="ID: "+d1.name+"\n"+
			"Product: "+d1.product+"\n"+
			"State: "+ d1.state+"\n"+
			"Step: "+ d1.number +"\n"+
			"Step Name: "+ d1.step +"\n"+
			"Layer: "+ d1.layer +"\n"+
			"Area: "+ d1.area +"\n"+
			"Instrument: "+ d1.instrument +"\n"+
			"Instrumentname: "+ d1.instrumentname +"\n"+
			"Next Instrument: "+ d1.next +"\n"+     
			"Status: "+ d1.status +"\n"+
			"Wafers: "+ d1.wafers +"\n"+
			"Start Time: "+ format(starttime) +"(" + duration(new Date(),starttime) + ")\n"+
			"End Time: "+ format(endtime) +"(" + duration(new Date(), endtime) + ")\n"+
			"Duration:" +duration(starttime,endtime)
			;		 
		 
		//console.log(d1.name,d1.startcolor,d1.endcolor)
		d1.fill=(color[d1.state])?color[d1.state]:'#0000ff';
		d1.stroke=(d1.endcolor)? d1.endcolor:(d1.startcolor)? d1.startcolor:"";
		d1.strokewidth=1

		return d1});
	});
	
	return formatedData;
	
}

//<@workload/lib/d3/v3.5.17/d3@>
d3.timeline = xen_d3_timeline;
// var databybatch = < @./data@>;
var extract = xen_utils_extract;
var transform = xen_utils_transformwork;

var prodactive='#aa00aa';
var devactive='#00aaaa';
var prodstop='#ffaaff';
var devstop='#aaffff';

var duration=function(starttime,endtime){
	var diffMs=endtime-starttime;
	var diffDays = Math.round(diffMs / 86400000); // days
	var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes	


	return ((diffDays)?((diffDays===1)?' '+diffDays+' day':' '+diffDays+' days'):'')+
	((diffHrs)?((diffHrs===1)?' '+diffHrs+' hour':' '+diffHrs+' hours'):'')+
	((diffMins)?((diffMins===1)?' '+diffMins+' minute':' '+diffMins+' minutes'):'');
}

//var process={'':'','started':'yellow','finished':'lightGreen'};

var color={
	'Aktiv':prodactive,

	'Aktiv (Utveckling)':devactive,

	'Stopp_PL':prodstop,
	'Stopp_Fab':prodstop,

	'Stopp_PL (Utveckling)':devstop,
	'Stopp_Fab (Utveckling)':devstop
};

//var board=d3.html('http://xlbatch.silex.se/BoardPages/BoardFab8WfrCR.aspx',function(doc){console.log(doc);})



	function update(container,data,chart){
		console.log(data);
		container.datum(data).call(chart);
	}


var resultdata;
	var container= d3.select("body")
	var chart = d3.timeline();
	

	var rawdata=d3.selectAll("table#ctl00_sxBatchContent_rgridWorkload_ctl00 tr")
			.selectAll('td')

//console.log(rawdata)
	var data=extract(rawdata)
	//console.log('data',data);
	resultdata=[transformer(data,container,chart)]
	var container= d3.select("body")
	container.datum(resultdata[0]).call(chart);


//d3.select('body').append('div').append('pre').text(JSON.stringify(resultdata,null,2))
var work= undefined;


