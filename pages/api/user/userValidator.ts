import { UserDTO } from '../../../types/global';

export function validateUser(userData: UserDTO) {
  if (!userData.name || !userData.userTelegramId) {
    throw new Error('Name, telegramId are required fields.');
  }
}
