import { IssueStructure, issueList, convertIssueToDomListItem,addToIssueList} from '../../pages/Board/board.logic'

export function openNewIssueModal(): void {
    const modal = <HTMLDialogElement>document.querySelector("dialog[id='new-issue-modal']");
    modal.showModal()
}

export function createNewIssue(): any {
    const titleElement = <HTMLInputElement>document.getElementById('new_issue_title')
    const statusElement = <HTMLInputElement>document.getElementById('new_issue_status')
    const descriptionElement = <HTMLTextAreaElement>document.getElementById('new_issue_description')
    const assigneeElement = <HTMLInputElement>document.getElementById('new_issue_assignee')
    const title = titleElement.value
    const status = statusElement.value
    const description = descriptionElement.value
    const assignee = assigneeElement.value

    const showError = (errorElement:HTMLElement,errorMessage:string) :void =>{
        const errorDescriptor = document.createElement("p")
        errorDescriptor.innerText = errorMessage
        errorDescriptor.setAttribute('class' ,'new-issue-modal-error')
        errorElement.parentNode?.insertBefore(errorDescriptor,errorElement.nextSibling)
    }

    if(!title.trim()){
        showError(titleElement,'Please enter a title')
    }
    if(!description.trim()){
        showError(descriptionElement,'Please enter some description')
    }
    if (description.trim() && title.trim()) {
        const newIssue: IssueStructure = {
            title,
            status,
            description,
            assignee,
            id: issueList.length + 1
        }
        console.log('NEw Issue::', newIssue)
        // issueList = [newIssue,...issueList]
        addToIssueList(newIssue)
        convertIssueToDomListItem(newIssue)
        const modal = <HTMLDialogElement>document.getElementById('new-issue-modal');
        
        newIssueModalReset()
        modal.close()
        return newIssue
    }

}

export function newIssueModalReset(): void {
    const errorTags = document.querySelectorAll("p[class='new-issue-modal-error']")
    if (errorTags) {
        errorTags.forEach(tag => tag.remove())
    }
    const form = <HTMLFormElement>document.getElementById('new_issue_form')
    form.reset();
}

// export function addButtonHandlers():void {
//     console.log("initializing buttons!!")
//     const getElement = (id:string) => document.getElementById(id)
//     const newIssueButton = <HTMLButtonElement>getElement('new-issue')
//     const createIssueButton = <HTMLButtonElement>getElement('new_issue_form_submit')
//     const closeNewIssueModalButton = <HTMLButtonElement>getElement('new_issue_form_close')
//     newIssueButton.onclick = openNewIssueModal
//     console.log("NEW ISSUE BUTTON::",newIssueButton)
//     createIssueButton.onclick = createNewIssue
//     closeNewIssueModalButton.onclick = newIssueModalReset
// }