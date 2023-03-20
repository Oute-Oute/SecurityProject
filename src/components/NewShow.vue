<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class=" modal-new" @click.stop>
            <h6 class="modal-title">New Show</h6>
            <form class="new-form">
                <input type="text" placeholder="Show Title" id="title" class="modal-input" v-model="title" required />
                <textarea name="description" class="textarea" id="description" cols="20" rows="3" placeholder="Description"
                    v-model="description"></textarea>
                <div class="types">
                    <input type="radio" id="type" name="type" value="movie" required />
                    <label for="movie">Movie</label>
                    <br>
                    <input type="radio" id="type" name="type" value="series" />
                    <label for="series">Series</label>
                </div>
                <input type="text" placeholder="Director (separate multiple with ';')" class="modal-input" id="director"
                    v-model="director" />
                <input type="text" placeholder="Cast (separate multiple with ';')" class="modal-input" id="cast"
                    v-model="cast" />
                <input type="text" placeholder="Country (separate multiple with ';')" class="modal-input" id="country"
                    v-model="country" />
                <input type="number" min="1850" placeholder="Release Date" class="modal-input" id="release_year"
                    v-model="release_year" />
                <input type="number" placeholder="duration (minutes)" class="modal-input" id="duration"
                    v-model="duration" />
                <input type="text" placeholder="Genre (separate multiple with ';')" id="genre" class="modal-input"
                    v-model="genre" />
                <label for="rating">Rating</label>
                <input class="rating" max="5" oninput="this.style.setProperty('--value', this.value)" id="rating" step="1"
                    type="range" value="1" />
                <!-- <div class="types">
                    <label for="type">Already Seen</label>
                    <br>
                    <input type="radio" id="type" name="seen" value="true" required />
                    <label for="movie">Yes</label> &nbsp;
                    <input type="radio" id="type" name="seen" value="false" />
                    <label for="series">No</label>
                </div> -->
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
    data() {
        return {
            title: '',
            description: '',
            director: '',
            cast: '',
            country: '',
            release_year: '',
            duration: '',
            genre: '',
            rating: '',
            type: '',
        }
    },
    methods: {
        saveShow: saveShow
    }
}
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
function saveShow() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const director = document.getElementById('director').value;
    const directorArray = director.split(';');
    const cast = document.getElementById('cast').value;
    const castArray = cast.split(';');
    const country = document.getElementById('country').value;
    const countryArray = country.split(';');
    const release_year = document.getElementById('release_year').value;
    const duration = document.getElementById('duration').value;
    const genre = document.getElementById('genre').value;
    const genreArray = genre.split(';');
    const rating = document.getElementById('rating').value;
    const getTypesValue = document.querySelector(
        'input[name="type"]:checked').value;
    let db = getFirestore();
    const shows = collection(db, "shows");

    setDoc(doc(shows), {
        type: getTypesValue,
        title: title,
        description: description,
        director: directorArray,
        cast: castArray,
        country: countryArray,
        release_year: +release_year,
        duration: +duration,
        genre: genreArray,
        rating: +rating,
    });
    setTimeout(() => {
        window.location.reload();
    }, 10000000);
}

</script>