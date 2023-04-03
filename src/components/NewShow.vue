<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class=" modal-new" @click.stop>
            <h6 v-if="show" class="modal-title">Edit Show</h6>
            <h6 v-else class="modal-title">New Show</h6>
            <div class="new-form">
                <input type="text" placeholder="Show Title" id="title" class="modal-input"
                    :value="show ? show['title'] : ''" required />
                <textarea name="description" class="textarea" id="description" cols="20" rows="3" placeholder="Description"
                    :value="show ? show['description'] : ''"></textarea>
                <div class="types">
                    <input :checked="show ? show['type'] === 'movie' ? true : false : false" type="radio" id="type"
                        name="type" value="movie" />
                    <label for="movie">Movie</label>
                    <br>
                    <input :checked="show ? show['type'] === 'serie' ? true : false : false" type="radio" id="type"
                        name="type" value="series" />
                    <label for="series">Serie</label>
                </div>
                <input type="text" placeholder="Director (separate multiple with ';')" class="modal-input" id="director"
                    :value="show ? show['director'].toString().replaceAll(',', ';') : ''" />
                <input type="text" placeholder="Cast (separate multiple with ';')" class="modal-input" id="cast"
                    :value="show ? show['cast'].toString().replaceAll(',', ';') : ''" />
                <input type="text" placeholder="Country (separate multiple with ';')" class="modal-input" id="country"
                    :value="show ? show['country'].toString().replaceAll(',', ';') : ''" />
                <input type="number" min="1850" placeholder="Release Date" class="modal-input" id="release_year"
                    :value="show ? show['release_year'] : ''" />
                <input type="number" placeholder="duration (minutes)" class="modal-input" id="duration"
                    :value="show ? show['duration'] : ''" />
                <input type="text" placeholder="Genre (separate multiple with ';')" id="genre" class="modal-input"
                    :value="show ? show['genre'] : ''" />
                <label for="rating">Rating</label>
                <input class="rating" :style="show ? '--value :' + show['rating'] : ''" max="5"
                    oninput="this.style.setProperty('--value', this.value)" id="rating" step="1" type="range" value="3" />

                <button v-if="!show" id="saveShow" class="modal-button" @click="saveShow()">Save</button>
                <button v-else id="editShow" class="modal-button" @click="editShow()">Edit</button>


            </div>
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
        const title = '';
        const description = '';
        const director = '';
        const cast = '';
        const country = '';
        const release_year = '';
        const duration = '';
        const genre = '';
        const rating = '';
        const type = '';
        return {
            title,
            description,
            director,
            cast,
            country,
            release_year,
            duration,
            genre,
            rating,
            type
        }
    },
    methods: {
        saveShow: saveShow,
        editShow: editShow
    },
    props: {
        show: Object
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
    }).then(() => {
        console.log("Document successfully written!");
        window.location.reload();
    })
        .catch((error) => {
            console.error("Error writing document: ", error);
        })
}
function editShow() {
    console.log(this.show.id)
    const id = this.show.id;
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
    setDoc(doc(shows, id), {
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
    }, { merge: true }).then(() => {
        console.log("Document successfully written!");
        window.location.reload();
    })
        .catch((error) => {
            console.error("Error writing document: ", error);
        })
}

</script>