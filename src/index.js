//console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
  
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const imageContainer = document.getElementById("dog-image-container");

  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "A cute dog";
        img.style.height = "200px";
        img.style.margin = "10px";
        imageContainer.appendChild(img);
      });
    })
    .catch(error => {
      console.error("Error fetching dog images:", error);
    });


  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const breedList = document.getElementById("dog-breeds");
  const dropdown = document.getElementById("breed-dropdown");

  let allBreeds = [];

  
  function renderBreeds(breeds) {
    breedList.innerHTML = ""; 

    breeds.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed;

      
      li.addEventListener("click", () => {
        li.style.color = "purple"; 
      });

      breedList.appendChild(li);
    });
  }

  
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message); 
      renderBreeds(allBreeds);
    })
    .catch(error => {
      console.error("Error fetching dog breeds:", error);
    });

  
  dropdown.addEventListener("change", (e) => {
    const selectedLetter = e.target.value;

    const filteredBreeds = selectedLetter === ""
      ? allBreeds
      : allBreeds.filter(breed => breed.startsWith(selectedLetter));

    renderBreeds(filteredBreeds);
  });
});
