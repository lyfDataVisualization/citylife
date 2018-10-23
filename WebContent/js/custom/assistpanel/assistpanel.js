/**
 * lyf
 */
var assistPanle_showFirst=true;
function show_assistPanle()
{
	
	$("#assist_panel").toggle("slow");
//	alert(document.getElementById('assist_panel_0_1').clientWidth);
//	alert(window.innerHeight);
//	alert(window.innerWidth);
	if(assistPanle_showFirst)
	{
		option1 = {
			    title: {
			    	textStyle: {
			    	color: '#fff'
			    	},
			        text: '堆叠区域图'
			    },
			    tooltip : {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            label: {
			                backgroundColor: '#6a7985'
			            }
			        }
			    },
			    legend: {
			    	show: false,
			        data:['邮件营销','联盟广告','视频广告']
			    },
//			    toolbox: {
//			        feature: {
//			            saveAsImage: {}
//			        }
//			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : ['周一','周二','周三','周四','周五','周六','周日']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'邮件营销',
			            type:'line',
			            stack: '总量',
			            areaStyle: {},
			            data:[120, 132, 101, 134, 90, 230, 210]
			        },
			        {
			            name:'联盟广告',
			            type:'line',
			            stack: '总量',
			            areaStyle: {},
			            data:[220, 182, 191, 234, 290, 330, 310]
			        },
			        {
			            name:'视频广告',
			            type:'line',
			            stack: '总量',
			            areaStyle: {},
			            data:[150, 232, 201, 154, 190, 330, 410]
			        }
			    ]
			};
		
		//alert((window.innerWidth-200)/4*0.67+','+(window.innerHeight-200)/(2*3));
		$('#assist_panel_0_1').css("width", (window.innerWidth-200)/4*0.67).css("height", (window.innerHeight-300)/(2*3));
		var assist_panel_0_1 = echarts.init(document.getElementById('assist_panel_0_1'));
		
		$('#assist_panel_0_6').css("width", (window.innerWidth-200)/4*0.67).css("height", (window.innerHeight-300)/(2*3));
		var assist_panel_0_6 = echarts.init(document.getElementById('assist_panel_0_6'));
		
		assist_panel_0_1.setOption(option1);
		assist_panel_0_6.setOption(option1);
		option2 = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },
//			    toolbox: {
//			        feature: {
//			            restore: {},
//			            saveAsImage: {}
//			        }
//			    },
			    series: [
			        {
			            name: '业务指标',
			            type: 'gauge',
			            radius: '100%',
			            detail: {formatter:'{value}%'},
			            data: [{value: 50, name: '优'}]
			        }
			    ]
			};
		var assist_panel_0_2_1 = echarts.init(document.getElementById('assist_panel_0_2_1'));
		var assist_panel_0_3_1 = echarts.init(document.getElementById('assist_panel_0_3_1'));
		var assist_panel_0_4_1 = echarts.init(document.getElementById('assist_panel_0_4_1'));
			setInterval(function () {
			    option2.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
			    assist_panel_0_2_1.setOption(option2, true);
			    assist_panel_0_3_1.setOption(option2, true);
			    assist_panel_0_4_1.setOption(option2, true);
			},2000);
//		assist_panel_0_1.resize(400,170);
	}
	assistPanle_showFirst = false;
}