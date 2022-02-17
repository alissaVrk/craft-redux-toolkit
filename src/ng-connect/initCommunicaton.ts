import { workspaceHandleSocketMessage } from "communication";
import { AppDispatch } from "redux-root";

declare global {
    interface Window {
      // add you custom properties and methods
      sendUpdateToReact: (type: string, data: any) => void
    }
  }

export function initCommunication(dispatch: AppDispatch) {
    window.sendUpdateToReact = (type: string, data: any) => {
        workspaceHandleSocketMessage([{
            type,
            data
        }], dispatch);
    }
}