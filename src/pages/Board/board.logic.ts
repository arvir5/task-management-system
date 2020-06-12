import { currentUser, allowedUsers } from '../Login/index'
import router from '../../routing/router';

import {openNewIssueModal,createNewIssue,newIssueModalReset} from '../../Common/new_issue/newIssue.logic'
// import newIssueModal from '../../Common/new_issue/newIssue.view'
const newIssueModal = require('../../Common/new_issue/newIssue.html')


export interface IssueStructure {
    title: string;
    status: string;
    description: string;
    id: number;
    assignee: string;
}

interface BoardDetailsInterface {
    [index: string]: IssueStructure[];
}


export let issueList: IssueStructure[] = [
    { title: "issue_1", id: 1, status: "todo", description: "", assignee: "Arjun" },
    { title: "issue_2", id: 2, status: "todo", description: "", assignee: "Arjun" },
    { title: "issue_3", id: 3, status: "todo", description: "", assignee: "Arjun" },
    { title: "issue_4", id: 4, status: "done", description: "", assignee: "Arjun" },
    {
        title: "issue_5",
        id: 5,
        status: "progress",
        description: "",
        assignee: "Arjun"
    },
    { title: "issue_6", id: 6, status: "done", description: "", assignee: "Demo User" },
    {
        title: "issue_7",
        id: 7,
        status: "progress",
        description: "",
        assignee: "Demo User"
    },
    {
        title: "issue_8",
        id: 8,
        status: "progress",
        description: "",
        assignee: "Demo User"
    },
    { title: "issue_9", id: 9, status: "qa", description: "", assignee: "Demo User" },
    { title: "issue_10", id: 10, status: "qa", description: "", assignee: "Demo User" }
];

const boardDetails: BoardDetailsInterface = {
    todo: [],
    progress: [],
    qa: [],
    done: []
};

export function convertIssueToDomListItem(issue: IssueStructure): void {
    const listItem = document.createElement('li')
    // listItem.setAttribute('id', issue.id)
    listItem.setAttribute('draggable', 'true')
    listItem.innerText = issue.title
    listItem.id = String(issue.id)
    const issueListSelector = `${issue.status}-issues`
    const requiredList = <HTMLElement>document.getElementById(issueListSelector)
    if (requiredList) {
        requiredList.insertBefore(listItem, requiredList.firstChild)
    }
    // console.log('required list::', issueListSelector, document.getElementById(issueListSelector))
    boardDetails[issue.status] = [issue, ...boardDetails[issue.status]]
}

function attachDragDropListenersToLists(): void {
    const dropLists: any = document.querySelectorAll("ul[class='issue-drag-box']")
    // console.log('found ul elements::', dropLists)
    dropLists.forEach((list: HTMLUListElement) => {
        list.ondragstart = onDragStart
        list.ondragover = onDragOver
        list.ondrop = onDrop
    })
}

export function addButtonHandlers(): void {
    console.log("initializing buttons!!")
    const getElement = (id: string) => document.getElementById(id)
    const newIssueButton = <HTMLButtonElement>getElement('new-issue')
    const createIssueButton = <HTMLButtonElement>getElement('new_issue_form_submit')
    const closeNewIssueModalButton = <HTMLButtonElement>getElement('new_issue_form_close')
    newIssueButton.onclick = openNewIssueModal
    console.log("NEW ISSUE BUTTON::", newIssueButton)
    createIssueButton.onclick = createNewIssue
    closeNewIssueModalButton.onclick = newIssueModalReset
}

export default function initBoardPage(): void {
    console.log('loading init func of /board')

    issueList.forEach((issue: IssueStructure) => convertIssueToDomListItem(issue))
    attachDragDropListenersToLists()
    const pageHeaderButtons = <HTMLDivElement>document.getElementById('header-buttons')
    pageHeaderButtons.insertAdjacentHTML('beforeend',newIssueModal)
    // // addButtonHandlers()
    const assigneList = <HTMLSelectElement>document.getElementById('new_issue_assignee')
    allowedUsers.forEach((user) => {
        const assigneeOption = <HTMLOptionElement>document.createElement('option')
        assigneeOption.innerText = user.name
        assigneeOption.value = user.name
        assigneList.appendChild(assigneeOption)
    })

    console.log('ISSUE UTILS::')
    // pageHeaderButtons.innerHTML += newIssueModal
    addButtonHandlers()
}

export function onDragStart(event: any): void {
    const data = JSON.stringify({ id: event.target.id, parentId: event.target.parentElement.id })
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/plain", data);
    console.log("drag started for:", event.target, event.target.parentElement.id, event.dataTransfer);
}

export function onDragOver(event: any): void {
    event.preventDefault();
    // console.log("drag left")
}

export function onDrop(event: any): void {
    // console.log("drop event called:");
    const { id, parentId } = JSON.parse(event.dataTransfer.getData("text"));
    const targetBox = event.target;
    // console.log("target:", targetBox,event.target.id,event.target.id.split('-'),id.split('-'));

    const draggedItem = document.getElementById(id);
    // console.log("item:", id, draggedItem);
    targetBox.appendChild(draggedItem);

    updateBoardAfterDrop(id, parentId.split('-')[0], event.target.id.split('-')[0])
    event.dataTransfer.clearData();
}

function updateBoardAfterDrop(id: string, oldStatus: string, newStatus: string): void {
    let modifiedIssue: any
    boardDetails[oldStatus] = boardDetails[oldStatus].filter((issue) => {
        if (issue.id === Number(id)) {
            modifiedIssue = issue
            modifiedIssue.status = newStatus
        }
        return issue.id !== Number(id)
    })
    if (modifiedIssue) {
        boardDetails[newStatus] = [modifiedIssue, ...boardDetails[newStatus]]
    }
    console.log('board status old:', boardDetails[oldStatus])
    console.log('board status new:', boardDetails[newStatus])
}

export function addToIssueList(newIssue:IssueStructure):void {
    issueList = [newIssue, ...issueList]
}

export function updateIssueInIssueList(modifiedIssue:IssueStructure):void{
    issueList = issueList.map((issue) => {
        if (issue.id === modifiedIssue.id) return modifiedIssue
        return issue
    })
}