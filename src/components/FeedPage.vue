<template>
    <router-view />
    <div class="save-btn">
        <button class="modal-button" @click="showModal = true">New Show</button>
        <input type="text" placeholder="Search" v-model="filter" />

    </div>
    <table class="table">
        <thead>
            <tr>
                <th class="cursor" @click="sort('type')">Type</th>
                <th class="cursor" @click="sort('title')">Title</th>
                <th class="cursor" @click="sort('director')">Director</th>
                <th class="cursor" @click="sort('description')">Description</th>
                <th class="cursor" @click="sort('cast')">Cast</th>
                <th class="cursor" @click="sort('country')">Country</th>
                <th class="cursor" @click="sort('release_year')">Release Year</th>
                <th class="cursor" @click="sort('duration')">Duration</th>
                <th class="cursor" @click="sort('genre')">Genre</th>
                <th class="cursor" @click="sort('rating')">Rating</th>
                <th class="cursor" @click="sort('seen')">Seen</th>
                <th class="cursor" @click="sort('wishlist')">Wishlist</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="show in sortedShows" :key="show.id">
                <td v-html="highlightMatches(show.type)"></td>
                <td v-html="highlightMatches(show.title)"></td>
                <td v-html="highlightMatches(show.directorString)"></td>
                <td v-html="highlightMatches(show.description)"></td>
                <td v-html="highlightMatches(show.castString)"></td>
                <td v-html="highlightMatches(show.countryString)"></td>
                <td v-html="highlightMatches(show.release_year.toString())"></td>
                <td v-html="highlightMatches(show.duration.toString())"></td>
                <td v-html="highlightMatches(show.genreString)"></td>
                <td v-html="show.ratingStars"></td>
                <td :id='show.id + "seen"' class="cursor" v-html="show.seen" @click="changeSeen(show)"></td>
                <td v-html="show.wishlist" class="cursor" @click="changeWishlist(show)"></td>
                <td>
                    <button class="button is-primary">Edit</button>
                    <br>
                    <button class="button is-danger">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <p>
        <button class="button is-primary" @click="prevPage">Previous</button>&nbsp;
        <button class="button is-primary" @click="nextPage">Next</button>
    </p>
    <NewShow v-show="showModal" @close-modal="showModal = false" />
</template>


<script>
import NewShow from './NewShow.vue';
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
export default {
    name: 'App',
    components: {
        NewShow,

    },
    data() {
        const auth = getAuth();
        const db = getFirestore();
        const userShows = collection(db, "userShows");
        const shows = [];
        const currentSort = 'name';
        const currentSortDir = 'asc';
        const pageSize = 3;
        const currentPage = 1;
        const filter = '';
        return {
            auth: auth,
            db: db,
            userShows: userShows,
            filter: filter,
            pageSize: pageSize,
            currentPage: currentPage,
            currentSort: currentSort,
            currentSortDir: currentSortDir,
            shows: shows,
            showModal: false
        }
    },
    methods: {
        changeSeen(show) {
            console.log(this.auth.currentUser.uid)
            if (show.seen == "✅") {
                show.seen = "❌";
                //if document exists, update it
                setDoc(doc(this.userShows, this.auth.currentUser.uid + show.id), {
                    showId: show.id,
                    seen: false
                }, { merge: true }
                );
            }
            else {
                show.seen = "✅";
                //update db
                setDoc(doc(this.userShows, this.auth.currentUser.uid + show.id), {
                    userId: this.auth.currentUser.uid,
                    showId: show.id,
                    seen: true
                }, { merge: true }
                );
            }
        },
        changeWishlist(show) {
            if (show.wishlist == "❤️") {
                show.wishlist = "🤍";
                //update db
                setDoc(doc(this.userShows, this.auth.currentUser.uid + show.id), {
                    userId: this.auth.currentUser.uid,
                    showId: show.id,
                    wishlist: false
                }, { merge: true }
                );
            }
            else {
                show.wishlist = "❤️";
                //update db
                setDoc(doc(this.userShows, this.auth.currentUser.uid + show.id), {
                    userId: this.auth.currentUser.uid,
                    showId: show.id,
                    wishlist: true
                }, { merge: true }
                );
            }
            console.log("change wishlist");
        },
        highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.filter.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(this.filter, 'ig');
            return text.replace(re, matchedText => `<strong>${matchedText}</strong>`);
        },
        getShows: async function () {
            const db = getFirestore();
            const showsRef = collection(db, "shows");
            const querySnapshot = await getDocs(showsRef);
            querySnapshot.forEach((doc) => {
                this.shows.push(doc.data());
                this.shows[this.shows.length - 1].id = doc.id;
            });
            this.shows.forEach((show) => {
                show.directorString = show["director"].toString().replaceAll(",", ", ");
                show.castString = show["cast"].toString().replaceAll(",", ", ");
                show.countryString = show["country"].toString().replaceAll(",", ", ");
                show.genreString = show["genre"].toString().replaceAll(",", ", ");
                if (show.seen) {
                    show.seen = "✅";
                } else {
                    show.seen = "❌";
                }
                if (show.wishlist) {
                    show.wishlist = "❤️";
                } else {
                    show.wishlist = "🤍";
                }
                show.ratingStars = "";
                for (let i = 0; i < show["rating"]; i++) {
                    show.ratingStars += "⭐";
                }
            })
        },
        sort: function (s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },
        nextPage: function () {
            if ((this.currentPage * this.pageSize) < this.shows.length) this.currentPage++;
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        },
    },
    computed: {
        sortedShows: function () {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.shows.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            }).filter(row => {
                const type = row.type.toLowerCase();
                const title = row.title.toLowerCase();
                const director = row.director.toString().toLowerCase();
                const description = row.description.toLowerCase();
                const cast = row.cast.toString().toLowerCase();
                const country = row.country.toString().toLowerCase();
                const release_year = row.release_year.toString().toLowerCase();
                const duration = row.duration.toString().toLowerCase();
                const genre = row.genre.toString().toLowerCase();
                const rating = row.rating.toString().toLowerCase();
                const searchTerm = this.filter.toLowerCase();
                return type.includes(searchTerm) ||
                    title.includes(searchTerm) ||
                    director.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    cast.includes(searchTerm) ||
                    country.includes(searchTerm) ||
                    release_year.includes(searchTerm) ||
                    duration.includes(searchTerm) ||
                    genre.includes(searchTerm) ||
                    rating.includes(searchTerm);
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            })
        },
    },
    beforeMount() {
        this.getShows();
    },
}
</script>

<style scoped>
@import "../assets/style/modal.css"
</style>