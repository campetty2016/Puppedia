import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

let axios = require('axios');
let jsonp = require('jsonp');
let FontAwesome = require('react-fontawesome');

class Dogs extends Component {

  constructor(props) {
    super(props);

    this.img = [];

    this.letters = ['A','B','C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.dogBreeds = [
      {
       "name": "affenpinscher", 
       "img" : "n02110627_5186.jpg",
      },
      {
       "name": "airedale", 
       "img" : "n02096051_3472.jpg",
       "bgPosition" : "top"
      },
      {
        "name": "akita", 
        "img" : "512px-Akita_inu.jpeg",
        "bgPosition" : "center"
       },
       {
        "name": "australian silky terrier", 
        "image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/02_Australian_Silky_Terrier%2C_Zack%2C_spring_2012.jpg/1280px-02_Australian_Silky_Terrier%2C_Zack%2C_spring_2012.jpg"
       },
       {
        "name": "alaskan malamute", 
        "img" : "n02110063_1034.jpg"
       },
       {
        "name": "american eskimo dog", 
        "image" : "https://upload.wikimedia.org/wikipedia/commons/4/47/American_Eskimo_Dog.jpg"
       },
       {
        "name": "basenji",
        "img" : "n02110806_1902.jpg",
        "bgPosition": "center"
       },
       {
        "name": "beagle",
        "img" : "n02088364_4473.jpg",
        "bgPosition": "center"
       },
       {
         "name": "bluetick coonhound", 
         "img" : "n02088632_2174.jpg",
        },
        {
          "name": "borzoi", 
          "img" : "n02090622_6131.jpg",
          "bgPosition": "top"
         },
         {
          "name": "boxer", 
          "img" : "n02108089_1357.jpg",
          "bgPosition": "top"
         },
         {
          "name": "briard", 
          "img" : "n02088632_2174.jpg",
         },
         {
           "name": "boston terrier", 
           "img" : "n02090622_6131.jpg",
           "bgPosition": "top"
          },
          {
           "name": "brittany", 
           "img" : "n02108089_1357.jpg",
           "bgPosition": "top"
          },
          {
          "name": "french bulldog", 
          "img" : ""
          },
          {
            "name": "chihuahua", 
            "img" : ""
          }
    ];
    //"griffon bruxellois","briard","boston terrier", "brittany", "french bulldog","staffordshire bull terrier",
    // "cairn terrier","chihuahua","chow chow","clumber spaniel","border collie","coonhound","cardigan welsh corgi",
    // "dachshund","dalmatian","great dane","scottish deerhound", "dhole","dingo","dobermann",
    // "norwegian elkhound","entlebucher mountain dog","american eskimo dog","german shepherd","italian greyhound",
    // "afghan hound","basset hound","bloodhound","ibizan hound","husky","keeshond","australian kelpie","komondor",
    // "kuvasz","labrador","leonberger","lhasa apso","alaskan malamute","malinois","maltese",
    // "bullmastiff", "tibetan mastiff","mexican hairless dog","bernese mountain dog", "newfoundland", "otterhound",
    // "papillon", "pekingese", "pembroke welsh corgi", "miniature pinscher", "pointer", "pomeranian", "poodle", "pug",
    // "pyrenees", "redbone coonhound", "chesapeake bay retriever", "curly-coated retriever", "flat-coated retriever", "golden retriever", "rhodesian ridgeback",
    // "rottweiler", "saluki","samoyed","schipperke","giant schnauzer", "miniature schnauzer", "english setter", "gordon setter", "irish setter",
    // "old english sheepdog", "shetland sheepdog", "shiba inu", "shih tzu", "king charles spaniel", "cocker spaniel", "irish water spaniel", "japanese chin",
    // "sussex spaniel", "welsh springer spaniel", "english springer spaniel", "st. bernard", "american pit bull terrier", "australian terrier", "bedlington terrier", "border terrier",
    // "dandie dinmont terrier", "fox terrier", "irish terrier", "kerry blue terrier", "lakeland terrier", "norfolk terrier", "norwich terrier", "patterdale terrier", "scottish terrier",
    // "sealyham terrier", "tibetan terrier", "toy manchester terrier", "west highland white terrier", "yorkshire terrier", "vizsla", "weimaraner", "whippet", "irish wolfhound"];

    this.breedGroups = ['Hound', 'Spaniel', 'Retriever', 'Terrier'];
    // this.hounds = ["afghan hound", "basset hound", "bloodhound", "ibizan hound", "walker hound", "redbone coonhound"];
    // this.spaniels = ["clumber spaniel","king charles spaniel", "brittany", "cocker spaniel", "irish water spaniel", "japanese chin", "english springer spaniel", "sussex spaniel", "welsh springer spaniel"];
    // this.retrievers = ["chesapeake bay retriever", "curly_coated retriever", "flat_coated retriever", "golden retriever"];
    // this.terriers = ["american terrier", "australian terrier","australian silky terrier","bedlington terrier", "border terrier", "dandie dinmont terrier", "fox terrier", "irish terrier", "kerry blue terrier", "lakeland terrier", "norfolk terrier",
    // "norwich terrier", "patterdale terrier", "scottish terrier", "sealyham terrier","tibetan terrier", "toy manchester terrier", "west highland white terrier", "wheaten terrier", "yorkshire terrier", "cairn terrier", "boston terrier"];

    this.filterBreeds = this.filterBreeds.bind(this);
    this.filterByLetter = this.filterByLetter.bind(this);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.searchDogs = this.searchDogs.bind(this);
    this.resetDogs = this.resetDogs.bind(this);

    this.state = {
      breeds: [],
      description: []
    };

    let images = [];

    if(this.dogBreeds) {
      document.body.style.overflow = "auto";
    }

  }

