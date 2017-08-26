
function displayBackground(todaysDateStr) {
  // if an image with given date exists in storage, display it
  let todaysImage = "ttBackground-" + todaysDateStr;

  localforage.getItem(todaysImage).then(function(obj) {
    // if it exists in storage
    if(obj) {
      let imageURL = window.URL.createObjectURL(obj.image);
      addBgImageToDOM(imageURL, obj.photographerLink, obj.photographerLocation);
    }
    // else display an offline image
    else {
      useOfflineImage(todaysImage); 
    }
  }).catch(function(error) {
    console.log(error);
  });
}

function useOfflineImage(imageName) {

  let offlineImages = [
    {
      "image-0": "images/michael-podger-32058.jpg",
      "attribution-0": "https://unsplash.com/@jammypodger7470",
      "photographer-0": "michael podger"
    },
    {
      "image-1": "images/lucas-alexander-15980.jpg",
      "attribution-1": "https://unsplash.com/@lucasalexander",
      "photographer-1": "Lucas Alexander"
    },
    {
      "image-2": "images/daniele-levis-pelusi-217494.jpg",
      "attribution-2": "https://unsplash.com/@yogidan2012",
      "photographer-2": "Daniele Levis Pelusi"
    },
    {
      "image-3": "images/rich-lock-262846.jpg",
      "attribution-3": "https://unsplash.com/@richlock",
      "photographer-3": "Rich Lock"
    },
    {
      "image-4": "images/arkady-lifshits-235613.jpg",
      "attribution-4": "https://unsplash.com/@overdriv3",
      "photographer-4": "Arkady Lifshits"
    },
    {
      "image-5": "images/vikalp-125915.jpg",
      "attribution-5": "https://unsplash.com/@vikalp",
      "photographer-5": "Vikalp"
    }
  ];

  let offlineImageFlag;
  let imageURL;
  let photographerURL;
  let photographerName;
  let photographerLink;
  let photographerLocation;
  
  /****************************************
   * show next offline image as background
   ****************************************/

  // offlineImageFlag keeps track of which offline image to display next (stored value or 0)
  offlineImageFlag = Number(localStorage.getItem("offlineImageFlag")) || 0;

  // construct imageURL
  imageURL = offlineImages[offlineImageFlag]["image-" + offlineImageFlag];
  
  // construct photographerLink
  photographerURL = offlineImages[offlineImageFlag]["attribution-" + offlineImageFlag] + "?utm_source=turtleTabE&utm_medium=referral&utm_campaign=api-credit";
  photographerName = offlineImages[offlineImageFlag]["photographer-" + offlineImageFlag];
  photographerLink = "<a href=\"" + photographerURL + "\" target=\"_blank\">" + photographerName + "</a>";
  photographerLocation = null;

  addBgImageToDOM(imageURL, photographerLink, photographerLocation);

  // package image data as an object
  let imageObj = {
    "photographerLink": photographerLink,
    "photographerLocation": photographerLocation,
  };

  stowOfflineImage(imageURL, imageName, imageObj);

  // increment image number to prepare for next use
  let offlineImagesLength = offlineImages.length;
  offlineImageFlag = (offlineImageFlag + 1) % offlineImagesLength;
  localStorage.setItem("offlineImageFlag", offlineImageFlag);

}

function addBgImageToDOM(url, link, location) {

  const body = document.querySelector("body");
  const imgAttribution = document.querySelector("#imgAttribution");
  const imgPhotographer = document.querySelector("#photographer");
  const imgLocation = document.querySelector("#location");
  body.style.backgroundImage = "url(" + url +")";
  imgAttribution.style.display = "inline-block";
  imgPhotographer.innerHTML = link;
  imgLocation.innerHTML = location;
}

function stowOfflineImage(imageURL, imageName, imageObj) {
  // save offline image in IndexedDB (i.e. make it today's image)
  fetch(imageURL).then(function(imgResponse) {
    return imgResponse.blob();
  }).then(function(imgBlob) {
    imageObj.image = imgBlob;
    localforage.setItem(imageName, imageObj).then(function(value) {})
  }).catch(function(error) {
    console.log(error);
  });
}

function preloadBackground(tomorrowsDateStr) {
  // if unsplash image with tomorrow's date does not already 
  // exist in storage, download one    
  let tomorrowsImage = "ttBackground-" + tomorrowsDateStr;
  localforage.getItem(tomorrowsImage).then(function(response) {
    if(!response) {
      fetchNewImage(tomorrowsImage);
    }
  }).catch(function(error) {
    console.log(error);
  });
}

function fetchNewImage(imageName) {
  const apiURL = "https://api.unsplash.com/photos/random?client_id=" + applicationId;
  const pictureMod = "?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=srgb&fit=max&h=1080&orientation=landscape";
  let unsplashImageURL = "https://images.unsplash.com/photo-1489899318117-c43f753d589b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=srgb&fit=max&h=1080&orientation=landscape";
  let photographerUsername;
  let photographerName;
  let photographerLink;
  let photographerLocation;
  let imageURL

  // grab the JSON data for a new Unsplash image
  fetch(apiURL).then(function(response) {
    return response.json();
  }).then(function(imageJSON) {
    //console.log(imageJSON);
    imageURL = imageJSON.urls.raw + pictureMod;
    photographerName = imageJSON.user.name;
    photographerUsername = imageJSON.user.username;
    profileURL = "https://unsplash.com/@" + photographerUsername + "?utm_source=turtleTabE&utm_medium=referral&utm_campaign=api-credit";
    photographerLink = "<a href=\"" + profileURL + "\" target=\"_blank\">" + photographerName + "</a>";
    photographerLocation = imageJSON.user.location;      

    // package image data as an object
    let imageObj = {
      "photographerLink": photographerLink,
      "photographerLocation": photographerLocation,
    };

    // download the image and save it (use tomorrow's date in name)
    saveImage(imageURL, imageName, imageObj);
  });    
}

function saveImage(imageURL, imageName, imageObj) {

  fetch(imageURL).then(function(imgResponse) {
    return imgResponse.blob();
  }).then(function(imgBlob) {
    imageObj.image = imgBlob;
    localforage.setItem(imageName, imageObj).then(function(value) {})
  }).catch(function(error) {
    console.log(error);
  });    
}

function deleteOldData(todaysDateStr, tomorrowsDateStr) {

  localforage.keys().then(function(keysArray) {
    let toDelete = keysArray.filter(function(key){
      if (key.slice(-10) !== todaysDateStr && key.slice(-10) !== tomorrowsDateStr) {
        if ((key.slice(0, 13) === "ttBackground-") || (key.slice(0, 8) === "ttQuote-")) {
          return key;
        }
      }
    });
    for (let i = 0; i < toDelete.length; i++) {
      deleteFromStorage(toDelete[i]);
    }
  }).catch(function(err) {
    console.error(err);
  });
}
