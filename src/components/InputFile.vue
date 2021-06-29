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
                    <div class="text-center" v-show="isLoading">
                        <v-progress-circular
                        indeterminate
                        color="primary"
                        ></v-progress-circular>
                    </div>
                    <p class="mt-5">{{readImage}}</p>
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
            enableButton: true,
            readImage: "",
            isLoading: false
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
                this.url = "";
                this.readImage = "";
            }
        },

        uploadImage(){
            const fd = new FormData();
            if (this.inputImage) {
                this.isLoading = true; 
                fd.append('image', this.inputImage);
                const options = {
                method: 'POST',
                url: "https://api.ocr.space/parse/image",
                data: fd,
                params: {
                    file: this.inputImage 
                },
                headers: {
                    'apikey': '1aaea2866288957'
                }
                };
                console.log("Uploading image");
                axios.request(options).then(response => {
                    const data = response.data;
                    this.readImage = data.ParsedResults[0].ParsedText;
                    console.log(this.readImage);
                    this.isLoading = false;

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