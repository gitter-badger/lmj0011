<template>

  <div>

    <div class="row justify-content-center">
      <div class="col-12 bg-primary">
        <!-- https://stackoverflow.com/a/480756/2445763 -->
        <input size="50" v-model="urlToSubmit" onfocus="this.select();" onmouseup="return false;" placeholder="Enter url to an image" @keyup.enter="submitImgUrl" autofocus>
        <button type="button" class="btn btn-info" @click="submitImgUrl">
          <i v-if="isLoadingNewImg" class="fa fa-spinner fa-spin fa-fw"></i>
          <span v-else>Submit</span>
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="row justify-content-center">
      <div class="col-12 bg-danger">
        <h2>{{ errorMessage }}</h2>
      </div>
    </div>

    <div class="row justify-content-center">

      <!-- Default color palette -->
      <div class="card-deck">
        <div v-for="color in colors" class="card" :style="{ backgroundColor: color.color }">
          <img class="card-img-top" :src="imgUrl">
          <div class="card-block" :style="{ color: color.text }">
            <h4 class="card-title">Lorem ipsum</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>

            <div class="btn-group">
              <button @click="showColorPermutationRow(color)" title="see the text color permutations for this background-color">
                <i class="fa fa-clone" aria-hidden="true"></i>
              </button>
              <button id="show-modal" @click="showModal = true; modalBackgroundColor = color.color; modalTextColor = color.text;" title="get the CSS code for these colors">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- vibrant color as backgroundColor permutation -->
      <div class="card-deck" v-if="showPermutationRowName === 'vibrant'">
        <div v-for="color in vibrantColorsArray" class="card" :style="{ backgroundColor: vibrantColor }">
          <img class="card-img-top" :src="imgUrl">
          <div class="card-block" :style="{ color: color.text }">
            <h4 class="card-title">Lorem ipsum</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>

            <div class="btn-group">
              <button id="show-modal" @click="showModal = true; modalBackgroundColor = vibrantColor; modalTextColor = color.text;" title="get the CSS code for these colors">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- muted color as backgroundColor permutation -->
       <div class="card-deck" v-if="showPermutationRowName === 'muted'">
        <div v-for="color in mutedColorsArray" class="card" :style="{ backgroundColor: mutedColor }">
          <img class="card-img-top" :src="imgUrl">
          <div class="card-block" :style="{ color: color.text }">
            <h4 class="card-title">Lorem ipsum</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>

            <div class="btn-group">
              <button id="show-modal" @click="showModal = true; modalBackgroundColor = mutedColor; modalTextColor = color.text;" title="get the CSS code for these colors">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- lightvibrant color as backgroundColor permutation -->
      <div class="card-deck" v-if="showPermutationRowName === 'lightvibrant'">
        <div v-for="color in lightvibrantColorsArray" class="card" :style="{ backgroundColor: lightvibrantColor }">
          <img class="card-img-top" :src="imgUrl">
          <div class="card-block" :style="{ color: color.text }">
            <h4 class="card-title">Lorem ipsum</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>

            <div class="btn-group">
              <button id="show-modal" @click="showModal = true; modalBackgroundColor = lightvibrantColor; modalTextColor = color.text;" title="get the CSS code for these colors">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- lightmuted color as backgroundColor permutation -->
      <div class="card-deck" v-if="showPermutationRowName === 'lightmuted'">
        <div v-for="color in lightmutedColorsArray" class="card" :style="{ backgroundColor: lightmutedColor }">
          <img class="card-img-top" :src="imgUrl">
          <div class="card-block" :style="{ color: color.text }">
            <h4 class="card-title">Lorem ipsum</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>

            <div class="btn-group">
              <button id="show-modal" @click="showModal = true; modalBackgroundColor = lightmutedColor; modalTextColor = color.text;" title="get the CSS code for these colors">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- darkvibrant color as backgroundColor permutation -->
      <div class="card-deck" v-if="showPermutationRowName === 'darkvibrant'">
        <div v-for="color in darkvibrantColorsArray" class="card" :style="{ backgroundColor: darkvibrantColor }">
          <img class="card-img-top" :src="imgUrl">
          <div class="card-block" :style="{ color: color.text }">
            <h4 class="card-title">Lorem ipsum</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>

            <div class="btn-group">
              <button id="show-modal" @click="showModal = true; modalBackgroundColor = darkvibrantColor; modalTextColor = color.text;" title="get the CSS code for these colors">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- darkmuted color as backgroundColor permutation -->
      <div class="card-deck" v-if="showPermutationRowName === 'darkmuted'">
        <div v-for="color in darkmutedColorsArray" class="card" :style="{ backgroundColor: darkmutedColor }">
          <img class="card-img-top" :src="imgUrl">
          <div class="card-block" :style="{ color: color.text }">
            <h4 class="card-title">Lorem ipsum</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>

            <div class="btn-group">
              <button id="show-modal" @click="showModal = true; modalBackgroundColor = darkmutedColor; modalTextColor = color.text;" title="get the CSS code for these colors">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>

    <modal ref="modal" v-if="showModal" @close="showModal = false">
      <div slot="body">
        <p>
          background-color: <input onfocus="this.select();" onmouseup="return false;" :value="modalBackgroundColor" readonly>
          <i class="fa fa-square float-left" aria-hidden="true" :style="{color: modalBackgroundColor}"></i>
        </p>
        <p>
          color: <input onfocus="this.select();" onmouseup="return false;" :value="modalTextColor" readonly>
          <i class="fa fa-square float-left" aria-hidden="true" :style="{color: modalTextColor}"></i>
        </p>
      </div>
    </modal>

  </div>

