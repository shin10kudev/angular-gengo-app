import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})

export class ItemDetailComponent implements OnInit {

  @Input() item: Item;

  isEdit: boolean = false;

  constructor(private itemSvc: ItemService) { }

  ngOnInit() {
  }

  updateItemTitle() {
    this.itemSvc.updateItem(this.item.$key, { title: this.item.title })
  }

  updateActive(value: boolean) {
    this.itemSvc.updateItem(this.item.$key, { active: value })
  }

  deleteItem() {
    this.itemSvc.deleteItem(this.item.$key)
  }
}
