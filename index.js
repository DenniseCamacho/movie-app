"use strict";
/**
 * VARS, ARRAY AND OBJ
 */

//THIS TAKES THE DIV WITH THE ID NAME & PUTS INFORMATION IN THAT DIV.
let output_information = document.getElementById('output-information');

//URL THE INFORMATION IS COMING FROM.
const movies_url = 'https://marked-meadow-provelone.glitch.me/movies';

//FOR TEMPLATE LITERALS, UNSURE IF IT MAKES ANY DIFFERENCE.
const willBootStrapWorkStart = `<div class="card my-3 m-auto" style="max-width: 500px;">`;
const cardDiv2 = `<div class="row g-0">`;
const cardDiv3 = `<div class="col-4">`;
const cardDiv4 = `<div class="col-8">`;
const cardDiv5 = `<div class="card-body">`;
const bootStrapCardTitle = `<h5 class="card-title">`;
const theDetailsTag = `<details>`;
const detailsEnd = `</details>`;
const h5End = `</h5>`;
const divEnd = `</div>`;
const brTags = `<br>`;
const delButton = `<button id="delete-btn">Delete</button>`;
const editButton = `<button id="edit-btn">Edit</button>`;

//THIS FUNCTION GETS THE API, CALLED AGAIN INSIDE THE DELETE BUTTON.
function getMovies() {
fetch(movies_url).then( (response) => {
    response.json()
        .then( (movies) => {                                   //   <--FETCH
            callCards(movies);
			deleteButton(movies);
			editButton2(movies);
    });
});
}
// function getMovies(){
// 	fetch(movies_url).then( (response) => {
// 		response.json()
// 			.then( (movies) => {                                   //   <--FETCH
// 				callCards(movies);
// 				deleteButton(movies);
// 				editButton2(movies);
// 			});
// 	});
//
// };
function callCards(movies){
    movies.forEach( (movie , index, a)  => {
        const movie_title    = movie.title   ;
        const movie_rating   = movie.rating  ;
        const movie_image    = movie.poster  ;
        const movie_year     = movie.year    ;
        const movie_genre    = movie.genre   ;
        const movie_director = movie.director;
        const movie_plot     = movie.plot    ;
        const movie_actors   = movie.actors  ;
        //I WAS RUNNING INTO ISSUES WITH THE IMAGE NOT SHOWING UP, SO I HAD TO PUT THE TAGS HERE.
        const theImage = `<img src="${movie_image}" class="w-100" alt="${movie_plot}">`
        // console.log( `${movie_title}` === "undefined"); // TRYING TO GET RID OF UNDEFINED.           // <-TEST
        // console.log(  Object.keys(movie) ); // TESTING .LENGTH, TO GET RID OF UNDEFINED.             // <-TEST
        //Object.keys(movie).length > 2 // TESTING IF STATEMENTS                                        // <-TEST
        //OBJECT LITERALS
        if (`${movie_title}` !== "undefined") { //DECIDED TO GO WITH THIS IF STATEMENT
            output_information.innerHTML += `
					${willBootStrapWorkStart}
					${cardDiv2}
					${cardDiv3}
								 ${theImage}
					${divEnd}
					${cardDiv4}
					${cardDiv5}
					${bootStrapCardTitle}Title:      ${movie_title} ${h5End}
							Rating:		${movie_rating}
					${theDetailsTag}
							Year:	 	${movie_year}     ${brTags}
							Genre:	 	${movie_genre}    ${brTags}
							Director:	${movie_director} ${brTags}
							Plot:	 	${movie_plot}     ${brTags}
							Actors:	 	${movie_actors}   ${brTags}
					${detailsEnd}
					${delButton}${editButton}
					${divEnd}
					${divEnd}
					${divEnd}
					${divEnd}
					`
        }
    });
};
function deleteButton(movies){
	console.log(movies)
	let delButton2 = document.querySelectorAll('#delete-btn');
	delButton2.forEach((value, key, parent) => {
		value.addEventListener("click", (e)=>{
			e.preventDefault();
			let mid = movies[key].id;
			fetch(`${movies_url}/${mid}`,{
				method: "DELETE"
			}).then((result)=>{
				result.json().then((resp)=>{
					// console.log(resp);
					getMovies(resp);
				})
			})
			console.log(movies[key].id);
		});
	});
};
function editButton2(movies){
	let editButton2 = document.querySelectorAll('#edit-btn');
	editButton2.forEach((value, key, parent) => {
		value.addEventListener("click", (e)=>{
			e.preventDefault();
			console.log("you clicked the edit button");
		});
	});
};

getMovies();
// output_information.innerHTML += movies_url;

