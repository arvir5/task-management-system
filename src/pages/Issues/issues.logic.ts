import './issues.css'
// import './issues.view'

// import newIssueModal from '../../Common/new_issue/newIssue.view';
const newIssueModal = require('../../Common/new_issue/newIssue.html')
import { openNewIssueModal, createNewIssue, newIssueModalReset} from '../../Common/new_issue/newIssue.logic'
import { IssueStructure, issueList, updateIssueInIssueList } from '../Board/board.logic';
import { allowedUsers } from '../Login/index'

let selectedIssue: any = {}


function onListItemClick(event: any): void {
    // console.log("EVENT::", event.target.getAttribute('id'))
    const id: string = event.target.id
    const editButton = <HTMLButtonElement>document.getElementById('edit-issue-button')
    editButton.removeAttribute("disabled")
    // console.log('list click detected::', selectedIssue, id)
    if (selectedIssue.id !== id) {
        const selectedItemClass = 'issues-view-list-selected-item'
        if (selectedIssue.id) { // check if any issue is already selected
            // console.log('Selected issue id::', selectedIssue.id)
            const previouslySelectedItem:any = document.querySelector(`li[id="${selectedIssue.id}"]`)
            // console.log('previous selection::', previouslySelectedItem)
            if (previouslySelectedItem){
                const modifiedClass = previouslySelectedItem.getAttribute("class").replace(selectedItemClass, '')
                previouslySelectedItem.setAttribute("class", modifiedClass)
            }
        }

        // console.log("selecting item::", id)
        const selectedListItem:any = document.querySelector(`li[id="${id}"]`)
        // console.log("selected item::", selectedListItem)
        const newClass = selectedListItem.getAttribute("class") + " " + selectedItemClass
        // console.log("selected item::", selectedListItem, newClass)
        selectedListItem.setAttribute("class", newClass)

        selectedIssue = issueList.find(issue => issue.id === Number(id))
        loadSelectedIssueDetails()
    }

}

function loadSelectedIssueDetails(): void {
    // console.log("loading issue details")
    const issueStatusElement:any = document.getElementById('issue-status-display')
    const issueNumberElement:any = document.getElementById('issues-view-issue-number')
    const issueTitleElement:any = document.getElementById('issues-view-issue-title')
    const issueAssigneeElement:any = document.getElementById('issues-view-assignee')
    const issueDescriptionElement:any= document.getElementById('issues-view-description')
    issueNumberElement.innerText = selectedIssue.id
    issueTitleElement.innerText = selectedIssue.title
    issueStatusElement.innerText = getStatusString(selectedIssue.status) 
    issueAssigneeElement.value = selectedIssue.assignee
    issueDescriptionElement.value = selectedIssue.description
}

// function getIssueDetailsFormControls(): HTMLElement[] {
//     //    const issueStatusSelect = document.getElementById('issue-status-select')
//     //  const issueStatusDisplayElement = document.getElementById('issue-status-display')
//     //  const issueAssigneeElement = document.getElementById('issues-view-assignee')
//     //  const issueDescriptionElement = document.getElementById('issues-view-description')
//     //  const editButton = document.getElementById('edit-issue-button')
//     // return [issueStatusDisplayElement,issueStatusSelect,]
// }

function editButtonClick(): void {
    const issueStatusSelect = <HTMLSelectElement>document.getElementById('issue-status-select')
    const issueStatusDisplayElement = <HTMLDivElement>document.getElementById('issue-status-display')
    const issueAssigneeElement = <HTMLSelectElement>document.getElementById('issues-view-assignee')
    const issueDescriptionElement = <HTMLTextAreaElement>document.getElementById('issues-view-description')
    const editButton = <HTMLButtonElement>document.getElementById('edit-issue-button')
    const editIssueControls:any = document.querySelectorAll('.issue-details-edit-controls')
    // console.log(issueAssigneeElement, issueDescriptionElement, issueAssigneeElement.readOnly)
    editIssueControls.forEach((control:any) => { control.style.display = 'inline-block' })

    issueStatusDisplayElement.style.display = 'none'
    // issueAssigneeElement.setAttribute("readonly","false")
    issueAssigneeElement.removeAttribute("disabled")
    issueDescriptionElement.removeAttribute("readonly")
    editButton.style.display = 'none'
    issueStatusSelect.value = selectedIssue.status
}

function saveButtonClick(): void {
    const issueStatusSelect = <HTMLSelectElement>document.getElementById('issue-status-select')
    // const issueStatusDisplayElement = <HTMLDivElement>document.getElementById('issue-status-display')
    const issueAssigneeElement = <HTMLInputElement>document.getElementById('issues-view-assignee')
    const issueDescriptionElement = <HTMLTextAreaElement>document.getElementById('issues-view-description')
    // const editButton = <HTMLButtonElement>document.getElementById('edit-issue-button')
    // const editIssueControls = document.querySelectorAll('.issue-details-edit-controls')

    let modifiedIssue = {
        ...selectedIssue,
        status: issueStatusSelect.value,
        assignee: issueAssigneeElement.value,
        description: issueDescriptionElement.value,
    }
    // console.log("MODIFIED ISSUE::", modifiedIssue)
    const listItem = <HTMLLinkElement>document.getElementById(String(modifiedIssue.id))
    if(listItem){
        const listItemStyle = <string>listItem.getAttribute('class')?.replace(selectedIssue.status,modifiedIssue.status)
        listItem.setAttribute('class', listItemStyle)
    }
    selectedIssue = modifiedIssue
    // issueList = issueList.map((issue) => {
    //     if (issue.id === modifiedIssue.id) return modifiedIssue
    //     return issue
    // })
    updateIssueInIssueList(modifiedIssue)
    resetEditIssueFormStatus()
}

