//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(){
    renderArtArray();
    initModal();
})
initEventListeners();

//getAPIImage
function renderArtArray(){
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste%20Renoir')
    .then (resp => resp.json())
    .then (data => {

        //declare variables
        const artObjectArray = [];
        let randomArtObject;
        let randomArtObjectUrl; 

        data.objectIDs.forEach(element => artObjectArray.push(element));
        let newArtObject = () => {
            return randomArtObject = artObjectArray[Math.floor(Math.random()*artObjectArray.length)];
        }
        randomArtObject = newArtObject();

        randomArtObjectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArtObject}`;

        function getImage(){
            //console.log(renderImageArray());
            fetch (randomArtObjectUrl)
            .then (resp => resp.json())
            .then (data => {
                document.querySelector('#card-image').src = data.primaryImage;
            }
        )};
        getImage();

        function fetchArtistInfo(){
            fetch (randomArtObjectUrl)
            .then(resp => resp.json())
            .then(data => {
                const li = document.createElement('li');
                document.querySelector("#span-title").innerHTML = data.title;
                document.querySelector("#span-artistName").innerHTML = data.artistDisplayName;
                document.querySelector("#span-dimensions").innerHTML = data.dimensions;
                document.querySelector("#span-medium").innerHTML = data.medium;
            })
        }
        fetchArtistInfo();
    });
}

function renderArtFeed(){
                let leftCard = document.createElement('li');
                leftCard.innerHTML = "";
                leftCard.innerHTML = `
                    <!-- image card -->
                    <div class="image-container">
                        <div class="image-card">
                            <button id="follow-button" class="follow-button">+ Follow</button>
                        <img id="new-card-image" class="image" src="images/Mona Lisa.jpg" alt="Title of image goes here too" />
                        <div class="likes-section">
                            <button id="like-button" class="like-button">★</button>
                            <span id="like-count" class="likes">0 favorites</span>
                        </div>
                        <ul id="comments-list" class="comments">
                        </ul>
                        <form id="comment-form" class="comment-form">
                            <input
                            class="comment-input"
                            type="text"
                            name="comment"
                            id="comment"
                            placeholder="Add a comment..."
                            />
                            <button class="comment-button" type="submit">Post</button>
                        </form>
                        </div>
                    </div>
                    <br>
                    <br>
                    </div>
                `;


    //build right card

    //add card to feed
    document.querySelector('#art-feed').append(leftCard);
}

//Modal Button
function initModal(){
    var modal = document.getElementById("myModal"); // Get the modal
    var btn = document.getElementById("availability-button");// Get the button that opens the modal
    var span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal

    btn.onclick = function() {
        modal.style.display = "block";// When the user clicks on the button, open the modal
    }
    span.onclick = function() {
        modal.style.display = "none";// When the user clicks on <span> (x), close the modal
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";// When the user clicks anywhere outside of the modal, close it
            }
    }
}

//Event Listeners
function initEventListeners(){
    //eventListener to favorite
    document.querySelector('#like-button').addEventListener('click', function(e){
        const countListener = e.detail;
        document.querySelector('#like-count').textContent = countListener + ' favorites';
    });

    //eventListener for follow button
    document.querySelector('#follow-button').addEventListener('click', function(){
        document.querySelector('#follow-button').textContent = '✔ Following';
    });

    //eventListener for comments
    const form = document.querySelector('#comment-form')
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const li = document.createElement('li');
        const comment = document.querySelector('#comment').value;
        li.textContent = comment;
        document.querySelector('#comments-list').append(li);
        form.reset();
    });

    //eventListener to refresh page
    document.querySelector('#refresh-button').addEventListener('click', function(){
        location.reload();
        document.getElementById('comments-list').textContent = "";
    });

    document.querySelector('#add-button').addEventListener('click', function(){
        renderArtFeed()
    });
}
//***Stretch Goals Code ***/
//Persist Likes (then refactor and add to code above)
//Persist Follow Button
//Persist Comments
//function for user to add image