var c = $('canvas')[0];
var ctx = c.getContext('2d');
var originImage = new Image();
originImage.src = 'imgs/lena.png';

var imageProcess = function() {
    var imageData = ctx.getImageData(0, 0, c.width, c.height);
    var pixelsNum = imageData.data.length / 4;
    for(var i=0; i<pixelsNum; i++) {
        var average = imageData.data[i * 4] + imageData.data[i * 4 + 1] + imageData.data[i * 4 + 2];
        average /= 3;
        imageData.data[i * 4] = average;
        imageData.data[i * 4 + 1] = average;
        imageData.data[i * 4 + 2] = average;
    }
    ctx.putImageData(imageData, 0, 0);
};

var handleFileSelect = function(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(fileObject) {
        var data = fileObject.target.result;
        myImage = new Image();
        myImage.src = data;
        myImage.onload = function() {
            //c.width = myImage.width;
            //c.height = myImage.height;
            ctx.drawImage(myImage, c.width / 2 - myImage.width / 2, c.height / 2 - myImage.width / 2);
            imageProcess();
        }
    }
};

$('#file').change(handleFileSelect);

$('#control_button').click(function() {
    var $control_items = $('#control_items');
   if($control_items[0].style.display !== 'none') {
       $('#file_button')[0].style.paddingRight = 0;
       $control_items.hide(250);
   }else {
       $control_items.show(250, function() {
           $('#file_button')[0].style.paddingRight = '160px';
       });
   }
});