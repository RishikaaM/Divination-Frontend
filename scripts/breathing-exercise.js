const setBackgroundImageByElementName = (elementName = "nature") => {
    document.getElementById("background-image").setAttribute("src", `images/backgrounds/${elementName}.jpg`);
}

const getElementNameFromStorage = () => {
    return sessionStorage.getItem("selectedElement");
}

const getSliderContentByElementName = (elementName) => {

    const breathingExercises = {
        "earth": [
            "Sit comfortably, close eyes.",
            "Inhale deeply, visualize roots.",
            "Exhale slowly, release tension.",
            "Repeat, feeling grounded."
        ],
        "water": [
            "Find a comfortable position.",
            "Inhale deeply like ocean rising.",
            "Exhale slowly, like waves receding.",
            "Continue rhythmic breathing, relaxing."
        ],
        "air": [
            "Sit with spine straight, eyes closed.",
            "Inhale deeply, hold for a moment.",
            "Exhale slowly and completely.",
            "Focus on breath's rhythm, repeat."
        ],
        "fire": [
            "Sit comfortably, hands on knees.",
            "Breathe rapidly through nose.",
            "Feel heat and energy building.",
            "Return to normal breathing, aware."
        ]
    }

    return breathingExercises[elementName] || [];

}

const setSliderContent = (sliderContent = []) => {
    document.getElementById("slide-text-1").innerText = sliderContent?.[0] || "";
    document.getElementById("slide-text-2").innerText = sliderContent?.[1] || "";
    document.getElementById("slide-text-3").innerText = sliderContent?.[2] || "";
    document.getElementById("slide-text-4").innerText = sliderContent?.[3] || "";
}

const activateGetDivinationResultButton = (delay = 20000) => {
    setTimeout(() => {

        const button = document.getElementById("get-divination-result-button");

        // Activate button
        button.disabled = false;

        console.log(`Button enabled`);

    }, delay);

    console.log(`Button timeout started`);

}

const onGetDivinationResultClick = () => {

    window.location.href = "/divination-result.html";

}

document.addEventListener('DOMContentLoaded', () => {

    // Setup Slider content based on selected element from browser storage
    const selectedElement = getElementNameFromStorage();

    if (!selectedElement) {
        console.log(`Selected element not found`);
        return;
    }

    // Set background picture based on selected element
    setBackgroundImageByElementName(selectedElement);

    // Get Slider Content based on element name
    const sliderContent = getSliderContentByElementName(selectedElement);

    // Set Slider content
    setSliderContent(sliderContent);

    // Setup Slider
    const mySlider = new SliderPro('#my-slider', {
        autoplay: true,
        autoplayDelay: 5000,
    });

    // Activate the Result button once all the slides have been viewed at least once
    activateGetDivinationResultButton();

});