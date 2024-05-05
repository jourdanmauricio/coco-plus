import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  // UpdateEvent,
} from 'typeorm';
import { Users } from '../entities/users.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Users> {
  listenTo() {
    return Users;
  }

  beforeInsert(event: InsertEvent<Users>) {
    console.log(`Before insert: `, event.entity);
  }

  async afterInsert(event: InsertEvent<Users>) {
    console.log(`After office: `, event.entity);
  }
}
