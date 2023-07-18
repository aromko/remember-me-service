import { WithId } from 'mongodb';

interface UserDTO extends WithId<Document> {
  name: string;
  userTelegramId: number;
}
