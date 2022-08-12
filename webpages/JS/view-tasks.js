import token from "./login-page.js";
const button1= document.getElementById("button1");

button1.addEventListener("click", async (e) => {
    const response = await fetch('http://localhost:8080/user/allTasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });
    console.log(await response.json());
    //document.getElementById("head_demo").innerHTML = await response.json();
})

/*async function viewOne() {
    const response = await fetch('http://localhost:8080/user/task/2ec50720-8c24-458c-b567-8923dc1902a2', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });
    console.log(await response.json());
    document.getElementById("head_demo").innerHTML = (await response.json()).description;
}*/

//export default newFunc;