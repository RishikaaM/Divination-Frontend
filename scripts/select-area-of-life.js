const setAreaOfLifeInStorage = (areaOfLife) => {
    sessionStorage.setItem("areaOfLife", areaOfLife);
}

const onNextClick = () => {

    // Get selected area of life
    const areaOfLife = document.getElementById("select-area-of-life").value;

    // Set area of life
    setAreaOfLifeInStorage(areaOfLife);

    // Move to next page
    window.location.href = "select-element-screen.html";

}