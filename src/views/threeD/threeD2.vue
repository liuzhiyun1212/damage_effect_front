<template>
  <div>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
      <div style="margin-bottom:120px;margin-left: 2%;width: 96%;height: 700px;background: #999; " >
        <div id="main" style="width: 100%;height: 100%;"></div>
        <div id="legend" style="margin-bottom:10px;width: 100%;height: 100px;background:#998866"></div>
      </div>
      <div style="margin-top:10px;width: 100%; background: #d2e9ff; border-radius: 10px">
        <p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          故障件安装方法统计
        </p>
      </div>
      <el-table :header-cell-style="{
          background: '#84BBFE',
          color: '#fff',
          fontSize: '14px',
          textAlign: 'center',
          fontWeight: '600',
          fontFamily: '黑体',
          padding: '0',
        }"
                :header-row-style="{
          height: '20',
        }"  :data="this.tabledata"  style="height:auto;margin-top: 20px;width:100%">
        <el-table-column label="序号" align="center" type="index" />
        <!--   <el-table-column label="故障件型号" align="center" prop="finishedModel" />
           <el-table-column label="故障件名称" align="center" prop="finishedName" />-->
           <el-table-column label="机型" align="center" prop="planeType" />
        <el-table-column label="故障件型号" align="center" prop="finishedModel" />
        <el-table-column label="故障件名称" align="center" prop="finishedName" />
        <el-table-column label="安装方法" align="center" prop="installMethod" />
        <el-table-column label="质量问题数" align="center" prop="num" />
        <!--<el-table-column label="故障件" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="getwindow(scope.row)"
              round
            >查看</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </el-card>
    <el-dialog :title="title" :visible.sync="open" height="1000px" width="75%" append-to-body>
      <el-table :header-cell-style="{
          background: '#84BBFE',
          color: '#fff',
          fontSize: '14px',
          textAlign: 'center',
          fontWeight: '600',
          fontFamily: '黑体',
          padding: '0',
        }"
                :header-row-style="{
          height: '20',
        }"  :data="this.windata"  style="height:auto;margin-top: 20px;margin-left:10%;width:80%">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column label="故障件型号" align="center" prop="finishedModel" />
        <el-table-column label="故障件名称" align="center" prop="finishedName" />
        <el-table-column label="故障件类型" align="center" prop="finishedType" />
        <el-table-column label="框数" align="center" prop="frame" />
        <el-table-column label="左中右" align="center" prop="leftMiddleRight" />
        <el-table-column label="上中下" align="center" prop="upperMiddleLower" />
        <!--<el-table-column label="故障模式" align="center" prop="num" />-->
        <el-table-column label="生产厂家" align="center" prop="finishedManufacturer"/>
      </el-table>
    </el-dialog>
  </div>


</template>

<script>
import * as echarts from "echarts";
import 'echarts-gl'
import {partsSite,pointCount,getWindow,getinstall_way,getana_install_way,getDesign} from "../../../src/api/design.js"
export default {
  name: "threeD2",



  mounted() {

    this.getdata();
    this.gettable()
  },

  data() {
    return {
      open:false,
      install:[],
      data: [
        /*  [1,12,2,'故障件1'],
          [2,9,3,'故障件2'],
          [3,6,1,'故障件3'],
          [3,1,0.5,'故障件4'],
          [3,1,1.2,'故障件5'],
          [3,1,1.3,'故障件6'],
          [3,1,1.4,'故障件7'],
          [3,1,1.5,'故障件8'],*/

      ],
      title:"该点分布的故障件",
      tabledata:[],
      x: [],
      y: [],
      se: [],
      date:[],
      name:[],
      a:[],
      windata:[],
      color:[],
    };
  },

  methods: {

    getdata(){
      getinstall_way().then((response)=>{
        console.log(response);
        for(let i=0;i<response.length;i++){
          let data=[];
          let mark=0;
          data.push(response[i].leftMiddleRight);
          data.push(response[i].frame);
          data.push(response[i].upperMiddleLower);
          data.push(response[i].planeType);
          data.push(response[i].finishedModel+'--'+response[i].finishedName);
          data.push(response[i].installMethod);
          this.data.push(data);
          for(let j=0;j<this.install.length;j++){


            if(response[i].installMethod===this.install[j]){
              mark=-1;
            }
          }
            if(mark===0){
              this.install.push(response[i].installMethod);
              const r = Math.floor(Math.random()*256);
              const g = Math.floor(Math.random()*256);
              const b = Math.floor(Math.random()*256);
              this.color.push(`rgb(${r},${g},${b})`);
            }
        }
        //  this.data=this.x;
        console.log(this.data)
        this.make_legend();
        this.initChart();

      })
    },

    make_legend(){
      console.log(this.color.length);
      var MyDiv =document.getElementById("legend");
      MyDiv.style.paddingTop=20+"px";
      for(let i=0;i<this.color.length;i++){
        var MyDiv =document.getElementById("legend");
        var div = document.createElement("div")
        div.style.height="30px";
        div.style.width="150px";
        div.style.background=this.color[i];
        div.style.borderRadius="5px";
        if(i!==0){
          div.style.marginTop=-30+"px";
        }
        div.style.marginLeft=20+170*i+"px";
        div.innerText=this.install[i];
        div.style.textAlign="center";
        div.style.lineHeight="30px";
        div.style.color="white";
        MyDiv.appendChild(div);
      }
    },


    getwindow(row){

      getWindow().then((response)=>{
        this.windata=[];
        for(let i=0;i<response.length;i++){

          if(response[i].leftMiddleRight===row.leftMiddleRight
            &&response[i].frame===row.frame&&response[i].upperMiddleLower===row.upperMiddleLower){
            this.windata.push(response[i]);

          }
        }
        this.open=true;
      })
    },


    gettable(){
      getana_install_way().then((response)=>{
        this.tabledata=response;
        console.log(this.tabledata);
      })
    },

    initChart() {
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.setOption());
      console.log(this.setOption());
    },


    setOption() {
      let install=this.install;
      let colors=this.color;
      let test=[];
      console.log(colors);
      let option = {
        /*visualMap: {
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
        },*/
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
            //'数量',
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
            symbolSize: 12,  				//点大小
            /*itemStyle: {
              // color: 'red',		   		//点颜色
              // borderColor: 'red',  		//点边框颜色
              opacity: 1,            		//点的透明度 1不透明
              borderWidth: 0.5       		//图形描边宽度
            },*/
            label: {
              show: true, 				//是否显示点上面的标签，默认false
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
            itemStyle: {
              normal: {
                color:function(params){  //根据不同数据显示不同颜色的标记
                  console.log("------",params)
                  console.log("------",install)
                  for(let i=0;i<install.length;i++){
                    let mark=0;
                    if(params.data[4]===install[i]){
                      /*test.push(colors[i]);*/
                      return colors[i];


                    }
                  }
                  /*if (params.data[3]=='TC-2--液压泵1') {
                    return 'rgb(40,141,168)';
                  } else{
                    return '#00ff00';
                  }*/
                },
                // color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
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
          }}
        ]
      };
      return option;
    }
  }

}
</script>

<style scoped>

</style>
