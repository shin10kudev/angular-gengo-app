import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Item } from './item';

@Injectable()
export class ItemService {

  // private basePath: string = '/items';

  items: FirebaseListObservable<Item[]> = null; //  list of objects
  // item: FirebaseObjectObservable<Item> = null; //   single object
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query={}): FirebaseListObservable<Item[]> {
    if (!this.userId) return;
    this.items = this.db.list(`items/${this.userId}`, {
      query: query
    });
    return this.items
  }

  // Return a single observable item
  // getItem(key: string): FirebaseObjectObservable<Item> {
  //   const itemPath =  `${this.basePath}/${key}`;
  //   this.item = this.db.object(itemPath)
  //   return this.item
  // }

  // Create a brand new item
  createItem(item: Item): void  {
    this.items.push(item)
      .catch(error => this.handleError(error))
  }

  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.items.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single item
  deleteItem(key: string): void {
      this.items.remove(key)
        .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
      this.items.remove()
        .catch(error => this.handleError(error))
  }


  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }
}
