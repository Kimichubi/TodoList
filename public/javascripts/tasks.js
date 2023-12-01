// const setTagAsDone = async (element, id) => {
//   event.preventDefault();
//   try {
//     let headers = new Headers({ "Content-Type": "application/json" });
//     let body = JSON.stringify({ task: { done: element.checked } });
//     let response = await fetch(`/tasks/${id}?_method=put`, {
//       headers: headers,
//       body: body,
//       method: "PUT",
//     });
//     let data = await response.json();

//     let task = data.task;

//     let parent = element.parentNode;
//     if (task.done) {
//       element.checked = true;
//       parent.classList.add("has-text-sucess");
//       parent.classList.add("is-italic");
//     } else {
//       element.checked = false;
//       parent.classList.remove("has-text-sucess");
//       parent.classList.remove("is-italic");
//     }
//   } catch (error) {
//     alert(`Erro ${error}`);
//   }
// };
const setTagAsDone = async (element, id) => {
  event.preventDefault();
  try {
    let headers = new Headers({ "Content-Type": "application/json" });
    let body = JSON.stringify({ task: { done: element.checked } });

    let response = await fetch(`/tasks/${id}?_method=put`, {
      method: "PUT",
      headers: headers, // Corrected position of headers
      body: body,
    });

    let data = await response.json();

    let task = data.task;

    let parent = element.parentNode;
    if (task.done) {
      element.checked = true;
      parent.classList.add("has-text-success"); // Corrected class name
      parent.classList.add("is-italic");
    } else {
      element.checked = false;
      parent.classList.remove("has-text-success"); // Corrected class name
      parent.classList.remove("is-italic");
    }
  } catch (error) {
    alert(`Erro ${error}`);
  }
};
