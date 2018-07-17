import React, { Component } from 'react';

let axios = require('axios');
let jsonp = require('jsonp');
let FontAwesome = require('react-fontawesome');

class Search extends Component {

  constructor(props) {
    super(props);

    this.img = [];
    this.dogs = [];

    this.letters = ['A','B','C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.dogBreeds = ["affenpinscher", "airedale", "akita", "australian silky terrier", "basenji", "beagle", "bluetick coonhound",
    "borzoi","boxer","griffon bruxellois","briard","boston terrier", "brittany", "french bulldog","staffordshire bull terrier",
    "cairn terrier","chihuahua","chow chow","clumber spaniel","border collie","coonhound","cardigan welsh corgi",
    "dachshund","dalmatian","great dane","scottish deerhound", "dhole","dingo","dobermann",
    "norwegian elkhound","entlebucher mountain dog","american eskimo dog","german shepherd","italian greyhound",
    "groenendael","afghan hound","basset hound","bloodhound","ibizan hound","husky","keeshond","australian kelpie","komondor",
    "kuvasz","labrador","leonberger","lhasa apso","alaskan malamute","malinois","maltese",
    "bullmastiff", "tibetan mastiff","mexican hairless dog","bernese mountain dog", "newfoundland", "otterhound",
    "papillon", "pekingese", "pembroke welsh corgi", "miniature pinscher", "pointer", "pomeranian", "poodle", "pug",
    "pyrenees", "redbone coonhound", "chesapeake bay retriever", "curly-coated retriever", "flat-coated retriever", "golden retriever", "rhodesian ridgeback",
    "rottweiler", "saluki","samoyed","schipperke","giant schnauzer", "miniature schnauzer", "english setter", "gordon setter", "irish setter",
    "old english sheepdog", "shetland sheepdog", "shiba inu", "shih tzu", "king charles spaniel", "cocker spaniel", "irish water spaniel", "japanese chin",
    "sussex spaniel", "welsh springer spaniel", "english springer spaniel", "st. bernard", "american pit bull terrier", "australian terrier", "bedlington terrier", "border terrier",
    "dandie dinmont terrier", "fox terrier", "irish terrier", "kerry blue terrier", "lakeland terrier", "norfolk terrier", "norwich terrier", "patterdale terrier", "scottish terrier",
    "sealyham terrier", "tibetan terrier", "toy manchester terrier", "west highland white terrier", "yorkshire terrier", "vizsla", "weimaraner", "whippet", "irish wolfhound"];

    this.breedGroups = ['Hound', 'Spaniel', 'Retriever', 'Terrier'];
    this.hounds = ["afghan hound", "basset hound", "bloodhound", "ibizan hound", "walker hound", "redbone coonhound"];
    this.spaniels = ["clumber spaniel","king charles spaniel", "brittany", "cocker spaniel", "irish water spaniel", "japanese chin", "english springer spaniel", "sussex spaniel", "welsh springer spaniel"];
    this.retrievers = ["chesapeake bay retriever", "curly_coated retriever", "flat_coated retriever", "golden retriever"];
    this.terriers = ["american terrier", "australian terrier","australian silky terrier","bedlington terrier", "border terrier", "dandie dinmont terrier", "fox terrier", "irish terrier", "kerry blue terrier", "lakeland terrier", "norfolk terrier",
    "norwich terrier", "patterdale terrier", "scottish terrier", "sealyham terrier","tibetan terrier", "toy manchester terrier", "west highland white terrier", "wheaten terrier", "yorkshire terrier", "cairn terrier", "boston terrier"];

    // this.searchDogs = this.searchDogs.bind(this);

    this.state = {
      breeds: [],
      images: [],
      img: [],
      description: []
    };

    let images = [];

    for(let i=0; i < this.state.images.length; i++) {
      images.push(this.state.images[i]);
    }
  }

  componentDidMount() {

    this.setState({breeds: this.dogBreeds.sort()});;

    // window.addEventListener('load', this.showSpinner);

    this.dogBreeds.map((breed, index) =>
      console.log(breed.replace(/ /g, "").replace(".","").replace("terrier", "").replace("spaniel", "").replace("retriever", "").replace("hound", "") )
    );

    let images = [];

    this.dogBreeds.map((breed, index) =>
      axios
      .get('https://dog.ceo/api/breed/'+ breed.replace(/ /g, "").replace(".","").replace("terrier", "").replace("spaniel", "").replace("retriever", "").replace("hound", "").replace("alaskan", "").replace("american", "")
      .replace("dog", "").replace("australian", "").replace("old", "").replace("bull", "").replace("border", "").replace("great", "") + '/images')
      .then(response => {
        document.getElementById(breed.replace(/ /g, "") + '_pic').style.backgroundImage = "url('" + response.data.message[0] + "')";
      })
      .catch(error => console.log(error))
    );
  }

//   searchDogs(e) {

//     console.log(this.state.breeds);

//     e.preventDefault();
//     let search = document.getElementsByClassName('search')[0].value;
//     console.log(search);

//     for(let i=0; i < this.state.breeds.length; i++) {

//       if(this.state.breeds[i].match(search)) {
//         this.dogs.push(this.state.breeds[i]);
//         break;
//       }
//     }

//     console.log(this.dogs);

//     this.setState({breeds: this.dogs.sort()});
//   }

  render() {

    // console.log(this.state.breeds);
    console.log(this.state.img);
    // console.log(this.state.description);

    return (
      <div>
         <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2 search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.searchDogs}>Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
