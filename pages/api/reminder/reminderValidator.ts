import { ReminderDTO } from '../../../types/global';

export function validateReminder(reminderData: ReminderDTO) {
  if (
    !reminderData.name ||
    !reminderData.description ||
    !reminderData.executionAt ||
    !reminderData.messageType ||
    !reminderData.telegramId
  ) {
    throw new Error(
      'Name, description, executionAt, messageType and telegramId are required fields.'
    );
  }
}
