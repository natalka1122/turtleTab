(function() {

  let yesterdayDateStr = getFormattedDate("yesterday");
  let todayDateStr = getFormattedDate("today");
  let tomorrowDateStr = getFormattedDate("tomorrow");
  let imageURL;
  let photographerURL;
  let photographerName;
  let photographerLink;
  let photographerLocation;

  // display today's data
  displayData();
  // load tomorrow's data
  preloadData();
  // delete yesterday's data
  deleteOldData();


  /********************************************************
   * download a new image from unsplash.com
   * and save it with tomorrow's date
   ********************************************************/
  function fetchNewImage() {

    const _0xe657=["\x33\x64\x32\x61\x62\x32\x62\x63\x66\x64\x61\x39\x63\x66\x30\x34\x34\x39\x62\x66\x32\x66\x32\x31\x34\x63\x61\x62\x39\x35\x31\x30\x38\x33\x61\x62\x33\x38\x31\x65\x31\x31\x30\x34\x61\x66\x63\x36\x61\x61\x37\x66\x37\x31\x32\x39\x34\x34\x66\x63\x63\x63\x61\x63"];const applicationId=_0xe657[0];
    const apiURL = "https://api.unsplash.com/photos/random?client_id=" + applicationId;
    const pictureMod="?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=srgb&fit=max&h=1080&orientation=landscape";
    let unsplashImageURL = "https://images.unsplash.com/photo-1489899318117-c43f753d589b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=srgb&fit=max&h=1080&orientation=landscape";
    let photographerUsername;
    let photographerLink;
    let photographerLocation;

    // grab the JSON data for a new Unsplash image
    fetch(apiURL).then(function(response) {
      return response.json();
    }).then(function(imageJSON) {
      imageURL = imageJSON.urls.raw + pictureMod;
      //console.log(imageURL);
      photographerName = imageJSON.user.name;
      //console.log(photographer);
      photographerUsername = imageJSON.user.username;
      profileURL = "https://unsplash.com/@" + photographerUsername + "?utm_source=turtleTabE&utm_medium=referral&utm_campaign=api-credit";
      photographerLink = "<a href=\"" + profileURL + "\" target=\"_blank\">" + photographerName + "</a>";
      photographerLocation = imageJSON.user.location;
      console.log(photographerLocation);

      saveImageData(photographerLink, photographerLocation);

      // download the image and save it (use tomorrow's date in name)
      saveImage(imageURL);
    });    
  }

  function saveImageData(photographerLink, photographerLocation) {
    // save image data (use tomorrow's date in name)
    let imageObjName = "ttBackgroundData-" + tomorrowDateStr;
    let imageObj = {
      "photographerLink": photographerLink,
      "photographerLocation": photographerLocation
    };
    localforage.setItem(imageObjName, imageObj).then(function(response) {
      //console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
  }

  function saveImage(imageURL) {

    fetch(imageURL).then(function(imgResponse) {
      return imgResponse.blob();
    })
    .then(function(imgBlob) {
      let imageName = "ttBackground-" + tomorrowDateStr;
      //let ttBackground = window.URL.createObjectURL(imgBlob);
      localforage.setItem(imageName, imgBlob)
      .then(function(value) {
        blobURL = window.URL.createObjectURL(value);
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  function showSavedImage(date) {
    // get URL of stored image
    let imageName = "ttBackground-" + date;

    localforage.getItem(imageName).then(function(blob) {
      imageURL = window.URL.createObjectURL(blob);
    }).catch(function(error) {
      console.log(error);
    });

    // retrieve photographerLink and photographerLocation
    let imageObjName = "ttBackgroundData-" + date;

    localforage.getItem(imageObjName).then(function(obj) {
      photographerLink = obj.photographerLink;
      photographerLocation = obj.photographerLocation;

      displayBgImage(imageURL, photographerLink, photographerLocation);

    }).catch(function(error) {
      console.log(error);
    });
  }

  function showOfflineImage() {

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
    let offlineImagesLength = offlineImages.length;
    
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

    // offline images do not have a location value atm,
    // so 3rd argument is not passed
    displayBgImage(imageURL, photographerLink);

    // save offline image in IndexedDB (make it today's image)
    fetch(imageURL).then(function(imgResponse) {
      return imgResponse.blob();
    }).then(function(imgBlob) {
      let imageName = "ttBackground-" + todayDateStr;
      //let ttBackground = window.URL.createObjectURL(imgBlob);
      localforage.setItem(imageName, imgBlob).then(function(value) {
        let blobURL = window.URL.createObjectURL(value);
      }).catch(function(error) {
        console.log(error);
      });

      // save image data (use today's date in name)
      let imageObjName = "ttBackgroundData-" + todayDateStr;
      let photographerLink = "<a href=\"" + photographerURL + "\" target=\"_blank\">" + photographerName + "</a>";
      let photographerLocation = null;
      let imageObj = {
        "photographerLink": photographerLink,
        "photographerLocation": photographerLocation
      };
      localforage.setItem(imageObjName, imageObj).then(function(response) {
        //console.log(response);
      }).catch(function(error) {
        console.log(error);
      });

      // increment image number to prepare for next use
      offlineImageFlag = (offlineImageFlag + 1) % offlineImagesLength;
      localStorage.setItem("offlineImageFlag", offlineImageFlag);
    
    });
  }

  function displayBgImage(imageURL, photographerLink, location) {
    const body = document.querySelector("body");
    const imgAttribution = document.querySelector("#imgAttribution");
    const imgPhotographer = document.querySelector("#photographer");
    const imgLocation = document.querySelector("#location");
    body.style.backgroundImage = "url(" + imageURL +")";
    imgAttribution.style.display = "inline-block";
    imgPhotographer.innerHTML = photographerLink;
    imgLocation.innerHTML = location;
  }

  function displayData() {
    // if an unsplash image with today's date exists in storage, display it
    let todaysImageName = "ttBackground-" + todayDateStr;

    localforage.getItem(todaysImageName).then(function(response) {
      // if today's image exists in storage
      if(response) {
        showSavedImage(todayDateStr);
      }
      // else display an offline image
      else {
        showOfflineImage();
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  function preloadData() {
    // if an unsplash image with tomorrow's date does not already exist in storage, download one
    let tomorrowsImageName = "ttBackground-" + tomorrowDateStr;
    localforage.getItem(tomorrowsImageName).then(function(response) {
      if(!response) {
        fetchNewImage();
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  function deleteOldData() {
    let yesterdaysImageName = "ttBackground-" + yesterdayDateStr;
    let yesterdaysImageData = "ttBackgroundData-" + yesterdayDateStr;
    deleteFromStorage(yesterdaysImageName);
    deleteFromStorage(yesterdaysImageData);
  }

})();