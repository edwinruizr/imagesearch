# imagesearch
Image search usign Pixabay API
read about it here : https://pixabay.com/api/docs/

<h2>You can get the image URLs, alt text and page urls for a set of images relating to a given search string.
You can paginate through the responses by adding a ?offset=number parameter to the URL.
</h2>
<h3>Example usage (search images):</h3>
      domain/api/imagesearch/dogs
<h3>Example output:</h3>
      [{"imageURL":"https://pixabay.com/get/e833b20b2ffd1c2ad65a5854e24a439ee075eac818b5194994f1c67fa2eb_640.jpg",
      "altText":"sunset, dog, dogs","pageURL":"https://pixabay.com/en/sunset-dog-dogs-walking-woman-163479/"},
      {"imageURL":"https://pixabay.com/get/e834b80f28f5043ed95c4518b7484093eb74e0dd04b015499df1c07ea1e8b3_640.jpg",
      "altText":"dogs, carnival, humor","pageURL":"https://pixabay.com/en/dogs-carnival-humor-pet-ernst-1190015/"},...

<h2>You can get a list of the most recently submitted search strings.</h2>
<h3>Example usage (see recent searches):</h3>
      domain/api/latest/imagesearch
<h3>Example output:</h3>
      [{"term":"dogs","when":"Sun Feb 26 2017 14:06:26 GMT+0000 (UTC)"}]            

