import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "modal-component",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class ModalComponent {
    @Input() displayModal: boolean = false;
    @Input() minorColor: string = "#ffffff";
    @Input() modalTitle: any = null;
    @Input() modalContent: any = null;
    @Output() modalOnOk = new EventEmitter();
    @Output() modalOnCancel = new EventEmitter();
    title = "ModalComponent";
}