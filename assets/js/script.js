/********************************************* GALLERY ******************************************/
let data_img= [{"title":"Sunset at the Castle", "clase":"semirealism"},     
                    {"title":"Kitty", "clase":"semirealism"},
                    {"title":"The Warrior", "clase":"semirealism"},
                    {"title":"Golden Dragon", "clase":"semirealism"},  
                    {"title":"Scientific Bear", "clase":"semirealism"},
                    {"title":"It", "clase":"semirealism"},
                    {"title":"The Defender", "clase":"semirealism"},
                    {"title":"The Queen", "clase":"semirealism"},
                    {"title":"Ninja", "clase":"semirealism"},
                    {"title":"My True Self", "clase":"fanarts"},
                    {"title":"Wizard", "clase":"semirealism"},
                    {"title":"Legacy", "clase":"fanarts"},
                    {"title":"Little Sloth", "clase":"semirealism"},
                    {"title":"The Guardian", "clase":"semirealism"},
                    {"title":"Sparrow", "clase":"semirealism"},
                    {"title":"Zoro", "clase":"fanarts"},
                    {"title":"It", "clase":"semirealism"},
                    {"title":"Noel", "clase":"fanarts"},
                    {"title":"Cute Guardian", "clase":"semirealism"},
                    {"title":"FanArt", "clase":"fanarts"},
                    {"title":"Jellyfish", "clase":"anime"},    
                    {"title":"Pose (1)", "clase":"manga"},
                    {"title":"Pose (2)", "clase":"manga"},
                    {"title":"Masked", "clase":"semirealism"},
                    {"title":"Bunny Year", "clase":"anime"},   
                    {"title":"Pose (3)", "clase":"manga"},
                    {"title":"Pose (4)", "clase":"manga"},
                    {"title":"Pose (5)", "clase":"manga"},
                    {"title":"The Maid", "clase":"anime"},
                    {"title":"Sam", "clase":"semirealism"}
                    ]
let image=[];                   
for (let i = 0; i < data_img.length; i++) {
        image.push({url: "assets/images/portfolio/"+data_img[i].title+".jpeg" , title:data_img[i].title, clase:data_img[i].clase});}  
console.log(image)
const gallery = document.getElementById("galleria");
gallery.classList.add("section__masonry");

const wrapper = document.createElement("div");
wrapper.classList.add("section__masonry-wrapper");
wrapper.style.width = "96%";

const item = document.createElement("div");
item.classList.add("section__masonry-wrapper__item");

image.forEach(img => {
    const link = document.createElement("a");
    link.classList.add("imageLink", "tumb", img.clase, "photo");
    link.href = img.url;
    link.title = img.title;

    const image = document.createElement("img");
    image.loading = "lazy";
    image.dataset.src = img.url;
    image.alt = img.title;
    image.width = "100%";
    image.classList.add("lazy", "section__masonry-wrapper__item-img");

    link.appendChild(image);
    item.appendChild(link);
});

wrapper.appendChild(item);
gallery.appendChild(wrapper);

document.body.appendChild(gallery);
/*********************************************************************************************************************************************** */
(function() {

  let overlay = document.querySelector('.overlayContainer'),
      largeImage = document.querySelector('.largeImage');

  const hideOverlay = () => {
    overlay.removeEventListener('click', hideOverlay, false);
    overlay.classList.remove('opacity');

    setTimeout(function() {
      largeImage.removeAttribute('src');
      largeImage.removeAttribute('alt');
      overlay.classList.remove('display');
    }, 400);
  }

function lightbox(event) {
    const caption = document.querySelector('.imageCaption');
    let href, alt;

    event.preventDefault();
    href = this.getAttribute('href');
    alt = this.children[0].getAttribute('alt');

    largeImage.setAttribute('src', href);
    largeImage.setAttribute('alt', alt);
    caption.innerHTML = alt;
    overlay.classList.add('display');

    setTimeout(function() { overlay.classList.add('opacity'); }, 25);
    setTimeout(function() { overlay.addEventListener('click', hideOverlay, false); }, 400);
  }

  /********************************* Event Listener ********************************/

  const runCode = () => {
    const image = document.querySelectorAll('.imageLink');
    if ( image ) {
      for ( var i = 0; i < image.length; i++ ) {
        image[i].addEventListener('click', lightbox, false);
      }
    }
  }
  runCode();
})();

/****************************** FILTER **********************************************/

var filter_link = $('#filter'),
    gallery_item = $('.tumb'),
    gallery_img = $('.tumb > img');

filter_link.on('change',function(){
  // find same class of menu
  var filterVal = $(this).val();

  // console.log (filterVal);
  if(filterVal == 'all') {
    // Each all and filter values
    gallery_item.each(function() {
        var self = $(this);
        self.removeClass('hidden-me-full');
        var wait  = setTimeout(function(){
           self.removeClass('hidden-me');
          clearTimeout(wait);
       },500);
    });
  }else{
    // Each all and filter values
    gallery_item.each(function() {
       var self = $(this);
      // Hide
      if(!self.hasClass(filterVal)) {
        self.addClass('hidden-me');
        var wait  = setTimeout(function(){
          console.log('and now');
           self.addClass('hidden-me-full');
          clearTimeout(wait);
        },500);
      }else{
        self.removeClass('hidden-me-full');
        var wait  = setTimeout(function(){
           self.removeClass('hidden-me');
          clearTimeout(wait);
       },500);
      }
    });
  }
  return false;
});
/******************************** LAZY LOAD *************************************************/
/* ---------- Lazy loading images starts ---------- */
if (typeof Array.prototype.forEach != 'function') {
  Array.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback.apply(this, [this[i], i, this]);
    }
  };
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages = document.querySelectorAll("img.lazy");  
  var lazyloadThrottleTimeout;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < (window.innerHeight + scrollTop)) {
          
          img.src = img.dataset.src;
          img.classList.add("fade-in")
          img.classList.remove('lazy');
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);

});
/* ---------- Lazy loading images ends ---------- */

