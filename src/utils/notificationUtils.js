import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  customClass: "text-xs",
});

const showSuccessAlert = (message) => {
  return Toast.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};

const showFailAlert = (message) => {
  return Toast.fire({
    icon: "warning",
    title: "Warning",
    text: message,
  });
};

// Alert Handle Validator
const showErrorAlert = (data) => {
  let errorMessage = "";

  for (const field in data) {
    if (
      data.hasOwnProperty(field) &&
      data[field] !== undefined &&
      data[field] !== null
    ) {
      errorMessage += `${data[field]}\n`;
    }
  }

  return Toast.fire({
    icon: "warning",
    title: data.message,
    text: errorMessage,
  });
};

export { showSuccessAlert, showErrorAlert, showFailAlert };
