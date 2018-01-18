

// 1. Initialize Firebase

	//Intialize Firebase
	var config ={
	 apiKey: "AIzaSyAWlQQgyzvbvnVeNNHOzUV7tOiT7owQZbY",
    authDomain: "charliefire-8c8d1.firebaseapp.com",
    databaseURL: "https://charliefire-8c8d1.firebaseio.com",
    projectId: "charliefire-8c8d1",
    storageBucket: "charliefire-8c8d1.appspot.com",
    messagingSenderId: "1017956451639"
	};


	firebase.initializeApp (config);


	var database = firebase.database();


   // 2. Button for adding Trains
   	$("#add-train-btn").on("click", function(){
   		event.preventDefault();

   		var Tname = $("#train-name-input").val().trim();
   		var Tdest =	$("#destination-input").val().trim();
   		var Tfirst = moment($("#first-train-input").val().trim()).format('HH:mm');
   		var Tfreq = $ ("#frequency-input").val().trim();


   	

   	// creates local "temp" object for holding train data
   	var newTrain = { 
   		name: Tname,
   		destination:Tdest,
   		firstrun: Tfirst,
   		frequency: Tfreq

   	};

   	 // uploads train data to the database
   	 database.ref().push(newTrain);

   	 console.log(newTrain.name);
   	 console.log(newTrain.destination);
   	 console.log(newTrain.firstrun);
   	 console.log(newTrain.frequency);


   	 alert("Train "+ newTrain.name +" successfully added!");

   	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#first-train-input").val("");
  	$("#frequency-input").val("");


  	});

   	 //Firebase event for adding train and row to DOM

   	 database.ref().on("child_added", function(TrainSnapShot,PrevTrainKey){

   	 	console.log(TrainSnapShot.val());


   	 	//Store everything into a variable
   	 	var Tname = TrainSnapShot.val().name;
   		var Tdest =	TrainSnapShot.val().destination;
   		var Tfirst = TrainSnapShot.val().firstrun;
   		var Tfreq = TrainSnapShot.val().frequency;

   		// Employee Info
   		console.log(Tname);
   		console.log(Tdest);
   		console.log(Tfirst);
   		console.log(Tfreq);


   		//New train start time
   		 
   		
   		var FirstTrainrun = moment(Tfirst, "HH:mm").subtract(1,"years");
   		// Time in minutes from first train run
   		var diffTime = moment().diff(moment(FirstTrainrun), "minutes");
    		
   		//Time apart
    	var Tremain = diffTime % Tfreq;


    	var Tmintill = Tfreq - Tremain;
    	
    	var nextTrain = moment().add(Tmintill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     NextArrival = moment(nextTrain).format("HH:mm");


    $("#train-table > tbody").append("<tr><td>" +Tname+"</td><td>" + Tdest + "</td><td>" +Tfreq+"</td><td>"+NextArrival+"</td><td>"+Tmintill+"</td><td>");

	});

   	 //var CurrTime = moment().format('LTS');

   	 //setInterval(function (){$("#TimeNow").innerhtml(CurrTime);}, 1000);

   		var update;
		(update = function() {
   		 document.getElementById("TimeNow")
    	.innerHTML = moment().format('MMMM Do YYYY, HH:mm:ss');
		})();
		setInterval(update, 1000);
   	 


















// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry