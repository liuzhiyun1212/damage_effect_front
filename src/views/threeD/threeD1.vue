<template>
<div>
  <div id="main" style="border: 1px solid green;width: 100%;height: 800px;float: left;background: #999;"></div>
</div>
</template>

<script>
import * as echarts from "echarts";
import 'echarts-gl'
export default {
  name: "threeD1",



  mounted() {
    this.initChart();


  },

  data() {
    return {
      data: [
        [1,12,2,125,'故障件1'],
        [2,9,3,10,'故障件2'],
        [3,6,1,90,'故障件3'],
        [3,1,1,170,'故障件4'],
        [3,1,1,10,'故障件5'],

      ],
      x: [],
      y: [],
      se: [],
      date:[],
      name:[],
    };
  },

  methods: {

    initChart() {
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.setOption());
      console.log(this.setOption());
    },


    setOption() {
      let option = {
        visualMap: {
          min: 0,
          max: 200,
          dimension: 3,
          orient: 'vertical',
          right: 10,
          top: 'center',
          text: ['最大值', '最小值'],
          calculable: true,
          inRange: {
            color: ['#f2c31a', '#24b7f2']
          }
        },
        grid3D: {
          boxWidth: 60,						//图件宽
          boxHeight: 60,						//图件高
          boxDepth: 180,						//图件长
          height: '100%',						//容器高
          width: '100%',						//容器宽
          bottom: 'auto',						//3D图与下容器的距离
          top: 'auto',			   				//3D图与上容器的距离
          axisLine: {
            lineStyle: {
              color: 'yellow' ,				//坐标轴轴线颜色
            }
          },
          splitLine: {
            lineStyle: {
              type:'dashed',
              opacity:0.5,
              color: '#222'  				//分割线颜色
            }
          },
          axisPointer: {
            lineStyle: {
              color: '#efe' 				//鼠标滑过分割线颜色
            }
          },
          environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#00aaff' 	// 天空颜色
          }, {
            offset: 0.7, color: '#998866' // 地面颜色
          }, {
            offset: 1, color: '#998866' 	// 地面颜色
          }], false),
          /*  postEffect: {
            enable: false					//开启特效
          },*/
          viewControl: {
            projection: 'perspective',		//默认为透视投影'perspective'，也支持设置为正交投影'orthographic'
            autoRotate: true,				//自动旋转
            autoRotateDirection: 'ccw',     //默认是 'cw' 从上往下看是顺时针 也可以取 'ccw'逆时针
            autoRotateSpeed: 4,				//默认10 自转速度
            autoRotateAfterStill: 5,		//默认3秒 鼠标静止操作后恢复自动旋转的时间间隔
            damping: 0.8,					//鼠标进行旋转，缩放等操作时的迟滞因子，在大于 0 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）
            animation: true,				//是否开启动画
            animationDurationUpdate: 1000,	//过渡动画的时长
            animationEasingUpdate: 'cubicInOut' //过渡动画的缓动效果
          },
          postEffect: {
            enable: false					//是否开启后处理特效，默认关闭 不能开  浏览器会卡
          }
        },
        xAxis3D: {
          show: true,
          name: '左中右',
          nameTextStyle: {
            color: 'lime',
            fontWeight: 'normal'
          },
          minInterval:1,
          min: 1,
          max: 3
        },
        yAxis3D: {
          show: true,
          name: '框数',
          nameTextStyle: {
            color: 'lime',
            fontWeight: 'normal'
          },
          splitNumber:29,
          minInterval:1,
          min: 1,
          max: 30
        },
        zAxis3D: {
          show: true,
          name: '上中下',
          nameTextStyle: {
            color: 'lime',
            fontWeight: 'normal'
          },
          minInterval:1,

          min: 1,
          max: 3
        },
        dataset: {
          dimensions: [
            '左中右',
            '框数',
            '上中下',
            '名字',
            '数量',
            //{name: '井名', type: 'ordinal'}
          ],
          source: this.data
        },
        series: [
          {
            type: 'scatter3D',				//3D类型
            name: '测试',				    //名字
            //coordinateSystem: 'grid3D',	//使用地球三维地理坐标系
            //grid3DIndex: 0,				//坐标轴使用的 geo3D 组件的索引
            symbol: 'diamond',				//点形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            symbolSize: 28,  				//点大小
            itemStyle: {
              // color: 'red',		   		//点颜色
              // borderColor: 'red',  		//点边框颜色
              opacity: 1,            		//点的透明度 1不透明
              borderWidth: 0.5       		//图形描边宽度
            },
            label: {
              show: false, 				//是否显示点上面的标签，默认false
              distance: 15,				//标签与点的距离
              position: 'left',      		//标签位置
              textStyle: {
                color: 'black', 			//文字颜色
                borderWidth: 0,  		//标签上边框宽度
                borderColor: 'white',   	//边框颜色
                fontFamily: '宋体',		//标签字体
                fontSize: 14,			//字体大小
                fontWeight: 'normal'		//是否加粗
              }
            },
            emphasis: {
              itemStyle: {
                color: 'red',			//鼠标移到点上的颜色变化
                opacity: 1,				//不透明度
                borderWidth: 0,			//图像描边宽度
                borderColor: '#fff' 		//图形描边颜色
              },
              label: {
                show: true,				//鼠标移动到点上是否显示标签
                distance: 15,			//标签与点的距离
                position: 'left',      	//标签位置
                textStyle: {
                  color: 'black', 		//文字颜色
                  borderWidth: 0,  	//标签上边框宽度
                  borderColor: 'white',//边框颜色
                  fontFamily: '宋体',	//标签字体
                  fontSize: 14,		//字体大小
                  fontWeight: 'normal'	//是否加粗
                }
              }
            },
            blendMode: 'lighter',			//混合模式默认使用的'source-over'是通过 alpha 混合，而'lighter'是叠加模式，该模式可以让数据集中的区域因为叠加而产生高亮的效果。
            silent: false,					//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            animation: true,					//是否开启动画
            animationDurationUpdate: 500,	//过渡动画的时长
            animationEasingUpdate: 'cubicOut',//过渡动画的缓动效果
            encode: {
              x: 'X坐标',
              y: 'Y坐标',
              z: '井深',
              tooltip: [0, 1, 2, 3, 4]
            }
          }
        ]
      };
      return option;
    }
  }

}
</script>

<style scoped>

</style>
