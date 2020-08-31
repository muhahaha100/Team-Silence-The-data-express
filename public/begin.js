let url = "http://localhost:3000/api"

let function1 = (data) =>{
    let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        canvas.width = 600;
        canvas.height = 400;

        context.fillStyle = ("#733");
        context.fillRect(0,0,600,400);

        context.font = "35px Arial";

        
        context.fillStyle = "#F44";
        
        
        context.fillText("Cube",45,389,200);
        context.fillRect(0,350,200,(-400*(data[0]["Cube"]/data[3]["maxes"][0])));
        
        context.fillStyle = "#4F4";
        
        context.fillText("Sphere",245,389,200);
        context.fillRect(200,350,200,(-400*(data[0]["Sphere"]/data[3]["maxes"][0])));
        
        context.fillStyle = "#44F";
        
        context.fillText("Capsule",445,389,200);
        context.fillRect(400,350,200,(-400*(data[0]["Capsule"]/data[3]["maxes"][0])));
        
        context.fillStyle = "#000";

        context.fillText(data[0]["Cube"],85,200,200);
        context.fillText(data[0]["Sphere"],285,200,200);
        context.fillText(data[0]["Capsule"],485,200,200);
};

let function2 = (data) =>{
    let canvas = document.getElementById("canvas2");
        let context = canvas.getContext("2d");

        canvas.width = 600;
        canvas.height = 400;

        context.fillStyle = ("#733");
        context.fillRect(0,0,600,400);

        context.font = "35px Arial";

        
        context.fillStyle = "#F44";
        
        
        context.fillText("2",45,389,200);
        context.fillRect(0,350,200,(-400*(data[1]["Two"]/data[3]["maxes"][1])));
        
        context.fillStyle = "#4F4";
        
        context.fillText("Fish",245,389,200);
        context.fillRect(200,350,200,(-400*(data[1]["Fish"]/data[3]["maxes"][1])));
        
        context.fillStyle = "#44F";
        
        context.fillText("At Least 1",445,389,200);
        context.fillRect(400,350,200,(-400*(data[1]["AtLeastOne"]/data[3]["maxes"][1])));
        
        context.fillStyle = "#000";

        context.fillText(data[1]["Two"],85,200,200);
        context.fillText(data[1]["Fish"],285,200,200);
        context.fillText(data[1]["AtLeastOne"],485,200,200);
};

let function3 = (data) => {
    let canvas = document.getElementById("canvas3");
        let context = canvas.getContext("2d");

        canvas.width = 600;
        canvas.height = 400;

        context.fillStyle = ("#733");
        context.fillRect(0,0,600,400);

        context.font = "35px Arial";

        
        context.fillStyle = "#F44";
        
        
        context.fillText("Many",45,389,200);
        context.fillRect(0,350,200,(-400*(data[2]["Many"]/data[3]["maxes"][2])));
        
        context.fillStyle = "#4F4";
        
        context.fillText("Lots",245,389,200);
        context.fillRect(200,350,200,(-400*(data[2]["Lots"]/data[3]["maxes"][2])));
        
        context.fillStyle = "#44F";
        
        context.fillText("Some",445,389,200);
        context.fillRect(400,350,200,(-400*(data[2]["Some"]/data[3]["maxes"][2])));
        
        context.fillStyle = "#000";

        context.fillText(data[2]["Many"],85,200,200);
        context.fillText(data[2]["Lots"],285,200,200);
        context.fillText(data[2]["Some"],485,200,200);
};

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        function1(data);
        function2(data);
        function3(data);
    });