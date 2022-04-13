let scene, camera, renderer;
let stats;
let orbitControls, clock, delta;

function pointCloudMaker(points) {
    // console.log(pointing);
    console.log("pointCloud" + points[0].xx);
    let container1 = document.getElementById("container1");
    let container2 = document.getElementById("container2");
    main(container1,container2,points);
    render(true);
}


function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3());
}

function initRenderer(container) {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000, 1.0));
    // let width = getClass(document.getElementById('container1'),"width");
    // let height = getClass(document.getElementById('container1'),"height");
    renderer.setSize(400,400);
    container.appendChild(renderer.domElement);
}

function initControl(){
    //添加轨道控制器
    //新建一个轨道控制器
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点
    orbitControls.autoRotate = true;//将自动旋转关闭
    clock = new THREE.Clock();//用于更新轨道控制器
}

function main(container1,container2,points) {
    stats = initStats(container2);
    initScene();
    initCamera();
    initRenderer(container1);
    initControl();

    createParticles(points);
}


function render(control) {
    if(control === true){
        stats.update();
        delta = clock.getDelta();
        orbitControls.update(delta);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    else {
        stats.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}

function initStats(container) {
    let stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // 放在左上角
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    container.appendChild(stats.domElement);

    return stats;
}


function createParticles(points) {

    let x,y,z,intensity,ring;

    const geom = new THREE.Geometry();
    let material = new THREE.PointCloudMaterial({size: 0.2, vertexColors: true, color: 0xffffff});
    let jslength=0;

    for(let js2 in points){

        jslength++;

    }
    console.log("start load!");
    console.log("data point size ：", jslength);
    for(let i = 0; i < jslength; i++){//写入点云数据
            x = points[i].xx;
            y = points[i].yy;
            z = points[i].zz;
            ring = points[i].ring;
            intensity = points[i].intensity;
            let particle = new THREE.Vector3(x, y, z);
        geom.vertices.push(particle);
        geom.colors.push(new THREE.Color(0x000000));
    }
    console.log("load done!");
    // for (let x = -5; x < 5; x++) {
    //     for (let y = -5; y < 5; y++) {
    //         let particle = new THREE.Vector3(Math.random() * 100 - 100, Math.random() * 100 - 50, Math.random() * 100 - 50);
    //         geom.vertices.push(particle);
    //         geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));
    //     }
    // }

    let cloud = new THREE.PointCloud(geom, material);
    scene.add(cloud);
}



