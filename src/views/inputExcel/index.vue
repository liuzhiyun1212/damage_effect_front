　<template>
  <el-card class="box-card">
  <div class="box">
<!--    <div class="item div1 shou" onclick="window.open('../inputExcel/inputQuality')" >1质量问题数据</div>-->
    <div class="item div1 shou" @click="on1" >1质量问题数据</div>
    <div class="item div2 shou" @click="on2">2装备设计/改型数据</div>
    <div class="item div3 shou" @click="on3">3产品设计数据</div>
    <div class="item div4 shou" @click="on4">4产品改型数据</div>
    <div class="item div5 shou" @click="on5">5装备制造数据</div>
    <div class="item div7 shou" @click="on7">7产品制造变更数据</div>
    <div class="item div8 shou" @click="on12">12装备使用数据</div>
    <div class="item div9 shou" @click="on9">9产品生产数量</div>
    <div class="item div10 shou" @click="on10">10维修变更数据</div>
    <div class="item div11 shou" @click="on11">11装备部署数据</div>
  </div>
  </el-card>
</template>
<script>
export default {

methods: {
  on1:function () {
    this.$router.push({
      path:"../inputExcel/inputQuality",
    })
  },
  on2:function () {
    this.$router.push({
      path:"../inputExcel/input2",
    })
  },
  on3:function () {
    this.$router.push({
      path:"../inputExcel/input3",
    })
  },
  on4:function () {
    this.$router.push({
      path:"../inputExcel/input4",
    })
  },
  on5:function () {
    this.$router.push({
      path:"../inputExcel/input5",
    })
  },
  on7:function () {
    this.$router.push({
      path:"../inputExcel/input6",
    })
  },
  on9:function () {
    this.$router.push({
      path:"../inputExcel/input9",
    })
  },
  on10:function () {
    this.$router.push({
      path:"../inputExcel/input10",
    })
  },
  on11:function () {
    this.$router.push({
      path:"../inputExcel/input11",
    })
  },
  on12:function () {
    this.$router.push({
      path:"../inputExcel/input12",
    })
  },
},
}
</script>
<style scoped>
.box {
  width: auto;
  height: auto;
  margin: auto;
  grid-gap: 5px;
  display: grid;
  padding-right: 20px;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 35% 35% 35% 35% 35%;
}

.item {
  border: 1px solid black;
  box-sizing: border-box;
}

.el-card ::v-deep .el-card__body {
  /*padding-top: 2px;*/
  height: 700px;
  background-color: powderblue;
}

.box-card {
  width: auto;
  height: auto;
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

.shou {
  cursor: pointer;
}
</style>
