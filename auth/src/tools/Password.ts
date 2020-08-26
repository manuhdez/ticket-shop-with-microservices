import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const asyncScrypt = promisify(scrypt);

export default class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await asyncScrypt(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(stored: string, supplied: string): Promise<boolean> {
    const [hashedPassword, salt] = stored.split('.');
    const buffer = (await asyncScrypt(supplied, salt, 64)) as Buffer;

    return hashedPassword === buffer.toString('hex');
  }
}
