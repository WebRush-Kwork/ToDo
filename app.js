const inputTitle = document.querySelector('#title')
const createBtn = document.querySelector('#create')
const listElement = document.querySelector('#list')
const openPopupButton = document.querySelector('#open-popup')
const popupMenu = document.querySelector('#popup-menu')
const closeButton = document.querySelector('.close')
const changeTitle = document.querySelector('#change')
const closePopup = document.querySelector('.close-popup')
const edited = document.querySelector('.edited')
const alertMenu = document.querySelector('.alert')
const tasks = []

const toggleTask = e => {
	if (e.target.dataset.index) {
		const index = parseInt(e.target.dataset.index)
		const type = e.target.dataset.type
		if (type === 'toggle') {
			tasks[index].isCompleted = !tasks[index].isCompleted
		} else if (type === 'remove') {
			tasks.splice(index, 1)
		} else {
			changeTitle.value = tasks[index].title
			changeTitle.dataset.index = index
			popupMenu.style.display = 'block'
		}
		render()
	}
}

const getTemplate = (task, index) => {
	return `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span class="${task.isCompleted ? 'text-decoration-line-through' : ''}">${
		task.title
	} </span>
    <span>
      <span class="btn btn-small btn-${
				task.isCompleted ? 'warning' : 'success'
			}" w-30 data-index="${index}" data-type="toggle">&check;</span>
      <span class="btn btn-small btn-danger w-30" data-index="${index}" data-type="remove">&times;</span>
			<span class="btn btn-small btn-dark w-30" data-index="${index}" data-type="change">\u{270F}</span>
    </span>
  </li>
  `
}

const render = () => {
	listElement.innerHTML = ''
	if (tasks.length === 0) {
		listElement.innerHTML = '<h5 class="text-center">Нет созданных задач</h5>'
	}

	for (let i = 0; i < tasks.length; i++) {
		listElement.insertAdjacentHTML('beforeend', getTemplate(tasks[i], i))
	}
}

const createNewElement = () => {
	if (inputTitle.value.length === 0) {
		return
	}

	const newTask = {
		title: inputTitle.value,
		isCompleted: false,
	}
	tasks.push(newTask)
	inputTitle.value = ''
	render()
}

const changeTitleFunc = () => {
	const index = changeTitle.dataset.index
	tasks[index].title = changeTitle.value
	popupMenu.style.display = 'none'
	alertMenu.classList.add('show')
	setTimeout(() => alertMenu.classList.remove('show'), 3800)
	render()
}

closeButton.addEventListener('click', () => (popupMenu.style.display = 'none'))
closePopup.addEventListener('click', changeTitleFunc)
createBtn.addEventListener('click', createNewElement)
listElement.addEventListener('click', toggleTask)
render()
