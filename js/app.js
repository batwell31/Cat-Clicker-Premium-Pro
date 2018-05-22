
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clicks: 0,
            name: 'Briar-Rose',
            imgSrc: 'img/briar-rose.jpg',
            imgAlt: 'a picture of briar-rose climbing up my body to see me'
        },
        {
            clicks: 0,
            name: 'Danica',
            imgSrc: 'img/danica.jpg',
            imgAlt: 'a picture of danica sitting on my blanket on my couch'
        },
        {
            clicks: 0,
            name: 'Franklin',
            imgSrc: 'img/franklin.jpg',
            imgAlt: 'a picture of franklin on the back patio at my aunts house'
        },
        {
            clicks: 0,
            name: 'Harmony',
            imgSrc: 'img/harmony.jpg',
            imgAlt: 'a picture of harmony licking water out of my fiances bathroom faucet'
        },
        {
            clicks: 0,
            name: 'Philip',
            imgSrc: 'img/philip.jpg',
            imgAlt: 'a picture of my old roomates cat taking a nap on my computer desk'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function () {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function () {
        return model.currentCat;
    },

    getCats: function () {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function () {
        model.currentCat.clicks++;
        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function () {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.querySelector('#catDiv');
        this.catNameElem = document.querySelector('#catName');
        this.catImageElem = document.querySelector('#cat-img');
        this.countElem = document.querySelector('#clickTracker');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function () {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function () {
        // update the DOM elements with values from the current cat
        let currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clicks;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        this.catImageElem.alt = currentCat.imgAlt;
    }
};

var catListView = {

    init: function () {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function () {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.className = 'list';
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function (catCopy) {
                return function () {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();