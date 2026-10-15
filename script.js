/*
 - Name: Lucas Klopp
 - File: script.js
 - Professor: Ratul Mazumder
*/

/*
-------------------1 build one animal block--------------------
*/

// takes one animal object and returns a finished div for it
function makeAnimalBlock(animal) {

    // the container for this animal
    const block = document.createElement("div");
    block.className = "animal";

    // photo
    const photo = document.createElement("img");
    photo.src = animal.image;
    photo.alt = animal.name;
    block.appendChild(photo);

    // name
    const name = document.createElement("h2");
    name.textContent = animal.name;
    block.appendChild(name);

    // type
    const type = document.createElement("p");
    type.innerHTML = `<span class="label">Type:</span> ${animal.type}`;
    block.appendChild(type);

    // age
    const age = document.createElement("p");
    age.innerHTML = `<span class="label">Age:</span> ${animal.age} years`;
    block.appendChild(age);

    // habitat
    const habitat = document.createElement("p");
    habitat.className = "habitat";
    habitat.innerHTML = `<span class="label">Habitat:</span> ${animal.habitat}`;
    block.appendChild(habitat);

    return block;
}

/*
-------------------2 load the animals from db.json--------------------
*/

// async so await can be used inside
async function loadAnimals() {

    // the main gallery container
    const gallery = document.querySelector("#gallery");

    // try the fetch, catch anything that goes wrong
    try {

        // wait for the file to arrive
        const response = await fetch("db.json");

        // response.ok is false for errors like 404
        if (!response.ok) {
            throw new Error(`db.json could not be loaded (status ${response.status})`);
        }

        // wait for the JSON text to be turned into an array of objects
        const animals = await response.json();

        // one block per animal, added inside the gallery
        for (let i = 0; i < animals.length; i++) {
            gallery.appendChild(makeAnimalBlock(animals[i]));
        }

        console.log(`Loaded ${animals.length} animals.`);

    } catch (error) {

        // print the problem to the console and show a message on the page
        console.error("Problem loading the gallery:", error);

        const message = document.createElement("p");
        message.className = "error";
        message.textContent = `Sorry, the animals could not be loaded. ${error.message}`;
        gallery.appendChild(message);
    }
}

/*
-------------------3 start--------------------
*/

// run as soon as the script loads
loadAnimals();
