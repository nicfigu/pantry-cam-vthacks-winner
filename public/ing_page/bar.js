let input = document.querySelector(".ingIn");
let addBtn = document.querySelector(".btn");
let ings = document.querySelector(".ingredietns");

let model = null;
let user_confidence = 0.5;

//Add ing
function saveI() {
  if (input.value.includes(",")) {
    var arr = input.value.split(",");
    for (element in arr) {
      loadNsave(arr[element]);
    }
    input.placeholder = "    Add Ingredient";
    input.value = "";
  } else if (input.value.trim() != 0) {
    loadNsave(input.value);
  } else input.placeholder = "**! Empty Field !**";
}

function load() {
  var retList = JSON.parse(localStorage.getItem("ings_string"));
  console.log(retList);
  if (retList && retList.length >= 1) {
    for (item in retList) {
      newHtml(retList[item]);
    }
  }
}

ings.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-circle-xmark")) {
    e.target.parentElement.parentElement.remove();
    reBuild();
  }
});

function clearI() {
  localStorage.removeItem("ings_string");
  var ingsList = [];
  localStorage.setItem("ings_string", JSON.stringify(ingsList));
  location.reload();
}

function loadNsave(food) {
  food = food.trim().toUpperCase();
  var checkList = JSON.parse(localStorage.getItem("ings_string"));
  if (!checkList || !checkList.includes(food)) {
    newHtml(food);
    reBuild();
    input.placeholder = "    Add Ingredient";
    input.value = "";
  } else {
    input.placeholder = "**! Repeated value !**";
    input.value = "";
  }
}

function newHtml(val) {
  let newIng = document.createElement("div");
  newIng.classList.add("ing");
  newIng.innerHTML = `
        <p classname="color-[#861F41]">${val}</p> 
        <div class = "item-btn"> 
            <input type = "button" class="in" hidden="hidden" value = "${val}"><i class = "fa-solid fa-circle-xmark"></i></input>
        </div>`;
  ings.appendChild(newIng);
}

function reBuild() {
  var tempList = [];
  document.querySelectorAll('[class = "in"]').forEach((item) => {
    tempList.push(item.value);
  });
  localStorage.setItem("ings_string", JSON.stringify(tempList));
}

function cont() {
  window.location.href = "recpage.html";
}

function loadImage(event) {
  var image = new Image();
  image.onload = function () {
    detectImage(image);
  };
  image.src = URL.createObjectURL(event.target.files[0]);
}

function detectImage(image) {
  if (!model) {
    console.log("Model not loaded yet");
    return;
  }

  model
    .detect(image)
    .then(function (predictions) {
      /*console.log(predictions);*/
      for (const prediction of predictions) {
        /*console.log("Prediction: ", prediction.class, prediction.confidence)*/
        if (prediction.confidence > user_confidence / 10) {
          /*console.log("I'm adding the ingredient named: ", prediction.class);*/
          loadNsave(prediction.class);
        }
      }
      input.placeholder = "    Add Ingredient";
      input.value = "";
    })
    .catch(function (error) {
      console.error("Detection failed:", error);
    });
}

function loadModel() {
  roboflow
    .auth({ publishable_key: publishable_key })
    .load({
      model: MODEL_NAME,
      version: MODEL_VERSION,
    })
    .then(function (m) {
      model = m;
      model.configure({ threshold: CONFIDENCE_THRESHOLD });
    })
    .catch(function (err) {
      console.error("Model loading failed:", err);
    });
}

loadModel();
