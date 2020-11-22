import { Component, OnInit } from '@angular/core';
import { NamesService} from "../_services/names.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Name} from "../_models/name.model";

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})
export class NamesComponent implements OnInit {
  closeResult = '';
  public newName;
  public names;
  public editName= new Name();

  constructor(
    private namesService: NamesService,
    private modalService: NgbModal
  ) { }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  ngOnInit(): void {
    this.namesService.getAll().subscribe(returnNames => {
      this.names = returnNames.docs;
    })
  }

  saveName(): void {
    this.namesService.create(this.newName).subscribe( saveName => {
      this.names.push(saveName);
    })
  }

  deleteName(deleteName):void{
    this.namesService.deleteNameId(deleteName).subscribe(success=>{
      this.names = this.namesService.removeName(this.names, deleteName);
    }, error => {
      console.log(error);
    })
  }

  newEditName(nameToRemove,nameToReplaceWith):void{
    this.editName=Object.assign({},nameToReplaceWith);
    this.modalService.open(nameToRemove).result.then((result)=>{
      this.saveEditedName();
    })
  }

  saveEditedName():void{
    this.namesService.updateNameId(this.newName).subscribe( saveName => {
      this.names.push(saveName);
    })
  }


}
