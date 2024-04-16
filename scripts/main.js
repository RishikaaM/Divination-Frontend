const setNameInStorage = (name) => {

    sessionStorage.setItem("name", name);

}


const onGetStartedClick = () => {
    console.log(`onGetStartedClick`);

    // Get name
    const name = document.getElementsByName("name")?.[0]?.value;

    // Set Name
    setNameInStorage(name);

    // Move to next page
    window.location.href = "select-area-of-life.html";

}