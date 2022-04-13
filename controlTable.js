function readFileButton(file1,pro){

    initIndex();

    let porFile = $(file1);
    if (!/^\S*\.(?:csv)$/i.test(porFile.val())) {
        falseInput(porFile);
        return false;
    }

    let points = csvLoader(file1,pro);
    let frame = document.getElementById("frame").innerText;
    previewImage(file1,frame);
    pointCloudMaker(points);
    // pointCloudMaker();
}

function jump(a) {
    let locate = {
        '1' : 'index.html',
        '2' : 'loader.html'
    };
    console.log(locate[a]);
    window.location.href=locate[a];
}

function getClass(obj,name)//获取元素样式

{


    if(obj.currentStyle)

    {
        return obj.currentStyle[name];//IE下获取非行间样式



    }

    else

    {
        return getComputedStyle(obj,false)[name];//FF、Chorme下获取费行间样式

    }

}

