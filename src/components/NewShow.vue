<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class=" modal-new" @click.stop>
            <h6 class="modal-title">New Show</h6>
            <form class="new-form">
                <input type="text" placeholder="Show Title" class="modal-input" v-model="title" />
                <textarea name="description" class="textarea" id="description" cols="20" rows="3" placeholder="Description"
                    v-model="description"></textarea>
                <div class="types">
                    <input type="radio" id="type" name="type" value="movie" />
                    <label for="movie">Movie</label>
                    <br>
                    <input type="radio" id="type" name="type" value="series" />
                    <label for="series">Series</label>
                </div>
                <input type="text" placeholder="Director (separate multiple with ';')" class="modal-input"
                    v-model="director" />
                <input type="text" placeholder="Cast (separate multiple with ';')" class="modal-input" v-model="cast" />
                <input type="text" placeholder="Country (separate multiple with ';')" class="modal-input"
                    v-model="country" />
                <input type="number" min="1850" placeholder="Release Date" class="modal-input" v-model="release_year" />
                <input type="text" placeholder="duration (minutes)" class="modal-input" v-model="duration" />
                <input type="text" placeholder="Genre (separate multiple with ';')" class="modal-input" v-model="genre" />
                <label for="rating">Rating</label>
                <input class="rating" max="5" oninput="this.style.setProperty('--value', this.value)" step="0.5"
                    type="range" value="1" />
                <div class="types">
                    <label for="type">Already Seen</label>
                    <br>
                    <input type="radio" id="type" name="seen" value="true" />
                    <label for="movie">Yes</label> &nbsp;
                    <input type="radio" id="type" name="seen" value="true" />
                    <label for="series">No</label>
                </div>
                <button class="modal-button" @click="saveShow">Save</button>


            </form>
        </div>
        <div class="close">
            <img class="close-img" src="../assets/close-icon.svg" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewShow',
    methods: {
        saveShow: saveShow
    }
}
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { ref } from 'vue';
function saveShow() {
    const title = ref('');
    const description = ref('');
    const director = ref('');
    const directorArray = director.value.split(';');
    const cast = ref('');
    const castArray = cast.value.split(';');
    const country = ref('');
    const countryArray = country.value.split(';');
    const release_year = ref('');
    const duration = ref('');
    const genre = ref('');
    const genreArray = genre.value.split(';');
    const rating = ref('');
    const getTypesValue = document.querySelector(
        'input[name="type"]:checked');
    const getSeenValue = document.querySelector(
        'input[name="seen"]:checked');

    let db = getFirestore();
    const shows = collection(db, "shows");

    setDoc(doc(shows), {
        type: getTypesValue.value,
        title: title.value,
        description: description.value,
        director: directorArray,
        cast: castArray,
        country: countryArray,
        release_year: release_year.value,
        duration: duration.value,
        genre: genreArray,
        rating: rating.value,
        seen: getSeenValue.value
    });
    setTimeout(() => {
        window.location.reload();
    }, 10000000);
}

</script>