<template>
  <section class="add-car-section">
      

    <form  class="add-car-form" @submit.prevent="addCar">
        <div class="flex first-div-caradd">
        <el-upload ref="upload" :limit="5"  v-model="fileList" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"  :on-success="onUploadImg" :on-remove="handleRemove" :file-list="fileList" list-type="picture"> <el-button size="small" type="primary">Click to upload</el-button></el-upload>
            <div>
                <el-select v-model="car.tag" placeholder="Tag">
                <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </div>
        </div>
        <div class="add-car-drop">
            <label>Car Condition</label>
            <el-select v-model="car.condition" placeholder="Condition">
                <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="add-car-drop">
            <label>Car Model</label>
            <el-select v-model="car.model" placeholder="Model">
                <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="add-car-input"> 
            <Label>Car Company</Label>
            <el-input  placeholder="Company" v-model="car.vendor.company"></el-input>
        </div>
        <div class="add-car-input"> 
            <Label>Car Searies</Label>
            <el-input  placeholder="Searies" v-model="car.vendor.searies"></el-input>
        </div>
        <div class="add-car-input" > 
            <Label>Car Price $/Day</Label>
            <el-input-number v-model="car.price" :min="1" ></el-input-number>        
        </div>
        <div class="add-car-input"> 
            <Label>Car Description (optional)</Label>
            <el-input  placeholder="Descrition" v-model="car.descrition"></el-input>
        </div>
        <button>List Car </button>
    </form>
  </section>
</template>
<script>
import { uploadImg } from "../main-services/imgUpload.service.js";
export default {
  data() {
    return {
         tags: [{
          value: 'sport',
          label: 'Sport'
        }, {
          value: 'vintage',
          label: 'Vintage'
        }, {
          value: 'luxury',
          label: 'Luxury'
        }, {
          value: 'custom',
          label: 'custom'
        }],
        carTag:'',
         conditions: [{
          value: 'bad',
          label: 'Bad'
        }, {
          value: 'decent',
          label: 'Decent'
        }, {
          value: 'good',
          label: 'Good'
        }, {
          value: 'best',
          label: 'Best'
        }],
        car:{
          condition:'',
          model:'',
          vendor:{
            company:'',
            searies:''
          },
          price:200,
          descrition:'',
          imgsUrl:[]
        },
         fileList: []
    }
} ,
methods:{
    async onUploadImg(response,file,fileList){
      var img =await uploadImg(file.raw)
      img.uid=file.raw.uid
      this.car.imgsUrl.push(img)
    },
  addCar(){
    this.car.features={
        seatsCount : 4.0,
        doorsCount : 4.0,
        kpl : 12.0
        },
      this.car.location={
        city:'LA',
      }
    this.car.owner={
        _id:this.loggedInUser._id,
        fullName:this.loggedInUser.fullName,
        imgUrl:this.loggedInUser.imgUrl
    },
    this.car.reviews=[]
      this.$store.dispatch({ type: "saveCar", car:this.car });
      this.resetCar();
      this.$refs.upload.clearFiles();
},
    handleRemove(file, fileList) {
      var idx = this.car.imgsUrl.findIndex(img=>img.uid===file.raw.uid)
    this.car.imgsUrl.splice(idx,1)
},
resetCar(){
  this.car={
          condition:'',
          model:'',
          vendor:{
            company:'',
            searies:''
          },
          price:200,
          descrition:'',
          imgsUrl:[]
        }
}         
        
},
  computed:{
      years(){
          var years=[];
          for(var i=1970;i<2021;i++){
              years.push({value:i,label:i})
          }
          return years
      },
      loggedInUser() {
    return this.$store.getters.loggedInUser;
  }
  }
}
</script>
<style>
</style>