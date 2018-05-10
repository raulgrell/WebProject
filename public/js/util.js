function alert_log(error) {
    console.log("Error: ", ...arguments);
    alert(error.message);
}