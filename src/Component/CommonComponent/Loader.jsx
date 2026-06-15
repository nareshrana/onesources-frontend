const loader = (data) => {
    if(data == "show"){
      var element = document.getElementById("custom_loader");
      element.classList.add("show");
    }else{
      var element = document.getElementById("custom_loader");
      element.classList.remove("show");
    }
  };

  export { loader };
