let toastTimeout;

function toast(msg) {
  if (msg !== "") {
    const toast = document.querySelector("#toast");
    document.querySelector("#toasttext").innerHTML = msg;
    toast.style.opacity = 1;

    // Clear any previous timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    // Set a new timeout
    toastTimeout = setTimeout(() => {
      toast.style.opacity = 0;
    }, 3000);
  }
}

export default toast;