function getStatusString(status:string):string {
    let selectedStatus: string
    switch (selectedIssue.status) {
        case 'todo': {
            selectedStatus = 'To Do';
            break;
        }
        case 'progress': {
            selectedStatus = 'In Progress';
            break;
        }
        case 'done': {
            selectedStatus = 'Done';
            break;
        }
        case 'qa': {
            selectedStatus = 'QA';
            break;
        }
        default: {
            selectedStatus = ''
        }
    }
    return selectedStatus
}

function resetEditIssueFormStatus(): void {
    // const issueStatusSelect = <HTMLSelectElement>document.getElementById('issue-status-select')
    const issueStatusDisplayElement = <HTMLDivElement>document.getElementById('issue-status-display')
    const issueAssigneeElement = <HTMLSelectElement>document.getElementById('issues-view-assignee')
    const issueDescriptionElement = <HTMLTextAreaElement>document.getElementById('issues-view-description')
    const editButton = <HTMLButtonElement>document.getElementById('edit-issue-button')
    const editIssueControls = document.querySelectorAll('.issue-details-edit-controls')

    issueStatusDisplayElement.innerText =  getStatusString(selectedIssue.status)
    issueAssigneeElement.value = selectedIssue.assignee
    issueDescriptionElement.value = selectedIssue.description

    editIssueControls.forEach((control:any) => {control.style.display = 'none'})
    issueStatusDisplayElement.style.display = 'inline-block'
    issueAssigneeElement.setAttribute("disabled", "true")
    issueDescriptionElement.setAttribute("readonly", "true")
    editButton.style.display = 'inline-block'



    // loadSelectedIssueDetails()
}

function cancelButtonClick(): void {
    resetEditIssueFormStatus()
}

function updateDomIssueList(): void {
    const list = <HTMLUListElement>document.getElementById('issues-view-list')
    issueList.forEach((issue) => {
        // const listItem = document.createElement('li')
        // listItem.setAttribute('id', String(issue.id))
        // const listItemStyle = `issues-view-list-item type-${issue.status}`
        // listItem.setAttribute('class', listItemStyle)
        // listItem.innerText =
        //     issue.title;
        // listItem.onclick = onListItemClick
        const listItem = createDomListItem(issue)
        list.appendChild(listItem)
    })
}

function createDomListItem(issue:IssueStructure):HTMLLIElement {
    const listItem = document.createElement('li')
    listItem.setAttribute('id', String(issue.id))
    const listItemStyle = `issues-view-list-item type-${issue.status}`
    listItem.setAttribute('class', listItemStyle)
    listItem.innerText =
        issue.title;
    listItem.onclick = onListItemClick
    return listItem
}

function newIssueAddition():void {
    const newIssue = createNewIssue()
    if(newIssue){
        const list = <HTMLUListElement>document.getElementById('issues-view-list')
        const listItem = createDomListItem(newIssue)
        list.prepend(listItem)
    }
}


export function initPage(): void {
    console.log('loading issues page')
    const saveButton = <HTMLButtonElement>document.getElementById('save-issue-button')
    const editButton = <HTMLButtonElement>document.getElementById('edit-issue-button')
    const cancelButton = <HTMLButtonElement>document.getElementById('cancel-issue-changes-button')
    
    saveButton.onclick = saveButtonClick
    editButton.onclick = editButtonClick
    editButton.disabled = true
    console.log('edit button::',editButton,editButtonClick)
    cancelButton.onclick = cancelButtonClick
    
    const issuesViewDiv = <HTMLDivElement>document.getElementById('issues_view')
    // issuesViewDiv.innerHTML += newIssueModal
    issuesViewDiv.insertAdjacentHTML('beforeend', newIssueModal)
    
    const assigneDisplayList = <HTMLSelectElement>document.getElementById('issues-view-assignee')
    const assigneList = <HTMLSelectElement>document.getElementById('new_issue_assignee')

    allowedUsers.forEach((user) => {
        const assigneeOption = <HTMLOptionElement>document.createElement('option')
        assigneeOption.innerText = user.name
        assigneeOption.value = user.name
        assigneList.appendChild(assigneeOption)
        const clonedOption = assigneeOption.cloneNode(true)
        assigneDisplayList.appendChild(clonedOption)
    })
    
    const newIssueButton = <HTMLButtonElement>document.getElementById('new-issue')
    newIssueButton.onclick = openNewIssueModal
    const saveNewIssueButton = <HTMLButtonElement>document.getElementById('new_issue_form_submit')
    saveNewIssueButton.onclick = newIssueAddition
    const clearNewIssue = <HTMLButtonElement>document.getElementById('new_issue_form_close')
    clearNewIssue.onclick = newIssueModalReset

    updateDomIssueList()
}
