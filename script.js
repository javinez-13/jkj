// Change background color on each fetch
function changeBackgroundColor() {
    const colors = ['#ffb6c1', '#add8e6', '#98fb98', '#f0e68c', '#ffcccb'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  }
  
  // Fetch random cat fact and image
  function fetchCatFact() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('catFact').style.opacity = 0;
    document.getElementById('catImage').style.display = 'none';
  
    // Fetch cat fact
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => {
        // Fetch random cat image
        fetch('https://api.thecatapi.com/v1/images/search')
          .then(response => response.json())
          .then(catData => {
            changeBackgroundColor();
            document.getElementById('catFact').textContent = data.fact;
            document.getElementById('catFact').style.opacity = 1;
  
            const catImageUrl = catData[0].url;
            document.getElementById('catImage').src = catImageUrl;
            document.getElementById('catImage').style.display = 'block';
          });
      })
      .catch(error => {
        console.error('Error fetching cat fact:', error);
        document.getElementById('catFact').textContent = 'Oops! Something went wrong.';
        document.getElementById('catFact').style.opacity = 1;
      })
      .finally(() => {
        document.getElementById('loader').style.display = 'none';
      });
  }
  
  // Event listener for fetching cat fact on button click
  document.getElementById('getFactButton').addEventListener('click', fetchCatFact);
  
