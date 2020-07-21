<template>
  <section class="add-car-section">
      

    <form class="add-car-form" @submit.prevent="addCar">
        <div class="flex first-div-caradd">
        <el-upload :limit="5"  v-model="fileList" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"  :on-success="onUploadImg" :on-remove="handleRemove" :file-list="fileList" list-type="picture"> <el-button size="small" type="primary">Click to upload</el-button></el-upload>
            <div>
                <el-select v-model="carTag" placeholder="Tag">
                <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </div>
        </div>
        <div class="add-car-drop">
            <label>Car Condition</label>
            <el-select v-model="carCondition" placeholder="Condition">
                <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="add-car-drop">
            <label>Car Model</label>
            <el-select v-model="carModel" placeholder="Model">
                <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="add-car-input"> 
            <Label>Car Company</Label>
            <el-input  placeholder="Company" v-model="carCompany"></el-input>
        </div>
        <div class="add-car-input"> 
            <Label>Car Searies</Label>
            <el-input  placeholder="Searies" v-model="carSearies"></el-input>
        </div>
        <div class="add-car-input" > 
            <Label>Car Price $/Day</Label>
            <el-input-number v-model="carPrice" :min="1" ></el-input-number>        
        </div>
        <div class="add-car-input"> 
            <Label>Car Description (optional)</Label>
            <el-input  placeholder="Descrition" v-model="carDescrition"></el-input>
        </div>
        <button>List Car </button>
    </form>


  </section>
</template>

<script>
import {uploadImg} from '../main-services/imgUpload.service.js'
export default {
data(){
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
        carCondition:'',
        carModel:'',
        carCompany:'',
        carSearies:'',
        carPrice:200,
        carDescrition:'',
         fileList: [],
         imgsUrl:[]
    }
} ,
    methods:{
       async onUploadImg(response,file){
          const img =await uploadImg(file.raw)
          console.log(img);
        },
            addCar(){
                var car = {
                    tags:this.carTag,
                    condition:this.carCondition,
                    model:this.carModel,
                    vendor:{company:this.carCompany,searies:this.carSearies},
                    price:this.carPrice,
                    description:this.carDescrition,
                    features:{
                        seatsCount : 4.0,
                        doorsCount : 4.0,
                        kpl : 12.0
                        },
                    city:'LA',
                    owner:{
                        _id:this.loggedInUser._id,
                        fullName:this.loggedInUser.fullName,
                        imgUrl:this.loggedInUser.imgUrl
                        
                    }

                }
                     this.$store.dispatch({ type: "saveCar", car:car });
            },
               handleRemove(file, fileList) {
      },
         handlePreview(file) {
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