<template>
  <section>
      

    <form @submit.prevent="addCar">
        <el-upload :limit="5"  v-model="fileList" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture"> <el-button size="small" type="primary">Click to upload</el-button><div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div></el-upload>
        <div>
            <label>Car Tag</label>
            <el-select v-model="carTag" placeholder="Tag">
                <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div>
            <label>Car Condition</label>
            <el-select v-model="carCondition" placeholder="Condition">
                <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div>
            <label>Car Model</label>
            <el-select v-model="carModel" placeholder="Model">
                <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div> 
            <Label>Car Company</Label>
            <el-input placeholder="Company" v-model="carCompany"></el-input>
        </div>
        <div> 
            <Label>Car Searies</Label>
            <el-input placeholder="Searies" v-model="carSearies"></el-input>
        </div>
        <div> 
            <Label>Car Price $/Day</Label>
            <el-input-number v-model="carPrice" :min="1" ></el-input-number>        
        </div>
        <div> 
            <Label>Car Description (optional)</Label>
            <el-input placeholder="Descrition" v-model="carDescrition"></el-input>
        </div>
        <button>Click Me</button>
    </form>



  </section>
</template>

<script>
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
        carPrice:'',
        carDescrition:'',
         fileList: [],
    }
} ,
    methods:{
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