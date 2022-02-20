import { workspaceHandleSocketMessage } from "communication";
import { StoreType, SubscribeToChange } from "redux-root";
import { selectors as itemsSelectors } from "features/craft-items"
import { transformToDeprecatedCraftItem } from "data-transform";

declare global {
    interface Window {
      // add you custom properties and methods
      sendUpdateToReact: (type: string, data: any) => void
    }
  }

export function initCommunication(store: StoreType, subscribeToStoreChange: SubscribeToChange) {
    window.sendUpdateToReact = (type: string, data: any) => {
        workspaceHandleSocketMessage([{
            type,
            data
        }], store.dispatch);
    }

    subscribeToStoreChange(itemsSelectors.selectChanges, (changes, dispatch) => {
      if (changes.localOnly) {
        return;
      }
      //the === is temporary, just a draft
      if (changes.updated.length === 1) {
        const item = itemsSelectors.selectById(store.getState(), changes.updated[0])
        if (!item) {
          throw new Error("there has to be an item.. just updated " + changes.updated[0]);
        }
        window.ngService.updateFromReact(
          "product:item:update", 
          //we are losing data here for now at least.. we can explode when we have all the data in place
          transformToDeprecatedCraftItem(item) 
        );
      }
    })

    const a = {
      "event": "product:item:update",
      "userId": null,
      "clientId": "bc3cdbec-d176-4170-0213-1ac7418e1a80",
      "timestamp": "2022-02-18T12:56:42+0000",
      "eventId": "eb7b3ccc58ae95882908dc7fff50c7d4",
      "data": {
          "info": {
              "topics": [
                  {
                      "id": "2305843010001967774",
                      "title": "FP - General UI/UX improvments"
                  }
              ],
              "reqs": [],
              "id": "2305843010028997471",
              "title": "iiiii",
              "productId": "2305843009945178322",
              "description": "\n<p><b>Problem to solve</b></p>\n\n<p>Currently single and multi selection fields in FP present “Add” CTA to add options<br class=\"atl-forced-newline\" />\n CTA is missing the “+” icon left to “Add” - same as in craft</p>\n\n<p> </p>\n\n<p><b>Solution</b></p>\n\n<p>Single and multi selection fields - add “+” icon left to “Add”</p>\n\n<p> </p>\n\n<p><b>See craft example</b></p>\n\n<p> </p>",
              "orderIndex": -1608620968477.5,
              "sprintOrderIndex": "-1628011657465",
              "actionPlanOrderIndex": "-1628011657465",
              "updated": "2022-02-18T12:56:40Z",
              "itemType": "2305843009524564638",
              "p_epic_id": "2305843010001967774",
              "updatedById": "2305843009971636165",
              "jiraIssueKey": "CRA-3706",
              "jiraProjectId": "2305843009975897306",
              "userValue": "0",
              "effortValue": "0",
              "progress": "0",
              "isEssential": false,
              "isPersona": false,
              "essentialType": "regular",
              "isFeature": false,
              "color": "#e5e5e5",
              "isPushing_jira": false,
              "jiraPushingDate": "2021-12-29 18:34:13.226+00",
              "kanoValue": "0",
              "itemTypeId": "2",
              "isInitiative": false,
              "isGoal": false,
              "isLabel": false,
              "isReleased": true,
              "releasedDate": "2021-09-23T09:39:43Z",
              "storyPoints": "0",
              "creatorId": "2305843009971636165",
              "type": "page",
              "lineId": "2305843009955340649",
              "guid": "0021bd25-0d31-2338-885d-8c05f722a800",
              "noAssigns": false,
              "createdDate": "2021-07-12T17:40:28Z",
              "featureGuid": "c741dc9b-639a-e17f-2467-ae852ba3f620",
              "topicGuid": "c810ac36-720b-c82e-1008-6e7306f4f6f9",
              "shortId": "CRK-3672",
              "isDefault": false,
              "goalId": "2305843009990439396",
              "dueTime": "0",
              "actualStartDate": "2021-07-12T17:40:27Z",
              "actualEndDate": "2021-07-26T17:40:27Z",
              "actualEndTime": "0",
              "estimatedTime": "0",
              "actualTime": "0",
              "subtasksBased": false,
              "timelineFloor": {
                  "crossGroup": 3271294983120
              },
              "feedbacksCount": "0",
              "ideasCount": "0",
              "feedbacksTotal": "0",
              "isCapacityReleaseDisabled": false,
              "isCapacitySprintDisabled": false,
              "isPushing_tfs": false,
              "isComplited": false,
              "files": [
                  {
                      "itemId": "2305843010028997471",
                      "orderIndex": "100",
                      "extension": "png",
                      "name": "FP",
                      "id": "2305843010028997846",
                      "productId": "2305843009945178322",
                      "url": "https://app-pp8.craft.io/api/file/open/2305843009945178322/2305843010028997846.png",
                      "newFileId": null,
                      "newFileUrl": "",
                      "updateDate": null
                  },
                  {
                      "itemId": "2305843010028997471",
                      "orderIndex": "200",
                      "extension": "png",
                      "name": "Craft",
                      "id": "2305843010028997881",
                      "productId": "2305843009945178322",
                      "url": "https://app-pp8.craft.io/api/file/open/2305843009945178322/2305843010028997881.png",
                      "newFileId": null,
                      "newFileUrl": "",
                      "updateDate": null
                  }
              ],
              "lastComment": {
                  "total": "0"
              },
              "overview": null,
              "sprint": {
                  "id": "2305843009945178380",
                  "name": "Backlog",
                  "description": null,
                  "sprintStartDate": "1970-01-01 00:00:00+00"
              },
              "releaseState": "4",
              "globalStatus": {
                  "id": "2305843009996676886",
                  "productId": "2305843009945178322",
                  "name": "Completed",
                  "guid": "8fbb7dde-bd86-4575-95cb-437be356e2dd",
                  "orderIndex": "13000",
                  "isDefault": true,
                  "color": "#08E1E0",
                  "releaseState": "4",
                  "editorId": "2305843009971636165",
                  "editedDt": "2021-01-06T15:16:38Z"
              },
              "importance": {
                  "id": "2305843010078298034",
                  "productId": "2305843009945178322",
                  "name": "Med",
                  "iconId": "5",
                  "guid": "22578664-8a53-4272-bc35-344ffa1520d9",
                  "orderIndex": "300000",
                  "isDefault": true,
                  "editorId": "2305843009965606633",
                  "editedDt": "2022-01-11T18:50:35Z"
              },
              "assignedContainer": {
                  "id": "2305843010008138934",
                  "title": "Q3'2021",
                  "guid": "3c1af668-5246-2790-4d0a-75d21f83cdb4",
                  "color": "#f59d00",
                  "isDefault": false,
                  "isForTarget": false
              },
              "assignedTo": {
                  "id": "2305843010028998050",
                  "itemId": "2305843010028997471",
                  "teamId": "2305843009945178343",
                  "teamTitle": "Dev",
                  "teamColor": "#536dfe",
                  "orderIndex": "-1626161399549",
                  "personId": "2305843009524563723",
                  "authorId": "2305843009971636165",
                  "personName": "Oleg Pnk",
                  "type": "user",
                  "description": null,
                  "guid": "c0a057ea-6b5e-4db8-895e-379e4b427736",
                  "estimationValue": "0",
                  "timeSpentValue": "0",
                  "columnOrderIndex": "-1626161398958",
                  "reopenStatus": null,
                  "doneStatus": null,
                  "columnTitle": "To Do",
                  "columnId": "2305843009945178349",
                  "isDone": false,
                  "isToDo": true
              },
              "parentGuid": "c810ac36-720b-c82e-1008-6e7306f4f6f9",
              "assignedGoal": {
                  "id": "2305843009990439396",
                  "title": "Core features",
                  "guid": "e68baa76-1333-1a45-7343-4a679302a826",
                  "isDefault": false
              },
              "custom": [
                  {
                      "id": "2305843010069850221",
                      "guid": "82b07d4f-4ae5-458f-80da-59312a548b90",
                      "value": "0.00"
                  },
                  {
                      "id": "2305843010004776313",
                      "guid": "c7921caf-dfb4-4ced-906a-a905ce60a297",
                      "value": null
                  },
                  {
                      "id": "2305843010004657813",
                      "guid": "610ba63d-bce0-4da5-a525-6922eaa452a5",
                      "value": null
                  },
                  {
                      "id": "2305843009995296216",
                      "guid": "22e5bcca-20de-4c18-9863-98e57028f508",
                      "value": null
                  },
                  {
                      "id": "2305843009975942104",
                      "guid": "a28160e7-ef75-4b66-9cdd-7ff20e5c3b28",
                      "value": [
                          "8a661d93-8fa5-40f4-82f5-9c3012c8b3f9"
                      ]
                  },
                  {
                      "id": "2305843009995285589",
                      "guid": "92e46424-1aef-8557-6334-2e7753e093f5",
                      "value": [
                          "79622903-73db-404b-8dcd-7b4b62d7e055"
                      ]
                  },
                  {
                      "id": "2305843010042523228",
                      "guid": "61de79ee-79d5-dbc8-1881-05985637eff7",
                      "value": [
                          "7d74ffe4-b4cc-e202-6b61-493754115826"
                      ]
                  },
                  {
                      "id": "2305843009975942112",
                      "guid": "d5a2cd61-79c4-4507-b85e-4549c4490c0b",
                      "value": [
                          "cf96132f-ffb1-4930-b9fa-54cf4be7b234"
                      ]
                  }
              ],
              "attaches": [
                  {
                      "id": "2305843010033349263",
                      "name": ".png",
                      "mime": "image/png",
                      "extension": "png",
                      "object": null,
                      "size": "49872",
                      "addons_type": null,
                      "uploadDt": "2021-08-06T10:05:10Z",
                      "assetAuthorId": "2305843009933068411",
                      "fullName": "Elad Simon",
                      "url": "https://d20fid1kzmb1su.cloudfront.net/2305843009945178322/2305843010033349263.png?Expires=1645189062&Signature=eFwg3EwpZLGkpgaEKEdy4y2ZlW1hEV2BKTMR8jFAJ1JAPUNGEZWtXyPKeT6CyBgdaFN--KHMD9l1fuEdpC17Y1760H1v9KWVh07zaoB4MwtrC8rYlV6osGywdYP8AEotuA5GfIKhrDa3nhtYopwxAgNyEMJNCExumdXhl0hp9gCHaJ9Fd6KjNRJDw8EEp8pYLX55Sa-VzfNvcYWQ66FlXuJSZEPizbgl~rSEv3VyLlb-xDGM6-4kuqedOVKd7iTjTaE0dZHABZgZlwlV9i-x7w3OZLr87pwcAjiOATsBkcLlJbfGaPYaK9nSCtDOkTLkTPTz69y7ZODSsXPSd-KZ7g__&Key-Pair-Id=APKAICVNEMTB6A3AMLAA",
                      "type": "image"
                  },
                  {
                      "id": "2305843010033349266",
                      "name": ".png",
                      "mime": "image/png",
                      "extension": "png",
                      "object": null,
                      "size": "49872",
                      "addons_type": null,
                      "uploadDt": "2021-08-06T10:05:10Z",
                      "assetAuthorId": "2305843009933068411",
                      "fullName": "Elad Simon",
                      "url": "https://d20fid1kzmb1su.cloudfront.net/2305843009945178322/2305843010033349266.png?Expires=1645189062&Signature=QMCFEaVocDZPUU8fl7EOpOIaQb1YycXS1ED3t5B~nz744ry1njODL0Lm94QQ6l4MHaWfqfKmEThAz59uCjGPDGmF0UKPeR1GMcCidsWTOhhFFfIb89Yk4K1mjCetY4RaCdc5pAfKS7uzriQOaARCh1foEw6V7dec~Npf1zcsTBlT62VPRq05d7B5erSgjG~eXRBV9XY6ukbVzGlHwxDzwtn~tEqtkGJ~NkXjtF4Vs6SCIHYapNnD2AUVxt9zW~~eioN3YhbcRF6qBpcB9z-X2r-0rfamKZ07SbiiljaR3GDyRs0-EIiQHsHlXW2q-ZIXgO8Jmm7pdykAYtUTpweIyg__&Key-Pair-Id=APKAICVNEMTB6A3AMLAA",
                      "type": "image"
                  }
              ],
              "subcategories": [],
              "hash": "0cd02d4f71a34a20aa4e827333ba024f",
              "prevItemId": null
          }
      },
      "url": "https://app-pp8.craft.io/pub?id=ch2305843009945178322"
  }

}