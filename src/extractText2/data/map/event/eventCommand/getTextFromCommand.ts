import { mapTextCommand } from "@sigureya/rpg-data-tools";
import {} from "@sigureya/rpgtypes";
const hoge = () => {
  mapTextCommand<void>([], {
    changeName: (command) => {},
    changeNickname: (command) => {},
    changeProfile: (command) => {},

    showChoices: (command) => {},
    showScrollingText: (command) => {},
    showMessage: (command) => {},
    //    showMessageBody: () => {},
    other: () => {},
    commentBody: () => {},
    showChoicesItem: () => {},
  });
};
