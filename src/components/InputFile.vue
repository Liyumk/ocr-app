<template>
    <div class="mt-16">
        <v-card
        color=" "
        class="mx-auto  mb-10"
        max-width="1050"
        dense>
            <v-card-title
            primary-title
            class="text-h5 primary grey--text text--lighten-4 pa-5">
              OCR - Optical Character Recognition
            </v-card-title>
            <v-card-text>

                <p class="mt-5">This is a simple Optical Character Recognition App that recognizes text within a digital image.
                    Input the image in the image input section and select the language in which the text in the image is written and it will give you the text.
                </p>
            
            <v-row class="mt-6">
                <v-col class="col-md-6 col-12">
                    <v-file-input
                    label="image input"
                    accept="image/*"
                    outlined
                    show-size
                    v-model="inputImage"
                    @change="selectImage"
                    prepend-icon="mdi-paperclip primary--text"
                    >
                  
                    </v-file-input>
                    
                    <v-row class="">
                        <v-col cols="8">
                            <v-select
                            label="Select a language"
                            v-model="language"
                            item-text="language"    
                            item-value="abbr"
                            :items="items"
                            return-object
                            >    
                            <v-icon
                            slot="prepend"
                            color="primary">
                            mdi-translate
                            </v-icon>
                            </v-select>
                        </v-col>
                    </v-row>
                    <div class="text-center mt-5" v-show="isLoading">
                        <v-progress-circular
                        indeterminate
                        color="primary"
                        ></v-progress-circular>
                    </div>
                    <v-card 
                    class="mt-3"
                    v-show="readImage"
                    elevation="4"
                    >   
                        <v-card-title>
                            Result
                        </v-card-title>
                        <v-card-text>
                            <p class="mt-1">{{readImage}}</p>
                            <v-row class="mt-3">
                                <v-col class="pb-0">
                                    <v-btn 
                                    @click="doCopy"
                                    small
                                    color="primary"
                                    class="mb-2"
                                    tile
                                    depressed
                                    >
                                        Copy to clipboard
                                    </v-btn>
                                </v-col>
                                <v-col class="text-right pb-0">
                                    <a v-show="searchablePdfURL" :href="searchablePdfURL">Searchable PDF URL</a>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

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

        <v-snackbar
        v-model="snackbar"
        >
        Text copied!

        <template v-slot:action="{attrs}">
            <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
          Close
        </v-btn>
        </template>

        </v-snackbar>

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
            snackbar: false,
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
                this.isLoading = false;
            }
        },  
        uploadImage(){
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
                    this.isLoading = false;
                }).catch(function (error) {
                    console.error(error);
                });
                
            }
        },
        doCopy() {
            var setThis = this;
            this.$copyText(this.readImage).then(function () {
            setThis.snackbar = true;
        })},
        
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