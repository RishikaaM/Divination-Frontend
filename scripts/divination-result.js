const setBackgroundImageByElementName = (elementName = "nature") => {
    document.getElementById("background-image").setAttribute("src", `images/backgrounds/${elementName}.jpg`);
}

const getNameFromStorage = () => {
    return sessionStorage.getItem("name");
}

const getElementNameFromStorage = () => {
    return sessionStorage.getItem("selectedElement");
}

const getAreaOfLifeFromStorage = () => {
    return sessionStorage.getItem("areaOfLife");
}

const getDivinationResult = async (postData = {}) => {
    try {
        const response = await fetch('https://digital-divination-backend.onrender.com/getDivinationResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);

        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const divideSentence = (sentence) => {
    // Split the sentence into words
    const words = sentence.split(" ");

    // Calculate the number of words in each part
    const wordsPerPart = Math.ceil(words.length / 4);

    // Create an array to hold the parts
    const parts = [];

    // Loop to divide the sentence into parts
    for (let i = 0; i < 4; i++) {
        // Calculate the start and end indexes for the current part
        const startIdx = i * wordsPerPart;
        const endIdx = Math.min(startIdx + wordsPerPart, words.length);

        // Get the words for the current part and join them back into a sentence
        const partSentence = words.slice(startIdx, endIdx).join(" ");

        // Add the part to the array
        parts.push(partSentence);
    }

    // Return the array of parts
    return parts;
}

document.addEventListener('DOMContentLoaded', async () => {

    const name = getNameFromStorage();
    const selectedElement = getElementNameFromStorage();
    const areaOfLife = getAreaOfLifeFromStorage();

    if (!name || !selectedElement || !areaOfLife) {
        console.log(`name, selectedElement and areaOfLife not found in storage`);
        return;
    }

    // Set background picture based on selected element
    setBackgroundImageByElementName(selectedElement);

    // Get Divination Results
    const { divinationResult } = await getDivinationResult({
        name,
        selectedElement,
        areaOfLife
    });

    const sentenceParts = divideSentence(divinationResult);

    // Set result
    document.getElementById("divination-text-part-1").textContent = sentenceParts?.[0] || "";
    document.getElementById("divination-text-part-2").textContent = sentenceParts?.[1] || "";
    document.getElementById("divination-text-part-3").textContent = sentenceParts?.[2] || "";
    document.getElementById("divination-text-part-4").textContent = sentenceParts?.[3] || "";

});