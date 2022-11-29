　<template>
  <el-card shadow="always" class="box-card">
  <div class="box">
    <div class="item div1" onclick="window.open('../inputExcel/inputQuality')" >1质量问题数据</div>
    <div class="item div2" onclick="window.open('../inputExcel/input/input2')">2装备设计/改型数据</div>
    <div class="item div3" onclick="window.open('../inputExcel/input/input3')">3产品设计数据</div>
    <div class="item div4" onclick="window.open('../inputExcel/input/input4')">4产品改型数据</div>
    <div class="item div5" onclick="window.open('../inputExcel/input/input5')">5装备制造数据</div>
<!--    <div class="item div6">6产品制造数据</div>-->
    <div class="item div7" onclick="window.open('../inputExcel/input/input6')">7产品制造变更数据</div>
    <div class="item div8" onclick="window.open('../inputExcel/input/input12')">12装备使用数据导入</div>
    <div class="item div9" onclick="window.open('../inputExcel/input/input9')">9产品生产数量</div>
    <div class="item div10" onclick="window.open('../inputExcel/input/input10')">10维修变更数据</div>
    <div class="item div11" onclick="window.open('../inputExcel/input/input11')">11装备部署数据</div>

  </div>
  </el-card>
</template>
<style scoped>
.box {
  width: auto;
  height: auto;
  /* background: #ccc; */
  margin: 0 auto;
  grid-gap: 5px;
  display: grid;
  grid-template-columns: 120px 180px 180px 180px 180px;
  grid-template-rows: 100px 100px 100px 100px 100px;
}

.item {
  border: 1px solid black;
  box-sizing: border-box;
}

.box-card {
  width: auto;
  height: 450px;
}

.div1 {
  grid-column-start: 1;
  grid-column-end: 3;
  /*(div1从占据从第一条网格线开始，到第三条网格线结束)*/
  line-height: 100px;
  text-align: center;
  background: rgb(252, 0, 0);
  /* grid-column: 1/3;(这是缩写的形式) */
}

.div2 {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  /*grid-row-start: 2;*/
  grid-row-end: 3;
  line-height: 200px;
  text-align: center;
  background: rgb(252, 134, 0);
}

.div3 {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  /*grid-row-start: 2;*/
  grid-row-end: 3;
  /* grid-row: 2/4;(这是缩写的形式) */
  line-height: 200px;
  text-align: center;
  background: rgb(21, 207, 108);
}

.div4 {
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 3;
  line-height: 200px;
  text-align: center;
  background: #ADADAD;
  /* grid-column: 2/4;(这是缩写的形式) */
}

.div5 {
  grid-column-start: 1;
  grid-column-end: 3;
  /*grid-row-start: 2;*/
  /*grid-row-end: 4;*/
  line-height: 100px;
  text-align: center;
  background: #E1E100;
}

.div7 {
  grid-row-start: 3;
  grid-row-end: 5;
  line-height: 200px;
  text-align: center;
  background: #84C1FF;
}
.div8 {
  grid-row-start: 3;
  grid-row-end: 5;
  line-height: 200px;
  text-align: center;
  background: #FF0080;
}
.div9 {
  grid-row-start: 3;
  grid-row-end: 5;
  line-height: 200px;
  text-align: center;
  background: #6A6AFF;

}
.div10 {
  grid-column-start: 4;
  grid-column-end: 6;
  line-height: 100px;
  text-align: center;
  background: #DCB5FF;
}
.div11 {
  grid-column-start: 4;
  grid-column-end: 6;
  line-height: 100px;
  text-align: center;
  background: #20B2AA;
}

</style>
