<template>
    <div class="mt-16">
        <v-card
        class="mx-auto pa-2 pb-6 mb-10"
        max-width="900"
        dense>
            <v-card-text>
                <p class="text-h5">
                    OCR - Optical Character Recognition
                </p>
                <p>This is a simple Optical Character Recognition App that recognizes text within a digital image.
                    Input the image in the image input section and select the language in which the text in the image is written.
                </p>
              
            
            <v-row class="mt-6">
                <v-col class="col-md-6 col-12">
                    <v-file-input
                    label="image input"
                    accept="image/*"
                    outlined
                    color="black"
                    show-size
                    v-model="inputImage"
                    @change="selectImage">
                    </v-file-input>
                    
                    <v-row class="ml-5">
                        <v-col cols="8">
                            <v-select
                            label="Select a language"
                            v-model="language"
                            item-text="language"    
                            item-value="abbr"
                            :items="items"
                            return-object
                           
                            >     
                            </v-select>
                        </v-col>
                    </v-row>
                    <div class="text-center" v-show="isLoading">
                        <v-progress-circular
                        indeterminate
                        color="primary"
                        ></v-progress-circular>
                    </div>
                    <p class="mt-5">{{readImage}}</p>
                    <a v-show="searchablePdfURL" :href="searchablePdfURL">Searchable PDF URL</a>

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
            isLoading: false,
            searchablePdfURL: "",
            language: {language: "English", value: "eng"},
            items: [
                {language: "Arabic", value: "ara"},
                {language: "Chinese", value: "chs"},
                {language: "Dutch", value: "dut"},
                {language: "English", value: "eng"},
            ]
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
                this.searchablePdfURL = "";
            }
        },

        uploadImage(){
            console.log(this.language.value);
            const fd = new FormData();
            if (this.inputImage) {
                this.isLoading = true; 
                fd.append('files', this.inputImage);
                fd.append('language', this.language.value);
                fd.append('detectOrientation', true);
                fd.append('isCreateSearchablePdf', true);

                // for(var pair of fd.entries()) {
                // console.log(pair[0]+ ', '+ pair[1]);}

                const options = {
                method: 'POST',
                url: "https://api.ocr.space/parse/image",
                data: fd,
                headers: {
                    'apikey': '1aaea2866288957',
                },
                
                };

                axios.request(options).then(response => {
                    const data = response.data;
                    this.readImage = data.ParsedResults[0].ParsedText;
                    this.searchablePdfURL = data.SearchablePDFURL;
                    console.log(response.request.response);
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