</template>

<script>
import Modal from './Modal.vue'
import axios from 'axios'

export default {
  data () {
    return {
      vibrantColor: '',
      mutedColor: '',
      lightvibrantColor: '',
      lightmutedColor: '',
      darkvibrantColor: '',
      darkmutedColor: '',

      vibrantColorsArray: [],
      mutedColorsArray: [],
      lightvibrantColorsArray: [],
      lightmutedColorsArray: [],
      darkvibrantColorsArray: [],
      darkmutedColorsArray: [],

      modalBackgroundColor: '',
      modalTextColor: '',

      colors: [],
      showModal: false,
      showPermutationRowName: '',
      isLoadingNewImg: false,
      errorMessage: '',
      imgUrl: '',
      urlToSubmit: ''
    }
  },
  mounted () {},
  methods: {
    showColorPermutationRow(color) {
      this.showPermutationRowName = color.name
    },
    setPrimaryColors: function(vibrantRespObj) {
      this.vibrantColor = vibrantRespObj.vibrant.color
      this.mutedColor = vibrantRespObj.muted.color
      this.lightvibrantColor = vibrantRespObj.lightvibrant.color
      this.lightmutedColor = vibrantRespObj.lightmuted.color
      this.darkvibrantColor = vibrantRespObj.darkvibrant.color
      this.darkmutedColor = vibrantRespObj.darkmuted.color
    },
    transformToColorsArray: function(vibrantRespObj) {
      let arry = []
      let newObj = {}

      for (const prop in vibrantRespObj) {
        newObj = {
          name: prop,
          color: vibrantRespObj[prop].color,
          text: vibrantRespObj[prop].text
        }
        arry.unshift(newObj)
      }

      this.colors = arry
    },
    produceColorsPermutationArrays: function(vibrantRespObj) {
      let arry = []
      let newObj = {}

      for (const prop in vibrantRespObj) {
        newObj = {
          name: prop,
          color: vibrantRespObj[prop].color,
          text: vibrantRespObj[prop].text
        }
        arry.unshift(newObj)
      }

      // is doing the same thing as this.transformToColorsArray up to this point

      this.vibrantColorsArray = arry.filter((color) => {
        return color.name !== 'vibrant'
      })
      .map((color) => {
        color.text = color.color
        return color
      })

      this.mutedColorsArray = arry.filter((color) => {
        return color.name !== 'muted'
      })
      .map((color) => {
        color.text = color.color
        return color
      })

      this.lightvibrantColorsArray = arry.filter((color) => {
        return color.name !== 'lightvibrant'
      })
      .map((color) => {
        color.text = color.color
        return color
      })

      this.lightmutedColorsArray = arry.filter((color) => {
        return color.name !== 'lightmuted'
      })
      .map((color) => {
        color.text = color.color
        return color
      })

      this.darkvibrantColorsArray = arry.filter((color) => {
        return color.name !== 'darkvibrant'
      })
      .map((color) => {
        color.text = color.color
        return color
      })

      this.darkmutedColorsArray = arry.filter((color) => {
        return color.name !== 'darkmuted'
      })
      .map((color) => {
        color.text = color.color
        return color
      })

      console.log(this.vibrantColorsArray);
    },
    submitImgUrl: function() {
      this.isLoadingNewImg = true

      // reset some vars in case set
      this.errorMessage = null
      this.showPermutationRowName = ""
      // document.getElementById('vue-app').style.backgroundColor = ""
      // document.querySelector('html').style.backgroundColor = ""

      axios.get(`${window.env.VIBRANT_SERVICE_ENDPOINT}?imgUrl=${this.urlToSubmit}`)
      .then( res => {
        this.imgUrl = this.urlToSubmit
        this.setPrimaryColors(res.data)
        this.transformToColorsArray(res.data)
        this.produceColorsPermutationArrays(res.data)

        this.isLoadingNewImg = false
        // console.log(res.data)
      })
      .catch(err => {
        let message = 'somthing wrong just happened, try again..'

        this.isLoadingNewImg = false

        if(err.response.data && err.response.data.message) {
          message = err.response.data.message
        }

        this.errorMessage = message

        console.log(err)
      })
    },

    // toggle between a background and text color of a card
    matchBackgroundColor: function(primary, secondary) {

      // prevents having to rely on a hacky RGBToHex function
      let prevColor = document.querySelector('html').style.backgroundColor
      document.querySelector('html').style.backgroundColor = primary
      let newColor = document.querySelector('html').style.backgroundColor
      //////

      let color = (newColor === prevColor) ? secondary : primary

      document.getElementById('vue-app').style.backgroundColor = color
      document.querySelector('html').style.backgroundColor = color
    }
  },
  components: {
    Modal
  }
}

</script>

<style scoped>

</style>
