import { WithId } from 'mongodb';

interface UserDTO extends WithId<Document> {
  name: string;
  userTelegramId: number;
}

interface ReminderDTO extends WithId<Document> {
  name: string;
  description: string;
  executionAt: string;
  messageType: string;
  telegramId: string;
}
