let model;

const setSelectedElementInStorage = (selectedElement) => {
    sessionStorage.setItem("selectedElement", selectedElement);
}

const onNextClick = () => {

    // Get selected element
    const selectedElement = document.getElementById("selected-element").value;

    // Set element
    setSelectedElementInStorage(selectedElement);

    // Move to next page
    window.location.href = "breathing-exercise.html";

}

const detectElementByGesture = (predictions = []) => {

    const elements = {
        earth: "earth",
        water: "water",
        air: "air",
        fire: "fire",
    }

    if (predictions.length === 0) return;

    if (predictions.length === 1 && predictions[0].label === "face") {
        // If only face, then its earth
        return elements.earth;
    }
    else if (predictions.filter((item) => item.label === "open").length > 0) {
        // If open, then its water
        return elements.water;
    }
    else if (predictions.filter((item) => item.label === "closed").length > 0) {
        // If open, then its air
        return elements.air;
    }
    else if (predictions.filter((item) => item.label === "point").length > 0) {
        // If open, then its fire
        return elements.fire;
    }

}

const onDetectGestureClick = async () => {

    const video = document.getElementById("cam-video");
    const canvas = document.querySelector("#captured-image");
    const image = document.querySelector("#image");

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageDataUrl = canvas.toDataURL('image/jpeg');

    image.setAttribute("src", imageDataUrl);

    // Setup hand gesture library with video stream
    const defaultParams = {
        flipHorizontal: false,
        outputStride: 16,
        imageScaleFactor: 1,
        maxNumBoxes: 20,
        iouThreshold: 0.2,
        scoreThreshold: 0.6,
        modelType: "ssd320fpnlite",
        modelSize: "large",
        bboxLineWidth: "2",
        fontSize: 17,
    };

    model = await handTrack.load(defaultParams);
    const predictions = await model.detect(image);


    console.log(`Prediction: ${JSON.stringify(predictions)}`);

    const elementDetected = detectElementByGesture(predictions);

    console.log(`Detected Element: ${elementDetected}`);

    // Click the detected element button
    document.getElementById(`btn-${elementDetected}`).click();

}

// JavaScript logic to handle element selection
document.addEventListener('DOMContentLoaded', async function () {
    var buttons = document.querySelectorAll('.element-buttons .element');

    // Setup button listeners
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Remove 'selected' class from all buttons
            buttons.forEach(function (btn) {
                btn.classList.remove('selected');
            });
            // Add 'selected' class to clicked button
            button.classList.add('selected');
            // Change background image based on selected element
            const element = button.getAttribute('data-value');
            const bgImage = document.getElementById('background-image');
            bgImage.setAttribute("src", `images/backgrounds/${element}.jpg`)
            // Set the value of the hidden input to the selected element
            document.getElementById('selected-element').value = button.getAttribute('data-value');
        });
    });



    const video = document.getElementById('cam-video');

    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;

});