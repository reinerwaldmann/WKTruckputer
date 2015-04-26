$(document).ready(function () {
  var root = (typeof exports == 'undefined') ? window : exports;
  var imagesAlreadyReplacedForHTMLElement = false;

  function HiResPath(path) {
    this.path = path;
    this.HiResPath = path.replace(/\.\w+$/, function(match) { return "@2x" + match; });
  }

  root.HiResPath = HiResPath;

  function HiResImage(img) {
    this.img = img;
    this.path = new HiResPath($(this.img).attr('src'));
    this.swap();
  }

  root.HiResImage = HiResImage;

  HiResImage.prototype.swap = function(path) {
    if (path === undefined) path = this.path.HiResPath;
	$(this.img).attr('src',path);
  }
  
  window.ODImageReplacer = {
      updateImagesForDOMElement : function(element) {
          if (root.devicePixelRatio > 1) {
              if (element === undefined) {
                  element = $('html');
              }

              var images = element.find('img.hires'), HiResImages = [], i, image;
              var inputImages = element.find('input[type=image].hires'), input;
              var zoomedImages = element.find('a.hires'), zoomedImage;

              for (i = 0; i < images.length; i++) {
                image = images[i];
                HiResImages.push(new HiResImage(image));
              }

              for (i = 0; i < inputImages.length; i++) {
                input = inputImages[i];
                HiResImages.push(new HiResImage(input));
              }

              for (i = 0; i < zoomedImages.length; i++) {
                zoomedImage = zoomedImages[i];
                path_2x = $(zoomedImage).attr('href').replace(/\.\w+$/, function(match) { return "@2x" + match; });
                $(zoomedImage).attr('href',path_2x);
              }
          }
      }
  }

  /* called once page has loaded */
  if (imagesAlreadyReplacedForHTMLElement) return;
  window.ODImageReplacer.updateImagesForDOMElement();
  imagesAlreadyReplacedForHTMLElement = true;
});