  componentDidMount() {

    let lazyImages = document.getElementsByClassName('dogPic'),
    search = document.getElementsByClassName('search')[0].value,
    breed = document.getElementsByClassName('filters')[0].value;
  
    // if(search !== "" || breed !== "Choose Breed") {

    //   if(search) {

    //     for(let i=0; i < this.dogBreeds.length; i++) {
    //       this.lazyload((this.dogBreeds[i].name.match(search)));
    //     }
    
    //   } else if(breed) {

    //     for(let i=0; i < this.dogBreeds.length; i++) {
    //       this.lazyload((this.dogBreeds[i].name.match(breed)));
    //     }
    //   }
    // }
  
    document.body.style.overflow = "auto";

    this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});

    console.log(this.dogBreeds);

    let images = [];

    window.addEventListener('scroll',(e) => {

      // for(let i=0; i < lazyImages.length; i++) {

      if(lazyImages.length > 6) {
        this.lazyload();
      }
      // }
    }); 

    if(lazyImages.length <= 6) {

      this.showImg();

      // for(let i=0; i < lazyImages.length; i++) {

        // lazyImages[i].addEventListener('load',(e) => {


        //   lazyImages[i].style.backgroundImage = lazyImages[i].getAttribute('data-src');
        //   lazyImages[i].style.opacity = 1;

        // }); 
      // }
    }
 
    for(let i=0; i < this.state.breeds.length; i++) {

      // if(this.elementInViewport(document.getElementById(this.state.breeds[i].name.replace(/ /g, "") + "_pic"))) {
      console.log(this.state.breeds[i].name);
      console.log(document.getElementById(this.state.breeds[i].name.replace(/ /g, "") + "_pic"));
        

        // document.getElementById(this.state.breeds[i].name.replace(/ /g, "") + "_pic").style.backgroundImage = document.getElementById(this.state.breeds[i].name.replace(/ /g, "") + "_pic").getAttribute('data-src');
      // }
    }

    // window.addEventListener('scroll', () => {
    //   console.log(document.getElementById('chihuahua_pic').scrollTop);
    // });


    // for(let i=0; i < this.dogBreeds.length; i++) {
    //   let bgImage = {background-image: 'url(' + this.dogBreeds[i].img + ')'}   
    //   console.log(bgImage);         
    // }


    // let bgImage = {backgroundImage: 'url(' + this.dogBreeds[i].img + ')'}

    // for(let i=0; i < this.state.breeds.length; i++) {

      // document.getElementsByClassName('dogPic')[0].addEventListener('load', this.loadImg);
    // }

    // console.log(this.images[0].affenpinscher)


    this.dogBreeds.map((breed, index) => {

    //     // if(response.status == 200) {
    //     // this.images.push({[breed]: response.data.message});  

    //     // console.log(breed[breed])

    //     console.log(this.images[index][breed]);
          
    //     // }
    //     // console.log({[breed]: response.data.message[0]});
    //     // this.images.push({[breed]: response.data.message[0]});

        // document.getElementById(breed.name.replace(/ /g, "") + '_pic').style.backgroundImage = "url('https://images.dog.ceo/breeds/'" + breed.name.replace(/ /g, "") + "/" + breed.img + ")";
        
    //   // console.log(breed.replace(/ /g, "").replace(".","").replace("terrier", "").replace("spaniel", "").replace("retriever", "").replace("hound", "") )
      }
    );

    // console.log(this.images);

    // for(let i=0; i < this.dogBreeds.length; i++) {
      
    //   for(let j=0; j < this.images.length; j++) {

    //     // console.log()
    //     // console.log(this.dogBreeds[i].replace(/ /g, "") + '_pic');
    //     // if(this.dogBreeds[i] == this.images[j]) {
    //     console.log(this.images[j][this.dogBreeds[i]]);  
        

    //     // document.getElementById(this.dogBreeds[i].replace(/ /g, "") + '_pic').style.backgroundImage = "url('" + this.images[j][this.dogBreeds[i]] + "')";
        
    //       // console.log(this.dogBreeds[i]);
    //     // }
    //   }
    //     // document.getElementById(this.dogBreeds[i].replace(/ /g, "") + '_pic').style.backgroundImage = "url('" + this.images[j][this.dogBreeds[i]] + "')";
    //     // console.log(document.getElementById(this.dogBreeds[i].replace(/ /g, "") + '_pic'));
      
    // }
  

    // this.images.map((breed, index) => {

    //   // console.log(breed);
    //   console.log(this.images);
    //   // console.log(breed.replace(/ /g, "").replace(".","").replace("terrier", "").replace("spaniel", "").replace("retriever", "").replace("hound", "") )
    // });

    // let images = [];

    // console.log(this.state.breeds);

  //   this.state.breeds.map((breed, index) =>
  //   axios
  //   .get('https://dog.ceo/api/breed/'+ breed.replace(/ /g, "").replace(".","").replace("terrier", "").replace("spaniel", "").replace("retriever", "").replace("hound", "").replace("alaskan", "").replace("american", "")
  //   .replace("dog", "").replace("australian", "").replace("old", "").replace("bull", "").replace("border", "").replace("great", "") + '/images')
  //   .then(response => {

  //       console.log(response.data);

  //       // switch(breed) {

  //       //   case "chihuahua":
  //       //   this.setImage("chihuahua", "https://images.dog.ceo/breeds/chihuahua/n02085620_10621.jpg");
  //       //   break;
          
  //       //   default:
  //       //   this.setImage(breed, response.data.message[0]);
  //       // }
  //       document.getElementById(breed.replace(/ /g, "") + '_pic').style.backgroundImage = "url('" + response.data.message[0] + "')";
  //       // images.push({[breed]: response.data.message[0]});          
  //       // console.log(images[0][breed]);          
  //   })
  //   // .catch(error => //console.log(error))
  // );

    // this.dogBreeds.map((breed, index) =>
    //   axios
    //   .get('https://dog.ceo/api/breed/'+ breed.replace(/ /g, "").replace(".","").replace("terrier", "").replace("spaniel", "").replace("retriever", "").replace("hound", "").replace("alaskan", "").replace("american", "")
    //   .replace("dog", "").replace("australian", "").replace("old", "").replace("bull", "").replace("border", "").replace("great", "") + '/images')
    //   .then(response => {

    //       console.log(response.data);

    //       // switch(breed) {

    //       //   case "chihuahua":
    //       //   this.setImage("chihuahua", "https://images.dog.ceo/breeds/chihuahua/n02085620_10621.jpg");
    //       //   break;
            
    //       //   default:
    //       //   this.setImage(breed, response.data.message[0]);
    //       // }

    //       let spinner = document.getElementsByClassName('fa-spinner')[0];

    //       if(response.data.message[0] !== "") {

    //         if(navigator.userAgent == "Internet Explorer") {
    //           document.getElementById(breed.replace(/ /g, "") + '_pic').style.transition = "all ls ease";          
    //         }
  
    //         // document.getElementById(breed.replace(/ /g, "") + '_pic').style.backgroundImage = "url('" + response.data.message[0] + "')";
    //         document.getElementById(breed.replace(/ /g, "") + '_pic').style.opacity = 1;
    //       }
          
    //       // images.push({[breed]: response.data.message[0]});          
    //       // console.log(images[0][breed]);          
    //   })
    //   // .catch(error => //console.log(error))
    // );
  };

  // setImage(breed, img) {

   

  //   // document.getElementById(breed.replace(/ /g, "") + '_pic').style.backgroundImage = "url('" + img + "')";    
  //   // document.getElementById(breed.replace(/ /g, "") + '_pic').style.backgroundImage = "url('" + img + "')";    
  // }

  // setImages(data) {

  //   // let lazyImages = document.getElementsByClassName('dogPic');
    
  //   for(let i=0; i < data.length; i++) {

  //     // if(condition) {

  //     console.log(document.getElementById(data[i].name.replace(/ /g, "") + '_pic'));
      
  //       // console.log(lazyImages[i].getAttribute('data-src'));
  //       document.getElementById(data[i].name.replace(/ /g, "") + '_pic').style.backgroundImage = document.getElementById(data[i].name.replace(/ /g, "") + '_pic').getAttribute('data-src');
  //       document.getElementById(data[i].name.replace(/ /g, "") + '_pic').style.opacity = 1;

  //     // }
  //     // lazyImages[i].setAttribute('src', lazyImages[i].getAttribute('data-src'));
  //   }
  // }

  showImg() {

    let lazyImages = document.getElementsByClassName('dogPic');

    console.log(lazyImages);

    for(let i=0; i < lazyImages.length; i++) {
      // console.log(lazyImages[i]);
      lazyImages[i].style.backgroundImage = lazyImages[i].getAttribute('data-src');
      lazyImages[i].style.opacity = 1;
    }

    // console.log(breed);

    // console.log(document.getElementsByClassName(breed + "_pic"));
  }

  filterBreeds(e) {

    // console.log(this.state.breeds);

    this.dogs = [];

    this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});    

    let breed = e.target.value;
    document.getElementsByClassName('clearBtn')[0].style.visibility = "visible";

    switch (breed) {
      case "Hound":

        for(let i=0; i < this.dogBreeds.length; i++) {
          
          if(this.dogBreeds[i].name.match('hound')) {

            this.dogs.push(this.dogBreeds[i]);
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});           
          }
        }

        // for(let j=0; j < this.dogs.length; j++) {
        //   console.log(document.getElementsByClassName(this.dogs[j].name.replace(/ /g, "") + '_pic')[j].style.backgroundImage);
        //   document.getElementsByClassName(this.dogs[j].name.replace(/ /g, "") + '_pic')[j].style.backgroundImage = document.getElementsByClassName(this.dogs[j].name.replace(/ /g, "") + '_pic')[j].getAttribute('data-src');
        //   document.getElementsByClassName(this.dogs[j].name.replace(/ /g, "") + '_pic')[j].style.opacity = 1;
        // }

      
      break;

      case "Spaniel":

        for(let i=0; i < this.dogBreeds.length; i++) {
            
          if(this.dogBreeds[i].name.match('spaniel')) {

            this.dogs.push(this.dogBreeds[i]);
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});  
          } 
        }

      break;

      case "Retriever":

        for(let i=0; i < this.dogBreeds.length; i++) {
            
          if(this.dogBreeds[i].name.match('retriever')) {

            this.dogs.push(this.dogBreeds[i]);
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});
          } 
        }

      break;

      case "Terrier":
        for(let i=0; i < this.dogBreeds.length; i++) {
              
          if(this.dogBreeds[i].name.match('terrier')) {

            this.dogs.push(this.dogBreeds[i]);
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});    
          } 
        }

      break;

      default:
        this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});
      break;

      // case "Terrier":
      //   this.setState({breeds: this.terriers.sort()});
      // break;

      // default:
      //   this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});
      // break;
    }

    console.log(this.dogs);
  }

  lazyload() {

    // console.log(condition);
    let lazyImages = document.getElementsByClassName('dogPic');

    console.log(lazyImages.length);

    for(let i=0; i < lazyImages.length; i++) {

      // for(let j=0; j < this.state.breeds.length; j++) {

        // console.log(lazyImages[i]);
        // console.log(document.getElementsByClassName(this.state.breeds[j].name + '_pic'));

        if(this.elementInViewport(lazyImages[i])){


          // console.log(lazyImages[i].getAttribute('data-src'));
          lazyImages[i].style.backgroundImage = lazyImages[i].getAttribute('data-src');
          lazyImages[i].style.opacity = 1;
          // lazyImages[i].setAttribute('src', lazyImages[i].getAttribute('data-src'));
        } 
      // }
    }
  }

  elementInViewport(el) {
    let img = el.getBoundingClientRect();

    console.log(el);
    return (
        img.top >= 0 &&
        img.left >= 0 &&
        img.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  // sortData(data,) {
  //   data.sort((a,b) => a.name.localeCompare(b.name)
  // }

  filterByLetter(e) {

    this.dogs = [];    
    this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});      

    let letter = e.target.id;

    for(let i=0; i < this.state.breeds.length; i++) {

      if(letter == this.state.breeds[i][0].toUpperCase()) {
        this.dogs.push(this.state.breeds[i]);

        document.getElementsByClassName(this.state.breeds[i].name.replace(/ /g, "") + '_pic')[i].style.backgroundImage = window.getComputedStyle(document.getElementsByClassName(this.state.breeds[i].name.replace(/ /g, "") + '_pic')[i]).getPropertyValue('background-image');
        // this.lazyload(letter == this.state.breeds[i][0].toUpperCase());
      }
    }

    // console.log(this.dogs);

    this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});
  }

  resetDogs() {
    this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});
    document.getElementsByClassName('clearBtn')[0].style.visibility = "hidden";
    document.getElementsByClassName('filters')[0].value = "Choose Breed";

    for(let i=0; i < document.getElementsByClassName('letter').length; i++) {
      document.getElementsByClassName('letter')[i].style.fontWeight = "normal";
    }

    document.getElementsByClassName('search')[0].value = "";
  }

  

  showModal(e) {

    let breed = e.target.name;
    let image = e.target.style;
    let url = '';
    let breeds = [];
    
    // let img = document.getElementById(image).style.backgroundImage;

    // console.log(img);

    // let modalImage = document.getElementsByClassName('modalImage')[0];

    // modalImage.style.backgroundImage = img;

    if (breed.split(' ').length > 1 && !breed.match("-") && !breed.match("st. bernard")) {
      for(let i=0; i < breed.split(' ').length; i++) {
        breeds.push((breed.split(' ')[i][0].toUpperCase().concat(breed.split(' ')[i].substr(1, breed.length))));

        url += `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=${breeds.toString().replace(/,/g,'_')}`;
        // console.log(url);
      }

    } else {
      switch(breed) {
        case "chihuahua":
        case "akita":
        case "boxer":
        case "pomeranian":
          url += `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=${breed.replace(' ', '_').concat('_(dog)')}`;
          // console.log(url);

        break;

        case "brittany":
        case "dalmatian":
        case "groenendael":
        case "malinois":
        case "maltese":
        case "samoyed":
        case "papillon":
        case "newfoundland":
          url += `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=${breed.replace(' ', '_').concat('_dog')}`
        break;

        case "pointer":
          url += `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=${breed.replace(' ', '_').concat('_(dog_breed)')}`;
        break;

        case "curly-coated retriever":
        case "flat-coated retriever":
          url += `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=${breed.replace(' ', '_').concat('oated_Retriever')}`;
        break;

        case "st. bernard":
          url += "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=St._Bernard_(dog)";
        break;

        case "airedale":
          url += "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=Airedale_Terrier";
        break;

        default:
          url += `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&piprop=original&titles=${breed.replace(' ', '_')}`;
        break;
      }
    }

    jsonp(url, null, function (err, data) {
      if (err) {
        console.error(err.message);
      } else {
        // console.log(data);
        // let desc = document.getElementById('desc_' + breed);
        let num = Object.keys(data.query.pages);
        document.body.style.overflow = "hidden";

        let modal = document.getElementsByClassName('modal')[0];
        let modalBody = document.getElementsByClassName('modalBody')[0];
        let modalHeader = document.getElementsByClassName('modalHeader')[0];
        let modalTitle = document.getElementsByClassName('modalTitle')[0];
        let modalDesc = document.getElementsByClassName('modalDesc')[0];
        let modalPic = document.getElementsByClassName('modalPic')[0];
        let modalthumbnail = document.getElementsByClassName('thumbnail')[0];

        modal.style.height = "100%";
        modal.style.width = "100%";
        modal.style.opacity = 1;

        modalBody.style.height = "60%";
        modalBody.style.width = "60%";
        modalBody.style.opacity = 1;

        modalHeader.style.height = "45px";
        modalHeader.style.width = "100%";
        modalHeader.style.opacity = 1;

        modalDesc.style.opacity = 1;
        modalTitle.innerHTML = breed.replace('_', ' ');
        modalthumbnail.style.backgroundImage = "url('" + data.query.pages[num].original.source +"')";        
        modalDesc.innerHTML = data.query.pages[num].extract;
        // console.log(data.query.pages[num].original.source);
        // modalDesc.insertBefore(modalPic, modalDesc.innerHTML);

        if(breed == "affenpinscher") {
          modalthumbnail.style.backgroundPosition = "left";
        } else {
          modalthumbnail.style.backgroundPosition = "center";          
        }

        // console.log(window.getComputedStyle(document.getElementById(breed.replace(/ /g, "") + '_pic')).getPropertyValue('background-image'));
        modalPic.style.backgroundImage = window.getComputedStyle(document.getElementsByClassName(breed.replace(/ /g, "") + '_pic')[0]).getPropertyValue('background-image');
      }
    })
  }

  closeModal() {
    document.body.style.overflow = "auto";
    let modal = document.getElementsByClassName('modal')[0];
    let modalBody = document.getElementsByClassName('modalBody')[0];
    let modalHeader = document.getElementsByClassName('modalHeader')[0];
    let modalDesc = document.getElementsByClassName('modalDesc')[0];

    modal.style.height = 0;
    modal.style.width = 0;
    modal.style.opacity = 0;

    modal.style.transition = "height 1s ease, width 1s ease, opacity 1s ease";

    modalBody.style.height = 0;
    modalBody.style.width = 0;
    modalBody.style.opacity = 0;

    modalHeader.style.height = 0;
    modalHeader.style.width = 0;
    modalHeader.style.opacity = 0;

    modalDesc.style.opacity = 0;
  }

  searchDogs(e) {

    // this.dogs = [];

    // this.setState({breeds: this.dogBreeds.sort()});              

    let search = document.getElementsByClassName('search')[0].value,
    breed = document.getElementsByClassName('filters')[0].value,
    letter = e.target.id;

    if(!search || !breed) {
      this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});    
      document.getElementsByClassName('clearBtn')[0].style.visibility = "hidden";            
    }

    // console.log(search);
    // console.log(letter);

    if(letter) {

      for(let i=0; i < document.getElementsByClassName('letter').length; i++) {
        document.getElementsByClassName('letter')[i].style.fontWeight = "normal";
      }
  
      document.getElementById(letter).style.fontWeight = "bold";    
    }

    if(breed) {
      
      for(let i=0; i < this.dogBreeds.length; i++) {
            
        if(this.dogBreeds[i].name.match(breed)) {

          this.dogs.push(this.dogBreeds[i]);
          this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});
        }
      }
      // this.filterBreeds(breed);
    }

    if(search && letter && breed) {
      console.log('both');

      this.dogs = [];     
      
      for(let i=0; i < this.dogBreeds.length; i++) {

        for(let j=0; j < this.dogBreeds[i].name.length; j++) {
          console.log(this.dogBreeds[i].name[j]);

          if(this.dogBreeds[i].name[j].startsWith(search) && letter == this.dogBreeds[i].name[0].toUpperCase() &&
          this.dogBreeds[i].name.match(breed)) {
            
            this.dogs.push(this.dogBreeds[i]);
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});         
            
            document.getElementsByClassName('clearBtn')[0].style.visibility = "visible";
            
          } else {
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});                                         
          }
        }
      }

    } else if(search && letter && !breed) {
    } else if(search && !letter) {
      // console.log('search');        

      this.dogs = [];  
      
      if(!letter || !breed) {
        this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});    
      } 

      for(let i=0; i < this.dogBreeds.length; i++) {

        for(let j=0; j < this.dogBreeds[i].name.split(" ").length; j++) {
          // console.log(this.dogBreeds[i].name.split(" ")[j]);

          if(this.dogBreeds[i].name.split(" ")[j].startsWith(search)) {

            this.dogs.push(this.dogBreeds[i]);
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});    
            
            document.getElementsByClassName('clearBtn')[0].style.visibility = "visible";
            
          } else {
            this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});                                 
          }

        }
      }        
      
    
    } else if(!search && letter) {
      console.log('letter');

      this.dogs = [];    
      // console.log(this.state.breeds);
      // this.setState({breeds: this.dogBreeds.sort()});               

      if(!search || !breed) {
        this.setState({breeds: this.dogBreeds.sort((a,b) => a.name.localeCompare(b.name))});  
      }
      
      for(let i=0; i < this.dogBreeds.length; i++) {
      
        if(letter == this.dogBreeds[i].name[0].toUpperCase()) {
          // console.log('ran');
          this.dogs.push(this.dogBreeds[i]);
          this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});  

          document.getElementsByClassName('clearBtn')[0].style.visibility = "visible";
                 
        } else {
          this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});                   
        } 
      }
    } else if(search && breed) {
      console.log('search and breed');
      for(let i=0; i < this.dogBreeds.length; i++) {
        if(this.dogBreeds[i].name.startsWith(search) && this.dogBreeds[i].name.match(breed)) {
          
          this.dogs.push(this.dogBreeds[i]);
          this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});         
          
          document.getElementsByClassName('clearBtn')[0].style.visibility = "visible";
          
        } else {
          this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});                                         
        }
      }
    } //else if(!search && breed) {

    //   console.log('filter breeds');

    //   for(let i=0; i < this.dogBreeds.length; i++) {
    //     if(this.dogBreeds[i].name.match(breed)) {
          
    //       this.dogs.push(this.dogBreeds[i]);
    //       this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});         
          
    //       document.getElementsByClassName('clearBtn')[0].style.visibility = "visible";
          
    //     } else {
    //       this.setState({breeds: this.dogs.sort((a,b) => a.name.localeCompare(b.name))});                                         
    //     }
    //   }
    // }


    // console.log(this.dogs);    

  }

  render() {

    return (
      <div className="content">
        <h2>Dogs</h2>
        <form className="form-inline my-2 my-lg-0 searchForm">
         <i className="fa fa-2x fa-search"></i> <input className="form-control mr-sm-2 search" type="text" placeholder="Search" onChange={this.searchDogs} aria-label="Search"/>
        </form>
        <div className="filterContainer">
          <div className="letterContainer">
            {this.letters.map((letter, index) =>
              <div id={letter} className="letter" key={index} onClick={this.searchDogs}>{letter}</div>
            )}
          </div>
          <select className="filters" onChange={this.filterBreeds}>
            <option defaultValue="">Choose Breed</option>
            {this.breedGroups.map((breed, index) =>
              <option key={index} value={breed}>{breed}</option>
            )}
          </select>
          <button className="clearBtn" onClick={this.resetDogs}>Show All</button>          
        </div>
        <div className="container">
          {this.state.breeds.map((breed, index) =>
              <div key={index} className="dog">
              <Link to={`/dogs/${breed.name.replace(/ /g, '_')}`}>
                <div className="loading">
                  <i className="fa fa-spinner fa-2x fa-spin"></i>    
                    <img style={{backgroundImage: breed.img ? "url('https://images.dog.ceo/breeds/" + breed.name.replace(/ /g, "").replace("coonhound", "").replace("alaskan", "")
                      .replace("american", "").replace("dog", "") + "/" + breed.img + "')" : "url('" + breed.image + "')"}} data-src={breed.img ? "url('https://images.dog.ceo/breeds/" + breed.name.replace(/ /g, "").replace("coonhound", "").replace("alaskan", "")
                        .replace("american", "").replace("dog", "") + "/" + breed.img + "')" : "url('" + breed.image + "')"} 
                          name={breed.name} className={breed.name.replace(/ /g, "") + '_pic dogPic'} onClick={this.showModal} />
                    <noscript>
                      <img style={{backgroundImage: breed.img ? "url('https://images.dog.ceo/breeds/" + breed.name.replace(/ /g, "").replace("coonhound", "").replace("alaskan", "")
                      .replace("american", "").replace("dog", "") + "/" + breed.img + "')" : "url('" + breed.image + "')"}} />
                    </noscript>  
                </div>
              </Link>
              <div className="dogBreed">{breed.name}</div>
            </div>
          )}
        </div>
        <div className="modal" onClick={this.closeModal}>
          <div className="modalBody">
            <div className="modalHeader">
              <img className="modalPic" />                        
              <h5 className="modalTitle"></h5>
              <span className="exit">x</span>
            </div>

            <div className="modalContent">
              <img className="thumbnail"/>                        
              <p className="modalDesc"></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dogs;
