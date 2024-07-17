
document.addEventListener('DOMContentLoaded', () => {
    const dogImageContainer = document.getElementById('dog-image-container');
    const fetchDogImageButton = document.getElementById('fetch-dog-image-button');
    const errorMessage = document.createElement('p');
    errorMessage.style.color = 'red';
    
    fetchDogImageButton.addEventListener('click', () => {
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            const img = document.createElement('img');
            img.src = data.message;
            img.alt = 'Random Dog';
            dogImageContainer.innerHTML = '';
            dogImageContainer.appendChild(img);
          } else {
            errorMessage.textContent = 'Failed to fetch dog image. Please try again.';
            dogImageContainer.innerHTML = '';
            dogImageContainer.appendChild(errorMessage);
          }
        })
        .catch(error => {
          errorMessage.textContent = 'Error fetching dog image. Please check your connection and try again.';
          dogImageContainer.innerHTML = '';
          dogImageContainer.appendChild(errorMessage);
          console.error('Error fetching dog image:', error);
        });
    });
  });
  