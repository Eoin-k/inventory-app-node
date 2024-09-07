// editing and deletion dialogs
const showButton = document.getElementById("showbtn");
const deletebtn = document.getElementById("deletebtn");
const deletedialog = document.getElementById("delete-dialog");
const closeButton = document.getElementById("closebtn");
const dialog = document.getElementById("edit-item-dialog");
deletebtn.addEventListener("click", () => {
	deletedialog.showModal();
});

showButton.addEventListener("click", () => {
	dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
	e.preventDefault();
	deletedialog.close();
	dialog.close();
});
