<template>
    <div class="mt-16">
        <v-card
        class="mx-auto pa-2"
        max-width="900"
        dense>
            <v-card-text>
                <p class="text-h5">
                    OCR
                </p>
                <p>Pellentesque eget elit consectetur, interdum neque viverra, laoreet erat. Sed nulla magna, molestie a porttitor sodales, vehicula sit amet odio. Cras consequat aliquet eleifend. Mauris ac laoreet neque, quis eleifend dolor. Vestibulum consequat aliquet neque nec ullamcorper. Vivamus risus odio, tincidunt at posuere non, consequat sit amet justo. Cras sed tortor vitae nunc volutpat lacinia. .</p>  
            
            <v-row class="mt-6">
                <v-col class="col-6">
                    <v-file-input
                    label="image input"
                    accept="image/*"
                    outlined
                    color="black"
                    show-size
                    v-model="inputImage"
                    @change="selectImage">
                    </v-file-input>
                </v-col>
                <v-col>
                    <img :src="url" alt="Image selected" id="image-preview" v-show="isSelected">
                </v-col>
            </v-row>
            </v-card-text>
          
            <v-card-actions>   
                <v-spacer></v-spacer>
                <v-btn 
                :disabled="enableButton"
                @click="uploadImage"
                color="black white--text">upload</v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>

import axios from "axios";

export default {
    data : function() {
        return {
            inputImage: null,
            url: "",
            isSelected: false,
            enableButton: true
        }
    },
    methods: {
        selectImage(){
            
            if (this.inputImage) {
                this.url = URL.createObjectURL(this.inputImage);
                this.isSelected = true;
                this.enableButton = false;
                
            }
            else{
                this.isSelected = false;
                this.enableButton = true;
                this.url = ""
            }
        },

        uploadImage(){
            const fd = new FormData();
            if (this.inputImage) {
                console.log(this.url);
                fd.append('image', this.inputImage,this.inputImage.name);
                const options = {
                method: 'GET',
                url: 'https://ocrly-image-to-text.p.rapidapi.com/',
                params: {
                    filename: this.inputImage.name,
                    imageurl: this.url
                },
                headers: {
                    'x-rapidapi-key': 'fc21b304c3mshf7443d1144441e0p1f9b66jsn051e4743d50a',
                    'x-rapidapi-host': 'ocrly-image-to-text.p.rapidapi.com'
                }
                };

                axios.request(options).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.error(error);
                });
                
            }
        }
    }
}
</script>

<style scoped>

#image-preview{
    object-fit: cover;
    height: 300px;
    width: 100%;
}

</style>